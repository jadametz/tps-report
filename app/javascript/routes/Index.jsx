import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Softwares from "../components/Softwares";
import Software from "../components/Software";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/software" exact component={Softwares} />
      <Route path="/software/:id" exact component={Software} />
    </Switch>
  </Router>
);
