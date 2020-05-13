import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import * as serviceWorker from "./serviceWorker";

import App from "./components/App";
import reducers from "./reducers";

import packageJson from "../package.json";
import Config from "./config";

Config.appVersion = packageJson.version;
console.log("index: ", Config);


// Add support for Chrome Redux DevTools.
const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const loggerMiddleware = createLogger();

const enhancer = composeEnhancers(
    applyMiddleware(thunkMiddleware, loggerMiddleware),
    // other store enhancers if any
);

const store = createStore(reducers, enhancer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,

    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
