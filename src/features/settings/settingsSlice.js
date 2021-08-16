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
	defaultTime: {
		minute: 1,
		second: 30,
	},
}

const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		toggleDarkMode(state) {
			state.darkMode = !state.darkMode
		},
		setDefaultTime(state, action) {
			const { value, timeUnit } = action.payload

			if (timeUnit === "minute" || timeUnit === "second") {
				state.defaultTime[timeUnit] = Number.isInteger(parseInt(value))
					? parseInt(value)
					: ""
			}
		},
	},
})

export default settingsSlice.reducer

export const { toggleDarkMode, setDefaultTime } = settingsSlice.actions

export const selectIsDarkMode = (state) => state.settings.darkMode

export const selectDefaultMinute = (state) => state.settings.defaultTime.minute
export const selectDefaultSecond = (state) => state.settings.defaultTime.second
