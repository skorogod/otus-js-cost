import { query, collection, where, getDocs,  getDoc, doc, QueryDocumentSnapshot, DocumentData} from "firebase/firestore";
import { db } from "../firebase";
import { getUser } from "./getUser";
import { Category, SubCategory } from "../../src/store/types";


export const getCategories = async (userId: string) => {
        const user = await getUser(userId)

        if (user) {
                const categoriesDocs = await getDocs(query(collection(db, "users", `${user.id}`, "categories")));
                console.log(categoriesDocs)
                console.log(categoriesDocs.docs)
                
                const categories: {[key: string]: Category} = Object()

                categoriesDocs.forEach(el => {
                        categories[el.id] = {id: el.id, ...el.data()} as Category;
                })

                for(let key of Object.keys(categories)) {
                        let subCategories = await getDocs(query(collection(db, `users/${user.id}/categories/${key}/subCategories`)))
                        let dates = await getDocs(query(collection(db, `categories`)))
                        if (subCategories) {
                                subCategories.forEach(el => {
                                        if (!categories[key].subCategories) {
                                                categories[key].subCategories = {}
                                        }
                                        categories[key].subCategories[el.id] = {id: el.id, ...el.data()} as SubCategory
                                })
                        }
                }
                console.log("Categories ", categories);
                return categories;
        }
        else {
                throw new Error("get Categories Error")
        }
}