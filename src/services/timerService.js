import { uniqueId } from "lodash"

export const initTimers = () => {
	const timers = []
	for (let i = 0; i < 3; i++) {
		const timerId = uniqueId()
		timers.push({
			id: timerId,
			minute: 0,
			second: 0,
		})
	}
	return timers
}
