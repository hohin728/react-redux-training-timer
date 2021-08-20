import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectTimerDelay, timerDelayUpdated } from "../timers/timersSlice"
import {
	toggleDarkMode,
	setDefaultTime,
	selectIsDarkMode,
	selectDefaultMinute,
	selectDefaultSecond,
} from "../settings/settingsSlice"
import TimeInputField from "../../components/TimeInputField"
import {
	Box,
	Dialog,
	DialogTitle,
	DialogContent,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	Select,
	Switch,
	MenuItem,
	makeStyles,
	Typography,
} from "@material-ui/core"
import SettingsIcon from "@material-ui/icons/Settings"
import TimeUnit from "../timers/TimeUnit"

const useStyles = makeStyles({
	formControl: {
		width: 125,
	},
})

type Props = {
	open: boolean
	handleOpen: (e: React.ChangeEvent | {}, open: boolean) => void
}

const Settings = ({ open, handleOpen }: Props) => {
	const dispatch = useDispatch()
	const classes = useStyles()

	const delay = useSelector(selectTimerDelay)
	const isDarkMode = useSelector(selectIsDarkMode)
	const defaultMinute = useSelector(selectDefaultMinute)
	const defaultSecond = useSelector(selectDefaultSecond)

	const handleDarkModeToggle = () => dispatch(toggleDarkMode())

	const handleDelayChange = (
		e: React.ChangeEvent<{
			name?: string | undefined
			value: unknown
		}>
	) => {
		const newDelay = e.target.value as number
		dispatch(timerDelayUpdated({ delay: newDelay }))
	}

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

		dispatch(setDefaultTime({ value: parseInt(value), timeUnit }))
	}

	return (
		<Dialog
			onClose={() => handleOpen({}, false)}
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
				<Grid container>
					<Grid item xs={6}>
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
					</Grid>

					<Grid item xs={6}>
						<FormControlLabel
							control={
								<Switch
									checked={isDarkMode ?? false}
									onChange={handleDarkModeToggle}
								/>
							}
							label="Dark Theme"
						/>
					</Grid>

					<Grid item xs={12}>
						<TimeInputField
							id="default-timer-minute"
							label="Minute"
							handleChange={handleTimeChange}
							value={defaultMinute}
							timeUnit={TimeUnit.MINUTE}
							styles={{ marginTop: 20, marginRight: 20 }}
						/>
						<TimeInputField
							id="default-timer-minute"
							label="Second"
							handleChange={handleTimeChange}
							value={defaultSecond}
							timeUnit={TimeUnit.SECOND}
							styles={{ marginTop: 20 }}
						/>
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	)
}

export default Settings
