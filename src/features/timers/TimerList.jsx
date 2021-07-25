import React from "react"
import styles from "../../styles/TimerList.module.scss"
import store from "../../store"
import Timer from "./Timer"
import { selectTimers } from "./timersSlice"

const TimerList = () => {
	const timers = selectTimers(store.getState())

	return (
		<main className={styles.timers}>
			{timers.map((timer) => (
				<Timer id={timer.id} key={timer.id} />
			))}
		</main>
	)
}

export default TimerList
