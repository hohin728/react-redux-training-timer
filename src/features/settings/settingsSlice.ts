import { createSlice } from "@reduxjs/toolkit"
import {
	defaultMinuteIfNotSaved,
	defaultSecondIfNotSaved,
} from "../../services/timerService"
import { loadSettingsState } from "../../services/localStorage"

import { RootState } from "../../types/redux"
import { PayloadAction } from "@reduxjs/toolkit"
import SettingsStateType from "../../types/Settings"

const getInitialState = (): SettingsStateType => {
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
		setDefaultTime(
			state,
			action: PayloadAction<{ value: number; timeUnit: "minute" | "second" }>
		) {
			const { value, timeUnit } = action.payload

			state.defaultTime[timeUnit] = Number.isInteger(value) ? value : ""
		},
	},
})

export default settingsSlice.reducer

export const { toggleDarkMode, setDefaultTime } = settingsSlice.actions

export const selectIsDarkMode = (state: RootState) => state.settings.darkMode

export const selectDefaultMinute = (state: RootState) =>
	state.settings.defaultTime.minute
export const selectDefaultSecond = (state: RootState) =>
	state.settings.defaultTime.second
