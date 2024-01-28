import { getUser } from "./getUser";
import { updateDoc, doc, getDoc, setDoc, increment } from "firebase/firestore";
import { db } from "../firebase";
import { FieldValue } from "firebase/firestore";

export type updateCostsParams = {
  costDate: string;
  count: number;
  userId: string;
  categoryId: string;
  subCategoryId?: string;
};

export const updateCosts = async (params: updateCostsParams) => {
  const user = await getUser(params.userId);

  const docRef = doc(
    db,
    `users/${user.id}/categories/${params.categoryId}/${params.subCategoryId ? `subCategories/${params.subCategoryId}` : ""}`,
  );

  if (user) {
    const checkDock = await getDoc(docRef);

    if (checkDock.exists()) {
      await updateDoc(docRef, {
        [`dates.${params.costDate}.total`]: increment(params.count),
      });
    }
  }
};
