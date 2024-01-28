import { fetchCategories } from "./settingsReducer";
import { createAppSlice } from "./thunk/thunk";
import { updateCosts } from "../../firebase/methods/updateCost";
import type { updateCostsParams } from "../../firebase/methods/updateCost";
import type { DashboardState } from "./types";

const initialState: DashboardState = {
  loading: false,
  categories: {},
  checkedCategory: "",
  checkedSubcategory: "",
};

export const dashboardSlice = createAppSlice({
  name: "dashboard",
  initialState,
  reducers: (create) => ({
    updateCostsAction: create.asyncThunk(
      async (params: updateCostsParams, { dispatch }) => {
        try {
          await updateCosts(params);
          dispatch(fetchCategories(params.userId));
        } catch (err) {
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
        },
      },
    ),
  }),
});

export const dashboardReducer = dashboardSlice.reducer;
export const { updateCostsAction } = dashboardSlice.actions;
