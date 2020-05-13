import React, { useState } from "react";
import { useEffect, useRef, use } from "react";
import clsx from "clsx";
// import UIfx from "uifx";

// import Config from "../../config";
//
// import Sound from 'react-sound';
//
// import bellAudio from "../../sounds/bell.mp3";
// import longBellAudio from "../../sounds/long-bell.mp3";
// import getReadyAudio from "../../sounds/get-ready.mp3";
// import threeBellAudio from "../../sounds/3-bells.mp3";

import { Button, Typography, Grid } from "@material-ui/core";

import { timerStyles } from "../../styles/timer";
// import {load} from "dotenv";

// import { translateSeconds, getKeyByValue, loadAudioResource } from "../../selectors";



const translateSeconds = (seconds) => {
	const mins = Math.floor(seconds / 60).toFixed(0);
	const _seconds = seconds % 60;

	console.log(`${mins < 10 ? "0" + mins : mins}:${_seconds < 10 ? "0" + _seconds : _seconds}`);

	document.getElementById("secondsDisplay").innerHTML =
		`${mins < 10 ? "0" + mins : mins}:${_seconds < 10 ? "0" + _seconds : _seconds}`;
};

class Countdown {
	constructor(options) {
		this.seconds = options.seconds;
		this.updateStatus = options.onUpdateStatus;
		this.counterEnd = options.onCounterEnd;
		this.timer = {};
		this._instance = this;
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
		// seconds = options.seconds;
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

const nextRound = () => {

	console.log(myTimers);

	if(myTimers.length > 0) {
		currTimer = myTimers.shift();
		currTimer.start();

		// return myTimers.shift();
		// currTimer.start();
	} else {
		currTimer.stop();
		// loadTimers();
		// currTimer = myTimers.shift();
		console.log("fight ended.");
	}
};



function loadTimers() {
	let x = new Countdown({
		seconds: 5,  // number of seconds to count down
		onUpdateStatus: translateSeconds,
		onCounterEnd: () => {
			console.log("round ended");
			nextRound();
		}
	});

	let y = new Countdown({
		seconds: 3,  						// number of seconds to count down
		onUpdateStatus: translateSeconds, 	// callback for each second
		onCounterEnd: () => {
			nextRound();
		}
	});

	let z = new Countdown({
		seconds: 3,  						// number of seconds to count down
		onUpdateStatus: translateSeconds, 	// callback for each second
		onCounterEnd: () => {
			nextRound();
		}
	});

	myTimers.push(x);
	myTimers.push(y);
	myTimers.push(z);

	return myTimers.shift();
}

currTimer = loadTimers();

export function RoundTimer(props) {
	const classes = timerStyles();

	const handleReset = () => {
	};

	const handlePause = () => {
		currTimer.stop();
	};

	const handleStart = () => {
		if(myTimers.length === 0) {
			currTimer = loadTimers();
		}

		currTimer.start();
	};

	return (
        <Grid container className={classes.root} spacing={4} style={{border: "solid red 1px"}}>
            <Grid item xs={12} className={classes.buttonRow}>
                    <div className={classes.buttonSpacer}>
                        <Button onClick={() => handlePause() }
                                variant="contained"
                                className={classes.pause}
                                disabled={false}>
                          	Pause
                        </Button>
                    </div>

                    <div>
                        <Button onClick={() => { handleStart(); }}
                                variant="contained"
                                className={classes.start}
                                disabled={false}
                        >
                            Start
                        </Button>
                    </div>
            </Grid>

			<Grid item xs={12}>
				{/*<Typography component="h6" variant="h6">Remaining: { translateSeconds(seconds) }</Typography>*/}
				<Typography component="h6" variant="h6" >
					<div id="secondsDisplay" />
				</Typography>
			</Grid>
        </Grid>
	);
}

