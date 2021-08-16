import React from "react"
import { isValidTimeInput } from "../services/timerService"

import { TextField } from "@material-ui/core"

const TimeInputField = ({
	id, // string
	label, // string
	className, // material ui object
	handleChange, // function
	value, // timer.second or timer.minute
	timeUnit, // "second" || "minute"
}) => {
	return (
		<TextField
			id={id}
			label={label}
			type="number"
			InputLabelProps={{
				shrink: true,
			}}
			variant="outlined"
			inputProps={{
				min: 0,
				max: 59,
				inputMode: "numeric",
				className,
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
