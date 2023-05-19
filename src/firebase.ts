// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import {getFunctions} from 'firebase/functions'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhoqIY8DBI5UdP2eHR30B-Y_7h-etyyS8",
  authDomain: "i-calorie.firebaseapp.com",
  projectId: "i-calorie",
  storageBucket: "i-calorie.appspot.com",
  messagingSenderId: "459220845275",
  appId: "1:459220845275:web:56e2a5fc87504ff47a82fe",
  measurementId: "G-ZS18CKDH9Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence)
const functions = getFunctions(app)
const db = getFirestore(app);


export {app, analytics, auth, functions, db}