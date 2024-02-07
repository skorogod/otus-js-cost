// Copy and paste this into your JavaScript code to initialize the Firebase SDK.
// You will also need to load the Firebase SDK.
// See https://firebase.google.com/docs/web/setup for more details.
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

firebase.initializeApp({
  projectId: "otus-js-basic-cost",
  appId: "1:140404144988:web:87411a2d5824b6a3e19f99",
  storageBucket: "otus-js-basic-cost.appspot.com",
  apiKey: "AIzaSyAoLiEMl8UTdnn5Zm2uXN7wJC__SETnJic",
  authDomain: "otus-js-basic-cost.firebaseapp.com",
  messagingSenderId: "140404144988",
});

const firebaseConfig = {
  projectId: "otus-js-basic-cost",
  appId: "1:140404144988:web:87411a2d5824b6a3e19f99",
  storageBucket: "otus-js-basic-cost.appspot.com",
  apiKey: "AIzaSyAoLiEMl8UTdnn5Zm2uXN7wJC__SETnJic",
  authDomain: "otus-js-basic-cost.firebaseapp.com",
  messagingSenderId: "140404144988",
};

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// // const db = initializeFirestore(app, {experimentalForceLongPolling: true})
// const db = getFirestore(app)
