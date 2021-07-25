import React, { useState, useRef } from "react"
import styles from "../../styles/Timer.module.scss"
import useInterval from "../../hooks/useInterval"
import { useSelector, useDispatch } from "react-redux"
import {
	selectTimerById,
	selectActiveTimerId,
	selectTimerStatus,
	timerSetTime,
	timerDeductTime,
	timerSetNextTimer,
} from "./timersSlice"
import TimerStatus from "./TimerStatus"
import ReactHowler from "react-howler"
import timesUpSfx from "../../audio/timesup.mp3"

const Timer = ({ id, delay }) => {
	const dispatch = useDispatch()
	const [label, setLabel] = useState("timer label")
	const alarmPlayer = useRef(null)

	const timer = useSelector((state) => selectTimerById(state, id))
	const timerStatus = useSelector(selectTimerStatus)
	const activeTimerId = useSelector(selectActiveTimerId)

	const handleTimeChange = (params) => {
		const {
			event: {
				target: { value },
			},
			timeUnit,
		} = params

		dispatch(timerSetTime(timer.id, parseInt(value), timeUnit))
	}

	useInterval(
		() => {
			if (timer.remainTime - delay >= 0) {
				dispatch(timerDeductTime({ timerId: timer.id, delay }))
			} else {
				// setAlarmPlayCount((count) => count + 1)
				alarmPlayer.current.play()
				dispatch(timerSetNextTimer())
			}
		},
		timerStatus === TimerStatus.RUNNING && activeTimerId && id === activeTimerId
			? delay
			: null
	)

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
			<div>Remain Time: {timer.remainTime}</div>
			<ReactHowler
				src={timesUpSfx}
				playing={false}
				html5={true}
				ref={alarmPlayer}
			/>
		</div>
	)
}

export default Timer
