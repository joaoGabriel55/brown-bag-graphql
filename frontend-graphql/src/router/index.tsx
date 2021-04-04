import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NewTeam from "../pages/NewTeam";
import Teams from "../pages/Teams";
import { HOME, NEW_TEAM } from "./routers";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={HOME} component={Teams} />
        <Route path={NEW_TEAM} component={NewTeam} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
