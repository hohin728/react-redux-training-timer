import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {
	selectTimerById,
	timerStatusUpdated,
	selectTimerDelay,
	timerDelayUpdated,
} from "../features/timers/timersSlice"

const ControlPanel = () => {
	const dispatch = useDispatch()

	const delay = useSelector((state) => selectTimerDelay(state))
	const timer = useSelector((state) => selectTimerById(state, "1"))

	const handleStart = () => {
		if (timer.remainTime > 0) {
			dispatch(timerStatusUpdated({ timerId: timer.id, isRunning: true }))
		} else {
			console.log("The timer is over")
		}
	}

	const handleDelayChange = (e) => {
		dispatch(timerDelayUpdated({ delay: e.target.value }))
	}

	return (
		<div className="control-panel">
			<button onClick={handleStart}>Start</button>
			<div>
				<label htmlFor="updateFreq">Update Frequency(millisecond): </label>
				<input
					type="number"
					id="updateFreq"
					value={delay ?? 0}
					onChange={(e) => handleDelayChange(e)}
				/>
			</div>
		</div>
	)
}

export default ControlPanel
