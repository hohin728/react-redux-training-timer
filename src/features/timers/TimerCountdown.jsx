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

const TimerCountdown = ({ alarmPlayer }) => {
	const dispatch = useDispatch()

	const activeTimerId = useSelector(selectActiveTimerId)
	const timer = useSelector((state) => selectTimerById(state, activeTimerId))
	const delay = useSelector((state) => selectTimerDelay(state))
	const timerStatus = useSelector(selectTimerStatus)
	const lastTimerId = useSelector(selectLastTimerId)

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

	return <div className="timer-display">{timer.remainTime}</div>
}

export default TimerCountdown
