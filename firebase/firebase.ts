const firebaseConfig = {

    apiKey: "AIzaSyAoLiEMl8UTdnn5Zm2uXN7wJC__SETnJic",
  
    authDomain: "otus-js-basic-cost.firebaseapp.com",
  
    projectId: "otus-js-basic-cost",
  
    storageBucket: "otus-js-basic-cost.appspot.com",
  
    messagingSenderId: "140404144988",
  
    appId: "1:140404144988:web:87411a2d5824b6a3e19f99"
  
};

import { initializeApp } from "firebase/app";


import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";

import {
    getFirestore,
    addDoc,
    collection
} from "firebase/firestore"


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
 

const loginWithEmailAndPassword = async (email: string, password:string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    }
    catch (err) {
        console.log(err)
        if (err instanceof Error) {
            alert(err.message)
        }
    }
}


const registerWithEmailAndPassword = async(name: string, email: string, password: string) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uuid: user.uid,
            name,
            authProvider: 'local',
            email
        })
    }
    catch (err) {
        console.log(err)
        if (err instanceof Error) {
            alert(err.message)
        }
    }
}


const logOut = () => {
    signOut(auth);
}

export {
    auth,
    db,
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
    logOut
}

