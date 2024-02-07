import { waitFor } from "@testing-library/react";
import { store } from "../src/store";
import { fetchCategories } from "../src/store/settingsReducer";
import * as getCategories from "../firebase/methods/getCategories";
import { Category } from "../src/store/types";

describe("getCategories", () => {
  const categories: { [category: string]: Category } = {
    dfknvkfbndfblckbnd: {
      id: "dojgfkhfkhgmldbh",
      name: "Машина",
      subCategories: {},
      dates: {},
    },
  };
  const spy = jest.spyOn(getCategories, "getCategories");
  spy.mockResolvedValue(categories);

  test("get categories returns categories array", async () => {
    await store.dispatch(fetchCategories("tkmo1eoQfQRi3F8M1WKeZsbbYm03"));
    await waitFor(() => {
      expect(store.getState().settings.categories).toBe(categories);
    });
  }, 20000);
});
