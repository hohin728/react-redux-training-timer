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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
