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

/**
 * Observe multiple `@ObservableObject`s for the current component
 */
export function observe(...observableObjects: any[]): void

/**
 * Creates a random UUID
 */
export function newId(): string
