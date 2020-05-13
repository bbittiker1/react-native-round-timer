import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import { RoundTimer} from "../../components/Timer/RoundTimer";

import { theme } from "../../styles/theme";
import {Grid, Typography} from "@material-ui/core";
import { constants } from "../../constants";
import CountdownTimer from "../../components/Timer/CountdownTimer";

const useStyles = makeStyles(theme => ({
	control: {
		padding: theme.spacing(2),
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: '2px'
	},
}));

const loadTimers = () => {
	const t = [];

	const x = new CountdownTimer({
		seconds: 5,  // number of seconds to count down
		message: "Get Ready!",
		type: "ready"
	});

	const y = new CountdownTimer({
		seconds: 6,  						// number of seconds to count down
		message: "Fight!",
		type: "fight"
	});

	const z = new CountdownTimer({
		seconds: 7,  						// number of seconds to count down
		message: "Break!",
		type: "break"
	});

	t.push(x, y, z);

	return t;
};

let timers = loadTimers();


export default function Dashboard() {
	const classes = useStyles(theme);

	const numRounds = 2;

	return (
		<Grid className={useStyles.paper} style={{border: 'blue 1px solid'}}>
			<Grid item xs={12}>
				<Typography component="h4" variant="h4">{ constants.messages.appName }</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography component="h5" variant="h5">{numRounds} Rounds</Typography>
			</Grid>
			<Grid item xs={12}>
				<RoundTimer timers={timers} reloadTimers={ () => loadTimers }/>
			</Grid>
		</Grid>
	);
}

