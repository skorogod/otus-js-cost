import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../firebase";

export const getUser = async (userId: string) => {
    let resp = await getDocs(query(collection(db, "users"), where("uuid", "==", userId)));

    return resp.docs[0];
}