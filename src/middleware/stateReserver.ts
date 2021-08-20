import { Middleware } from "redux"
import { RootStateOrAny } from "react-redux"

import {
	timerAdded,
	timerDeleted,
	timerSetLabel,
	timerSetTime,
	timerSetMusic,
	timerDelayUpdated,
	timerSetTotalLoop,
} from "../features/timers/timersSlice"
import {
	toggleDarkMode,
	setDefaultTime,
} from "../features/settings/settingsSlice"

import { saveState } from "../services/localStorage"

const timersActionsToReserve = [
	timerAdded,
	timerDeleted,
	timerSetLabel,
	timerSetTime,
	timerSetMusic,
	timerDelayUpdated,
	timerSetTotalLoop,
].map((action) => action.type)

const settingsActionsToReserve = [toggleDarkMode, setDefaultTime].map(
	(action) => action.type
)

const reserver: Middleware<{}, RootStateOrAny> =
	(store) => (next) => (action) => {
		const currentAction = action.type

		let result = next(action)

		if (timersActionsToReserve.includes(currentAction)) {
			saveState({
				timers: store.getState().timers,
			})
		} else if (settingsActionsToReserve.includes(currentAction)) {
			saveState({
				settings: store.getState().settings,
			})
		}

		return result
	}

export default reserver
