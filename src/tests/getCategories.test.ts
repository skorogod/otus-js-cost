import { waitFor } from "@testing-library/react";
import { store } from "../store";
import { fetchCategories } from "../store/settingsReducer";
import * as getCategories from "../../firebase/methods/getCategories";
import { Category } from "../store/types";

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
