import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectTimerById, timerSetTime, timerDeductTime } from "./timersSlice"
import useInterval from "../../hooks/useInterval"

const Timer = ({ id }) => {
	const [label, setLabel] = useState("timer label")
	const [delay, setDelay] = useState(10)
	const [isRunning, setIsRunning] = useState(false)

	const dispatch = useDispatch()
	const timer = useSelector((state) => selectTimerById(state, id))

	const handleTimeChange = (params) => {
		const {
			event: {
				target: { value },
			},
			timeUnit,
		} = params
		dispatch(timerSetTime(timer.id, value, timeUnit))
	}

	const handleDelayChange = (e) => setDelay(e.target.value)

	useInterval(
		() => {
			if (timer.remainTime - delay >= 0) {
				dispatch(timerDeductTime({ timerId: timer.id, delay }))
			} else {
				setIsRunning(false)
			}
		},
		isRunning ? delay : null
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
					id={`timer-${id}-min`}
					onChange={(e) => handleTimeChange({ event: e, timeUnit: "minute" })}
					value={timer.minute}
				/>
				<input
					type="number"
					min="0"
					max="59"
					id={`timer-${id}-sec`}
					onChange={(e) => handleTimeChange({ event: e, timeUnit: "second" })}
					value={timer.second}
				/>
			</div>
			<div>Remain Time: {timer.remainTime}</div>
			<div>
				<label htmlFor="updateFreq">Update Frequency(millisecond): </label>
				<input
					type="number"
					id="updateFreq"
					value={delay}
					onChange={(e) => handleDelayChange(e)}
				/>
			</div>
			<button onClick={startOrPlayTimer}>{isRunning ? "Pause" : "Play"}</button>
		</div>
	)
}

export default Timer
