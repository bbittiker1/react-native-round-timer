import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import { RoundTimer} from "../../components/Timer/Timer";


import { theme } from "../../styles/theme";
import {Grid, Typography} from "@material-ui/core";
import { constants } from "../../constants";

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
				<RoundTimer />
			</Grid>
			{/*<Grid item xs={12}>*/}
			{/*	<Typography component="h6" variant="h6">{ `Rounds ${ translateSeconds(roundSeconds)} / Notice ${roundNotifySeconds}s` }</Typography>*/}
			{/*	<Typography component="h6" variant="h6">{ `Breaks ${ translateSeconds(breakSeconds)} / Notice ${breakNotifySeconds}s` }</Typography>*/}
			{/*	<Typography component="h6" variant="h6">Total Fight Seconds: { numRounds * roundSeconds }</Typography>*/}
			{/*</Grid>*/}
		</Grid>
	);
}

