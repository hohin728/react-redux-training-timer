import React from "react"
import { useSelector, useDispatch } from "react-redux"
import TimeInputField from "../../components/TimeInputField"
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

import TimeUnit from "./TimeUnit"
import { RootState } from "../../store"

type Props = {
	id: string
}

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
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	timerToolbar: {
		justifyContent: "center",
		[theme.breakpoints.up("sm")]: {
			justifyContent: "flex-start",
		},
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

const Timer = ({ id }: Props) => {
	const dispatch = useDispatch()
	const classes = useStyles()
	const timer = useSelector((state: RootState) => selectTimerById(state, id))

	const handleTimeChange = (params: {
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
		timeUnit: TimeUnit
	}) => {
		const {
			event: {
				target: { value },
			},
			timeUnit,
		} = params

		if (timer) {
			dispatch(timerSetTime(timer.id, parseInt(value), timeUnit))
		}
	}

	const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (timer) {
			dispatch(timerSetLabel({ timerId: timer.id, label: e.target.value }))
		}
	}

	const handleMusicChange = (
		e: React.ChangeEvent<{
			name?: string | undefined
			value: unknown
		}>
	) => {
		if (timer) {
			const value = e.target.value as string
			dispatch(timerSetMusic({ timerId: timer.id, music: value }))
		}
	}

	const handleDeleteTimer = () => {
		if (timer) {
			dispatch(timerDeleted(timer.id))
		}
	}

	return (
		timer && (
			<Paper
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
						onChange={handleLabelChange}
						inputProps={{ style: { textAlign: "center" } }}
						placeholder="timer label"
					/>
				</Box>

				<Box display="flex" alignItems="center" justifyContent="center">
					<Box m={1}>
						<TimeInputField
							id={`timer-${id}-min`}
							label="Minute"
							handleChange={handleTimeChange}
							value={timer.minute}
							timeUnit={TimeUnit.MINUTE}
						/>
					</Box>

					<Box m={1}>:</Box>

					<Box m={1}>
						<TimeInputField
							id={`timer-${id}-sec`}
							label="Second"
							handleChange={handleTimeChange}
							value={timer.second}
							timeUnit={TimeUnit.SECOND}
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
		)
	)
}

export default Timer
