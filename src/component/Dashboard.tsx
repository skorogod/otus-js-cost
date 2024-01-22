import React, { FC, useEffect, useState } from "react";
import { auth, db, logOut } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Pie } from "react-chartjs-2";

import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  fetchCategories,
} from "../store/settingsReducer";

import { Modal } from "./Modal";
import { getDateFormated } from "../modules/getDate";
import { ChartComponent } from "./Chart";

const modalAddSubcategory = (innerHTML: string, classList: string[]) => {
  const modal = document.getElementById("modal");
  const modalSubcategory = document.createElement("div");
  modalSubcategory.innerHTML = innerHTML;
  classList.forEach((el) => modalSubcategory.classList.add(el));
  modal?.insertAdjacentElement("afterbegin", modalSubcategory);
};

export const Dashboard:FC = () => {
  const [user, authLoading, error] = useAuthState(auth);
  const [modalVisible, setModalVisible] = useState(false)
  const [date, setDate] = useState(getDateFormated());
  const categories = useSelector(
    (state: RootState) => state.settings.categories
  );
  const loading = useSelector((state: RootState) => state.settings.loading);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authLoading) return;
    if (!user) return history.push("/");

    dispatch<any>(fetchCategories(user.uid));
  }, [user, authLoading]);

  return (
    <div className="dashboard">
      <p className="current-date">Today: {date}</p>
      <div className="dashboard__container">
        <div className="container__costs costs">
          <div className="costs__info"></div>
          <div className="costs__graphics">
            <ChartComponent data={categories}></ChartComponent>
          </div>
          <div className="costs__add add">
            <button className="button btn-primary" onClick={() => {setModalVisible(!modalVisible)}}>Add Cost</button>
            {modalVisible && <Modal></Modal>}
          </div>
        </div>
        
        <ul>
          {Object.values(categories).map((el) => {
            return <li key={el.id}>{el.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};
