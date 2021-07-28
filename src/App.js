import React from "react"
import "./styles/App.scss"
import TimerApp from "./components/TimerApp"
import theme from "./theme"
import { ThemeProvider } from "@material-ui/core"

const App = () => (
	<ThemeProvider theme={theme}>
		<TimerApp />
	</ThemeProvider>
)

export default App
