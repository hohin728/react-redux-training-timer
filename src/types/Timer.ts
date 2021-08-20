import { Dictionary, EntityId } from "@reduxjs/toolkit"
import TimerStatus from "../features/timers/TimerStatus"

export type TimersStateType = {
	ids: EntityId[]
	entities: Dictionary<TimerType>
	showCountdown: boolean
	delay: number
	activeTimerId: string | null
	activeTimerMusic: string
	status: TimerStatus
	loop: {
		current: number
		total: number | ""
	}
	mute: {
		alarm: boolean
		music: boolean
	}
}

export type SavedTimerType = TimerInputType & {
	id: string
	label: string
	remainTime?: number
	music: string
}

export type SavingTimeType = {
	id?: string
	label?: string
	music?: string
	minute?: number | ""
	second?: number | ""
}

export type TimerInputType = {
	minute: number | ""
	second: number | ""
}

type TimerType = SavedTimerType & {
	remainTime: number
}

export default TimerType
