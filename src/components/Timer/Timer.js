import React, { useState } from "react";
import { useEffect, useRef } from "react";
import clsx from "clsx";

import UIfx from "uifx"
import bellAudio from "../../sounds/bell.mp3";
import longBellAudio from "../../sounds/long-bell.mp3";
import getReadyAudio from "../../sounds/get-ready.mp3";
import threeBellAudio from "../../sounds/3-bells.mp3";

// import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core";

import { Avatar, Button, Container, Typography, Card, CardContent, CardHeader } from "@material-ui/core";

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
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
};


export function RoundTimer(props) {
	const { initSeconds, initRounds } = props;

	const [delay, setDelay] = useState(1000 );
	const [seconds, setSeconds] = useState( initRounds[0].seconds );
	// const [notifySeconds, setNotifySeconds] = useState( initNotifySeconds );
	const [isPaused, setPaused] = useState( false );
	const [isRoundComplete, setRoundComplete] = useState( false );
	const [isFightComplete, setFightComplete] = useState( false );
	// const [isNotifyComplete, setNotifyComplete] = useState( false );
	const [hasStarted, setStarted] = useState (false);
	const [fightMsg, setFightMsg] = useState (`Round 1 of ${initRounds.length / 2 }`);
	const [numRounds, setNumRounds] = useState ( initRounds.length );
	// const [currRound, setCurrRound] = useState(0);
	const classes = timerStyles();
	const [rounds, setRounds] = useState(initRounds);

	let currRound = useRef(0);

	const bell = new UIfx(
		bellAudio,
		{
			volume: 0.4, // number between 0.0 ~ 1.0
			throttleMs: 100
		}
	);
	const threeBells = new UIfx(
		threeBellAudio,
		{
			volume: 0.4, // number between 0.0 ~ 1.0
			throttleMs: 100
		}
	);

	const getReady = new UIfx(
		getReadyAudio,
		{
			volume: 0.4, // number between 0.0 ~ 1.0
			throttleMs: 100
		}
	);

	const longBell = new UIfx(
		longBellAudio,
		{
			volume: 0.4, // number between 0.0 ~ 1.0
			throttleMs: 100
		}
	);

	useInterval(() => {
		if(( hasStarted && !isPaused ) && currRound.current < numRounds) {
			setSeconds( seconds => seconds - 1 );
		}
	}, delay );

	useEffect(() => {
		if( seconds === 0 && hasStarted ) {
			setState(false,  true, false);

			currRound.current = (currRound.current + 1);

			if(currRound.current < numRounds) {
				setSeconds(rounds[currRound.current].seconds);

				if (rounds[currRound.current].name === "notify") {
					bell.play();
					setTimeout(() => {
						setFightMsg("Break");
						setState(false, true, true);
					}, 1200);
				} else {
					longBell.play();
					setTimeout(() => {
						setFightMsg(`Round ${ rounds[currRound.current].roundNumber }`);
						setState(false,  true, true);
					}, 1200);
				}
			} else {
				threeBells.play();

				setTimeout(() => {
					setFightMsg(`Finished!!!!!`);

					setState(false,  true, false, true);
				}, 1200);
			}
		}
	}, [hasStarted, numRounds, isRoundComplete, isPaused, seconds, rounds] );

	const setState = (isPaused, isRoundComplete, hasStarted, isFightComplete = false ) => {
		setPaused(isPaused);
		setRoundComplete(isRoundComplete);
		setStarted(hasStarted);
		setFightComplete(isFightComplete)
	};

	const handleReset = () => {
		setRounds(initRounds);
		setSeconds( rounds[0].seconds );
		currRound.current = 0;
		setFightMsg(`Round 1 of ${initRounds.length / 2 }`);
		setState(false, true, false, false);
	};

	const handlePause = () => {
		setState(!isPaused, false, true );
	};

	const handleStart = () => {
		setFightMsg("Get Ready");

		// playback
		getReady.play();

		setTimeout(() => {
			setState(false, false, true );
		}, 1300);
	};

	const translateSeconds = (s) => {
		const mins = Math.floor(s / 60).toFixed(0);
		const secs = s % 60;

		return `${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`;
	};

	const getPauseDisabled = (hasStarted, isPaused) => {
		return (hasStarted && !isPaused);
	};

	return (
		<Container component="main" className={classes.root}>
			<Card className={classes.card} elevation={0}>
				<CardHeader
					classes={{
						title: classes.title,
						subheader: classes.subheader,
						avatar: classes.avatar
					}}
					avatar={
						<Avatar aria-label={"Round Timer"} className={classes.avatar} src="/glove.png">
						</Avatar>
					}
					// action={
					// 	<IconButton disabled={false} onClick={() => setReloadData(!reloadData)} title={"Refresh"}>
					// 		<i className={isLoading ? "fa fa-refresh fa-spin" : "fa fa-refresh"}  />
					// 	</IconButton>
					// }
					title={"Round Timer"}
					subheader={ fightMsg }
				/>

				<CardContent className={classes.container}>
					{/*<div>{isLoading ?  "Loading..." : ""}</div>*/}
					{/*<div>{error ? error.msg : ""}</div>*/}
					<div>
						{/*<div className={classes.timerRow}>*/}
						{/*	<Typography component="h1" variant="h1">{ translate(notifySeconds) }</Typography>*/}
						{/*</div>*/}

						<div className={classes.timerRow}>
							<Typography component="h1" variant="h1">{ translateSeconds(seconds) }</Typography>
						</div>

						<div className={classes.buttonRow}>
							<div className={classes.buttonSpacer}>
								{ hasStarted &&
								<Button onClick={ () => handleReset() }
										variant="contained"
										color="secondary">
									Stop
								</Button>
								}
								{ isFightComplete &&
								<Button onClick={ () => handleReset() }
										variant="contained"
										color="primary">
									Reset
								</Button>
								}
							</div>
							<div>
								{ !hasStarted && !isFightComplete &&
								<Button onClick={() => handleStart() }
										variant="contained"
										className={clsx(classes.start, { [classes.pause]: hasStarted, })}>
									Start
								</Button>
								}
							</div>

							<div>
								{ hasStarted &&
								<Button onClick={() => handlePause() }
										variant="contained"
										className={clsx(classes.start, { [classes.pause]: hasStarted, })}
										disabled={ getPauseDisabled() }>
									{ isPaused ? "Resume" : "Pause" }
								</Button>
								}
							</div>

						</div>
					</div>

					<div>
						{/*<h4>Delay: { delay }</h4>*/}
						{/*<h4>Paused: { isPaused.toString() }</h4>*/}
						{/*<h4>Complete: { isRoundComplete.toString() }</h4>*/}
						{/*<h4>Started: { hasStarted.toString() }</h4>*/}
						{/*<h4>CurrRound: { currRound.current.toString() }</h4>*/}
						{/*<h4>NumRounds: { numRounds }</h4>*/}
						{/*<h4>Curr Round Name: { getCurrRoundName() }</h4>*/}
						{/*<h4>Curr Round Seconds: { getCurrRoundSeconds() }</h4>*/}
						{/*<h4>InitRounds: { initRounds.toString() }</h4>*/}
					</div>
				</CardContent>
			</Card>



					{/*</div>*/}
				{/*</form>*/}
			{/*</div>*/}
		</Container>
	);

}

