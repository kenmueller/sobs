import { useState } from 'react'

import { newId } from '../utils'

export const useForcedUpdate = () => {
	const [, setId] = useState(newId())
	
	return () => setId(newId())
}
