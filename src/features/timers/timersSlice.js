import {
	createEntityAdapter,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit"
import {
	calcTimerRemainTime,
	isValidTimeInput,
} from "../../services/timerService"
import TimerStatus from "./TimerStatus"
import { isInteger } from "lodash"

const timersAdapter = createEntityAdapter()

const initialState = timersAdapter.getInitialState({
	showCountdown: false,
	delay: 1000,
	activeTimerId: null,
	activeTimerMusic: "",
	status: TimerStatus.STOPPED,
	loop: {
		current: 1,
		total: 1,
	},
	mute: {
		alarm: false,
		music: false,
	},
})

/**
 * {
 *  id: string,
 * 	label: string,
 * 	minute: number,
 * 	second: number,
 *  remainTime: number,
 * 	music: string,
 * }
 */

const timersSlice = createSlice({
	name: "timers",
	initialState,
	reducers: {
		timersInitialized: timersAdapter.addMany,
		timerAdded: timersAdapter.addOne,
		timerDeleted: timersAdapter.removeOne,
		timerSetLabel(state, action) {
			const { timerId, label } = action.payload
			const timer = state.entities[timerId]

			timer.label = label
		},
		timerSetTime: {
			reducer(state, action) {
				const { timerId, value, timeUnit } = action.payload
				const timer = state.entities[timerId]

				if (timeUnit === "minute" || timeUnit === "second") {
					timer[timeUnit] = Number.isInteger(parseInt(value))
						? parseInt(value)
						: ""

					timer.remainTime = isValidTimeInput({ value, timeUnit })
						? (timer.minute * 60 + timer.second) * 1000
						: 0
				}
			},
			prepare(timerId, value, timeUnit) {
				return {
					payload: { timerId, value, timeUnit },
				}
			},
		},
		timerSetMusic(state, action) {
			const { timerId, music } = action.payload
			const timer = state.entities[timerId]

			timer.music = music
		},
		timerDeductTime: {
			reducer(state, action) {
				const { timerId, delay } = action.payload
				const timer = state.entities[timerId]

				timer.remainTime -= delay
			},
			prepare({ timerId, delay }) {
				if (!delay) {
					delay = 1000
				}
				return { payload: { timerId, delay } }
			},
		},
		timerStatusUpdated(state, action) {
			const { status } = action.payload
			state.status = status
		},
		timerSetNextTimer(state) {
			const timers = Object.values(state.entities)
			for (const [index, timer] of timers.entries()) {
				if (timer.remainTime > 0) {
					state.activeTimerId = timer.id
					state.activeTimerMusic = timer.music
					break
				}
				// reset if the last timer is over
				if (index === timers.length - 1) {
					state.status = TimerStatus.STOPPED
				}
			}
		},
		timerDelayUpdated(state, action) {
			const { delay } = action.payload
			state.delay = delay
		},
		timerResetTimers(state) {
			state.activeTimerId = null
			state.activeTimerMusic = ""
			state.status = TimerStatus.STOPPED
			Object.values(state.entities).forEach((timer) => {
				timer.remainTime = calcTimerRemainTime({
					minute: timer.minute,
					second: timer.second,
				})
			})
			state.loop.current = 1
		},
		timerResetRemainTime(state) {
			Object.values(state.entities).forEach((timer) => {
				timer.remainTime = calcTimerRemainTime({
					minute: timer.minute,
					second: timer.second,
				})
			})
		},
		timerSetShowCountdown(state, action) {
			const { showCountdown } = action.payload
			state.showCountdown = showCountdown
		},
		timerSetLoop(state, action) {
			const current = action && action.payload ? action.payload.current : null
			const total = action && action.payload ? action.payload.total : null

			if (current && isInteger(current)) {
				state.loop.current = current
			}

			state.loop.total = Number.isInteger(parseInt(total))
				? parseInt(total)
				: ""
		},
		timerToggledMute(state, action) {
			const { muteType } = action.payload

			if (muteType === "alarm") {
				state.mute.alarm = !state.mute.alarm
			}
			if (muteType === "music") {
				state.mute.music = !state.mute.music
			}
		},
	},
})

export default timersSlice.reducer

export const {
	timersInitialized,
	timerAdded,
	timerDeleted,
	timerSetLabel,
	timerSetTime,
	timerSetMusic,
	timerDeductTime,
	timerStatusUpdated,
	timerSetNextTimer,
	timerDelayUpdated,
	timerResetTimers,
	timerResetRemainTime,
	timerSetShowCountdown,
	timerSetLoop,
	timerToggledMute,
} = timersSlice.actions

export const {
	selectAll: selectTimers,
	selectById: selectTimerById,
	selectTotal,
} = timersAdapter.getSelectors((state) => state.timers)

export const selectShowCountdown = (state) => state.timers.showCountdown

export const selectTimerDelay = (state) => state.timers.delay

export const selectActiveTimerId = (state) => state.timers.activeTimerId

export const selectTimerStatus = (state) => state.timers.status

export const selectLastTimerId = createSelector(
	selectTimers,
	selectTotal,
	(timers, total) => {
		const lastTimer = Object.values(timers)[total - 1]
		return lastTimer.id
	}
)

export const selectTimerLoopCurrentCount = (state) => state.timers.loop.current

export const selectTimerLoopTotalCount = (state) => state.timers.loop.total

export const selectTimerIsMuted = (state) => state.timers.mute.music

export const selectActiveTimerMusic = (state) => state.timers.activeTimerMusic
