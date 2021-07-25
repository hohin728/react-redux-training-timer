import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {
	selectTimerById,
	selectActiveTimerId,
	selectTimerDelay,
	timerDeductTime,
	timerSetNextTimer,
	selectTimerStatus,
	selectLastTimerId,
	timerStatusUpdated,
} from "./timersSlice"
import useInterval from "../../hooks/useInterval"
import TimerStatus from "./TimerStatus"
import { convertTimeFormatForDisplay } from "../../services/timerService"
import styles from "../../styles/TimerCountdown.module.scss"

const TimerCountdown = ({ alarmPlayer }) => {
	const dispatch = useDispatch()

	const activeTimerId = useSelector(selectActiveTimerId)
	const timer = useSelector((state) => selectTimerById(state, activeTimerId))
	const delay = useSelector((state) => selectTimerDelay(state))
	const timerStatus = useSelector(selectTimerStatus)
	const lastTimerId = useSelector(selectLastTimerId)

	const timePerUnit = convertTimeFormatForDisplay(timer.remainTime)

	const showTimerDigits = (digit) => (digit < 10 ? "0" + digit : digit)

	useInterval(
		() => {
			if (timer.remainTime - delay >= 0) {
				dispatch(timerDeductTime({ timerId: timer.id, delay }))
			} else {
				alarmPlayer.current.play()

				// set next timer only if active timer is NOT the last timer
				if (activeTimerId !== lastTimerId) {
					dispatch(timerSetNextTimer())
				} else {
					dispatch(timerStatusUpdated({ status: TimerStatus.STOPPED }))
				}
			}
		},
		timerStatus === TimerStatus.RUNNING &&
			activeTimerId &&
			timer.id === activeTimerId
			? delay
			: null
	)

	return (
		<div className={`${styles.countdownSection}`}>
			<div class={`${styles.countdownDisplay}`}>
				<div className={`${styles.countdownFlex}`}>
					<div className={`${styles.digits}`}>
						{showTimerDigits(timePerUnit.minute)}
					</div>
					<div className={`${styles.separator}`}>:</div>
					<div className={`${styles.digits}`}>
						{showTimerDigits(timePerUnit.second)}
					</div>
				</div>
				<div className={`${styles.digits} ${styles.millisecond}`}>
					{showTimerDigits(timePerUnit.millisec)}
				</div>
			</div>
		</div>
	)
}

export default TimerCountdown
