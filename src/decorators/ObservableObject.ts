import { newId } from '../utils'

export default (constructor: any): any =>
	class extends constructor {
		constructor(...args: any[]) {
			super(...args)
			
			this.__sobs_listeners = {}
			
			this.__sobs_addListener = (callback: () => void) => {
				const id = newId()
				
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
					
					if (target[`__sobs_isPublished_${key}`])
						target.didChange()
					
					return true
				}
			})
		}
	}
