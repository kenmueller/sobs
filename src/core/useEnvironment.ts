export default <T, U>(component: (environment: Record<string, any>, props: T) => U) => (props: T) => component(props, props)
