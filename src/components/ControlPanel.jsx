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
	timerSetShowCountdown,
	selectTimerLoopTotalCount,
	timerSetLoop,
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
	const loopTotal = useSelector(selectTimerLoopTotalCount)

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
			musicPlayer.current.seek(0)
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
		dispatch(timerSetShowCountdown({ showCountdown: true }))
	}

	const handleDelayChange = (e) =>
		dispatch(timerDelayUpdated({ delay: e.target.value }))

	const handleReset = () => {
		dispatch(timerSetShowCountdown({ showCountdown: false }))
		dispatch(timerResetTimers())
	}

	const handleToggleEnableBgMusic = () => setIsMuted((muted) => !muted)

	const handleLoopChanged = (e) => {
		dispatch(timerSetLoop({ total: parseInt(e.target.value) }))
	}

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

			<div className={`${styles.toolbar}`}>
				<button onClick={handleToggleEnableBgMusic}>
					{isMuted ? "Unmute" : "Mute"}
				</button>

				<div>
					<label htmlFor="updateFreq">Delay: </label>
					<input
						type="number"
						id="updateFreq"
						className={`${styles.input}`}
						value={delay ?? 0}
						onChange={(e) => handleDelayChange(e)}
					/>
				</div>

				<div>
					<label htmlFor="loop">Loop: </label>
					<input
						type="number"
						id="loop"
						className={`${styles.input}`}
						value={loopTotal}
						onChange={(e) => handleLoopChanged(e)}
					/>
				</div>
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
