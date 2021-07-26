import React from "react"
import styles from "../../styles/Timer.module.scss"
import { useSelector, useDispatch } from "react-redux"
import {
	selectTimerById,
	timerSetTime,
	timerSetLabel,
	timerSetMusic,
} from "./timersSlice"

const Timer = ({ id }) => {
	const dispatch = useDispatch()
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

	const handleLabelChange = (e) =>
		dispatch(timerSetLabel({ timerId: timer.id, label: e.target.value }))

	const handleMusicChange = (e) =>
		dispatch(timerSetMusic({ timerId: timer.id, music: e.target.value }))

	return (
		<div className={styles.timerContainer}>
			<input
				type="text"
				onChange={(e) => handleLabelChange(e)}
				value={timer.label ?? ""}
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
			<div style={{ marginTop: "20px" }}>
				<label htmlFor={`timer-music-${timer.id}`}>Timer Music: </label>
				<select
					name="music"
					id={`timer-music-${timer.id}`}
					onChange={handleMusicChange}
				>
					<option value="">No</option>
					<option value="Muay_Thai_Sarama_ROUND_1.mp3">
						Muay Thai Boxing Music
					</option>
				</select>
			</div>
		</div>
	)
}

export default Timer
