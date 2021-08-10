import React from "react"
import "./styles/App.scss"
import TimerApp from "./components/TimerApp"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { ThemeProvider } from "@material-ui/core"
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles"
import blue from "@material-ui/core/colors/blue"

const App = () => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

	const theme = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					primary: {
						main: blue[500],
					},
					type: prefersDarkMode ? "dark" : "light",
				},
			}),
		[prefersDarkMode]
	)

	return (
		<ThemeProvider theme={theme}>
			<TimerApp />
		</ThemeProvider>
	)
}

export default App
