import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {
	selectTimerById,
	timerSetTime,
	timerSetLabel,
	timerSetMusic,
	timerDeleted,
} from "./timersSlice"
import {
	Box,
	Paper,
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	TextField,
	IconButton,
} from "@material-ui/core"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"

const useStyles = makeStyles((theme) => ({
	musicInput: {
		minWidth: 200,
	},
	timerContainer: {
		borderRadius: 30,
		padding: "10px 20px",
		[theme.breakpoints.up("sm")]: {
			padding: "20px 40px",
		},
	},
	timerToolbar: {
		justifyContent: "center",
		[theme.breakpoints.up("sm")]: {
			justifyContent: "flex-start",
		},
	},
	timerInput: {
		minWidth: 60,
	},
	deleteButton: {
		opacity: 0.2,
		position: "absolute",
		top: 15,
		right: 20,
		transition: "opacity 0.5s ease",
		zIndex: 2,
		"&:hover": {
			opacity: 1,
		},
	},
}))

const Timer = ({ id }) => {
	const dispatch = useDispatch()
	const classes = useStyles()
	const timer = useSelector((state) => selectTimerById(state, id))

	const handleTimeChange = (params) => {
		const {
			event: {
				target: { value },
			},
			timeUnit,
		} = params

		dispatch(timerSetTime(timer.id, parseInt(value), timeUnit))
	}

	const handleLabelChange = (e) =>
		dispatch(timerSetLabel({ timerId: timer.id, label: e.target.value }))

	const handleMusicChange = (e) =>
		dispatch(timerSetMusic({ timerId: timer.id, music: e.target.value }))

	const handleDeleteTimer = () => dispatch(timerDeleted(timer.id))

	return (
		<Box my={2}>
			<Paper
				elevation={1}
				variant="outlined"
				className={classes.timerContainer}
				style={{ position: "relative" }}
			>
				<IconButton
					onClick={handleDeleteTimer}
					className={classes.deleteButton}
					size="small"
				>
					<HighlightOffIcon fontSize="small" />
				</IconButton>

				<Box m={1} display="flex" justifyContent="center">
					<TextField
						value={timer.label ?? ""}
						onChange={(e) => handleLabelChange(e)}
						inputProps={{ style: { textAlign: "center" } }}
					/>
				</Box>

				<Box display="flex" alignItems="center" justifyContent="center">
					<Box m={1}>
						<TextField
							id={`timer-${id}-min`}
							label="Minute"
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
							inputProps={{ min: 0, max: 59, className: classes.timerInput }}
							variant="outlined"
							onChange={(e) =>
								handleTimeChange({ event: e, timeUnit: "minute" })
							}
							value={timer.minute}
						/>
					</Box>

					<Box m={1}>:</Box>

					<Box m={1}>
						<TextField
							id={`timer-${id}-sec`}
							label="Second"
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
							variant="outlined"
							inputProps={{ min: 0, max: 59, className: classes.timerInput }}
							onChange={(e) =>
								handleTimeChange({ event: e, timeUnit: "second" })
							}
							value={timer.second}
						/>
					</Box>
				</Box>

				<Box display="flex" className={classes.timerToolbar}>
					<FormControl>
						<InputLabel id={`timer-music-${timer.id}-label`}>
							Timer Music
						</InputLabel>
						<Select
							labelId={`timer-music-${timer.id}-label`}
							id={`timer-music-${timer.id}`}
							value={timer.music ?? ""}
							onChange={handleMusicChange}
							className={classes.musicInput}
						>
							<MenuItem value="">No Music</MenuItem>
							<MenuItem value="Muay_Thai_Sarama_ROUND_1.mp3">
								Muay Thai Music
							</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</Paper>
		</Box>
	)
}

export default Timer
