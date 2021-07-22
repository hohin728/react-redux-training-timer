import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"

const timersAdapter = createEntityAdapter()

const initialState = timersAdapter.getInitialState()

/**
 * {
 *  id: string,
 *  label: string,
 * 	minute: number,
 * 	second: number
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
				}
				timer.remainTime = (timer.minute * 60 + timer.second) * 1000
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
	},
})

export default timersSlice.reducer

export const { timersInitialized, timerSetTime, timerDeductTime } =
	timersSlice.actions

export const { selectAll: selectTimers, selectById: selectTimerById } =
	timersAdapter.getSelectors((state) => state.timers)
