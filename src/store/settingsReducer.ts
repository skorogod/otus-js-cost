import { insertCategory } from "../../firebase/methods/insertCategory";
import { createAppSlice } from "./thunk/thunk";
import { getCategories } from "../../firebase/methods/getCategories";
import { insertSubcategory } from "../../firebase/methods/insertSubcategory";
import type { insertSubCategoryParams } from "../../firebase/methods/insertSubcategory";
import type { insertCategoryParams } from "../../firebase/methods/insertCategory";
import { SettingsState} from "./types";


const initialState: SettingsState = {
    loading: false,
    categories: {}
}


export const settingsSlice = createAppSlice({
    name: "settings",
    initialState,
    reducers: (create) => ({
        fetchCategories: create.asyncThunk(
            async (userId) => {
                try{
                    const categories = await getCategories(userId);
                    return {
                        categories: categories,
                    }
                }
                catch (err) { 
                    alert(err);
                }

                return {
                    categories: {}
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
                    const subCategoryid = await insertCategory(params.categoryName, params.userId);
                    return {
                        subCategoryid,
                        name: params.categoryName,
                        subCategories: {}
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
                    state.categories[action.payload!.subCategoryid] = {
                        id: action.payload!.subCategoryid,
                        name: action.payload!.name,
                        dates: {},
                        subCategories: action.payload!.subCategories
                    }
                }
            }
        ),
        addSubCategory: create.asyncThunk(
            async (params: insertSubCategoryParams) => {
                try {
                    const id = await insertSubcategory(params);
                    return {
                        id,
                        name: params.subCategoryName,
                        categoryId: params.categoryId
                    }
                }

                catch (err) {
                    alert("add SubCategory error")
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
                    state.categories[action.payload!.categoryId]["subCategories"][action.payload!.id] = {
                        id: action.payload!.id,
                        name: action.payload!.name,
                        dates: {}
                    }
                    state.loading = false;
                }
                    
            }
        )
    })
})

export const { addCategory, fetchCategories, addSubCategory } = settingsSlice.actions
export const settingsReducer  = settingsSlice.reducer