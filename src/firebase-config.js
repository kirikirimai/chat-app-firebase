// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCNoGgpJ8jdH7HooA9QW17al6QEmjWqXmc",
    authDomain: "chatapp-f2a40.firebaseapp.com",
    projectId: "chatapp-f2a40",
    storageBucket: "chatapp-f2a40.appspot.com",
    messagingSenderId: "155042613619",
    appId: "1:155042613619:web:96d113b6c9d1ccefa5dd06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)