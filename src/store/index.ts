import { combineReducers } from "redux";
import { settingsReducer } from "./settingsReducer";
import { configureStore } from "@reduxjs/toolkit";
import { dashboardReducer } from "./dashboardReducer";
import { Category } from "./types";

export type BaseState = {
  loading: boolean;
  categories: { [key: string]: Category };
};

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: combineReducers({
    settings: settingsReducer,
    dashboard: dashboardReducer,
  }),
});
