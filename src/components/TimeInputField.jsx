import React from "react"
import { isValidTimeInput } from "../services/timerService"

import { TextField, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
	timerInput: {
		minWidth: 60,
	},
})

const TimeInputField = ({
	id, // string
	label, // string
	handleChange, // function
	value, // timer.second or timer.minute
	timeUnit, // "second" || "minute"
	styles, // style objects
}) => {
	const classes = useStyles()

	return (
		<TextField
			id={id}
			label={label}
			style={styles}
			type="number"
			InputLabelProps={{
				shrink: true,
			}}
			variant="outlined"
			inputProps={{
				min: 0,
				max: 59,
				inputMode: "numeric",
				className: classes.timerInput,
			}}
			onChange={(e) => handleChange({ event: e, timeUnit })}
			value={value}
			error={
				!isValidTimeInput({
					value,
					timeUnit,
				})
			}
		/>
	)
}

export default TimeInputField
