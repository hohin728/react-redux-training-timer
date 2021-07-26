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
			label: "timer label " + timerId,
			minute: 0,
			second: 3,
			remainTime: 0,
			music: "",
		}
		timer.remainTime = calcTimerRemainTime({
			minute: timer.minute,
			second: timer.second,
		})
		timers.push(timer)
	}
	return timers
}

export const convertTimeFormatForDisplay = (convertMillisec) => {
	if (!isInteger(convertMillisec) || convertMillisec <= 0) {
		return {
			millisec: 0,
			second: 0,
			minute: 0,
		}
	}

	const millisec = (convertMillisec % 1000) / 10
	const second = Math.floor(convertMillisec / 1000) % 60
	const minute = Math.floor(convertMillisec / 1000 / 60) % 60

	return {
		millisec,
		second,
		minute,
	}
}
