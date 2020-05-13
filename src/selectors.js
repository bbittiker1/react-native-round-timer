import { constants } from "./constants";
import UIfx from "uifx";


export const audioConfig = {
    volume: constants.audio.volume,
    throttleMs: constants.audio.throttleMs,
};

export const loadAudioResource = (audioResource) => {
    return new UIfx( audioResource, audioConfig );
};

export const translateSeconds = (seconds) => {
    const mins = Math.floor(seconds / 60).toFixed(0);
    const _seconds = seconds % 60;

    return `${mins < 10 ? "0" + mins : mins}:${_seconds < 10 ? "0" + _seconds : _seconds}`;
};

export const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
};


export class Timer2 {
    constructor(seconds, type, roundNumber, roundMessage) {
        this.seconds = seconds;
        this.type = type;
        this.roundNumber = roundNumber;
        this.roundMessage = roundMessage;
    }
}

export const loadTimers = (numRounds, breakSeconds, roundSeconds) => {
    let roundTimers = [];
    let totalSeconds = 0;
    for (let i = 0; i < numRounds; i++) {
        const breakRoundMessage = (i === 0) ? "Get Ready" : "Break";
        const fightRoundNumber = i + 1;
        const fightRoundMessage = `Round ${fightRoundNumber} of ${numRounds}`;

        const breakTimer = new Timer2(
            breakSeconds,
            "notify",
            i,
            breakRoundMessage);

        const roundTimer = new Timer2(
            roundSeconds,
            "round",
            fightRoundNumber,
            fightRoundMessage);

        roundTimers.push(breakTimer);
        roundTimers.push(roundTimer);

        totalSeconds += (breakTimer.seconds + roundTimer.seconds);
    }

    return { roundTimers, totalSeconds };
};
