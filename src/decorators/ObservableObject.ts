import { newId } from '../utils'
import { LISTENERS_KEY, ADD_LISTENER_KEY, REMOVE_LISTENER_KEY, DID_CHANGE_KEY, IS_PUBLISHED_KEY } from '../keys'

export default (constructor: any): any =>
	class extends constructor {
		constructor(...args: any[]) {
			super(...args)
			
			this[LISTENERS_KEY] = {}
			
			this[ADD_LISTENER_KEY] = (callback: () => void) => {
				const id = newId()
				
				this[LISTENERS_KEY][id] = callback
				return id
			}
			
			this[REMOVE_LISTENER_KEY] = (id: string) => {
				delete this[LISTENERS_KEY][id]
			}
			
			this[DID_CHANGE_KEY] = () => {
				const listeners: (() => void)[] = Object.values(this[LISTENERS_KEY])
				
				for (const listener of listeners)
					listener()
			}
			
			return new Proxy(this, {
				set: (target, key: string, value) => {
					target[key] = value
					
					if (target[IS_PUBLISHED_KEY(key)])
						target.didChange()
					
					return true
				}
			})
		}
	}
