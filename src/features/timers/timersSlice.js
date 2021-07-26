import {
	createEntityAdapter,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit"
import { calcTimerRemainTime } from "../../services/timerService"
import TimerStatus from "./TimerStatus"
import { isInteger } from "lodash"

const timersAdapter = createEntityAdapter()

const initialState = timersAdapter.getInitialState({
	showCountdown: false,
	delay: 10,
	activeTimerId: null,
	status: TimerStatus.STOPPED,
	loop: {
		current: 1,
		total: 1,
	},
})

/**
 * {
 *  id: string,
 * 	label: string,
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
			const { current, total } = action.payload

			if (current && isInteger(current)) {
				state.loop.current = current
			}
			if (total && isInteger(total)) {
				state.loop.total = total
			}
		},
	},
})

export default timersSlice.reducer

export const {
	timersInitialized,
	timerSetLabel,
	timerSetTime,
	timerDeductTime,
	timerStatusUpdated,
	timerSetNextTimer,
	timerDelayUpdated,
	timerResetTimers,
	timerResetRemainTime,
	timerSetShowCountdown,
	timerSetLoop,
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
