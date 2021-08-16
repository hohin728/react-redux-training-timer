import { calcTimerRemainTime } from "./timerService"
import { cloneDeep } from "lodash"

export const loadTimersState = () => {
	try {
		const savedStateJson = localStorage.getItem("timers")

		if (savedStateJson === null) {
			return undefined
		}

		const savedState = JSON.parse(savedStateJson)
		const savedTotalLoop =
			savedState.totalLoop !== "" ? savedState.totalLoop : 1

		const savedTimers = savedState.entities

		// calculate remain time
		Object.values(savedTimers).forEach((timer) => {
			timer.remainTime = calcTimerRemainTime({
				minute: timer.minute,
				second: timer.second,
			})
		})

		return {
			ids: savedState.ids,
			entities: savedTimers,
			totalLoop: savedTotalLoop,
		}
	} catch (err) {
		return undefined
	}
}

export const loadSettingsState = () => {
	try {
		const savedStateJson = localStorage.getItem("settings")

		if (savedStateJson === null) {
			return undefined
		}

		const savedState = JSON.parse(savedStateJson)

		return savedState
	} catch (err) {
		return undefined
	}
}

export const saveState = ({ timers: timersState, settings: settingsState }) => {
	try {
		const totalLoop = timersState.loop.total ?? 1
		const ids = timersState.ids
		const newEntities = cloneDeep(timersState.entities)

		Object.values(newEntities).forEach((entity) => {
			if (entity.remainTime) {
				delete entity.remainTime
			}
		})

		const saveState = {
			ids,
			entities: newEntities,
			totalLoop,
		}

		localStorage.setItem("timers", JSON.stringify(saveState))

		localStorage.setItem("settings", JSON.stringify(settingsState))
	} catch {
		// ignore write errors
	}
}
