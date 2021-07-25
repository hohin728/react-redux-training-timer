import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { calcTimerRemainTime } from "../../services/timerService"
import TimerStatus from "./TimerStatus"

const timersAdapter = createEntityAdapter()

const initialState = timersAdapter.getInitialState({
	delay: 10,
	activeTimerId: null,
	status: TimerStatus.STOPPED,
})

/**
 * {
 *  id: string,
 * 	minute: number,
 * 	second: number,
 *  remainTime: number,
 * }
 */

const timersSlice = createSlice({
	name: "timers",
	initialState,
	reducers: {
		timersInitialized: timersAdapter.addMany,
		timerSetTime: {
			reducer(state, action) {
				const { timerId, value, timeUnit } = action.payload
				const timer = state.entities[timerId]

				if (timeUnit === "minute" || timeUnit === "second") {
					timer[timeUnit] = value
					timer.remainTime = (timer.minute * 60 + timer.second) * 1000
				}
			},
			prepare(timerId, value, timeUnit) {
				return {
					payload: { timerId, value, timeUnit },
				}
			},
		},
		timerDeductTime: {
			reducer(state, action) {
				const { timerId, delay } = action.payload
				const timer = state.entities[timerId]
				if (timer.remainTime - delay >= 0) {
					timer.remainTime -= delay
				}
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
			state.status = TimerStatus.STOPPED
			Object.values(state.entities).forEach((timer) => {
				timer.remainTime = calcTimerRemainTime({
					minute: timer.minute,
					second: timer.second,
				})
			})
		},
	},
})

export default timersSlice.reducer

export const {
	timersInitialized,
	timerSetTime,
	timerDeductTime,
	timerStatusUpdated,
	timerSetNextTimer,
	timerDelayUpdated,
	timerResetTimers,
} = timersSlice.actions

export const { selectAll: selectTimers, selectById: selectTimerById } =
	timersAdapter.getSelectors((state) => state.timers)

export const selectTimerDelay = (state) => state.timers.delay

export const selectActiveTimerId = (state) => state.timers.activeTimerId

export const selectTimerStatus = (state) => state.timers.status
