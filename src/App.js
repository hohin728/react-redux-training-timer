import "./App.css"
import TimerMain from "./features/timers/TimerMain"
import ControlPanel from "./components/ControlPanel"

const App = () => (
	<div className="App">
		<TimerMain></TimerMain>
		<ControlPanel></ControlPanel>
	</div>
)

export default App
