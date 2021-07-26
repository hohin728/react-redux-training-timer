import "./styles/App.scss"
import TimerMain from "./features/timers/TimerMain"
import ControlPanel from "./components/ControlPanel"
import { AppBar, Container, makeStyles, ThemeProvider } from "@material-ui/core"
import theme from "./theme"

const useStyles = makeStyles((theme) => ({
	fullHeight: {
		height: "100%",
	},
	app: {
		paddingBottom: 60,
	},
	appBar: {
		top: "auto",
		bottom: 0,
		left: "50%",
		transform: "translateX(-50%)",
		right: "unset",
		width: "95%",
		maxWidth: 600,
		borderRadius: "5px 5px 0 0",
	},
}))

const App = () => {
	const classes = useStyles()

	return (
		<ThemeProvider theme={theme}>
			<div className={`App ${classes.fullHeight} ${classes.app}`}>
				<Container maxWidth="sm" className={classes.fullHeight}>
					<TimerMain />
				</Container>
				<AppBar position="fixed" className={classes.appBar}>
					<ControlPanel />
				</AppBar>
			</div>
		</ThemeProvider>
	)
}

export default App
