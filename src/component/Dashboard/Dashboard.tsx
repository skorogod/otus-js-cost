import React, { FC, useEffect, useState } from "react";
import { auth, db, logOut } from "../../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";

import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchCategories } from "../../store/settingsReducer";

import { Modal } from "../Modal/Modal";
import { getDateFormated } from "../../modules/getDate";
import { Statistics } from "../Statistics/Statistics";

const modalAddSubcategory = (innerHTML: string, classList: string[]) => {
  const modal = document.getElementById("modal");
  const modalSubcategory = document.createElement("div");
  modalSubcategory.innerHTML = innerHTML;
  classList.forEach((el) => modalSubcategory.classList.add(el));
  modal?.insertAdjacentElement("afterbegin", modalSubcategory);
};

export const Dashboard: FC = () => {
  const [user, authLoading, error] = useAuthState(auth);
  const [modalVisible, setModalVisible] = useState(false);
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
      <p className="dashboard__date">Today: {date}</p>
      <div className="dashboard__container">
        <div className="dashboard__container">
          <div className="container__statistics">
            <h2 className="statistics__header">Стастистика расходов</h2>
            <div className="statistics__add add">
              <button
                className="button btn-primary"
                onClick={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                Add Cost
              </button>
              {modalVisible && <Modal></Modal>}
            </div>
            { categories ?  <Statistics></Statistics> : ''}
          </div>
        </div>
      </div>
    </div>
  );
};
