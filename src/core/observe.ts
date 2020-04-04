import { useEffect } from 'react'

import { useForcedUpdate } from '../internal/utils'
import { Listeners } from '../types'
import { LISTENERS_KEY, ADD_LISTENER_KEY, REMOVE_LISTENER_KEY } from '../keys'

export default (...observableObjects: any[]) => {
	for (const observable of observableObjects)
		observe(observable)
}

const observe = (observable: any) => {
	const forceUpdate = useForcedUpdate()
	
	useEffect(() => {
		if (observable === null || observable === undefined)
			return
		
		const listeners: Listeners | undefined = observable[LISTENERS_KEY]
		
		if (!listeners)
			return
		
		const listenerId = observable[ADD_LISTENER_KEY](forceUpdate)
		
		return () => observable[REMOVE_LISTENER_KEY](listenerId)
	}, [observable])
}
