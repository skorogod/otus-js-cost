import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { query, collection, where, getDocs, getDoc, doc, arrayUnion, limit, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { set, ref } from "firebase/database"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Category, addCategory, fetchCategories } from "../store/settingsReducer";
import { AsyncThunkAction } from "@reduxjs/toolkit";

export const Settings = () => {
    const [user, loadingAuth, error] = useAuthState(auth);
    const categories = useSelector((state: RootState) => state.settings.categories)
    const loading = useSelector((state: RootState) => state.settings.loading)
    const history = useHistory()
    const dispatch = useDispatch()

    console.log("Settings render")

    useEffect(() => {
        if(loadingAuth) return;
        if(!user) {
            history.push("/")
        }
        dispatch<any>(fetchCategories(user!.uid))
    }, [user])

    return (
        <div>
            {
                categories.length > 0 ? 
                <ul className="categories">
                    {categories.map((el: Category) => <li>{el.name}</li>)}
                </ul>
                : <p>Категории отсутсвуют</p>
            }
            <input type="text" name="category" />
            <button onClick={
                () => {
                    const name = document.querySelector("[name='category']") as HTMLInputElement;
                    if (name.value) {
                        dispatch<any>(addCategory({categoryName: name.value, userId: user!.uid}))
                    }
                }
            }>Add Category</button>

        </div>
    )
}

