import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { uniqueId } from "lodash"

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
		timerAdded(state, action) {
			const timer = {
				id: uniqueId(),
				minute: 0,
				second: 0,
			}
			timersAdapter.addOne(timer)
		},
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

export const { timerAdded, timerSetMinute, timerSetSecond } =
	timersSlice.actions

// export const initTimers = () => {

// }

// export const { selectById: selectTimerById } = timersAdapter.getSelectors(
// 	(state) => state.timers
// )

// for (let i = 0; i < 3; i++) {
// 	timersAdapter.addOne({
// 		id: uniqueId(),
// 		minute: 0,
// 		second: 0,
// 	})
// }
