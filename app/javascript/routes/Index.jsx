import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Softwares from "../components/Softwares";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/software" exact component={Softwares} />
    </Switch>
  </Router>
);
