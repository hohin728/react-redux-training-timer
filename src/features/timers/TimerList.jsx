import React from "react"
import store from "../../store"
import Timer from "./Timer"
import { selectTimers } from "./timersSlice"

const TimerList = () => {
	const timers = selectTimers(store.getState())

	return (
		<main style={{ height: "100%" }}>
			{timers.map((timer) => (
				<Timer id={timer.id} key={timer.id} />
			))}
		</main>
	)
}

export default TimerList
