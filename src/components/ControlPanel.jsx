import React, { useState, useEffect, useRef } from "react"
import styles from "../styles/ControlPanel.module.scss"
import { useSelector, useDispatch } from "react-redux"
import {
	timerStatusUpdated,
	selectTimerDelay,
	timerDelayUpdated,
	selectActiveTimerId,
	timerSetNextTimer,
	selectTimerStatus,
	timerResetTimers,
} from "../features/timers/timersSlice"
import TimerStatus from "../features/timers/TimerStatus"
import muayThaiBgMusic from "../audio/Muay_Thai_Sarama_ROUND_1.mp3"
import ReactHowler from "react-howler"

const ControlPanel = () => {
	const dispatch = useDispatch()
	const [isMuted, setIsMuted] = useState(false)
	const musicPlayer = useRef(null)

	const delay = useSelector(selectTimerDelay)
	const timerStatus = useSelector(selectTimerStatus)
	const activeTimerId = useSelector(selectActiveTimerId)

	useEffect(() => {
		if (activeTimerId) {
			// play the music again once timer is changed
			musicPlayer.current.seek(0)
			dispatch(timerStatusUpdated({ status: TimerStatus.RUNNING }))
		}
	}, [activeTimerId, dispatch])

	useEffect(() => {
		// reset timers if status changed to STOPPED
		if (timerStatus === TimerStatus.STOPPED) {
			dispatch(timerResetTimers())
		}
	}, [timerStatus, dispatch])

	const handleStart = () => {
		if (!activeTimerId) {
			dispatch(timerSetNextTimer())
		}
		const newStatus =
			timerStatus === TimerStatus.RUNNING
				? TimerStatus.PAUSED
				: TimerStatus.RUNNING
		dispatch(
			timerStatusUpdated({
				status: newStatus,
			})
		)
	}

	const handleDelayChange = (e) =>
		dispatch(timerDelayUpdated({ delay: e.target.value }))

	const handleReset = () => dispatch(timerResetTimers())

	const handleToggleEnableBgMusic = () => setIsMuted((muted) => !muted)

	return (
		<div className={styles.controlPanel}>
			<div className={styles.buttonsSection}>
				<button className={styles.controlButton} onClick={handleStart}>
					{timerStatus === TimerStatus.RUNNING ? "Pause" : "Start"}
				</button>
				<button className={styles.controlButton} onClick={handleReset}>
					Reset
				</button>
			</div>
			<div>
				<button onClick={handleToggleEnableBgMusic}>
					{isMuted ? "Unmute" : "Mute"}
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
			<ReactHowler
				src={muayThaiBgMusic}
				playing={timerStatus === TimerStatus.RUNNING}
				mute={isMuted}
				ref={musicPlayer}
				loop={true}
				html5={true}
			/>
		</div>
	)
}

export default ControlPanel
