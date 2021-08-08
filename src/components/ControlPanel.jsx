import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
	timerStatusUpdated,
	selectActiveTimerId,
	timerSetNextTimer,
	selectTimerStatus,
	timerResetTimers,
	timerSetShowCountdown,
	selectTimerLoopTotalCount,
	timerSetLoop,
	timerToggledMute,
	selectTimerIsMuted,
	timerAdded,
	selectShowCountdown,
} from "../features/timers/timersSlice"
import TimerStatus from "../features/timers/TimerStatus"

import {
	Button,
	IconButton,
	Box,
	Container,
	Paper,
	FormControl,
	makeStyles,
	TextField,
} from "@material-ui/core"
import VolumeOffRoundedIcon from "@material-ui/icons/VolumeOffRounded"
import VolumeUpRoundedIcon from "@material-ui/icons/VolumeUpRounded"
import AddCircleSharpIcon from "@material-ui/icons/AddCircleSharp"
import SettingsIcon from "@material-ui/icons/Settings"

import { createTimer } from "../services/timerService"

const useStyles = makeStyles((theme) => ({
	formControl: {
		width: 125,
	},
	controlPanelContainer: {
		position: "relative",
		padding: theme.spacing(1),
		[theme.breakpoints.up("sm")]: {
			padding: theme.spacing(3),
		},
	},
	addButton: {
		position: "absolute",
		top: 0,
		right: 0,
		zIndex: 2,
		[theme.breakpoints.up("sm")]: {
			right: 50,
		},
	},
	toolbar: {
		marginTop: 16,
	},
}))

const ControlPanel = ({ setHeightOfControlPanel, handleModalStatus }) => {
	const classes = useStyles()
	const dispatch = useDispatch()

	const timerStatus = useSelector(selectTimerStatus)
	const activeTimerId = useSelector(selectActiveTimerId)
	const loopTotal = useSelector(selectTimerLoopTotalCount)
	const isMuted = useSelector(selectTimerIsMuted)
	const showCountdown = useSelector(selectShowCountdown)

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

	const handleReset = () => {
		dispatch(timerSetShowCountdown({ showCountdown: false }))
		dispatch(timerResetTimers())
	}

	const handleToggleMusicMuted = () =>
		dispatch(timerToggledMute({ muteType: "music" }))

	const handleLoopChanged = (e) => {
		dispatch(timerSetLoop({ total: parseInt(e.target.value) }))
	}

	const handleAddTimer = () => dispatch(timerAdded(createTimer()))

	// get the height of control panel to render the height of main section
	useEffect(() => {
		const height = document.getElementById("control-panel").clientHeight
		setHeightOfControlPanel(height)
	})

	return (
		<Paper elevation={3} id="control-panel">
			<Container maxWidth="md" className={classes.controlPanelContainer}>
				<IconButton
					size="medium"
					onClick={handleAddTimer}
					disabled={showCountdown}
					className={classes.addButton}
					color="primary"
				>
					<AddCircleSharpIcon />
				</IconButton>

				<Box display="flex" justifyContent="center">
					<Box m={1}>
						<Button
							onClick={handleStart}
							variant="contained"
							color="primary"
							size="large"
						>
							{timerStatus === TimerStatus.RUNNING ? "Pause" : "Start"}
						</Button>
					</Box>
					<Box m={1}>
						<Button
							onClick={handleReset}
							variant="contained"
							color="secondary"
							size="large"
						>
							Reset
						</Button>
					</Box>
				</Box>

				<Box
					display="flex"
					justifyContent="space-around"
					className={classes.toolbar}
				>
					<Box display="flex" justifyContent="space-between">
						<IconButton onClick={(e) => handleModalStatus(e, true)}>
							<SettingsIcon />
						</IconButton>

						<IconButton onClick={handleToggleMusicMuted}>
							{isMuted ? <VolumeOffRoundedIcon /> : <VolumeUpRoundedIcon />}
						</IconButton>
					</Box>

					<FormControl className={classes.formControl}>
						<TextField
							id="loop"
							label="No. of rounds"
							type="number"
							value={loopTotal}
							onChange={(e) => handleLoopChanged(e)}
							disabled={showCountdown}
						/>
					</FormControl>
				</Box>
			</Container>
		</Paper>
	)
}

export default ControlPanel
