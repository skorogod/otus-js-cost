import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getCategories = async (userId: string) => {
        const q = query(collection(db, "users"), where("uuid", "==", userId))
        const doc = await getDocs(q);
        const data = doc.docs[0].data()
        return data.categories;
}