import React from "react";
import  ReactDOM  from "react-dom";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Login } from "./component/Login";
import { Register } from "./component/Register";
import { Dashboard } from "./component/Dashboard";

export const App = () => {
    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route exact path="/" component={Login}></Route>
                    <Route exact path="/register" component={Register}></Route>
                    <Route exact path="/dashboard" component={Dashboard}></Route>
                </Switch>
            </Router>
        </div>
    )
}