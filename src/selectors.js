

import { constants } from "./constants";
import UIfx from "uifx";


export const audioConfig = {
    volume: constants.audio.volume,
    throttleMs: constants.audio.throttleMs,
};

export const loadAudioResource = (audioResource) => {
    return new UIfx( audioResource, audioConfig );
};