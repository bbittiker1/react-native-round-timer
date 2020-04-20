import React from "react";

// import Breadcrumbs from "@material-ui/core/Breadcrumbs";
// import Typography from "@material-ui/core/Typography";
// import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { RoundTimer} from "../../components/Timer/Timer";


import { theme } from "../../styles/theme";

const useStyles = makeStyles(theme => ({
	// root: {
	// 	flexGrow: 1,
	// },
	// paper: {
	// 	height: 140,
	// 	width: 100,
	// },
	control: {
		padding: theme.spacing(2),
	},
	paper: {
		// marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
}));


class Timer2 {
	constructor(seconds, type, roundNumber, roundMessage) {
		this.seconds = seconds;
		this.type = type;
		this.roundNumber = roundNumber;
		this.roundMessage = roundMessage;
	}
}

export default function Dashboard() {
	const classes = useStyles(theme);

	const numRounds = 2;
	const breakSeconds = 3;
	const roundSeconds = 5;
	const breakNotifySeconds = 3;


	// const roundsMaster = [];
	// const rounds =

	const loadTimers = (numRounds, breakSeconds, roundSeconds) => {
		let roundTimers = [];
		for (let i = 0; i < numRounds; i++) {
			const breakRoundMessage = (i === 0) ? "Get Ready" : "Break";
			const fightRoundNumber = i + 1;
			const fightRoundMessage = `Round ${fightRoundNumber} of ${numRounds}`;

			const breakTimer = new Timer2(
				breakSeconds,
				"notify",
				i,
				breakRoundMessage);

			const roundTimer = new Timer2(
				roundSeconds,
				"round",
				fightRoundNumber,
				fightRoundMessage);

			roundTimers.push(breakTimer);
			roundTimers.push(roundTimer);
		}

		return roundTimers;
	};

	const roundTimers = loadTimers(numRounds, breakSeconds, roundSeconds);

	console.log("roundTimers: " , roundTimers);

	return (
		<div className={classes.root}>
			<RoundTimer initRoundSeconds={roundSeconds}
						initRoundNotifySeconds={3}
						initBreakSeconds={breakSeconds}
						initBreakNotifySeconds={breakNotifySeconds}
						initRounds={ roundTimers }
						initNumRounds={numRounds}
						initRoundMessage={`Round 1 of ${numRounds}`}
						resetFight={ loadTimers }
			/>
		</div>
	);
}

