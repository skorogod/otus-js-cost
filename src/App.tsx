import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Link } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { Suspense } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Login = React.lazy(() => import("./component/Login/Login"));
const Register = React.lazy(() => import("./component/Register/Register"));
const Dashboard = React.lazy(() => import("./component/Dashboard/Dashboard"));
const CategoriesComponent = React.lazy(
  () => import("./component/Categories/Categories"),
);

const NoMatch = React.lazy(() => import("./component/NoMatch/NoMatch"));

import { logOut } from "../firebase/firebase";
import { Provider } from "react-redux";
import { store } from "./store";
import { HashRouter } from "react-router-dom";
// import { NoMatch } from "./component/NoMatch/NoMatch";

import "./App.css";

export const App = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      <Provider store={store}>
        <HashRouter>
          <header className="header">
            <nav className="navbar">
              {user ? (
                <ul className="nav__list list">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link className="categories-link" to="/categories">
                      Categories
                    </Link>
                  </li>
                </ul>
              ) : (
                ""
              )}
              <ul className="nav__login nav__list">
                <li>
                  {user ? (
                    <a href="" onClick={logOut}>
                      Logout
                    </a>
                  ) : (
                    <a href="/login">Login</a>
                  )}
                </li>
              </ul>
            </nav>
          </header>
          <main id="main" className="main">
            <section className="container">
              <Suspense fallback={<div>loading...</div>}>
                <Switch>
                  <Route exact path="/" component={Login}></Route>
                  <Route exact path="/register" component={Register}></Route>
                  <Route path="/dashboard" component={Dashboard}></Route>
                  <Route
                    exact
                    path="/categories"
                    component={CategoriesComponent}
                  ></Route>
                  <Route path="/*">
                    <NoMatch />
                  </Route>
                </Switch>
              </Suspense>
            </section>
          </main>
        </HashRouter>
      </Provider>
    </>
  );
};
