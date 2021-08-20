import React from "react"
import { useAppSelector, useAppDispatch } from "../../hooks/hooks"
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
	timerSetCurrentLoop,
	timerResetRemainTime,
} from "./timersSlice"
import useInterval from "../../hooks/useInterval"
import TimerStatus from "./TimerStatus"
import { convertTimeFormatForDisplay } from "../../services/timerService"

import { Box, Typography, makeStyles } from "@material-ui/core"

import ReactHowler from "react-howler"

const useStyles = makeStyles({
	digits: {
		margin: 10,
	},
	millisecond: {
		position: "absolute",
		bottom: 5,
		right: -40,
	},
	mainDisplay: {
		position: "relative",
		width: "fit-content",
		margin: "0 auto",
	},
})

type Props = {
	alarmPlayer: React.RefObject<ReactHowler>
}

const TimerCountdown = ({ alarmPlayer }: Props) => {
	const dispatch = useAppDispatch()
	const classes = useStyles()

	const activeTimerId = useAppSelector(selectActiveTimerId)
	const timer = useAppSelector((state) =>
		selectTimerById(state, activeTimerId ?? "")
	)
	const delay = useAppSelector(selectTimerDelay)
	const timerStatus = useAppSelector(selectTimerStatus)
	const lastTimerId = useAppSelector(selectLastTimerId)
	const loopCurrent = useAppSelector(selectTimerLoopCurrentCount)
	const loopTotal = useAppSelector(selectTimerLoopTotalCount)

	const timePerUnit = convertTimeFormatForDisplay(timer ? timer.remainTime : 0)

	const showTimerDigits = (digit: number): string =>
		digit < 10 ? "0" + digit : digit.toString()

	useInterval(
		() => {
			if (!timer) {
				return
			}

			dispatch(timerDeductTime({ timerId: timer.id, delay }))

			if (timer.remainTime - delay <= 0) {
				if (alarmPlayer && alarmPlayer.current) {
					alarmPlayer.current.howler.play()
				}

				/**
				 * if it's the last timer, check if the loop count reaches total
				 * if yes, update the status to be stopped
				 * else dispatch count++ and set next timer
				 */

				if (activeTimerId === lastTimerId) {
					// if loop count has reached the end
					if (loopCurrent < loopTotal) {
						dispatch(timerSetCurrentLoop(loopCurrent + 1))
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
			timer &&
			timer.id === activeTimerId
			? delay
			: null
	)

	return (
		<Box textAlign="center" height="100%" display="flex" flexDirection="column">
			<Typography variant="h4" component="div" style={{ marginTop: 10 }}>
				Round: {loopCurrent} / {loopTotal}
			</Typography>
			<Box
				display="flex"
				justifyContent="center"
				flexDirection="column"
				height="100%"
			>
				<Typography variant="h4" component="div" style={{ marginBottom: 10 }}>
					{timer ? timer.label : ""}
				</Typography>

				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					className={classes.mainDisplay}
				>
					<Typography
						variant="h2"
						component="div"
						className={`${classes.digits}`}
					>
						{showTimerDigits(timePerUnit.minute)}
					</Typography>
					<Typography variant="h3">:</Typography>
					<Typography
						variant="h2"
						component="div"
						className={`${classes.digits}`}
					>
						{showTimerDigits(timePerUnit.second)}
					</Typography>
					{delay < 1000 && (
						<Typography
							variant="h5"
							className={`${classes.millisecond} ${classes.digits}`}
						>
							{showTimerDigits(timePerUnit.millisec)}
						</Typography>
					)}
				</Box>
			</Box>
		</Box>
	)
}

export default TimerCountdown
