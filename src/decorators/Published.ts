export default (target: any, key: string): void =>
	void (target[`__sobs_isPublished_${key}`] = true)
