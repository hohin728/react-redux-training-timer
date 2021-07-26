import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {
	selectTimerById,
	timerSetTime,
	timerSetLabel,
	timerSetMusic,
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
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
	musicInput: {
		minWidth: 200,
	},
	timerContainer: {
		borderRadius: 30,
		padding: "20px 40px",
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

	return (
		<Box m={2}>
			<Paper
				elevation={1}
				variant="outlined"
				className={classes.timerContainer}
			>
				<Box m={1} display="flex" justifyContent="center">
					<TextField
						value={timer.label ?? ""}
						onChange={(e) => handleLabelChange(e)}
						inputProps={{ style: { textAlign: "center" } }}
					/>
				</Box>

				<Box display="flex" alignItems="center" justifyContent="center">
					<Box m={2}>
						<FormControl>
							<TextField
								id={`timer-${id}-min`}
								label="Minute"
								type="number"
								InputLabelProps={{
									shrink: true,
								}}
								inputProps={{ min: 0, max: 59 }}
								variant="outlined"
								onChange={(e) =>
									handleTimeChange({ event: e, timeUnit: "minute" })
								}
								value={timer.minute}
							/>
						</FormControl>
					</Box>

					<Box m={1}>:</Box>

					<Box m={2}>
						<FormControl>
							<TextField
								id={`timer-${id}-sec`}
								label="Second"
								type="number"
								InputLabelProps={{
									shrink: true,
								}}
								inputProps={{ min: 0, max: 59 }}
								variant="outlined"
								onChange={(e) =>
									handleTimeChange({ event: e, timeUnit: "second" })
								}
								value={timer.second}
							/>
						</FormControl>
					</Box>
				</Box>

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
			</Paper>
		</Box>
	)
}

export default Timer
