import { Component } from 'react'

import observe from './observe'

export default <T>(props: Record<string, any>, observableObjectType: new (...args: any[]) => T): T | null => {
	const environment = (
		(props instanceof Component ? props.props : props).__sobs_environment ?? []
	).reverse()
	
	for (const object of environment)
		if (object instanceof observableObjectType) {
			observe(object)
			return object
		}
	
	observe(null)
	return null
}
