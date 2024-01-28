import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getUser } from "./getUser";

export type insertSubCategoryParams = {
  subCategoryName: string;
  userId: string;
  categoryId: string;
};

export const insertSubcategory = async (params: insertSubCategoryParams) => {
  const user = await getUser(params.userId);
  console.log("CategoryId ", params.categoryId);

  if (user) {
    const docRef = await addDoc(
      collection(
        db,
        `users/${user.id}/categories/${params.categoryId}/subCategories`,
      ),
      {
        name: params.subCategoryName,
        dates: {},
      },
    );
    return docRef.id;
  } else {
    throw new Error("Category Add Error");
  }
};
