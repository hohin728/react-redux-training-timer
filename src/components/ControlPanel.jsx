import React, { useEffect } from "react"
import styles from "../styles/ControlPanel.module.scss"
import { useSelector, useDispatch } from "react-redux"
import {
	timerStatusUpdated,
	selectTimerDelay,
	timerDelayUpdated,
	selectActiveTimerId,
	timerSetNextTimer,
	selectTimerIsRunning,
	timerResetTimers,
} from "../features/timers/timersSlice"

const ControlPanel = () => {
	const dispatch = useDispatch()

	const delay = useSelector(selectTimerDelay)
	const isRunning = useSelector(selectTimerIsRunning)
	const activeTimerId = useSelector(selectActiveTimerId)

	useEffect(() => {
		if (activeTimerId) {
			dispatch(timerStatusUpdated({ isRunning: true }))
		}
	}, [activeTimerId])

	const handleStart = () => {
		if (!activeTimerId) {
			dispatch(timerSetNextTimer())
		}
		dispatch(timerStatusUpdated({ isRunning: !isRunning }))
	}

	const handleDelayChange = (e) => {
		dispatch(timerDelayUpdated({ delay: e.target.value }))
	}

	const handleReset = () => dispatch(timerResetTimers())

	return (
		<div className={styles.controlPanel}>
			<div className={styles.buttonsSection}>
				<button className={styles.controlButton} onClick={handleStart}>
					{isRunning ? "Pause" : "Start"}
				</button>
				<button className={styles.controlButton} onClick={handleReset}>
					Reset
				</button>
			</div>
			<div className={styles.updateFreqContainer}>
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
