import React from "react"
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
	timerToggledMute,
	selectTimerIsMuted,
} from "../features/timers/timersSlice"
import TimerStatus from "../features/timers/TimerStatus"

const ControlPanel = () => {
	const dispatch = useDispatch()

	const delay = useSelector(selectTimerDelay)
	const timerStatus = useSelector(selectTimerStatus)
	const activeTimerId = useSelector(selectActiveTimerId)
	const loopTotal = useSelector(selectTimerLoopTotalCount)
	const isMuted = useSelector(selectTimerIsMuted)

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

	const handleToggleMusicMuted = () =>
		dispatch(timerToggledMute({ muteType: "music" }))

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
				<button onClick={handleToggleMusicMuted}>
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
		</div>
	)
}

export default ControlPanel
