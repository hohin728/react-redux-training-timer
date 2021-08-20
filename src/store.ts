import { configureStore } from "@reduxjs/toolkit"
import timersReducer from "./features/timers/timersSlice"
import settingsReducer from "./features/settings/settingsSlice"
import reserver from "./middleware/stateReserver"

const store = configureStore({
	reducer: {
		timers: timersReducer,
		settings: settingsReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reserver),
})

export default store
