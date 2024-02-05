import * as insertSubCategory from "../firebase/methods/insertSubcategory";
import { Category } from "../src/store/types";
import { store } from "../src/store";
import { addSubCategory } from "../src/store/settingsReducer";
import { insertSubCategoryParams } from "../firebase/methods/insertSubcategory";

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
