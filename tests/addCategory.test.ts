import * as insertCategory from "../firebase/methods/insertCategory";
import { Category } from "../src/store/types";
import { store } from "../src/store";
import { addCategory } from "../src/store/settingsReducer";
import { insertCategoryParams } from "../firebase/methods/insertCategory";

describe("add category Action test", () => {
  test("add category action executes insert category", () => {
    const params: insertCategoryParams = {
      userId: "gjdkfnbdffjfkhgnf",
      categoryName: "Машина",
    };

    const spy = jest.spyOn(insertCategory, "insertCategory");

    store.dispatch(addCategory(params)).then(() => {
      expect(spy).toHaveBeenCalledWith(params);
    });
  });
});
