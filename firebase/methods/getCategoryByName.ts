import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import { Categories } from "../../src/store/types";

export const getCategoryByName = (name: string, categories: Categories) => {
  const values = Object.values(categories).filter((el) => {
    return el.name.trim().toLowerCase() === name.trim().trim().toLowerCase();
  });

  if (values.length) {
    return values[0].id;
  }

  return null;
};
