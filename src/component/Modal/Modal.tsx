import React, { FC, useState } from "react";
import ReactDOM from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import type { Category } from "../../store/types";

import CategoryComponent from "../Category/Category";
import { updateCostsAction } from "../../store/dashboardReducer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebase";
import { getDate } from "../../modules/getDate";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";

import "./Modal.css";
import "react-datepicker/dist/react-datepicker.css";

type ModalProps = {
  onCloseClick: Function;
};

export const Modal: FC<ModalProps> = (props: ModalProps) => {
  const categories = useSelector(
    (state: RootState) => state.settings.categories,
  );
  const [user, loadingAuth, error] = useAuthState(auth);
  const [count, setCount] = useState<null | number>(null);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [startDate, setStartDate] = useState(getDate);
  const dispatch = useDispatch();

  if (Object.values(categories).length === 0) {
    return (
      <div className="overlay">
        <div className="modal">
          <button
            onClick={() => {
              props.onCloseClick();
            }}
            className="close__btn"
          >
            <i className="fa-regular fa-circle-xmark"></i>
          </button>
          <fieldset className="fieldset">
            <legend className="fieldset__legend">
              Categories list is empty
            </legend>
            <p className="fieldset__categories_empty">
              Categories list is empty now.<br></br>Click{" "}
              <Link className="link" to="/categories">
                Categories
              </Link>{" "}
              for categories adding
            </p>
          </fieldset>
        </div>
      </div>
    );
  }

  return (
    <div className="overlay">
      <div className="modal">
        <button
          onClick={() => {
            props.onCloseClick();
          }}
          className="close__btn"
        >
          <i className="fa-regular fa-circle-xmark"></i>
        </button>
        <fieldset className="fieldset">
          <legend className="fieldset__legend">Add new Cost</legend>

          <div className="date">
            <label htmlFor="date">Choose date:</label>
            <DatePicker
              className="input"
              id="date"
              dateFormat="dd-MM-yyyy"
              selected={startDate}
              onChange={(date: Date) => {
                setStartDate(date);
              }}
            ></DatePicker>
          </div>
          <div className="categories-radio">
            <h3 className="categories-radio__header">Select category</h3>
            {Object.values(categories).map((el: Category, index, array) => {
              return (
                <CategoryComponent
                  key={el.id}
                  id={el.id}
                  name={el.name}
                  subCategories={el.subCategories}
                  visible={el.id === categoryId}
                  onCategoryChecked={() => {
                    setCategoryId(el.id);
                  }}
                  onSubcategoryChecked={(id: string) => {
                    setSubCategoryId(id);
                  }}
                ></CategoryComponent>
              );
            })}
          </div>
          <input
            className="input"
            id="cost-count"
            type="text"
            name="cost-count"
            placeholder="Please input cost"
            onChange={() => {
              const costInput = document.getElementById(
                "cost-count",
              ) as HTMLInputElement;
              if (costInput) {
                setCount(Number(costInput.value));
              }
            }}
          />
          <button
            className="btn-primary .add-btn"
            onClick={() => {
              if (count) {
                dispatch<any>(
                  updateCostsAction({
                    categoryId,
                    subCategoryId,
                    count,
                    costDate: startDate.setHours(0, 0, 0, 0).toString(),
                    userId: user!.uid,
                  }),
                );
              }
              setCount(null);
              props.onCloseClick();
            }}
          >
            Add
          </button>
        </fieldset>
      </div>
    </div>
  );
};

export default Modal;
