import { createSlice } from "@reduxjs/toolkit"
import {
	defaultMinuteIfNotSaved,
	defaultSecondIfNotSaved,
} from "../../services/timerService"
import { loadSettingsState } from "../../services/localStorage"

const getInitialState = () => {
	const loadedState = loadSettingsState()

	const systemPrefersDark =
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches

	const isDarkMode =
		loadedState && loadedState.darkMode !== null
			? loadedState.darkMode === true
			: systemPrefersDark

	let state = {
		darkMode: isDarkMode,
		defaultTime: {
			minute: defaultMinuteIfNotSaved,
			second: defaultSecondIfNotSaved,
		},
	}

	if (loadedState && loadedState.darkMode !== null) {
		// darkMode
		state = { ...state, darkMode: loadedState.darkMode }
	}

	if (loadedState && loadedState.defaultTime) {
		// default minute
		if (loadedState.defaultTime.minute !== null) {
			state = {
				...state,
				defaultTime: {
					...state.defaultTime,
					minute: loadedState.defaultTime.minute,
				},
			}
		}
		if (loadedState.defaultTime.second !== null) {
			// default second
			state = {
				...state,
				defaultTime: {
					...state.defaultTime,
					second: loadedState.defaultTime.second,
				},
			}
		}
	}

	return state
}

const settingsSlice = createSlice({
	name: "settings",
	initialState: getInitialState(),
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
