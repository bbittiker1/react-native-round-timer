import { combineReducers } from "redux";
// import auth from "./auth";
// import navigation from "./navigation";
// import anomalies from "./anomalies";
// import firewall from "./firewallBaselines";
// import convicted from "./convicted";

export default combineReducers({
	// auth,
	// navigation,
	// anomalies,
	// firewall,
	// convicted
});

export const getAuth = (state) => state.auth;
