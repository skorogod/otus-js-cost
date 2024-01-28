import { mockFirebase } from "firestore-jest-mock";
import { db } from "../../firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { waitFor } from "@testing-library/react";
import {
  mockCollection,
  mockUpdate,
} from "firestore-jest-mock/mocks/firestore";
import { connectFirestoreEmulator } from "firebase/firestore";
import { store } from "../store";
import { updateCostsAction } from "../store/dashboardReducer";
import * as updateCosts from "../../firebase/methods/updateCost";
import { updateCostsParams } from "../../firebase/methods/updateCost";

mockFirebase({
  database: {
    users: {
      kgbnmgbnfvmbvscbnvfjbnkbn: {
        id: "dkjfkeorjgndflvnkgfmfv",
        name: "Vasya",
        email: "vasya@mail.ru",
        categories: {
          fljkgdfgknfbdlhn: {
            id: "kjgflgfngflnffbnf",
            name: "Машина",
            subCategories: [],
            dates: [],
          },
        },
      },
    },
  },
});

describe("updateCost", () => {
  const spy = jest.spyOn(updateCosts, "updateCosts");

  const params: updateCostsParams = {
    userId: "dkjfkeorjgndflvnkgfmfv",
    categoryId: "fljkgdfgknfbdlhn",
    costDate: "11770000",
    count: 20000,
  };
  test("", () => {
    store.dispatch(updateCostsAction(params));
    expect(spy).toHaveBeenCalledWith(params);
  });
});
