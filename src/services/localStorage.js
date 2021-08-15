import { calcTimerRemainTime } from "./timerService"
import { cloneDeep } from "lodash"

export const loadState = () => {
	try {
		const savedStateJson = localStorage.getItem("timers")

		if (savedStateJson === null) {
			return undefined
		}

		const savedState = JSON.parse(savedStateJson)
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
			totalLoop: savedState.totalLoop,
		}
	} catch (err) {
		return undefined
	}
}

export const saveState = ({ timers: timerState }) => {
	try {
		const totalLoop = timerState.loop.total
		const ids = timerState.ids
		const newEntities = cloneDeep(timerState.entities)

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
	} catch {
		// ignore write errors
	}
}
