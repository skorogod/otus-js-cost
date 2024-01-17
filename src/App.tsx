import React from "react";
import ReactDOM from "react-dom";

import { Link } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Login } from "./component/Login";
import { Register } from "./component/Register";
import { Dashboard } from "./component/Dashboard";
import { logOut } from "../firebase/firebase";
import { myLogOut } from "./modules/logOut";
import { Settings } from "./component/Settings";
import { Provider } from "react-redux";
import { store } from "./store";


export const App = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Provider store={store}>

        <Router>
        <div className="app">
            <header>
            <nav>
                <ul>
                {user ? (
                    <li>
                    <Link to="/settings">Settings</Link>
                    </li>
                ) : (
                    ""
                )}
                <li>
                    {user ? (
                    <button onClick={logOut}>Logout</button>
                    ) : (
                    <a href="/login">Login</a>
                    )}
                </li>
                </ul>
            </nav>
            </header>

            <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/dashboard" component={Dashboard}></Route>
            <Route exact path="/settings" component={Settings}></Route>
            </Switch>
        </div>
        </Router>
    </Provider>
  );
};
