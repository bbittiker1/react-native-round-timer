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
	constructor(seconds, name, roundNumber) {
		this.seconds = seconds;
		this.name = name;
		this.roundNumber = roundNumber;
	}
}

class Round {
	constructor(notifyTimer, roundTimer) {
		this.notifyTimer = notifyTimer;
		this.roundTimer = roundTimer;
	}
};

export default function Dashboard() {
	const classes = useStyles(theme);

	const numRounds = 3;
	const notifySeconds = 3;
	const roundSeconds = 5;

	const breakNotifySeconds = 3;


	const rounds = [];

	const loadTimer = (type, roundNumber) => {
		return new Timer2(type === "notify" ? notifySeconds : roundSeconds, type, roundNumber)
	};

	for (let i = 0; i < numRounds; i++) {
		rounds.push(loadTimer("notify", i));
		rounds.push(loadTimer("round", i + 1));
	}

	return (
		<div className={classes.root} >
			<RoundTimer initRoundSeconds={5}
						initNotifySeconds={2}
						initBreakSeconds={5}
						initRounds={rounds}
						initNumRounds={numRounds}
						initBreakNotifySeconds={breakNotifySeconds}

			/>
		</div>
	);
}

