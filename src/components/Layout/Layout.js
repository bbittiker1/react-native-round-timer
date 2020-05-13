import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles  } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import IdleTimer from "react-idle-timer";

// import config from "../../config";
// import { logoutUser } from "../../actions/auth";
// import ChangelogAppBar from "../AppBar/AppBar";
// import ChangelogSideBar from "../Sidebar/Sidebar";
// import { IdleTimeOutModal } from "../IdleTimeOutModal/IdleTimeOutModal";
import Footer from "../Footer/Footer";
import Dashboard from "../../pages/dashboard/Dashboard";
// import Privacy from "../../pages/privacy/Privacy";
// import Anomalies from "../../pages/anomalies/Anomalies";
// import Firewall from "../../pages/firewall/Firewall";
// import Hive from "../../pages/admin/hive/Hive";


const ToastCloseButton = ({closeToast}) => <i onClick={closeToast} className="fa fa-times"/>;

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
	},
	hide: {
		display: "none",
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export default function Layout() {
	const classes = useStyles();
	// const dispatch = useDispatch();
	// const [showModal, setShowModal] = useState( false );
	//
	// const timeout = config.idleTimeout;
	//
	// const callbackRef = useRef();
	//
	// const onAction = () => {};
	// const onActive = () => {};
	//
	// const resetTimer = () => {
	// 	callbackRef.current.reset();
	// };
	//
	// const onIdle = () => {
	// 	setShowModal(true);
	// };

	// const handleClose = () => {
	// 	setShowModal(false);
	// 	resetTimer();
	// };
	//
	// const handleLogout = () => {
	// 	setShowModal(false);
	// };

	return (
		<div className={classes.root}>
			<ToastContainer
				autoClose={5000}
				hideProgressBar
				closeButton={ <ToastCloseButton/> }
			/>
			{/*<IdleTimer*/}
			{/*	ref={ callbackRef }*/}
			{/*	element={ document }*/}
			{/*	onActive={ onActive }*/}
			{/*	onIdle={  onIdle }*/}
			{/*	onAction={ onAction }*/}
			{/*	debounce={ 250 }*/}
			{/*	timeout={ timeout } />*/}

			<CssBaseline />
			<main className={classes.content}>
				<div className={classes.toolbar} />


				<Switch>
					<Route path="/app/main" exact component={Dashboard} />
				</Switch>
				{/*<Footer />*/}
			</main>
		</div>
	);
}

connect(null, null)(Layout);
