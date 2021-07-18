import React, { useState } from "react"
import { useSelector } from "react-redux"
import { timerSetMinute } from "./timersSlice"

const Timer = ({ id }) => {
	const [label, setLabel] = useState("")

	return (
		<div className="timer">
			<div className="label">{label}</div>
			<input type="text" onChange={(e) => setLabel(e.target.value)} />
			<div className="timer__display">
				<div className="minute">[minute placeholder]</div>
				<div className="seconds">[second placeholder]</div>
			</div>
			<div className="timer__input">
				<input
					type="number"
					min="0"
					max="59"
					id={`timer-${id}-sec`}
					onChange={(e) => timerSetMinute(e.target.value)}
				/>
				<input type="number" min="0" max="59" id={`timer-${id}-min`} />
			</div>
		</div>
	)
}

export default Timer
