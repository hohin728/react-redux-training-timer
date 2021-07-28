import React, { useRef } from "react"
import TimerList from "./TimerList"
import TimerCountdown from "./TimerCountdown"
import { useSelector } from "react-redux"
import { selectShowCountdown, selectTimerStatus } from "./timersSlice"
import TimerStatus from "./TimerStatus"
import timesUpSfx from "../../audio/timesup.mp3"
import ReactHowler from "react-howler"
import { Container } from "@material-ui/core"

const TimerMain = () => {
	const timerStatus = useSelector(selectTimerStatus)
	const showCountdown = useSelector(selectShowCountdown)
	const alarmPlayer = useRef(null)

	if (timerStatus === TimerStatus.RUNNING || showCountdown) {
		return (
			<Container maxWidth="sm" style={{ height: "100%" }}>
				<TimerCountdown alarmPlayer={alarmPlayer}></TimerCountdown>
				<ReactHowler
					src={timesUpSfx}
					playing={false}
					html5={true}
					ref={alarmPlayer}
				/>
			</Container>
		)
	} else {
		return (
			<Container maxWidth="sm">
				<TimerList />
			</Container>
		)
	}
}

export default TimerMain
