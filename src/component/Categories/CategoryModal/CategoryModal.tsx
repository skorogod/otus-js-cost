import React, { FC, useState } from "react";
import ReactDOM from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../../firebase/firebase";

import "./CategoryModal.css";
import "react-datepicker/dist/react-datepicker.css";

import { addCategory } from "../../../store/settingsReducer";
import { useAuthState } from "react-firebase-hooks/auth";

type ModalProps = {
  onCloseClick: Function;
};

export const CategoryModal: FC<ModalProps> = (props: ModalProps) => {
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();
  const [user, loadingAuth, error] = useAuthState(auth);

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
          <legend className="fieldset__legend">Add category</legend>
          <div className="fieldset__body">
            <input
              value={categoryName}
              className="input"
              id="category-name"
              type="text"
              name="category-name"
              placeholder="Enter category name"
              onChange={(event) => {
                setCategoryName(event.target.value);
              }}
            />
            <button
              className="btn-primary"
              onClick={() => {
                if (categoryName) {
                  dispatch<any>(
                    addCategory({
                      userId: user!.uid,
                      categoryName: categoryName,
                    }),
                  );
                }
                setCategoryName("");
                props.onCloseClick();
              }}
            >
              Add
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default CategoryModal;
