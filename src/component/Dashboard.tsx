import React, { useEffect, useState } from "react";
import { auth, db, logOut } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";

import "./Dashboard.css";

export const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const history = useHistory();

  const fetchUsername = async () => {
    try {
      const q = query(collection(db, "users"), where("uuid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.log(err);
      alert("An error occured while name fetching");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return history.push("/");
    fetchUsername();
  }, [user, loading]);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        logged in as
        <p>{name}</p>
        <p>{user?.email}</p>
        <button className="dashboard__btn" onClick={logOut}>
          Logout
        </button>
      </div>
    </div>
  );
};
