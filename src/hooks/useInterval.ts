import { useEffect, useRef } from "react"

type RefObject = () => void

export default function useInterval(
	callback: () => void,
	delay: number | null
) {
	const savedCallback = useRef<RefObject | null>(null)

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback
		if (!savedCallback) {
		}
	}, [callback])

	// Set up the interval.
	useEffect(() => {
		function tick() {
			if (savedCallback && savedCallback.current) {
				savedCallback.current()
			}
		}
		if (delay !== null) {
			let id = setInterval(tick, delay)
			return () => clearInterval(id)
		}
	}, [delay])
}
