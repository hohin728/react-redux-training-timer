import React, { useState, useEffect } from "react"
import "./styles/App.scss"
import TimerMain from "./features/timers/TimerMain"
import ControlPanel from "./components/ControlPanel"
import { Box, Container, makeStyles, ThemeProvider } from "@material-ui/core"
import theme from "./theme"

const useStyles = makeStyles((theme) => ({
	fullHeight: {
		height: "100%",
	},
	app: {
		overflow: "hidden",
	},
	appBar: {
		position: "fixed",
		left: 0,
		bottom: 0,
		borderRadius: "5px 5px 0 0",
		zIndex: 1100,
		boxSizing: "border-box",
		width: "100%",
	},
	mainSection: {
		overflow: "auto",
	},
}))

const App = () => {
	const classes = useStyles()
	const [heightOfControlPanel, setHeightOfControlPanel] = useState(0)
	const [heightOfMainSection, setHeightOfMainSection] = useState(0)

	const setHeight = () => {
		const heightOfMainSection = window.innerHeight - heightOfControlPanel
		setHeightOfMainSection(heightOfMainSection)
	}

	useEffect(() => {
		setHeight()
	}, [heightOfControlPanel])

	useEffect(() => {
		window.addEventListener("resize", setHeight)

		return () => {
			window.removeEventListener("resize", setHeight)
		}
	})

	return (
		<ThemeProvider theme={theme}>
			<div className={`App ${classes.fullHeight} ${classes.app}`}>
				<Box
					className={classes.mainSection}
					style={{ height: heightOfMainSection }}
				>
					<Container maxWidth="sm">
						<TimerMain />
					</Container>
				</Box>

				<Box className={classes.appBar}>
					<ControlPanel setHeightOfControlPanel={setHeightOfControlPanel} />
				</Box>
			</div>
		</ThemeProvider>
	)
}

export default App
