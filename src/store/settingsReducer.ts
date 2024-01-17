import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { insertCategory } from "../../firebase/methods/insertCategory";
import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'
import { createAppSlice } from "./thunk/thunk";
import { getCategories } from "../../firebase/methods/getCategories";


export type SettingsState = {
    loading: boolean,
    categories: Category[]
}

const initialState: SettingsState = {
    loading: false,
    categories: []
}

type insertCategoryParams = {
    categoryName: string,
    userId: string;
};

export type Category = {
    name: string, 
    subcategories: Omit<Category, "subcategories">[]
}

export const settingsSlice = createAppSlice({
    name: "settings",
    initialState,
    reducers: (create) => ({
        fetchCategories: create.asyncThunk(
            async (userId) => {
                try{
                    const categories = await getCategories(userId);
                    console.log(categories)
                    return {
                        categories: categories
                    }
                }
                catch (err) { 
                    alert(err);
                }
            },
            {
                pending: (state) => {
                    state.loading = true
                },
                rejected: (state, action) => {
                    state.loading = false;
                },
                fulfilled: (state, action) => {
                    state.loading = false;
                    state.categories = action.payload?.categories
                }
            }
        ),
        addCategory: create.asyncThunk(
            async (params: insertCategoryParams, { dispatch }) => {
                try {
                    await insertCategory(params.categoryName, params.userId);
                    return {
                        name: params.categoryName,
                        subcategories: []
                    };
                }
                catch (err) {
                    alert(err);
                }
            },
            {
                pending: (state) => {
                    state.loading = true;
                },
                rejected: (state, action) => {
                    state.loading = false;
                },
                fulfilled: (state, action) => {
                    state.loading = false;
                    state.categories.push({
                        name: action.payload!.name,
                        subcategories: action.payload!.subcategories
                    })
                }
            }
        )
    })
})

export const { addCategory, fetchCategories } = settingsSlice.actions
export const settingsReducer  = settingsSlice.reducer