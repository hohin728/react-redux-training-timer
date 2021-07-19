import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectTimerById } from "../features/timers/timersSlice"

const ControlPanel = () => {
	const timer = useSelector((state) => selectTimerById(state, 1))

	const startTimer = () => {
		console.log(timer)
		setInterval()
	}

	return (
		<div className="control-panel">
			<button onClick={startTimer}>Start</button>
		</div>
	)
}

export default ControlPanel
