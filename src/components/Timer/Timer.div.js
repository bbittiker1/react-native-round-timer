import React, { useEffect, useState, useRef } from "react";
import { Button, Typography, Grid } from "@material-ui/core";
import { timerStyles } from "../../styles/timer";


const useInterval = (callback, delay) => {
	const savedCallback = useRef();

	// Remember the latest function.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}

		if (delay !== null ) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}

	}, [delay]);
};


const translateSeconds = (seconds) => {
	const mins = Math.floor(seconds / 60).toFixed(0);
	const _seconds = seconds % 60;

	document.getElementById("secondsDisplay").innerHTML =
		`${mins < 10 ? "0" + mins : mins}:${_seconds < 10 ? "0" + _seconds : _seconds}`;
};

const getFightEnded = () => {
	console.log("ended");

	return (myTimers.length === 0 )
};

class CountdownTimer {
	constructor(options) {
		this.seconds = options.seconds;
		this.updateStatus = options.onUpdateStatus;
		this.counterEnd = options.onCounterEnd;
		this.timer = {};
		this.message = options.message;
	}

	decrementCounter() {
		this.updateStatus(this.seconds);

		if (this.seconds === 0) {
			this.counterEnd();
			this.stop();
		}

		this.seconds--;
	}

	start() {
		clearInterval(this.timer);
		this.timer = 0;
		this.timer = setInterval( () => {
			this.decrementCounter();
		}, 1000);
	}

	stop() {
		if(this.seconds > 0) {
			console.log("paused.");
		}

		clearInterval(this.timer);
	};
}

const myTimers = [];

let currTimer = null;

let complete = false;

const setRoundMessage = (msg) => {
	document.getElementById("roundMessage").innerHTML = msg;
};

const nextRound = () => {
	if(myTimers.length > 0) {
		currTimer = myTimers.shift();
		setRoundMessage(currTimer.message);
		currTimer.start();
	} else {
		getFightEnded();
		complete = true;
		setRoundMessage("Fight ended!");
	}
};

function loadTimers() {
	const x = new CountdownTimer({
		seconds: 5,  // number of seconds to count down
		onUpdateStatus: translateSeconds,
		onCounterEnd: () => {
			console.log("Round ended!");
			nextRound();
		},
		message: "Get Ready!",
		type: "ready"
	});

	const y = new CountdownTimer({
		seconds: 3,  						// number of seconds to count down
		onUpdateStatus: translateSeconds, 	// callback for each second
		onCounterEnd: () => {
			console.log("Round ended!");
			nextRound();
		},
		message: "Fight!",
		type: "fight"
	});

	const z = new CountdownTimer({
		seconds: 3,  						// number of seconds to count down
		onUpdateStatus: translateSeconds, 	// callback for each second
		onCounterEnd: () => {
			nextRound();
		},
		message: "Break!",
		type: "break"
	});

	myTimers.push(x);
	myTimers.push(y);
	myTimers.push(z);

	return myTimers.shift();
}

export function RoundTimer(props) {
	const [isPaused, setPaused] = useState(false);
	const [isStarted, setStarted] = useState(false );
	const [isOver, setOver] = useState( getFightEnded() );

	const [currTimer, setCurrTimer] = useState(myTimers.shift());


	// const [seconds, setSeconds] = useState(myTimers.shift().seconds);

	const ref = useRef(currTimer);


	// const timers = useRef(myTimers);

	const classes = timerStyles();

	const ticker = (cb) => {
		// console.log("tick", t.length);

		if (cb.call()) {
			console.log("fight over");

			setStarted(false);
		}
	};

	useInterval(() => ticker(getFightEnded), 1000 );

	useEffect(() => {
		// currTimer = loadTimers();
		setRoundMessage(currTimer.message);
	}, []);

	useEffect(() => {
		console.log(isOver);
		setStarted(false);

	}, [isOver]);


	const handlePause = () => {
		setPaused(!isPaused);

		if(isPaused) {
			currTimer.start();
		} else {
			currTimer.stop();
		}
	};

	const handleStart = () => {
		// if(myTimers.length === 0) {
		// 	currTimer = loadTimers();
		// }
		//
		// setStarted(true);
		// setRoundMessage(currTimer.message);
		currTimer.start();
	};

	return (
        <Grid container className={classes.root} spacing={4} style={{border: "solid red 1px"}}>
			<Grid item xs={12} className={classes.buttonRow}>
				<Typography component="h5" variant="h5"><div id="roundMessage" /></Typography>
			</Grid>
            <Grid item xs={12} className={classes.buttonRow}>
                    <div className={classes.buttonSpacer}>
                        <Button onClick={() => handlePause() }
                                variant="contained"
                                className={classes.pause}
                                disabled={false}>
							{ isPaused ? "Resume" : "Pause" }
                        </Button>
                    </div>

                    <div>
                        <Button onClick={() => handleStart()}
								variant="contained"
								className={classes.start}
								disabled={isStarted}>
                            Start
                        </Button>
                    </div>
            </Grid>

			<Grid item xs={12}>
				<Typography component="h6" variant="h6" >
					{/*<div id="secondsDisplay" />*/}
					{ref.seconds}
				</Typography>
			</Grid>
        </Grid>
	);
}

