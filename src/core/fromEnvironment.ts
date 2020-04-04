import { Component } from 'react'

import observe from './observe'
import { ENVIRONMENT_KEY } from '../keys'

export default <T>(props: Record<string, any>, observableObjectType: new (...args: any[]) => T): T | null => {
	const environment = (
		(props instanceof Component ? props.props : props)[ENVIRONMENT_KEY] ?? []
	).reverse()
	
	for (const object of environment)
		if (object instanceof observableObjectType) {
			observe(object)
			return object
		}
	
	observe(null)
	return null
}
