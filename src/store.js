import { configureStore } from "@reduxjs/toolkit"
import timersReducer from "./features/timers/timersSlice"
import settingsReducer from "./features/settings/settingsSlice"
import { saveState } from "./services/localStorage"
import { throttle } from "lodash"

const store = configureStore({
	reducer: {
		timers: timersReducer,
		settings: settingsReducer,
	},
})

store.subscribe(
	// throttle to save resources
	throttle(() => {
		saveState({
			timers: store.getState().timers,
		})
	}, 1000)
)

export default store
