import { IS_PUBLISHED_KEY } from '../keys'

export default (target: any, key: string): void =>
	void (target[IS_PUBLISHED_KEY(key)] = true)
