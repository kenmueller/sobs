import { Component, ReactNode } from 'react'

import observe from './observe'

export default <Props extends Record<string, any>>(component: Component | ((props: Props) => ReactNode)) => {
	if (component instanceof Component) {
		observe(...Object.values(component.props))
		return component
	}
	
	return (props: Props) => {
		observe(...Object.values(props))
		return component(props)
	}
}
