export type SavedTimerType = TimerInputType & {
	id: string
	label: string
	remainTime?: number
	music: string
}

export type TimerInputType = {
	minute: number | ""
	second: number | ""
}

type TimerType = SavedTimerType & {
	remainTime: number
}

export default TimerType
