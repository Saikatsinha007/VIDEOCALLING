// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { collection,getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBI4NZEzEcWmNz6IdLTq7pGU6sg2ric9Hw",
  authDomain: "zoomclone-8e08f.firebaseapp.com",
  projectId: "zoomclone-8e08f",
  storageBucket: "zoomclone-8e08f.appspot.com",
  messagingSenderId: "491876183196",
  appId: "1:491876183196:web:523f370cdfe62c08e41159"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app);
export const firebaseDB=getFirestore(app);
export const usersRef = collection(firebaseDB, "users");
export const meetingsRef = collection(firebaseDB, "meetings");