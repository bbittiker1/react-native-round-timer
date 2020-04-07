import React, { useState } from "react";
import { useEffect, useRef } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

import { Avatar, Button, CssBaseline, TextField, Container, Typography, Grid, Paper, Card, CardContent, CardHeader } from "@material-ui/core";
import { borders } from '@material-ui/system';

 import { loginStyles } from "../../styles/login";

const useInterval = (callback, delay) => {
	const savedCallback = useRef();

	useEffect(() => {
		savedCallback.current = callback;
	});

	useEffect(() => {
		function tick() {
			savedCallback.current();
		}

		let id = setInterval(tick, delay);
		return () => clearInterval(id);
	}, [delay]);
};

const mySeconds = 5;


const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		alignItems: "center",
		// justifyContent: "center",
		width: "100%"
	},
	card: {
		border: "1px solid #e9ecee",
		// maxWidth: "748px",
		margin: "0 auto",
		width: "100%",
		// justifyContent: "center"
	},
	container: {
		display: "flex",
		margin: "0 auto",
		height: "260px",
		width: "100%",
		alignItems: "center",
		justifyContent: "center"
	},
	cardHeader: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "100%"
		// justifyContent: "center"
	},
	avatar: {

		// background: theme.palette.primary.main,
		// alignItems: "center",
		// justifyContent: "center"
		// color: "#01CEFC"
	},

	buttonRow: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginRight: "2px"
	},
	buttonSpacer: {
		marginRight: "5px"
	},
	start: {
		backgroundColor: theme.palette.primary.main,
		color: "white"
	},
	pause: {
		backgroundColor: theme.palette.info.main,
		color: "white"
	},
	stop: {
		backgroundColor: theme.palette.secondary.main,
		color: "white"
	},
	paper: {
		// marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	title: {
		color: "#232427",
		fontSize: 25,
		fontWeight: 500,
		fontFamily: "'Poppins', sans-serif",
		lineHeight: "1.35417em",
		textAlign: "center"
	},
	subheader: {
		color: "#919eab",
		fontFamily: "'Nunito', sans-serif",
		fontSize: 20,
		fontWeight: 500,
		textAlign: "center"
	},
}));

export function RoundTimer() {
	const [delay, setDelay] = useState(1000 );
	const [seconds, setSeconds] = useState( mySeconds );
	const [isPaused, setPaused] = useState( false );
	const [isComplete, setComplete] = useState( false );
	const [hasStarted, setStarted] = useState (false);

	const classes = useStyles();

	// Increment the counter.
	useInterval(() => {

		if(seconds === 0 ) {
			handleReset();
		} else {
			if (!isPaused && hasStarted) {
				setSeconds(seconds => seconds - 1);
			}
		}

	}, delay, isPaused, isComplete, hasStarted );

	const setState = (isPaused, isComplete, hasStarted) => {
		setPaused(isPaused);
		setComplete(isComplete);
		setStarted(hasStarted);
	};

	const handleReset = () => {
		setSeconds( mySeconds );
		setState(false, true, false);
	};

	const handlePause = () => {
		setState(!isPaused, false, true);
	};

	const handleStart = () => {
		setState(false, false, true);

		if(seconds === 0 ) {
			setSeconds(mySeconds);
		}
	};

	const getStopButtonText = () => {
		return "Stop";
	};

	const getStartButtonText = () => {
		return !hasStarted ? "Start" : (isPaused) ? "Resume" : "Pause";
	};

	const translate = (s) => {
		const mins = Math.floor(s / 60).toFixed(0);
		const secs = s % 60;

		return `${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`;
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
					subheader={"Ready!"}
				/>

				<CardContent className={classes.container}>
					{/*<div>{isLoading ?  "Loading..." : ""}</div>*/}
					{/*<div>{error ? error.msg : ""}</div>*/}
					<div>
						<div className={classes.timerRow}>
							<Typography component="h1" variant="h1">{ translate(seconds) }</Typography>
						</div>
						<div className={classes.buttonRow}>
							<div className={classes.buttonSpacer}>
								{( hasStarted && !isComplete ) &&
								<Button onClick={ handleReset } variant="contained" color="secondary">
									{ getStopButtonText() }
								</Button>
								}
							</div>
							<div>
								{
								<Button onClick={() => { !hasStarted ? handleStart() : handlePause() }} variant="contained" className={clsx(classes.start, { [classes.pause]: hasStarted, })}>
									{ getStartButtonText() }
								</Button>
								}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

						{/*<h4>Delay: { delay }</h4>*/}
						{/*<h4>Paused: { isPaused.toString() }</h4>*/}
						{/*<h4>Complete: { isComplete.toString() }</h4>*/}
						{/*<h4>Started: { hasStarted.toString() }</h4>*/}
					{/*</div>*/}
				{/*</form>*/}
			{/*</div>*/}
		</Container>
	);

}

