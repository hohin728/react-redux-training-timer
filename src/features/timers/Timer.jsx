import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
	selectTimerById,
	timerSetMinute,
	timerSetSecond,
	timerDeductTime,
} from "./timersSlice"
import useInterval from "../../hooks/useInterval"

const Timer = ({ id }) => {
	const [label, setLabel] = useState("timer label")
	const [isRunning, setIsRunning] = useState(false)

	const dispatch = useDispatch()
	const timer = useSelector((state) => selectTimerById(state, id))

	const handleMinuteChange = (e) => dispatch(timerSetMinute(id, e.target.value))
	const handleSecondChange = (e) => dispatch(timerSetSecond(id, e.target.value))

	useInterval(
		() => {
			console.log(timer.remainTime)
			if (timer.remainTime - 1000 >= 0) {
				dispatch(timerDeductTime({ timerId: timer.id }))
			} else {
				setIsRunning(false)
			}
		},
		isRunning ? 1000 : null
	)

	const startOrPlayTimer = () => setIsRunning((isRunning) => !isRunning)

	return (
		<div className="timer">
			<input
				type="text"
				onChange={(e) => setLabel(e.target.value)}
				value={label ?? ""}
			/>
			<div className="timer__display">
				<div className="minute">{timer.minute}</div>
				<div className="separator">:</div>
				<div className="seconds">{timer.second}</div>
			</div>
			<div className="timer__input">
				<input
					type="number"
					min="0"
					max="59"
					id={`timer-${id}-sec`}
					onChange={(e) => handleMinuteChange(e)}
					value={timer.minute}
				/>
				<input
					type="number"
					min="0"
					max="59"
					id={`timer-${id}-min`}
					onChange={(e) => handleSecondChange(e)}
					value={timer.second}
				/>
			</div>
			<div>Remain Time: {timer.remainTime}</div>
			<button onClick={startOrPlayTimer}>{isRunning ? "Pause" : "Play"}</button>
		</div>
	)
}

export default Timer
