import "./App.css"

import Timer from "./features/timers/Timer"
import store from "./store"
import { selectTimers } from "./features/timers/timersSlice"

function App() {
	const timers = selectTimers(store.getState())

	return (
		<div className="App">
			<main className="timers">
				{timers.map((timer) => (
					<Timer id={timer.id} key={timer.id} />
				))}
			</main>
		</div>
	)
}

export default App
