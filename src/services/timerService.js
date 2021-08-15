import { isInteger, uniqueId } from "lodash"

const defaultTimerMinute = 0
const defaultTimerSecond = 3

export const calcTimerRemainTime = (params) => {
	const { minute, second } = params

	if (isInteger(minute) && isInteger(second)) {
		return (minute * 60 + second) * 1000
	}
	return 0
}

export const createTimer = (params) => {
	const id = params && params.timerId ? params.timerId : uniqueId()
	const timer = {
		id: id,
		label: params && params.label ? params.label : "timer label " + id,
		minute: params && params.minute ? params.minute : defaultTimerMinute,
		second: params && params.second ? params.second : defaultTimerSecond,
		remainTime: 0,
		music:
			params && params.music ? params.music : "Muay_Thai_Sarama_ROUND_1.mp3",
	}
	timer.remainTime = calcTimerRemainTime({
		minute: timer.minute,
		second: timer.second,
	})

	return timer
}

export const initTimers = () => {
	const timers = []
	for (let i = 0; i < 3; i++) {
		const timer = createTimer()
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

export const getInvalidTimeInputMessage = ({ value, timeUnit }) => {
	if (timeUnit !== "minute" && timeUnit !== "second") {
		// console.log("Time unit must be either 'minute' or 'second'")
		return "Time unit must be either 'minute' or 'second'"
	}
	if (!Number.isInteger(parseInt(value))) {
		// console.log("Time value must be an integer")
		return "Time value must be an integer"
	}
	if (parseInt(value) < 0 || parseInt(value) > 59) {
		// console.log("Time value must be between 0 and 59")
		return "Time value must be between 0 and 59"
	}
	return ""
}

export const isValidTimeInput = ({ value, timeUnit }) => {
	return getInvalidTimeInputMessage({ value, timeUnit }) === ""
}
