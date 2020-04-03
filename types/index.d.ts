import { Component, ReactNode, PropsWithChildren } from 'react'

/**
 * Apply this decorator to classes that will be used with `useObservable`.
 * 
 * **Important: Arrow functions updating `@Published` fields in the class body are not allowed.**
 */
export function ObservableObject(constructor: new (...args: any[]) => any): any

/**
 * Apply this decorator to fields within an `@ObservableObject` to listen for changes.
 * 
 * **Important: If a field is not marked `@Published`, any changes to the field will not trigger component updates.**
 */
export function Published(target: any, key: string): void

/** Observe multiple `@ObservableObject`s for the current component */
export function observe(...observableObjects: any[]): void

/**
 * Automatically observe all props in a class-based component.
 * 
 * @example
 * render = () => {
 *     observeProps(this)
 *     
 *     return ...
 * }
 */
export function observeProps<T extends Component>(component: T): T

/**
 * Automatically observe all props in a function-based component.
 * 
 * @example
 * const Component = observeProps(props => ...)
 */
export function observeProps<
	Props extends Record<string, any>,
	T extends (props: Props) => ReactNode
>(component: T): T

/**
 * Create an environment for sub-components.
 * 
 * @example
 * <Environment object={currentUser}>
 *     ...
 * </Environment>
 */
export function Environment(props: PropsWithChildren<{ object: any } | { objects: any[] }>): JSX.Element

/**
 * Allow a function-based component to use its environment.
 * 
 * @example
 * const Component = useEnvironment((environment, props) => {
 *     const currentUser = fromEnvironment(environment, User)
 *     
 *     return ...
 * })
 */
export function useEnvironment<T, U>(component: (environment: Record<string, any>, props: T) => U): (props: T) => U

/**
 * Retrieve the nearest environment object with the specified type.
 * 
 * @throws If there are no environment objects with the specified type.
 * 
 * @example
 * const Component = useEnvironment((environment, props) => {
 *     const currentUser = fromEnvironment(environment, User)
 *     
 *     return ...
 * })
 * 
 * class Component extends React.Component {
 *     render = () => {
 *         const currentUser = fromEnvironment(this, User)
 *     }
 * }
 */
export function fromEnvironment<T>(environment: Record<string, any>, objectType: new (...args: any[]) => T): T

/**
 * Retrieve the nearest environment object with the specified type.
 * 
 * @throws If there are no environment objects with the specified type.
 * 
 * @example
 * class Component extends React.Component {
 *     render = () => {
 *         const currentUser = fromEnvironment(this, User)
 *         
 *         return ...
 *     }
 * }
 */
export function fromEnvironment<T>(component: Component, objectType: new (...args: any[]) => T): T

/** Creates a random UUID */
export function newId(): string
