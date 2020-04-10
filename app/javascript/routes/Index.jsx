import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SoftwareList from "../components/SoftwareList";
import Software from "../components/Software";
import NewSoftware from "../components/NewSoftware";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={SoftwareList} />
      <Route path="/software/:id" exact component={Software} />
      <Route path="/software" exact component={NewSoftware} />
    </Switch>
  </Router>
);
