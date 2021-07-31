import React from "react"
import Timer from "./Timer"
import { useSelector } from "react-redux"
import { selectTimers } from "./timersSlice"

const TimerList = () => {
	const timers = useSelector((state) => selectTimers(state))

	return (
		<main>
			{timers.map((timer) => (
				<Timer id={timer.id} key={timer.id} />
			))}
		</main>
	)
}

export default TimerList
