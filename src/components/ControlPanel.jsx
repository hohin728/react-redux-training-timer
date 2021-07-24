import React, { useEffect } from "react"
import styles from "../styles/ControlPanel.module.scss"
import { useSelector, useDispatch } from "react-redux"
import {
	timerStatusUpdated,
	selectTimerDelay,
	timerDelayUpdated,
	selectActiveTimerId,
	timerSetNextTimer,
} from "../features/timers/timersSlice"

const ControlPanel = () => {
	const dispatch = useDispatch()

	const delay = useSelector(selectTimerDelay)
	const activeTimerId = useSelector(selectActiveTimerId)

	useEffect(() => {
		if (activeTimerId) {
			dispatch(timerStatusUpdated({ timerId: activeTimerId, isRunning: true }))
		}
	}, [activeTimerId])

	const handleStart = () => {
		// once the start button is clicked, get the next timer
		dispatch(timerSetNextTimer())
	}

	const handleDelayChange = (e) => {
		dispatch(timerDelayUpdated({ delay: e.target.value }))
	}

	return (
		<div className={styles.controlPanel}>
			<div className={styles.buttonsSection}>
				<button className={styles.controlButton} onClick={handleStart}>
					Start
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
