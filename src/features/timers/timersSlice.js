import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"

const timersAdapter = createEntityAdapter()

const initialState = timersAdapter.getInitialState()

/**
 * {
 *  id: string,
 *  label: string,
 *  minute: number,
 *  second: number,
 *  remainTime: number,
 *  timerProcessId: number,
 * }
 */

const timersSlice = createSlice({
	name: "timers",
	initialState,
	reducers: {
		timersInitialized: timersAdapter.addMany,
		timerSetMinute: {
			reducer(state, action) {
				const { timerId, minute } = action.payload
				const timer = state.entities[timerId]
				timer.minute = minute
			},
			prepare(timerId, minute) {
				return {
					payload: { timerId, minute },
				}
			},
		},
		timerSetSecond: {
			reducer(state, action) {
				const { timerId, second } = action.payload
				const timer = state.entities[timerId]
				timer.second = second
			},
			prepare(timerId, second) {
				return {
					payload: { timerId, second },
				}
			},
		},
	},
})

export default timersSlice.reducer

export const { timersInitialized, timerSetMinute, timerSetSecond } =
	timersSlice.actions

export const { selectAll: selectTimers, selectById: selectTimerById } =
	timersAdapter.getSelectors((state) => state.timers)
