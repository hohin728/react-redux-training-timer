import React, { useEffect, useRef } from "react"
import TimerStatus from "../features/timers/TimerStatus"
import { useAppSelector } from "../hooks/hooks"
import {
	selectTimerStatus,
	selectTimerIsMuted,
	selectActiveTimerMusic,
} from "../features/timers/timersSlice"
import ReactHowler from "react-howler"
import muayThaiBgMusic from "../audio/Muay_Thai_Sarama_ROUND_1.mp3"

const MusicPlayer = () => {
	const timerStatus = useAppSelector(selectTimerStatus)
	const isMuted = useAppSelector(selectTimerIsMuted)
	const music = useAppSelector(selectActiveTimerMusic)

	const musicPlayer = useRef<ReactHowler>(null)

	useEffect(() => {
		// play the music from the beginning once timer is changed
		if (musicPlayer && musicPlayer.current) {
			musicPlayer.current.seek(0)
		}
	})

	return (
		<ReactHowler
			src={muayThaiBgMusic}
			playing={timerStatus === TimerStatus.RUNNING && music !== ""}
			mute={isMuted}
			ref={musicPlayer}
			loop={true}
			html5={true}
		/>
	)
}

export default MusicPlayer
