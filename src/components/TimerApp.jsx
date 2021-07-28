import React, { useEffect, useState } from "react"
import TimerMain from "../features/timers/TimerMain"
import ControlPanel from "./ControlPanel"
import { Box, Container, makeStyles } from "@material-ui/core"

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

function debounce(fn, ms) {
	let timer = null

	return () => {
		clearTimeout(timer)

		timer = setTimeout(() => {
			timer = null
			fn.apply(this, arguments)
		}, ms)
	}
}

const TimerApp = () => {
	const classes = useStyles()
	const [heightOfControlPanel, setHeightOfControlPanel] = useState(0)
	const [heightOfMainSection, setHeightOfMainSection] = useState(0)

	const setHeight = () => {
		const heightOfMainSection = window.innerHeight - heightOfControlPanel
		// console.log("set height is called", window.innerHeight, heightOfMainSection)
		setHeightOfMainSection(heightOfMainSection)
	}

	useEffect(() => {
		setHeight()
	}, [heightOfControlPanel])

	useEffect(() => {
		const debouncedSetHeight = debounce(setHeight, 1000)
		window.addEventListener("resize", debouncedSetHeight)

		return () => {
			window.removeEventListener("resize", debouncedSetHeight)
		}
	})

	return (
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
	)
}

export default TimerApp
