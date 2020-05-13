export default class CountdownTimer {
    constructor(options) {
        this.seconds = options.seconds;
        // this.updateStatus = options.onUpdateStatus;
        // this.counterEnd = options.onCounterEnd;
        this.timer = {};
        this.message = options.message;
    }

    decrementCounter() {
        if (this.seconds === 0) {
            this.stop();
        } else {
            this.seconds--;
        }
    }

    start() {
        clearInterval(this.timer);
        this.timer = 0;
        this.timer = setInterval( () => {
            this.decrementCounter();
        }, 1000);
    }

    getFormattedTime() {
        const _mins = Math.floor(this.seconds / 60).toFixed(0);
        const _seconds = this.seconds % 60;
        return `${_mins < 10 ? "0" + _mins : _mins}:${_seconds < 10 ? "0" + _seconds : _seconds}`;
    }

    stop() {
        clearInterval(this.timer);

        if(this.seconds > 0) {
            // this.isPaused = true;
            // console.log("paused.");
        }

    };
}
