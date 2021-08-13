import { createSlice } from "@reduxjs/toolkit"

const initDarkMode = () => {
	const savedPreference = localStorage.getItem("darkMode")

	if (savedPreference !== null) {
		return savedPreference === "true"
	}

	const systemPreference =
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches

	return systemPreference
}

const initialState = {
	darkMode: initDarkMode(),
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
