import {
	createEntityAdapter,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit"
import {
	createTimer,
	calcTimerRemainTime,
	isValidTimeInput,
} from "../../services/timerService"
import TimerStatus from "./TimerStatus"
import { loadTimersState } from "../../services/localStorage"
import TimerType, { TimersStateType } from "../../types/Timer"
import { PayloadAction } from "@reduxjs/toolkit"
import TimeUnit from "./TimeUnit"
import { RootState } from "../../types/redux"

const timersAdapter = createEntityAdapter<TimerType>()

const getInitialState = () => {
	const loadedState = loadTimersState()

	let state: TimersStateType = {
		showCountdown: false,
		delay: 1000,
		activeTimerId: null,
		activeTimerMusic: "",
		status: TimerStatus.STOPPED,
		loop: {
			current: 1,
			total: 1,
		},
		mute: {
			alarm: false,
			music: false,
		},
		ids: [],
		entities: {},
	}

	if (
		loadedState &&
		loadedState.entities &&
		loadedState.ids &&
		loadedState.totalLoop
	) {
		// read timers from local storage
		state = {
			...state,
			entities: loadedState.entities,
			ids: loadedState.ids,
			loop: {
				...state.loop,
				total: loadedState.totalLoop,
			},
		}
	} else {
		// create a new timer
		const newTimer = createTimer()

		state = {
			...state,
			ids: [...state.ids, newTimer.id],
			entities: {
				...state.entities,
				[newTimer.id]: newTimer,
			},
		}
	}

	return timersAdapter.getInitialState(state)
}

const timersSlice = createSlice({
	name: "timers",
	initialState: getInitialState(),
	reducers: {
		timersInitialized: timersAdapter.addMany,
		timerAdded: timersAdapter.addOne,
		timerDeleted: timersAdapter.removeOne,
		timerSetLabel(
			state,
			action: PayloadAction<{ timerId: string; label: string }>
		) {
			const { timerId, label } = action.payload
			const timer = state.entities[timerId]

			if (timer) {
				timer.label = label
			}
		},
		timerSetTime: {
			reducer(
				state,
				action: PayloadAction<{
					timerId: string
					value: number | ""
					timeUnit: TimeUnit
				}>
			) {
				const { timerId, value, timeUnit } = action.payload
				const timer = state.entities[timerId]

				if (timer) {
					timer[timeUnit] = value

					if (timer.minute !== "" && timer.second !== "" && value !== "") {
						timer.remainTime = isValidTimeInput({ value })
							? (timer.minute * 60 + timer.second) * 1000
							: 0
					}
				}
			},
			prepare(timerId, value, timeUnit) {
				return {
					payload: { timerId, value, timeUnit },
				}
			},
		},
		timerSetMusic(
			state,
			action: PayloadAction<{ timerId: string; music: string }>
		) {
			const { timerId, music } = action.payload
			const timer = state.entities[timerId]

			if (timer) {
				timer.music = music
			}
		},
		timerDeductTime: {
			reducer(
				state,
				action: PayloadAction<{ timerId: string; delay: number }>
			) {
				const { timerId, delay } = action.payload
				const timer = state.entities[timerId]

				if (timer) {
					timer.remainTime -= delay
				}
			},
			prepare({ timerId, delay }: { timerId: string; delay: number }) {
				if (!delay) {
					delay = 1000
				}
				return { payload: { timerId, delay } }
			},
		},
		timerStatusUpdated(state, action: PayloadAction<{ status: TimerStatus }>) {
			const { status } = action.payload
			state.status = status
		},
		timerSetNextTimer(state) {
			const timers = Object.values(state.entities)
			for (const [index, timer] of timers.entries()) {
				if (timer && timer.remainTime > 0) {
					state.activeTimerId = timer.id
					state.activeTimerMusic = timer.music
					break
				}
				// reset if the last timer is over
				if (index === timers.length - 1) {
					state.status = TimerStatus.STOPPED
				}
			}
		},
		timerDelayUpdated(state, action: PayloadAction<{ delay: number }>) {
			const { delay } = action.payload
			state.delay = delay
		},
		timerResetTimers(state) {
			state.activeTimerId = null
			state.activeTimerMusic = ""
			state.status = TimerStatus.STOPPED
			Object.values(state.entities).forEach((timer) => {
				if (timer) {
					timer.remainTime = calcTimerRemainTime({
						minute: timer.minute,
						second: timer.second,
					})
				}
			})
			state.loop.current = 1
		},
		timerResetRemainTime(state) {
			Object.values(state.entities).forEach((timer) => {
				if (timer) {
					timer.remainTime = calcTimerRemainTime({
						minute: timer.minute,
						second: timer.second,
					})
				}
			})
		},
		timerSetShowCountdown(
			state,
			action: PayloadAction<{ showCountdown: boolean }>
		) {
			const { showCountdown } = action.payload
			state.showCountdown = showCountdown
		},
		timerSetCurrentLoop(state, action: PayloadAction<number>) {
			const current = action.payload
			state.loop.current = current
		},
		timerSetTotalLoop(state, action: PayloadAction<number | "">) {
			const total = action.payload
			state.loop.total = total
		},
		timerToggledMute(
			state,
			action: PayloadAction<{ muteType: "alarm" | "music" }>
		) {
			const { muteType } = action.payload
			state.mute[muteType] = !state.mute[muteType]
		},
	},
})

export default timersSlice.reducer

export const {
	timersInitialized,
	timerAdded,
	timerDeleted,
	timerSetLabel,
	timerSetTime,
	timerSetMusic,
	timerDeductTime,
	timerStatusUpdated,
	timerSetNextTimer,
	timerDelayUpdated,
	timerResetTimers,
	timerResetRemainTime,
	timerSetShowCountdown,
	timerSetCurrentLoop,
	timerSetTotalLoop,
	timerToggledMute,
} = timersSlice.actions

export const {
	selectAll: selectTimers,
	selectById: selectTimerById,
	selectTotal,
} = timersAdapter.getSelectors((state: RootState) => state.timers)

export const selectShowCountdown = (state: RootState) =>
	state.timers.showCountdown

export const selectTimerDelay = (state: RootState) => state.timers.delay

export const selectActiveTimerId = (state: RootState): string | null =>
	state.timers.activeTimerId

export const selectTimerStatus = (state: RootState) => state.timers.status

export const selectLastTimerId = createSelector(
	selectTimers,
	selectTotal,
	(timers, total) => {
		const lastTimer = Object.values(timers)[total - 1]
		return lastTimer.id
	}
)

export const selectTimerLoopCurrentCount = (state: RootState) =>
	state.timers.loop.current

export const selectTimerLoopTotalCount = (state: RootState) =>
	state.timers.loop.total

export const selectTimerIsMuted = (state: RootState) => state.timers.mute.music

export const selectActiveTimerMusic = (state: RootState) =>
	state.timers.activeTimerMusic
