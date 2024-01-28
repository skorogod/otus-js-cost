import * as insertSubCategory from "../../firebase/methods/insertSubcategory";
import { Category } from "../store/types";
import { store } from "../store";
import { addSubCategory } from "../store/settingsReducer";
import { insertSubCategoryParams } from "../../firebase/methods/insertSubcategory";

describe("add category Action test", () => {
  test("add category action executes insert category", () => {
    const params: insertSubCategoryParams = {
      userId: "gjdkfnbdffjfkhgnf",
      categoryId: "dgnfknfkhdmt",
      subCategoryName: "Машина",
    };

    const spy = jest.spyOn(insertSubCategory, "insertSubcategory");

    store.dispatch(addSubCategory(params)).then(() => {
      expect(spy).toHaveBeenCalledWith(params);
    });
  });
});
