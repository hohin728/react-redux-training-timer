import React, { useEffect, useRef } from "react"
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
	selectTimerLoopCurrentCount,
	selectTimerLoopTotalCount,
	timerSetLoop,
	timerResetRemainTime,
	selectTimerIsMuted,
} from "./timersSlice"
import useInterval from "../../hooks/useInterval"
import TimerStatus from "./TimerStatus"
import { convertTimeFormatForDisplay } from "../../services/timerService"
import styles from "../../styles/TimerCountdown.module.scss"
import muayThaiBgMusic from "../../audio/Muay_Thai_Sarama_ROUND_1.mp3"
import ReactHowler from "react-howler"

import { Box } from "@material-ui/core"

const TimerCountdown = ({ alarmPlayer }) => {
	const dispatch = useDispatch()
	const musicPlayer = useRef(null)

	const activeTimerId = useSelector(selectActiveTimerId)
	const timer = useSelector((state) => selectTimerById(state, activeTimerId))
	const delay = useSelector((state) => selectTimerDelay(state))
	const timerStatus = useSelector(selectTimerStatus)
	const lastTimerId = useSelector(selectLastTimerId)
	const loopCurrent = useSelector(selectTimerLoopCurrentCount)
	const loopTotal = useSelector(selectTimerLoopTotalCount)
	const isMuted = useSelector(selectTimerIsMuted)

	const timePerUnit = convertTimeFormatForDisplay(timer.remainTime)

	const showTimerDigits = (digit) => (digit < 10 ? "0" + digit : digit)

	useInterval(
		() => {
			if (timer.remainTime > 0) {
				dispatch(timerDeductTime({ timerId: timer.id, delay }))
			} else {
				alarmPlayer.current.play()

				/**
				 * if it's the last timer, check if the loop count reaches total
				 * if yes, update the status to be stopped
				 * else dispatch count++ and set next timer
				 */

				if (activeTimerId === lastTimerId) {
					// if loop count has reached the end
					if (loopCurrent < loopTotal) {
						dispatch(timerSetLoop({ current: loopCurrent + 1 }))
						// reset remain time of every timer
						dispatch(timerResetRemainTime())
						dispatch(timerSetNextTimer())
					} else {
						dispatch(timerStatusUpdated({ status: TimerStatus.STOPPED }))
					}
				} else {
					dispatch(timerSetNextTimer())
				}
			}
		},
		timerStatus === TimerStatus.RUNNING &&
			activeTimerId &&
			timer.id === activeTimerId
			? delay
			: null
	)

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

	return (
		<Box height="100%">
			<div className={`${styles.countdownSection}`}>
				<div className={`${styles.countdownInfo}`}>
					<div style={{ textAlign: "center" }}>
						<small>Timer id: {timer.id}</small>
						<p>{timer.label ?? ""}</p>
						<p>
							<span>Round: </span>
							<span>
								{loopCurrent} / {loopTotal}
							</span>
						</p>
					</div>
				</div>
				<div className={`${styles.countdownDisplay}`}>
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
			<ReactHowler
				src={muayThaiBgMusic}
				playing={timerStatus === TimerStatus.RUNNING && timer.music !== ""}
				mute={isMuted}
				ref={musicPlayer}
				loop={true}
				html5={true}
			/>
		</Box>
	)
}

export default TimerCountdown
