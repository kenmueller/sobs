import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'

type Listeners = Record<string, () => void>

export const ObservableObject = (constructor: any): any =>
	class extends constructor {
		constructor(...args: any[]) {
			super(...args)
			
			this.__sobs_listeners = {}
			
			this.__sobs_addListener = (callback: () => void) => {
				const id = uuid()
				
				this.__sobs_listeners[id] = callback
				return id
			}
			
			this.__sobs_removeListener = (id: string) => {
				delete this.__sobs_listeners[id]
			}
			
			this.didChange = () => {
				const listeners: (() => void)[] = Object.values(
					this.__sobs_listeners
				)
				
				for (const listener of listeners)
					listener()
			}
			
			return new Proxy(this, {
				set: (target, key: string, value) => {
					target[key] = value
					
					if (target[`__sobs_isObservable_${key}`])
						target.didChange()
					
					return true
				}
			})
		}
	}

export const Published = (target: any, key: string) => {
	target[`__sobs_isObservable_${key}`] = true
}

export const observe = (...observableObjects: any[]) => {
	for (const observable of observableObjects)
		_observe(observable)
}

const _observe = (observable: any) => {
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

const useForcedUpdate = () => {
	const [, setId] = useState(uuid())
	
	return () => setId(uuid())
}

export const newId = () =>
	uuid()
