import { getUser } from "./getUser";
import { updateDoc, doc, getDoc, setDoc, increment } from "firebase/firestore";
import { db } from "../firebase";


export type updateCostsParams = {
    costDate: string,
    count: number,
    userId: string,
    categoryId: string,
    subCategoryId?: string
}


export const updateCosts = async (params: updateCostsParams) => {
    const user = await getUser(params.userId)

    const docRef = doc(
        db, `users/${user.id}/categories/${params.categoryId}/${params.subCategoryId ? `subCategories/${params.subCategoryId}/dates/${params.costDate}` : `dates/${params.costDate}`}`)
    

    if (user) {
        const checDoc = await getDoc(docRef);

        if (checDoc.exists()) {
            await updateDoc(docRef, {
                total: increment(params.count)
            })
        }

        else {
            await setDoc(docRef, {
                total: params.count
            })
        }
    }
    else {
        throw new Error ("Category Add Error")
    }
}
