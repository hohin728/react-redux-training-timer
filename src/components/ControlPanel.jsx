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
import useSound from "use-sound"
import muayThaiBgMusic from "../audio/Muay_Thai_Sarama_ROUND_1.mp3"
import { useState } from "react"

const ControlPanel = () => {
	const dispatch = useDispatch()
	const [enableBgMusic, setEnableBgMusic] = useState(true)
	const [play, { stop, pause }] = useSound(muayThaiBgMusic, {
		soundEnabled: enableBgMusic,
	})

	const delay = useSelector(selectTimerDelay)
	const isRunning = useSelector(selectTimerIsRunning)
	const activeTimerId = useSelector(selectActiveTimerId)

	useEffect(() => {
		if (activeTimerId) {
			stop()
			play()
			dispatch(timerStatusUpdated({ isRunning: true }))
		}
	}, [activeTimerId])

	useEffect(() => {
		isRunning ? play() : pause()
	}, [isRunning, play, pause])

	const handleStart = () => {
		if (!activeTimerId) {
			dispatch(timerSetNextTimer())
		}
		dispatch(timerStatusUpdated({ isRunning: !isRunning }))
	}

	const handleDelayChange = (e) => {
		dispatch(timerDelayUpdated({ delay: e.target.value }))
	}

	const handleReset = () => {
		dispatch(timerResetTimers())
		stop()
	}

	const handleEnableBgMusicChange = (e) => setEnableBgMusic(e.target.checked)

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
			<div>
				<label htmlFor="enableBgMusic">Enable background music: </label>
				<input
					type="checkbox"
					checked={enableBgMusic}
					onChange={(e) => handleEnableBgMusicChange(e)}
				/>
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
