import React from "react";
import { Switch, Route } from "react-router";

export default (
  <Switch>
    <Route path="/admin"></Route>
    <Route path="/auth"></Route>

    <Route path="/">
      <Switch>
        <Route exact path="/"></Route>
        <Route path="/store"></Route>
        <Route path="/products/:productId"></Route>
        <Route path="/checkout"></Route>
        <Route path="/about"></Route>
        <Route path="/contact"></Route>
        <Route path="/policy"></Route>
        <Route path="*"></Route>
      </Switch>
    </Route>
  </Switch>
);
