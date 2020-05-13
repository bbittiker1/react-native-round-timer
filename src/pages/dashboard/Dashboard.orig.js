import React, {useEffect, useState} from "react";

import {
	StaticGoogleMap,
	Marker,
	Path,
} from 'react-static-google-map';

// import Breadcrumbs from "@material-ui/core/Breadcrumbs";
// import Typography from "@material-ui/core/Typography";
// import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { RoundTimer} from "../../components/Timer/Timer";
import GoogleMapsComponent from "../../components/GoogleMaps/GoogleMaps";
import GeolocationUnderlay from "../../components/GoogleMaps/GeolocationUnderlay";
import StaticGeolocationUnderlay from "../../components/GoogleMaps/StaticGeolocationUnderlay";


import { theme } from "../../styles/theme";
import {Grid, Typography} from "@material-ui/core";
import Config from "../../config";

import {loadTimers, translateSeconds} from "../../selectors";
import { constants } from "../../constants";

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
	const breakSeconds = 3;
	const roundSeconds = 5;
	const roundNotifySeconds = 3;
	const breakNotifySeconds = 3;
	const [mapUrl, setMapUrl] = useState(null);
	const [userLocation, setUserLocation] = useState( { lat: 0, lng: 0 });
	// const [isMarkerShown, setMarkerShown] = useState( false);
	const [loading, setLoading] = useState( true);

	let { roundTimers, totalSeconds } = loadTimers(numRounds, breakSeconds, roundSeconds);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const { latitude, longitude } = position.coords;
				setUserLocation({ lat: latitude, lng: longitude });
				setLoading(false);
				setMapUrl(`https://maps.googleapis.com/maps/api/staticmap?center=${userLocation.lat},${userLocation.lng}&zoom=15&size=400x400&maptype=roadmap&key=${Config.googleMapsApiKey}&markers=color:red%7Clabel:You%7C${userLocation.lat},${userLocation.lng}`);
				setLoading(false);
			},
			() => {
				setLoading(false);
			}
		);
	}, [loading, userLocation, mapUrl]);

	// console.log(totalSeconds);
	// console.log(roundTimers);

	return (
		<Grid className={useStyles.paper} style={{border: 'blue 1px solid'}}>
			<Grid item xs={12}>
				<Typography component="h4" variant="h4">{ constants.messages.appName }</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography component="h5" variant="h5">{numRounds} Rounds</Typography>
			</Grid>
			<Grid item xs={12}>
				<RoundTimer initRoundSeconds={roundSeconds}
							initRoundNotifySeconds={3}
							initBreakSeconds={breakSeconds}
							initBreakNotifySeconds={breakNotifySeconds}
							initRounds={ roundTimers }
							initNumRounds={numRounds}
							initRoundMessage={`Round 1 of ${numRounds}`}
							initTotalSeconds={ totalSeconds }
							resetFight={ loadTimers } />
			</Grid>
			<Grid item xs={12}>
				<Typography component="h6" variant="h6">{ `Rounds ${ translateSeconds(roundSeconds)} / Notice ${roundNotifySeconds}s` }</Typography>
				<Typography component="h6" variant="h6">{ `Breaks ${ translateSeconds(breakSeconds)} / Notice ${breakNotifySeconds}s` }</Typography>
				<Typography component="h6" variant="h6">Total Fight Seconds: { numRounds * roundSeconds }</Typography>
			</Grid>
		</Grid>
	);
}

