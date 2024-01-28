export const firebaseConfig = {
    apiKey: "AIzaSyAoLiEMl8UTdnn5Zm2uXN7wJC__SETnJic",
  
    authDomain: "otus-js-basic-cost.firebaseapp.com",
  
    projectId: "otus-js-basic-cost",
  
    storageBucket: "otus-js-basic-cost.appspot.com",
  
    messagingSenderId: "140404144988",
  
    appId: "1:140404144988:web:87411a2d5824b6a3e19f99"
  
};

import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator } from "firebase/firestore";
import { firestore } from "firebase-admin";


import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    connectAuthEmulator,
} from "firebase/auth";

import {
    getFirestore,
    addDoc,
    collection,
    initializeFirestore
} from "firebase/firestore"


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = initializeFirestore(app, {experimentalForceLongPolling: true})
const db = getFirestore(app)

if (location.hostname === '127.0.0.1' || location.hostname === 'localhost') {
    connectFirestoreEmulator(db, '127.0.0.1', 8080)
    connectAuthEmulator(auth, 'http://127.0.0.1:9099')
  }


const loginWithEmailAndPassword = async (email: string, password:string) => {
    console.log("EMAIL11 ", email)
    console.log("PASSWORD11 ", password)
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        return user;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message)
        }
    }
}

const registerWithEmailAndPassword = async(name: string, email: string, password: string) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        console.log("UESER ", user.uid)

        await addDoc(collection(db, "users"), {
            uuid: user.uid,
            name,
            authProvider: 'local',
            email
        })
        
        return user;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message)
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

