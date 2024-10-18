// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCui8qyTsnl1356GlrJYY9HhERJkW9emZo",
  authDomain: "breeze-boutique.firebaseapp.com",
  projectId: "breeze-boutique",
  storageBucket: "breeze-boutique.appspot.com",
  messagingSenderId: "427712977296",
  appId: "1:427712977296:web:388cbb39c86154d1ecfb15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);