import Timer from "./Timer"
import { selectTimers } from "./timersSlice"
import { useAppSelector } from "../../hooks/hooks"

const TimerList = () => {
	const timers = useAppSelector(selectTimers)

	return (
		<main>
			{timers.map((timer) => (
				<Timer id={timer.id} key={timer.id} />
			))}
		</main>
	)
}

export default TimerList
