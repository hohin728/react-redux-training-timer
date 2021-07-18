import { configureStore } from "@reduxjs/toolkit"
import timersReducer from "./features/timers/timersSlice"

const store = configureStore({
	reducer: {
		timers: timersReducer,
	},
})

export default store
