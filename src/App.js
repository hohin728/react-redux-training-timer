import "./styles/App.scss"
import TimerMain from "./features/timers/TimerMain"
import ControlPanel from "./components/ControlPanel"
import styles from "./styles/App.module.scss"
import { ThemeProvider } from "@material-ui/core"
import theme from "./theme"

const App = () => (
	<ThemeProvider theme={theme}>
		<div
			className={`App ${styles.fullHeight} ${styles.flexContainer} ${styles.widthContainer}`}
		>
			<div className={`${styles.content}`}>
				<TimerMain></TimerMain>
			</div>
			<div className={`${styles.footer}`}>
				<ControlPanel></ControlPanel>
			</div>
		</div>
	</ThemeProvider>
)

export default App
