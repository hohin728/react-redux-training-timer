import "./App.css"
import TimerList from "./features/timers/TimerList"
import ControlPanel from "./components/ControlPanel"

const App = () => (
	<div className="App">
		<TimerList />
		<ControlPanel></ControlPanel>
	</div>
)

export default App
