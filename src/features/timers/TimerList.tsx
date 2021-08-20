import Timer from "./Timer"
import { useSelector } from "react-redux"
import { selectTimers } from "./timersSlice"
import { RootState } from "../../store"

const TimerList = () => {
	const timers = useSelector((state: RootState) => selectTimers(state))

	return (
		<main>
			{timers.map((timer) => (
				<Timer id={timer.id} key={timer.id} />
			))}
		</main>
	)
}

export default TimerList
