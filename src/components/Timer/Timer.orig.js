import React, { useState } from "react";
import { useEffect, useRef } from "react";
import clsx from "clsx";
import UIfx from "uifx";

import Sound from 'react-sound';

import { loadAudioResource } from "../../selectors";
import bellAudio from "../../sounds/bell.mp3";
import longBellAudio from "../../sounds/long-bell.mp3";
import getReadyAudio from "../../sounds/get-ready.mp3";
import threeBellAudio from "../../sounds/3-bells.mp3";

import { Avatar, Button, Container, Typography, Card, CardContent, CardHeader, Grid } from "@material-ui/core";

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
	const { initRoundSeconds, initBreakSeconds, initRoundNotifySeconds, initRounds, initNumRounds, initNumTimers,
		initBreakNotifySeconds } = props;

	const [delay, setDelay] = useState(1000 );
	const [seconds, setSeconds] = useState( initRounds[0].seconds );
	const [isPaused, setPaused] = useState( false );
	const [isRoundComplete, setRoundComplete] = useState( false );
	const [isFightComplete, setFightComplete] = useState( false );
	const [hasRoundStarted, setRoundStarted] = useState (false);
	const [hasFightStarted, setFightStarted] = useState (false);

	const [numRounds, setNumRounds] = useState ( initNumRounds );
	const [numTimers, setNumTimers] = useState ( initRounds.length );
	const [roundSeconds, setRoundSeconds] = useState ( initRoundSeconds );
	const [breakSeconds, setBreakSeconds] = useState ( initBreakSeconds );
	const [breakNotifySeconds, setBreakNotifySeconds] = useState ( initBreakNotifySeconds );
	const [roundNotifySeconds, setRoundNotifySeconds] = useState( initRoundNotifySeconds );

	const [fightMsg, setFightMsg] = useState (`${initNumRounds} Rounds`);
	const [fightMsgTitle, setFightMsgTitle] = useState (`${initNumRounds} Rounds`);


	// const [currRound, setCurrRound] = useState(0);
	const classes = timerStyles();
	const [rounds, setRounds] = useState(initRounds);
	const [startButtonDisabled, setStartButtonDisabled] = useState(false);

	let currRound = useRef(0);

	// const audioConfig = getAudioConfig();
	// const bell = loadAudioResource(bellAudio);
	// const threeBells = loadAudioResource(threeBellAudio);
	// // const getReady = loadAudioResource(getReadyAudio);
	// const longBell = loadAudioResource(longBellAudio);

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

	// const getReady = new UIfx(
	// 	getReadyAudio,
	// 	{
	// 		volume: 0.4, // number between 0.0 ~ 1.0
	// 		throttleMs: 100
	// 	}
	// );

	const getReady = new UIfx({
		asset: getReadyAudio,
		volume: 0.4, // number between 0.0 ~ 1.0
		throttleMs: 100,

	});

	const longBell = new UIfx(
		longBellAudio,
		{
			volume: 0.4, // number between 0.0 ~ 1.0
			throttleMs: 100
		}
	);

	useInterval(() => {
		if(( hasRoundStarted && !isPaused ) && currRound.current < numTimers) {
			setSeconds( seconds => seconds - 1 );
		}
	}, delay );

	useEffect(() => {
		if( seconds === 0 && hasRoundStarted ) {
			setState(false,  true, false, false, true);

			currRound.current = (currRound.current + 1);

			if(currRound.current < numTimers) {
				setSeconds(rounds[currRound.current].seconds);

				if (rounds[currRound.current].name === "notify") {
					bell.play();
					setFightMsg("Break");

					setTimeout(() => {
						setState(false, true, true, false, true);
					}, 1000);
				} else {
					longBell.play();
					setFightMsg(`Round ${ rounds[currRound.current].roundNumber }`);

					setTimeout(() => {
						setState(false,  true, true, false, true);
					}, 1000);
				}
			} else {
				threeBells.play();

				setTimeout(() => {
					setFightMsg(`Finished!!!!!`);
					setState(false,  true, false, true, false);
				}, 1000);
			}
		}
	}, [numTimers, isRoundComplete, isPaused, seconds, rounds, longBell] );

	const setState = (isPaused, isRoundComplete, hasRoundStarted, isFightComplete = false, hasFightStarted = false ) => {
		// setTimeout(() => {
			setPaused(isPaused);
			setRoundComplete(isRoundComplete);
			setRoundStarted(hasRoundStarted);
			setFightComplete(isFightComplete);
			setFightStarted(hasFightStarted);
		// }, 1000);
	};

	const handleReset = () => {
		setRounds(initRounds);
		setSeconds( rounds[0].seconds );
		currRound.current = 0;
		setFightMsg(`Round 1 of ${initRounds.length / 2 }`);
		setState(false, true, false, false);
	};

	const handlePause = () => {
		setState(!isPaused, false, true, false, true );
	};

	const handleStart = () => {
		setStartButtonDisabled(true);
		setFightMsg("Get Ready");

		getReady.play();
		setTimeout(() => {
			setState(false, false, true, false, true);
			setStartButtonDisabled(false);
		}, 1000);
	};  

	const translateSeconds = (s) => {
		const mins = Math.floor(s / 60).toFixed(0);
		const secs = s % 60;

		return `${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`;
	};

	const getPauseDisabled = (hasRoundStarted, isPaused) => {
		return (hasRoundStarted && !isPaused);
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
					// avatar={
					// 	<Avatar aria-label={"Round Timer"} className={classes.avatar} src="/glove.png">
					// 	</Avatar>
					// }
					// action={
					// 	<IconButton disabled={false} onClick={() => setReloadData(!reloadData)} title={"Refresh"}>
					// 		<i className={isLoading ? "fa fa-refresh fa-spin" : "fa fa-refresh"}  />
					// 	</IconButton>
					// }
					title={fightMsgTitle}
					subheader={ fightMsg }
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
										{  hasFightStarted &&
										<Button onClick={ () => handleReset() }
												variant="contained"
												color="secondary"
											styles={{marginRight: "20px"}}>
											Stop
										</Button>
										}

										{  hasFightStarted &&
										<Button onClick={() => handlePause() }
												variant="contained"
												className={classes.pause}
												disabled={ getPauseDisabled() }>
											{ isPaused ? "Resume" : "Pause" }
										</Button>
										}
									</div>

									<div>
										{ (!hasRoundStarted && !isFightComplete && !hasFightStarted) &&
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
										{ isFightComplete &&
										<Button onClick={ () => handleReset() }
												variant="contained"
												color="primary">
											Reset
										</Button>
										}
									</div>
							</Grid>

							<Grid item xs={12}>
								<Typography component="h66" variant="h6">{ `Rounds ${ translateSeconds(initRoundSeconds)} / Notice ${initRoundNotifySeconds}s` }</Typography>
								<Typography component="h6" variant="h6">{ `Breaks ${ translateSeconds(initBreakSeconds)} / Notice ${initBreakNotifySeconds}s` }</Typography>
							</Grid>
						</Grid>
					</div>


					{/*	/!*<h4>Delay: { delay }</h4>*!/*/}
					{/*	/!*<h4>Paused: { isPaused.toString() }</h4>*!/*/}
					{/*	/!*<h4>Complete: { isRoundComplete.toString() }</h4>*!/*/}
					{/*	/!*<h4>Started: { hasRoundStarted.toString() }</h4>*!/*/}
					{/*	/!*<h4>CurrRound: { currRound.current.toString() }</h4>*!/*/}
					{/*	/!*<h4>NumRounds: { numRounds }</h4>*!/*/}
					{/*	/!*<h4>Curr Round Name: { getCurrRoundName() }</h4>*!/*/}
					{/*	/!*<h4>Curr Round Seconds: { getCurrRoundSeconds() }</h4>*!/*/}
					{/*	/!*<h4>InitRounds: { initRounds.toString() }</h4>*!/*/}
					{/*</div>*/}



				</CardContent>
			</Card>

			{/*<div className={classes.timerRow}>*/}
			{/*	<Typography component="h5" variant="h5">{ `Rounds ${ translateSeconds(initRoundSeconds)} / Notice ${breakSeconds}s` }</Typography>*/}
			{/*</div>*/}
			{/*<div className={classes.timerRow}>*/}
			{/*	<Typography component="h5" variant="h5">{ `Breaks ${ translateSeconds(initBreakSeconds)} / Notice ${breakNotifySeconds}s` }</Typography>*/}
			{/*</div>*/}



			{/*</div>*/}
				{/*</form>*/}
			{/*</div>*/}

			{/*<Sound*/}
			{/*	url={getReadyAudio}*/}
			{/*	playStatus={hasRoundStarted}*/}
			{/*	// playFromPosition={300 /* in milliseconds *!/*/}
			{/*	// onLoading={this.handleSongLoading}*/}
			{/*	// onPlaying={this.handleSongPlaying}*/}
			{/*	// onFinishedPlaying={this.handleSongFinishedPlaying}*/}
			{/*/>*/}
		</Container>
	);

}

