import React, { useEffect } from "react"
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
	InputLabel,
	MenuItem,
	FormControl,
	makeStyles,
	TextField,
} from "@material-ui/core"
import VolumeOffRoundedIcon from "@material-ui/icons/VolumeOffRounded"
import VolumeUpRoundedIcon from "@material-ui/icons/VolumeUpRounded"
import AddCircleSharpIcon from "@material-ui/icons/AddCircleSharp"
import { Select } from "@material-ui/core"
import { createTimer } from "../services/timerService"

const useStyles = makeStyles((theme) => ({
	formControl: {
		width: 150,
	},
	toolbar: {
		marginTop: 16,
	},
}))

const ControlPanel = ({ setHeightOfControlPanel }) => {
	const classes = useStyles()
	const dispatch = useDispatch()

	const delay = useSelector(selectTimerDelay)
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

	const handleAddTimer = () => dispatch(timerAdded(createTimer()))

	// get the height of control panel to render the height of main section
	useEffect(() => {
		const height = document.getElementById("control-panel").clientHeight
		setHeightOfControlPanel(height)
	})

	return (
		<Paper elevation={3} id="control-panel">
			<Container maxWidth="md" style={{ position: "relative" }}>
				<Box p={3}>
					<IconButton
						size="medium"
						style={{ position: "absolute", top: 0, right: 50 }}
						onClick={handleAddTimer}
						disabled={showCountdown}
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
						<IconButton onClick={handleToggleMusicMuted}>
							{isMuted ? <VolumeOffRoundedIcon /> : <VolumeUpRoundedIcon />}
						</IconButton>

						<FormControl className={classes.formControl}>
							<InputLabel>Frequency (ms)</InputLabel>
							<Select
								id="updateFreq"
								value={delay}
								onChange={(e) => handleDelayChange(e)}
							>
								<MenuItem value={10}>10</MenuItem>
								<MenuItem value={100}>100</MenuItem>
								<MenuItem value={1000}>1000</MenuItem>
							</Select>
						</FormControl>

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
				</Box>
			</Container>
		</Paper>
	)
}

export default ControlPanel
