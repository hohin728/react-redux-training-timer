import { isInteger } from "lodash"
import { v4 as uuidv4 } from "uuid"
import TimerType, { TimerInputType, SavingTimeType } from "../types/Timer"

// default time when user's preference is not found
export const defaultMinuteIfNotSaved = 1
export const defaultSecondIfNotSaved = 30

export const calcTimerRemainTime = (params: TimerInputType): number => {
	const { minute, second } = params

	if (
		isInteger(minute) &&
		isInteger(second) &&
		minute !== "" &&
		second !== ""
	) {
		return (minute * 60 + second) * 1000
	}
	return 0
}

export const createTimer = (params?: SavingTimeType): TimerType => {
	const id = params && params.id ? params.id : uuidv4()
	const timer: TimerType = {
		id: id,
		label: params && params.label ? params.label : "",
		minute:
			params !== undefined && params.minute !== undefined
				? params.minute
				: defaultMinuteIfNotSaved,
		second:
			params !== undefined && params.second !== undefined
				? params.second
				: defaultSecondIfNotSaved,
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

export const convertTimeFormatForDisplay = (
	convertMillisec: number
): {
	millisec: number
	second: number
	minute: number
} => {
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

export const getInvalidTimeInputMessage = ({
	value,
}: {
	value: number
}): string => {
	if (value < 0 || value > 59) {
		// console.log("Time value must be between 0 and 59")
		return "Time value must be between 0 and 59"
	}
	return ""
}

export const isValidTimeInput = ({ value }: { value: number }): boolean =>
	getInvalidTimeInputMessage({ value }) === ""
