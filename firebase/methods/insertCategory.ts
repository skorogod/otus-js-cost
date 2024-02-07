import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getUser } from "./getUser";

export type insertCategoryParams = {
  categoryName: string;
  userId: string;
};

export const insertCategory = async (categoryName: string, userId: string) => {
  const userRef = await getUser(userId);

  if (userRef) {
    const docRef = await addDoc(
      collection(db, "users", `${userRef.id}`, "categories"),
      {
        name: categoryName,
        dates: {},
      },
    );

    return docRef.id;
  } else {
    throw new Error("Category Add Error");
  }
};
