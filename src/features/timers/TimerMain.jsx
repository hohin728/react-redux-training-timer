import React, { useRef } from "react"
import TimerList from "./TimerList"
import TimerCountdown from "./TimerCountdown"
import { useSelector } from "react-redux"
import { selectShowCountdown, selectTimerStatus } from "./timersSlice"
import TimerStatus from "./TimerStatus"
import timesUpSfx from "../../audio/timesup.mp3"
import ReactHowler from "react-howler"

const TimerMain = () => {
	const timerStatus = useSelector(selectTimerStatus)
	const showCountdown = useSelector(selectShowCountdown)
	const alarmPlayer = useRef(null)

	if (timerStatus === TimerStatus.RUNNING || showCountdown) {
		return (
			<>
				<TimerCountdown alarmPlayer={alarmPlayer}></TimerCountdown>
				<ReactHowler
					src={timesUpSfx}
					playing={false}
					html5={true}
					ref={alarmPlayer}
				/>
			</>
		)
	} else {
		return <TimerList />
	}
}

export default TimerMain
