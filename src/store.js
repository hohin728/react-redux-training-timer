import { configureStore } from "@reduxjs/toolkit"
import timersReducer from "./features/timers/timersSlice"
import settingsReducer from "./features/settings/settingsSlice"

const store = configureStore({
	reducer: {
		timers: timersReducer,
		settings: settingsReducer,
	},
})

export default store
