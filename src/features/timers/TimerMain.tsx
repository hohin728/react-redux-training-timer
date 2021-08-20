import React, { useRef } from "react"
import TimerList from "./TimerList"
import TimerCountdown from "./TimerCountdown"
import { useAppSelector } from "../../hooks/hooks"
import { selectShowCountdown, selectTimerStatus } from "./timersSlice"
import TimerStatus from "./TimerStatus"
import timesUpSfx from "../../audio/timesup.mp3"
import ReactHowler from "react-howler"
import { Box, Container, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
	mainSection: {
		overflowY: "scroll",
	},
})

type Props = {
	heightOfMainSection: number
}

const TimerMain = ({ heightOfMainSection }: Props) => {
	const classes = useStyles()

	const timerStatus = useAppSelector(selectTimerStatus)
	const showCountdown = useAppSelector(selectShowCountdown)
	const alarmPlayer = useRef<ReactHowler>(null)

	if (timerStatus === TimerStatus.RUNNING || showCountdown) {
		return (
			<Container maxWidth="sm" style={{ height: heightOfMainSection }}>
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
			<Box
				style={{ height: heightOfMainSection }}
				className={classes.mainSection}
			>
				<Container maxWidth="sm">
					<TimerList />
				</Container>
			</Box>
		)
	}
}

export default TimerMain
