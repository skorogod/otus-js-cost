import { query, collection, where, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

export const insertCategory = async (categoryName: string, userId: string) => {
    const q = query(collection(db, "users"), where("uuid", "==", userId))
    const data = await getDocs(q);

    if (data.docs) {
        const userRef = data.docs[0];
        const docRef = await updateDoc(doc(db, "users", userRef.id), {
            categories: arrayUnion(
                {
                    name: categoryName
                }
            )
        })
    }
}