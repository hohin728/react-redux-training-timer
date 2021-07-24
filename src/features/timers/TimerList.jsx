import React from "react"
import styles from "../../styles/TimerList.module.scss"
import store from "../../store"
import Timer from "./Timer"
import { selectTimerDelay, selectTimers } from "./timersSlice"
import { useSelector } from "react-redux"

const TimerList = () => {
	const timers = selectTimers(store.getState())
	const delay = useSelector((state) => selectTimerDelay(state))

	return (
		<main className={styles.timers}>
			{timers.map((timer) => (
				<Timer id={timer.id} key={timer.id} delay={delay} />
			))}
		</main>
	)
}

export default TimerList
