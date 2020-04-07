import React from "react";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
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

export default function Dashboard() {
	const classes = useStyles(theme);

	return (
		<div className={classes.root} >
			<RoundTimer />
		</div>
	);
}

