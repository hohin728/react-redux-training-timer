import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	darkMode: localStorage.getItem("darkMode"),
}

const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		toggleDarkMode(state) {
			state.darkMode = !state.darkMode
		},
	},
})

export default settingsSlice.reducer

export const { toggleDarkMode } = settingsSlice.actions

export const selectIsDarkMode = (state) => state.settings.darkMode
