import { uniqueId } from "lodash"

export const initTimers = () => {
	const timers = []
	for (let i = 0; i < 3; i++) {
		const timerId = uniqueId()
		const timer = {
			id: timerId,
			minute: 0,
			second: 10,
			remainTime: 0,
		}
		timer.remainTime = (timer.second + timer.minute * 60) * 1000
		timers.push(timer)
	}
	return timers
}
