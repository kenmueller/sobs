import React, { PropsWithChildren, ReactNode, Children, isValidElement, cloneElement } from 'react'

export default ({ children, ...props }: PropsWithChildren<{ object: any } | { objects: any[] }>) => {
	const asAny = props as any
	
	if (asAny.object)
		return createEnvironment([asAny.object], children)
	
	if (asAny.objects)
		return createEnvironment(asAny.objects, children)
	
	throw new Error('sobs: You must specify either "object" or "objects" in an Environment')
}

const createEnvironment = (objects: any[], children: ReactNode | undefined) => (
	<>
		{transformChildProps(children, props => ({
			...props,
			__sobs_environment: [
				...props.__sobs_environment ?? [],
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