import React, { FC, useEffect, useState } from "react";
import { auth, db, logOut } from "../../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, useLocation, useParams } from "react-router-dom";

import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchCategories } from "../../store/settingsReducer";

import { getDateFormated } from "../../modules/getDate";

import { Link } from "react-router-dom";

const Statistics = React.lazy(() => import("../Statistics/Statistics"));
import Modal from "../Modal/Modal";
import { getCategoryByName } from "../../../firebase/methods/getCategoryByName";

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
    (state: RootState) => state.settings.categories,
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
            <h2 className="statistics__header">Cost statistics</h2>
            {Object.values(categories) ? (
              <div className="statistics__add add">
                <button
                  className="button btn-primary add-cost-btn"
                  onClick={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  Add Cost
                </button>
              </div>
            ) : (
              ""
            )}

            {Object.values(categories).length > 0 ? (
              <Statistics></Statistics>
            ) : (
              <p className="statistics__categories_empty">
                {" "}
                Categories list is empty now.<br></br>Click{" "}
                <Link className="link" to="/categories">
                  Categories
                </Link>{" "}
                for categories adding
              </p>
            )}
          </div>
        </div>
      </div>
      {modalVisible && (
        <Modal
          onCloseClick={() => {
            setModalVisible(false);
          }}
        ></Modal>
      )}
    </div>
  );
};

export default Dashboard;
