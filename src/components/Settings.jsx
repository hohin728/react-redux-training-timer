import React from "react"
import { useSelector, useDispatch } from "react-redux"

import {
	selectTimerDelay,
	timerDelayUpdated,
} from "../features/timers/timersSlice"

import {
	Box,
	Dialog,
	DialogTitle,
	DialogContent,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	makeStyles,
	Typography,
} from "@material-ui/core"
import SettingsIcon from "@material-ui/icons/Settings"

const useStyles = makeStyles({
	formControl: {
		width: 125,
	},
})

const Settings = ({ open, handleOpen }) => {
	const dispatch = useDispatch()
	const classes = useStyles()

	const delay = useSelector(selectTimerDelay)

	const handleDelayChange = (e) =>
		dispatch(timerDelayUpdated({ delay: e.target.value }))

	return (
		<Dialog
			onClose={(e) => handleOpen(e, false)}
			aria-labelledby="settings-dialog-title"
			open={open}
			maxWidth="sm"
			fullWidth={true}
		>
			<DialogTitle id="settings-dialog-title">
				<Box display="flex" alignItems="center">
					<SettingsIcon />
					<Typography component="span" style={{ marginLeft: 10 }}>
						Settings
					</Typography>
				</Box>
			</DialogTitle>
			<DialogContent style={{ paddingBottom: 16 }}>
				<FormControl className={classes.formControl}>
					<InputLabel>Refresh rate</InputLabel>
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
			</DialogContent>
		</Dialog>
	)
}

export default Settings
