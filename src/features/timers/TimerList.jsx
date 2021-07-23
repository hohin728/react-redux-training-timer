import React from "react"
import store from "../../store"
import Timer from "./Timer"
import { selectTimerDelay, selectTimers } from "./timersSlice"
import { useSelector } from "react-redux"

const TimerList = () => {
	const timers = selectTimers(store.getState())
	const delay = useSelector((state) => selectTimerDelay(state))

	return (
		<main className="timers">
			{timers.map((timer) => (
				<Timer id={timer.id} key={timer.id} delay={delay} />
			))}
		</main>
	)
}

export default TimerList
