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
	//
	// clear()  {
	// 	clearInterval(this.timerId)
	// };
}

class Round {
	constructor(notifyTimer, roundTimer) {
		this.notifyTimer = notifyTimer;
		this.roundTimer = roundTimer;
	}
};

export default function Dashboard() {
	const classes = useStyles(theme);

	const initRounds = 2;

	const rounds = [];

	// for (let i = 0; i < 2; i++) {
			// Notify round
		rounds.push(new Timer2(3, "notify", 0));
		rounds.push(new Timer2(5, "round", 1));
		rounds.push(new Timer2(3, "notify", 0));
		rounds.push(new Timer2(5, "round", 2));


		// rounds.push(new Round(new Timer2(3, "notify"), new Timer2(5, "round")));
		// rounds.push(new Round(new Timer2(3, "notify"), new Timer2(5, "round")));
		// rounds.push(new Round(new Timer2(3, "notify"), new Timer2(5, "round")));
	// }



	return (
		<div className={classes.root} >
			<RoundTimer initSeconds={5} initNotifySeconds={5} initRounds={rounds} />
		</div>
	);
}

