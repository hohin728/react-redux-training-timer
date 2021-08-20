import React from "react"
import { isValidTimeInput } from "../services/timerService"

import { TextField, makeStyles } from "@material-ui/core"
import TimeUnit from "../features/timers/TimeUnit"

const useStyles = makeStyles({
	timerInput: {
		minWidth: 60,
	},
})

type Props = {
	id: string
	label: string
	handleChange: ({
		event,
		timeUnit,
	}: {
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
		timeUnit: TimeUnit
	}) => void
	value: number | ""
	timeUnit: TimeUnit
	styles?: {}
}

const TimeInputField = ({
	id,
	label,
	handleChange,
	value,
	timeUnit,
	styles,
}: Props) => {
	const classes = useStyles()

	const displayError = () => {
		if (value === "") {
			return true
		}
		return !isValidTimeInput({
			value,
		})
	}

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
			error={displayError()}
		/>
	)
}

export default TimeInputField
