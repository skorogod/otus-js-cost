import { combineReducers } from "redux";
import { settingsReducer } from "./settingsReducer";
import { configureStore } from "@reduxjs/toolkit";
import { fetchCategories } from "./settingsReducer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";


export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
    reducer: combineReducers({
        settings: settingsReducer
    })
});

