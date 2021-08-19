export type SavedTimerType = {
	id: string
	label: string
	minute: number
	second: number
	remainTime?: number
	music: string
}

type TimerType = SavedTimerType & {
	remainTime: number
}

export default TimerType
