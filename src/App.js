import "./App.css"

import Timer from "./features/timers/Timer"

function App() {
	return (
		<div className="App">
			<main className="timers">
				<Timer id={1} />
			</main>
		</div>
	)
}

export default App
