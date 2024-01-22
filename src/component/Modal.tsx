import React, { FC, useState } from "react";
import ReactDOM from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import type { Category } from "../store/types";
import { CategoryEl } from "./Category";
import { updateCostsAction } from "../store/dashboardReducer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { getDate } from "../modules/getDate";
import DatePicker from "react-datepicker"
import { ChartComponent } from "./Chart";
import ("./Modal.css");
import "react-datepicker/dist/react-datepicker.css"


export const Modal: FC = () => {
  const categories = useSelector(
    (state: RootState) => state.settings.categories
  );
  const [user, loadingAuth, error] = useAuthState(auth);
  const [count, setCount] = useState<null | number>(null)
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("")
  const [startDate, setStartDate] = useState(getDate)
  const dispatch = useDispatch()

  return (
    <div className="modal">
      <fieldset>
        <legend>Check category</legend>
        <DatePicker 
            dateFormat="dd-MM-yyyy"
            selected={startDate}
            onChange={(date: Date) => {
                setStartDate(date)
            }}
            >

            </DatePicker>
        {Object.values(categories).map((el: Category, index, array) => {
          return (
            <CategoryEl
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
            ></CategoryEl>
          );
        })}
      </fieldset>
      <input id="cost-count" type="text" name="cost-count" placeholder="Please input cost" onChange={() => {
        const costInput = document.getElementById("cost-count") as HTMLInputElement;
        if (costInput) {
            setCount(Number(costInput.value))
        }
      }} />
      <button onClick={() => {
        if (count) {
            dispatch<any>(updateCostsAction({categoryId, subCategoryId, count, costDate: startDate.setHours(0,0,0,0).toString(), userId: user!.uid}))
        }
      }}>Ok</button>
    </div>
  );
};
