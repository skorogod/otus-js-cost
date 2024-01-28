import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, loginWithEmailAndPassword } from "../../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import "./Login.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (user) {
      history.push("/dashboard");
    }
  }, [user, loading]);

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          role="button"
          onClick={() => loginWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <div>
          Dont have account <Link to={"/register"} className="register-link">Register</Link> now
        </div>
      </div>
    </div>
  );
}
