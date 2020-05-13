import React, { useEffect, useState, useRef } from "react";
import { Button, Typography, Grid } from "@material-ui/core";
import { timerStyles } from "../../styles/timer";
import clsx from "clsx";

import { constants } from "../../constants";
import CountdownTimer from "./CountdownTimer";

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




export function RoundTimer(props) {
	const [timers, setTimers] = useState(props.timers);
	const [seconds, setSeconds] = useState("00:00");
	const [delay, setDelay] = useState(null);
	const [isStart, setStart] = useState(false);
	const [isPaused, setPaused] = useState(false);
	const [roundMessage, setRoundMessage] = useState("Welcome!");
	const classes = timerStyles();

	let currRound = useRef();

	const { reloadTimers } = props;

	const ticker = () => {
		if(!currRound || !currRound.current ) {
			console.log("no curr timer");
			return;
		}

		if(currRound.current.isPaused ) {
			return;
		}

		const hasNextRound = () => {
			return timers.length > 0;
		};

		const getNextRound = () => {
			return timers.shift();
		};

		setSeconds(currRound.current.getFormattedTime());
		setRoundMessage(currRound.current.message);

		if(currRound.current.seconds === 0) {
			if(hasNextRound()) {
				currRound.current = getNextRound();
				currRound.current.start();
			} else {
				setRoundMessage("Fight over!");
				setStart(false);	// Reset false flag
			}
		}
	};

	useEffect(() => {
		if(isStart) {
			currRound.current = timers.shift();
			setRoundMessage(currRound.current.message);
			setDelay(constants.oneSecondInMillis);

			setTimeout(() => currRound.current.start(), constants.oneSecondInMillis);
		} else {
			setDelay(null);
		}

	}, [isStart]);

	useInterval(() => ticker(), delay );

	const handlePause = () => {
		setPaused(!isPaused);

		if(isPaused) {
			setDelay(constants.oneSecondInMillis);

			setTimeout(() => {
				currRound.current.start();
			}, 300)

		} else {
			currRound.current.stop();
			setDelay(null);
		}
	};

	const handleStart = () => {
		if(timers.length === 0) {
			// props.timers = props.reloadTimers();
			setTimers(props.reloadTimers());
		}

		setStart(true);
	};

	return (
        <Grid container className={classes.root} spacing={4} style={{border: "solid red 1px"}}>
			<Grid item xs={12} className={classes.buttonRow}>
				<Typography component="h5" variant="h5">{roundMessage}</Typography>
			</Grid>
            <Grid item xs={12} className={classes.buttonRow}>
                    <div className={classes.buttonSpacer}>
                        <Button onClick={() => handlePause() }
                                variant="contained"
                                className={clsx(classes.pause, { [classes.stop]: isPaused, })}
                                disabled={!isStart}>
							{  (isPaused) ? "Resume" : "Pause"  }
                        </Button>
                    </div>

                    <div>
                        <Button onClick={() => handleStart()}
								variant="contained"
								className={classes.start}
								disabled={isStart}>
                            Start
                        </Button>
                    </div>
            </Grid>

			<Grid item xs={12}>
				<Typography component="h6" variant="h6" >
					{seconds}
				</Typography>
			</Grid>
        </Grid>
	);
}

