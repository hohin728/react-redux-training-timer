import React, { useEffect, useState, useCallback } from "react"
import TimerMain from "../features/timers/TimerMain"
import ControlPanel from "./ControlPanel"
import Settings from "../features/settings/Settings"
import { Box, Paper, makeStyles } from "@material-ui/core"
import MusicPlayer from "./MusicPlayer"

const useStyles = makeStyles({
	app: {
		overflow: "hidden",
		height: "100%",
		borderRadius: 0,
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
})

const TimerApp = () => {
	const classes = useStyles()
	const [heightOfControlPanel, setHeightOfControlPanel] = useState(0)
	const [heightOfMainSection, setHeightOfMainSection] = useState(0)
	const [modalIsOpen, openModal] = useState(false)

	const setHeight = () => {
		const heightOfMainSection = window.innerHeight - heightOfControlPanel
		// console.log("set height is called", window.innerHeight, heightOfMainSection)
		setHeightOfMainSection(heightOfMainSection)
	}

	const handleModalStatus = (
		e: {} | React.ChangeEvent<Element>,
		open: boolean
	) => openModal(open)

	useCallback(setHeight, [heightOfControlPanel])

	useEffect(() => {
		setHeight()
		window.addEventListener("resize", setHeight)

		return () => {
			window.removeEventListener("resize", setHeight)
		}
	})

	return (
		<Paper elevation={0} className={`App ${classes.app}`}>
			<Box>
				<TimerMain heightOfMainSection={heightOfMainSection} />
			</Box>

			<Box className={classes.appBar}>
				<ControlPanel
					setHeightOfControlPanel={setHeightOfControlPanel}
					handleModalStatus={handleModalStatus}
				/>
			</Box>

			<MusicPlayer />

			<Settings open={modalIsOpen} handleOpen={handleModalStatus} />
		</Paper>
	)
}

export default TimerApp
