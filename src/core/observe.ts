import { useEffect } from 'react'

import { useForcedUpdate } from '../internal/utils'
import { Listeners } from '../types'

export default (...observableObjects: any[]) => {
	for (const observable of observableObjects)
		observe(observable)
}

const observe = (observable: any) => {
	const forceUpdate = useForcedUpdate()
	
	useEffect(() => {
		if (observable === null || observable === undefined)
			return
		
		const listeners: Listeners | undefined = observable.__sobs_listeners
		
		if (!listeners)
			return
		
		const listenerId = observable.__sobs_addListener(forceUpdate)
		
		return () => observable.__sobs_removeListener(listenerId)
	}, [observable])
}
