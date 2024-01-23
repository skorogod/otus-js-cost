import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { Link } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Login } from "./component/Login/Login";
import { Register } from "./component/Register/Register";
import { Dashboard } from "./component/Dashboard/Dashboard";
import { logOut } from "../firebase/firebase";
import { Settings } from "./component/Settings/Settings";
import { Provider } from "react-redux";
import { store } from "./store";

import "./App.css";

export const App = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      <Provider store={store}>
        <Router>
          <header className="header">
            <nav className="navbar">
              {user ? (
                <ul className="nav__list list">
                  <li>
                    <Link to="/dashboard">Settings</Link>
                  </li>
                  <li>
                    <Link to="/settings">Dashboard</Link>
                  </li>
                </ul>
              ) : (
                ""
              )}
              <ul className="nav__login nav__list">
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
          <main id="main" className="main">
            <section className="container">
              <Switch>
                <Route exact path="/" component={Login}></Route>
                <Route exact path="/register" component={Register}></Route>
                <Route exact path="/dashboard" component={Dashboard}></Route>
                <Route exact path="/settings" component={Settings}></Route>
              </Switch>
            </section>
          </main>
        </Router>
      </Provider>
    </>
  );
};
