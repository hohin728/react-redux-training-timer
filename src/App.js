import "./App.css"

import Timer from "./features/timers/Timer"
import ControlPanel from "./components/ControlPanel"
import store from "./store"
import { selectTimerDelay, selectTimers } from "./features/timers/timersSlice"
import { useSelector } from "react-redux"

function App() {
	const timers = selectTimers(store.getState())
	const delay = useSelector((state) => selectTimerDelay(state))

	return (
		<div className="App">
			<main className="timers">
				{timers.map((timer) => (
					<Timer id={timer.id} key={timer.id} delay={delay} />
				))}
			</main>

			<ControlPanel></ControlPanel>
		</div>
	)
}

export default App
