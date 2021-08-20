import React, { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../hooks/hooks"
import {
	timerStatusUpdated,
	selectActiveTimerId,
	timerSetNextTimer,
	selectTimerStatus,
	timerResetTimers,
	timerSetShowCountdown,
	selectTimerLoopTotalCount,
	timerSetTotalLoop,
	timerToggledMute,
	selectTimerIsMuted,
	timerAdded,
	selectShowCountdown,
} from "../features/timers/timersSlice"
import {
	selectDefaultMinute,
	selectDefaultSecond,
} from "../features/settings/settingsSlice"
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

type Props = {
	setHeightOfControlPanel: React.Dispatch<React.SetStateAction<number>>
	handleModalStatus: (e: {} | React.ChangeEvent<Element>, open: boolean) => void
}

const ControlPanel = ({
	setHeightOfControlPanel,
	handleModalStatus,
}: Props) => {
	const classes = useStyles()
	const dispatch = useAppDispatch()

	const timerStatus = useAppSelector(selectTimerStatus)
	const activeTimerId = useAppSelector(selectActiveTimerId)
	const loopTotal = useAppSelector(selectTimerLoopTotalCount)
	const isMuted = useAppSelector(selectTimerIsMuted)
	const showCountdown = useAppSelector(selectShowCountdown)
	const defaultMinute = useAppSelector(selectDefaultMinute)
	const defaultSecond = useAppSelector(selectDefaultSecond)

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

	const handleLoopChanged = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const value = e.target.value as number | ""
		dispatch(timerSetTotalLoop(value))
	}

	const handleAddTimer = () =>
		dispatch(
			timerAdded(createTimer({ minute: defaultMinute, second: defaultSecond }))
		)

	// get the height of control panel to render the height of main section
	useEffect(() => {
		const controlPanelElem = document.getElementById("control-panel")
		if (controlPanelElem) {
			const height = controlPanelElem.clientHeight
			setHeightOfControlPanel(height)
		}
	})

	return (
		<Paper elevation={10} id="control-panel">
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
							disabled={showCountdown && timerStatus === TimerStatus.STOPPED}
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
							InputLabelProps={{
								shrink: true,
							}}
							variant="outlined"
							value={loopTotal}
							inputProps={{ inputMode: "numeric" }}
							onChange={handleLoopChanged}
							disabled={showCountdown}
							size="small"
							error={Number.isNaN(loopTotal) || loopTotal < 1}
						/>
					</FormControl>
				</Box>
			</Container>
		</Paper>
	)
}

export default ControlPanel
