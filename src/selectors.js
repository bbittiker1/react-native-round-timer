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