import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../../firebase";
import { useHistory } from "react-router-dom";
import "./Register.css"

export const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error ] = useAuthState(auth)
    const history = useHistory()

    const register = () => {
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password);
    }

    useEffect(() => {
        if (loading) {
            return
        }

        if (user) {
            history.push('/dashboard');
        }
    }, [user, loading])

    return (
        <div className="register">
            <div className="register__container">
                <input 
                    type="text"
                    className="register__textBox"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <input 
                    type="text"
                    className="register__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className="register__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button className="register__btn" onClick={register}>Register</button>
            </div>
        </div>
    )
}