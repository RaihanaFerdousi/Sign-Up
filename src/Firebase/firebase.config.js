// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYf_Ai6tvsGK1Mia9j3GTreULrsuuMKNI",
  authDomain: "sign-in-cfe03.firebaseapp.com",
  projectId: "sign-in-cfe03",
  storageBucket: "sign-in-cfe03.firebasestorage.app",
  messagingSenderId: "839674741993",
  appId: "1:839674741993:web:88df3a6887e7b092391c78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, googleProvider };