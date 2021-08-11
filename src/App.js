import React from "react"
import "./styles/App.scss"
import TimerApp from "./components/TimerApp"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { useSelector } from "react-redux"
import { selectIsDarkMode } from "./features/settings/settingsSlice"
import { ThemeProvider } from "@material-ui/core"
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles"
import blue from "@material-ui/core/colors/blue"

const App = () => {
	const systemPrefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
	const userEnabledDarkMode = useSelector(selectIsDarkMode)

	const getMode = (userPrefersDarkMode, systemPrefersDarkMode) => {
		let preferDarkMode = null
		if (userPrefersDarkMode === null) {
			preferDarkMode = systemPrefersDarkMode
		} else {
			preferDarkMode = userPrefersDarkMode
		}
		return preferDarkMode ? "dark" : "light"
	}

	const theme = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					primary: {
						main: blue[500],
					},
					type: getMode(userEnabledDarkMode, systemPrefersDarkMode),
				},
			}),
		[userEnabledDarkMode, systemPrefersDarkMode]
	)

	return (
		<ThemeProvider theme={theme}>
			<TimerApp />
		</ThemeProvider>
	)
}

export default App
