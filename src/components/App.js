import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { BrowserRouter } from "react-router-dom";

import ThemeProvider from "@material-ui/styles/ThemeProvider";

import Config from "../config";
import LayoutComponent from "./Layout/Layout";
// import PrivateRoute from "./PrivateRoute/PrivateRoute";
// import Login from "../pages/login/Login";
import { theme } from "../styles/theme.js";
import { ENVIRONMENTS } from "../constants/index";

console.log("app: ", Config);

function App() {
  if(Config.environment !== ENVIRONMENTS.production) {
    console.info("App config: ", Config);
  }

  return (
      <div>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact render={() => <Redirect to="/app/main"/>} />
              <Route path="/app" component={ LayoutComponent } />
              {/*<Route path="/login" exact component={ Login } />*/}
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </div>
  );
}

export default App;
