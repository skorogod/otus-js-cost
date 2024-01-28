import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../firebase";

export const getUser = async (userId: string) => {
    console.log(userId);
    let resp = await getDocs(query(collection(db, "users"), where("uuid", "==", userId),));
    console.log(resp.docs);
    return resp.docs[0];
}