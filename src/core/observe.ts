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
		const listeners: Listeners | undefined = observable.__sobs_listeners
		
		if (!listeners)
			return console.error(
				'sobs: observe can only be used on an @ObservableObject'
			)
		
		const listenerId = observable.__sobs_addListener(forceUpdate)
		
		return () => observable.__sobs_removeListener(listenerId)
	}, [observable])
}
