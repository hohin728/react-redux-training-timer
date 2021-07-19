import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectTimerById, timerSetMinute, timerSetSecond } from "./timersSlice"

const Timer = ({ id }) => {
	const [label, setLabel] = useState("timer label")

	const dispatch = useDispatch()
	const timer = useSelector((state) => selectTimerById(state, id))

	const handleMinuteChange = (e) => dispatch(timerSetMinute(id, e.target.value))
	const handleSecondChange = (e) => dispatch(timerSetSecond(id, e.target.value))

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
		</div>
	)
}

export default Timer
