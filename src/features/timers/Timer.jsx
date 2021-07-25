import React, { useState } from "react"
import styles from "../../styles/Timer.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { selectTimerById, timerSetTime } from "./timersSlice"

const Timer = ({ id }) => {
	const dispatch = useDispatch()
	const [label, setLabel] = useState("timer label")
	const timer = useSelector((state) => selectTimerById(state, id))

	const handleTimeChange = (params) => {
		const {
			event: {
				target: { value },
			},
			timeUnit,
		} = params

		dispatch(timerSetTime(timer.id, parseInt(value), timeUnit))
	}

	return (
		<div className={styles.timerContainer}>
			<input
				type="text"
				onChange={(e) => setLabel(e.target.value)}
				value={label ?? ""}
			/>
			<div className={styles.display}>
				<div className={styles.displayValue}>{timer.minute}</div>
				<div className={styles.separator}>:</div>
				<div className={styles.displayValue}>{timer.second}</div>
			</div>
			<div className={styles.inputContainer}>
				<input
					className={styles.input}
					type="number"
					min="0"
					max="59"
					id={`timer-${id}-min`}
					onChange={(e) => handleTimeChange({ event: e, timeUnit: "minute" })}
					value={timer.minute}
				/>
				<input
					className={styles.input}
					type="number"
					min="0"
					max="59"
					id={`timer-${id}-sec`}
					onChange={(e) => handleTimeChange({ event: e, timeUnit: "second" })}
					value={timer.second}
				/>
			</div>
		</div>
	)
}

export default Timer
