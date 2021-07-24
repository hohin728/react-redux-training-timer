import { isInteger, uniqueId } from "lodash"

export const calcTimerRemainTime = (params) => {
	const { minute, second } = params

	if (isInteger(minute) && isInteger(second)) {
		return (minute * 60 + second) * 1000
	}
	return 0
}

export const initTimers = () => {
	const timers = []
	for (let i = 0; i < 3; i++) {
		const timerId = uniqueId()
		const timer = {
			id: timerId,
			minute: 0,
			second: 3,
			remainTime: 0,
		}
		timer.remainTime = calcTimerRemainTime({
			minute: timer.minute,
			second: timer.second,
		})
		timers.push(timer)
	}
	return timers
}
