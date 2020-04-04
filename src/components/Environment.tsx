import React, { PropsWithChildren, ReactNode, Children, isValidElement, cloneElement } from 'react'

import { ENVIRONMENT_KEY } from '../keys'

export default ({ children, ...props }: PropsWithChildren<any>) => {
	if (props.object !== undefined)
		return createEnvironment([props.object], children)
	
	if (props.objects !== undefined)
		return createEnvironment(props.objects, children)
	
	throw new Error('sobs: You must specify either "object" or "objects" in an Environment')
}

const createEnvironment = (objects: any[], children: ReactNode | undefined) => (
	<>
		{transformChildProps(children, props => ({
			...props,
			[ENVIRONMENT_KEY]: [
				...props[ENVIRONMENT_KEY] ?? [],
				...objects
			]
		}))}
	</>
)

const transformChildProps = (
	children: React.ReactNode,
	transform: (props: Record<string, any>) => Record<string, any>
) =>
	Children.map(children, child => {
		if (!(isValidElement(child) && child.props))
			return child
		
		const props = transform(child.props)
		
		props.children = transformChildProps(child.props.children, transform)
		
		return cloneElement(child, props)
	})
