import { calcTimerRemainTime } from "./timerService"
import { cloneDeep, throttle } from "lodash"
import TimerType, { SavedTimerType } from "../types/Timer"
import { Dictionary } from "@reduxjs/toolkit"

export const loadTimersState = ():
	| undefined
	| {
			ids: string[]
			entities: Dictionary<TimerType>
			totalLoop: number
	  } => {
	try {
		const savedStateJson = localStorage.getItem("timers")

		if (savedStateJson === null) {
			return undefined
		}

		const savedState = JSON.parse(savedStateJson)
		const savedTotalLoop =
			savedState.totalLoop !== "" ? savedState.totalLoop : 1

		const savedTimers = savedState.entities

		const timers: TimerType[] = Object.values(savedTimers)
		// calculate remain time
		timers.forEach((timer) => {
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

export const loadSettingsState = ():
	| undefined
	| {
			darkMode: boolean
			defaultTime: {
				minute: number
				second: number
			}
	  } => {
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

// Add 2 seconds throttle when saving state to local storage
export const saveState = throttle(
	({ timers: timersState, settings: settingsState }) => {
		try {
			if (timersState) {
				const totalLoop = timersState.loop.total ?? 1
				const ids = timersState.ids
				const newEntities = cloneDeep(timersState.entities)

				const newEntitiesItems: SavedTimerType[] = Object.values(newEntities)

				newEntitiesItems.forEach((entity) => {
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
			}

			if (settingsState) {
				localStorage.setItem("settings", JSON.stringify(settingsState))
			}
		} catch {
			// ignore write errors
		}
	},
	2000
)
