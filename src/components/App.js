import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { BrowserRouter } from "react-router-dom";

import ThemeProvider from "@material-ui/styles/ThemeProvider";

import Config from "../config";
import LayoutComponent from "./Layout/Layout";
import { theme } from "../styles/theme.js";

console.log("app: ", Config);

function App() {
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
