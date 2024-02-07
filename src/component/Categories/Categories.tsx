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
import CategoryModal from "./CategoryModal/CategoryModal";

import "./Categories.css";

export const CategoriesComponent = () => {
  const [user, loadingAuth, error] = useAuthState(auth);
  const categories = useSelector(
    (state: RootState) => state.settings.categories,
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCat, setSelectedSubCat] = useState("");
  const [subCatName, setSubCatName] = useState("");
  const loading = useSelector((state: RootState) => state.settings.loading);
  const [modalVisible, setModalVisible] = useState(false);
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
      {modalVisible ? (
        <CategoryModal
          onCloseClick={() => setModalVisible(false)}
        ></CategoryModal>
      ) : (
        ""
      )}
      <h2 className="categories__header">Categories List</h2>

      <div className="categories__add">
        <button
          onClick={() => {
            setModalVisible(!modalVisible);
          }}
          className="btn-primary"
          name="add-category-btn"
        >
          Add Category
        </button>
        <select
          onChange={(event) => {
            setSelectedCategory(event.target.value);
          }}
          className="input"
          name="categories"
          id="categories"
        >
          {Object.values(categories).length === 0 ? (
            <option key="" value="">
              No categories
            </option>
          ) : (
            <>
              <option value="">Select category</option>
              {Object.values(categories).map((el: Category) => {
                return (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                );
              })}
            </>
          )}
        </select>
        {selectedCategory ? (
          <select
            onChange={(event) => {
              setSelectedSubCat(event.target.value);
            }}
            className="input"
            name="subcategories"
            id="subcategories"
          >
            {categories[selectedCategory].subCategories &&
            Object.values(categories[selectedCategory].subCategories).length ? (
              <>
                {Object.values(categories[selectedCategory].subCategories).map(
                  (el: SubCategory) => {
                    return (
                      <option key={el.id} value={el.id}>
                        {el.name}
                      </option>
                    );
                  },
                )}
              </>
            ) : (
              <option value="">No Subcategories</option>
            )}
          </select>
        ) : (
          ""
        )}
        {selectedCategory ? (
          <>
            <input
              value={subCatName}
              onChange={(event) => {
                setSubCatName(event.target.value);
              }}
              className="input"
              type="text"
              name="subCategory"
              placeholder="Enter subcategory name"
            />
            <button
              className="btn-primary"
              onClick={() => {
                if (subCatName) {
                  dispatch<any>(
                    addSubCategory({
                      subCategoryName: subCatName,
                      userId: user!.uid,
                      categoryId: selectedCategory,
                    }),
                  );
                  setSubCatName("");
                }
              }}
            >
              Add SubCategory
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CategoriesComponent;
