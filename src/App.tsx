import React from "react"
import "./styles/App.scss"
import TimerApp from "./components/TimerApp"
import { useAppSelector } from "./hooks/hooks"
import { selectIsDarkMode } from "./features/settings/settingsSlice"
import { ThemeProvider } from "@material-ui/core"
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles"
import blue from "@material-ui/core/colors/blue"

const App = () => {
	const isDarkMode = useAppSelector(selectIsDarkMode)

	const theme = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					primary: {
						main: blue[500],
					},
					type: isDarkMode ? "dark" : "light",
				},
			}),
		[isDarkMode]
	)

	return (
		<ThemeProvider theme={theme}>
			<TimerApp />
		</ThemeProvider>
	)
}

export default App
