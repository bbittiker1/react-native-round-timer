import React, { useState } from "react";
import { useEffect, useRef } from "react";
import clsx from "clsx";
import UIfx from "uifx";

//
// import Sound from 'react-sound';
//
import bellAudio from "../../sounds/bell.mp3";
import longBellAudio from "../../sounds/long-bell.mp3";
import getReadyAudio from "../../sounds/get-ready.mp3";
import threeBellAudio from "../../sounds/3-bells.mp3";

import { Button, Container, Typography, Card, CardContent, CardHeader, Grid } from "@material-ui/core";

import { timerStyles } from "../../styles/timer";
import {load} from "dotenv";

import { translateSeconds, getKeyByValue, loadAudioResource } from "../../selectors";



const useInterval = (callback, delay, currState) => {
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

		if (delay !== null && currState !== states.STARTED) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}

	}, [delay, currState]);
};

const states = {
	"READY": 0,
	"STARTED": 1,
	"PAUSED": 2,
	"FINISHED": 3,
	"RESET": 4
};

export function RoundTimer(props) {
	const { initRoundSeconds, initBreakSeconds, initRoundNotifySeconds, initRounds, initNumRounds,
		initBreakNotifySeconds, initRoundMessage, resetFight, timer } = props;

	const [delay, setDelay] = useState(1000 );
	const [seconds, setSeconds] = useState( initRoundSeconds );
	const [isPaused, setPaused] = useState( false );
	const [hasRoundStarted, setRoundStarted] = useState (false);
	const [fightMessage, setFightMessage] = useState (initRoundMessage);
	const [fightMessageTitle, setFightMessageTitle] = useState (`${initNumRounds} Rounds`);
	const [currState, setCurrState] = useState(states.READY);
	const classes = timerStyles();
	const [rounds, setRounds] = useState(initRounds);
	const [startButtonDisabled, setStartButtonDisabled] = useState(false);

	let currRound = useRef();

	const bell = loadAudioResource(bellAudio);
	const threeBells = loadAudioResource(threeBellAudio);
	const getReady = loadAudioResource(getReadyAudio);
	const longBell = loadAudioResource(longBellAudio);

	const ticker = (currState) => {
		if (currState === states.STARTED && seconds > 0) {
			setSeconds(seconds => seconds - 1);
		}
	};

	useInterval(() => ticker(currState), delay );

	useEffect(() => {
		switch(currState) {
			case states.READY:
				setFightMessage(initRoundMessage);
				break;
			case states.STARTED:
				setFightMessage(currRound.current.roundMessage);

				if(seconds === 0) {
					if (rounds.length === 0) {
						setCurrState(states.FINISHED);
					} else {
						currRound.current = rounds.shift();

						//
						// Set small delay so user can see "00:00"
						// before next round starts.
						//
						setTimeout(() => {
							setSeconds(currRound.current.seconds);
							setFightMessage(currRound.current.roundMessage);
						}, 1000);
					}
				} else {
					if(!hasRoundStarted) {
						setRoundStarted(true);
						setSeconds(initBreakSeconds);
						setRoundStarted(true);
						setCurrState(states.PAUSED);

						setTimeout(() => {
							setCurrState(states.STARTED);
						}, 1000);
					}
				}

				break;
			case states.PAUSED:
				break;
			case states.FINISHED:
				setSeconds(0);
				setFightMessage("FINISHED");
				break;
			case states.RESET:
				setCurrState(states.FINISHED);
				setRounds(resetFight(initNumRounds, initRoundNotifySeconds, initRoundSeconds));
				setCurrState(states.READY);
				break;
			default:
				console.log("Invalid state: " , currState);
		}

	}, [currState, seconds, hasRoundStarted]);

	const handleReset = () => {
		setRounds(resetFight(initNumRounds, initRoundNotifySeconds, initRoundSeconds));
		setRoundStarted(false);
		setSeconds(initRoundSeconds);
		setCurrState(states.READY);
	};

	const handlePause = () => {
		if( currState === states.PAUSED ) {
			setTimeout(() => {
				setCurrState(states.STARTED);
			}, 1000);
		} else {
			setCurrState(states.PAUSED);
		}

		setCurrState((currState === states.PAUSED) ? states.STARTED : states.PAUSED);
	};

	const handleStart = () => {
		setStartButtonDisabled(true);

		currRound.current = rounds.shift();

		getReady.play();

		setTimeout(() => {
			setCurrState(states.STARTED);
			// setSeconds(initBreakSeconds);
			setStartButtonDisabled(false);
		}, 1000);
	};

	// const handleStop = () => {
	// 	setStartButtonDisabled(true);
	//
	// 	// getReady.play();
	// 	setTimeout(() => {
	// 		setRounds(resetFight(initNumRounds, initRoundNotifySeconds, initRoundSeconds));
	// 		setCurrState(states.READY);
	// 		setSeconds(rounds[1].seconds);
	// 		setStartButtonDisabled(false);
	// 	}, 1000);
	// };

	// const playAudio = () => {
	// 	getReady.play();
	// };

	return (
		<Container component="main" className={classes.root}>
			<Card className={classes.card} elevation={0}>
				<CardHeader
					classes={{
						title: classes.title,
						subheader: classes.subheader,
						avatar: classes.avatar
					}}
					title={fightMessageTitle}
					subheader={ fightMessage }
				/>

				<CardContent className={classes.container}>
					{/*<div>{isLoading ?  "Loading..." : ""}</div>*/}
					{/*<div>{error ? error.msg : ""}</div>*/}

					<div>
						<Grid container className={classes.root} spacing={4}>
							<Grid item xs={12} className={classes.buttonRow}>
								<Typography component="h1" variant="h1">{ translateSeconds(seconds) }</Typography>
							</Grid>

							<Grid item xs={12} className={classes.buttonRow}>
									<div className={classes.buttonSpacer}>
										{ (currState === states.STARTED || currState === states.PAUSED ) &&
										<Button onClick={ () => handleReset() }
												variant="contained"
												color="secondary"
											styles={{marginRight: "20px"}}>
											Stop
										</Button>
										}

										{  ((currState === states.STARTED && !isPaused ) || ( isPaused && hasRoundStarted ) ) &&
										<Button onClick={() => handlePause() }
												variant="contained"
												className={classes.pause}
												disabled={ (currState === states.PAUSED && hasRoundStarted ) }>
											{ (currState === states.PAUSED && hasRoundStarted ) ? "Pause" : (currState === states.PAUSED) ? "Resume" : "Pause" }
										</Button>
										}
									</div>

									<div>
										{ currState === states.READY &&
										<Button onClick={() => {
											setStartButtonDisabled(true);
											handleStart(); }}
												variant="contained"
												className={clsx(classes.start, { [classes.pause]: hasRoundStarted, })}
												disabled={startButtonDisabled}
										>
											Start
										</Button>
										}
									</div>

									<div>
										{ currState === states.FINISHED &&
										<Button onClick={ () => handleReset() }
												variant="contained"
												color="primary">
											Reset
										</Button>
										}
									</div>
							</Grid>
							<Grid item xs={12}>
								<Typography component="h6" variant="h6">{ `Rounds ${ translateSeconds(initRoundSeconds)} / Notice ${initRoundNotifySeconds}s` }</Typography>
								<Typography component="h6" variant="h6">{ `Breaks ${ translateSeconds(initBreakSeconds)} / Notice ${initBreakNotifySeconds}s` }</Typography>
							</Grid>


							<Grid item xs={12}>
								{/*<Typography component="h6" variant="h6">State: { getKeyByValue(states, currState) }</Typography>*/}
								{/*<Typography component="h6" variant="h6">Rounds: { rounds.length.toString() }</Typography>*/}
								{/*<Typography component="h6" variant="h6">Seconds: { seconds }</Typography>*/}

								{/*<div>*/}
								{/*	<button onClick={() => playAudio}>*/}
								{/*		<span>Play Audio</span>*/}
								{/*	</button>*/}
								{/*	<audio className="audio-element">*/}
								{/*		<source src="https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3"></source>*/}
								{/*	</audio>*/}
								{/*</div>*/}
							</Grid>
						</Grid>
					</div>
				</CardContent>
			</Card>
		</Container>
	);

}

