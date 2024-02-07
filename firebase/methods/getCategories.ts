import {
  query,
  collection,
  where,
  getDocs,
  getDoc,
  doc,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase";
import { getUser } from "./getUser";
import { Category, SubCategory, CostDate } from "../../src/store/types";

export const getCategories = async (userId: string) => {
  const user = await getUser(userId);

  if (user) {
    const categoriesDocs = await getDocs(
      query(collection(db, "users", `${user.id}`, "categories")),
    );

    const categories: { [category: string]: Category } = Object();

    categoriesDocs.forEach((el) => {
      categories[el.id] = { id: el.id, ...el.data() } as Category;
    });

    for (let category of Object.keys(categories)) {
      let subCategories = await getDocs(
        query(
          collection(
            db,
            `users/${user.id}/categories/${category}/subCategories`,
          ),
        ),
      );

      if (subCategories.docs.length) {
        for (let subCat of subCategories.docs) {
          if (!categories[category].subCategories) {
            categories[category].subCategories = {};
          }

          categories[category].subCategories[subCat.id] = {
            id: subCat.id,
            ...subCat.data(),
          } as SubCategory;
        }
      } else {
        categories[category].subCategories = {};
      }
    }

    return categories;
  } else {
    throw new Error("get Categories Error");
  }
};
