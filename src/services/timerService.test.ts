import { calcTimerRemainTime } from "./timerService"

// ========== calcTimerRemainTime ==========
test("calcTimerRemainTime with 1 minute and 5 seconds to be 65000 milliseconds", () => {
	expect(calcTimerRemainTime({ minute: 1, second: 5 })).toBe(65000)
})

test("calcTimerRemainTime with 0 minute and 0 second to be 0", () => {
	expect(calcTimerRemainTime({ minute: 0, second: 0 })).toBe(0)
})

test("calcTimerRemainTime with empty string input to be 0", () => {
	expect(calcTimerRemainTime({ minute: "", second: 5 })).toBe(0)
})
