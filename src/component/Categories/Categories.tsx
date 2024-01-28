import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { auth } from "../../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchCategories } from "../../store/settingsReducer";
import { Category, SubCategory } from "../../store/types";
import { addSubCategory, addCategory } from "../../store/settingsReducer";

import "./Categories.css";

export const CategoriesComponent = () => {
  const [user, loadingAuth, error] = useAuthState(auth);
  const categories = useSelector(
    (state: RootState) => state.settings.categories,
  );
  const loading = useSelector((state: RootState) => state.settings.loading);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loadingAuth) return;
    if (!user) {
      history.push("/");
    }
    dispatch<any>(fetchCategories(user?.uid));
  }, [user]);

  return (
    <div className="categories__container">
      <h2 className="categories__header">Categories List</h2>
      <div className="categories__add">
        <input type="text" name="category" />
        <button
          onClick={() => {
            const name = document.querySelector(
              "[name='category']",
            ) as HTMLInputElement;
            if (name.value) {
              dispatch<any>(
                addCategory({ categoryName: name.value, userId: user!.uid }),
              );
            }
          }}
        >
          Add Category
        </button>
      </div>
      {Object.values(categories).length > 0 ? (
        <ul className="categories__list">
          {Object.values(categories).map((el: Category) => {
            return (
              <li>
                <details>
                  <summary>{el.name}</summary>
                  <input type="text" name="sub-category" id={el.id} />
                  <button
                    onClick={() => {
                      const name = document.getElementById(
                        `${el.id}`,
                      ) as HTMLInputElement;
                      if (name.value) {
                        dispatch<any>(
                          addSubCategory({
                            subCategoryName: name.value,
                            userId: user!.uid,
                            categoryId: el.id,
                          }),
                        );
                      }
                    }}
                  >
                    Add sub
                  </button>
                  {el.subCategories ? (
                    <ul className="subCategories__list">
                      {Object.values(el.subCategories).map(
                        (el: SubCategory) => (
                          <li key={el.id}>{el.name}</li>
                        ),
                      )}
                    </ul>
                  ) : (
                    ""
                  )}
                </details>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Категории отсутсвуют</p>
      )}
    </div>
  );
};
