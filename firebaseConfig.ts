// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBsz_jnptqg7SPMuzbTqF9Uhp5igQXG2UY",
  authDomain: "anotherchat-a84cb.firebaseapp.com",
  projectId: "anotherchat-a84cb",
  storageBucket: "anotherchat-a84cb.appspot.com",
  messagingSenderId: "1090093642466",
  appId: "1:1090093642466:web:8d5e0c972a3804103264bb",
  measurementId: "G-8BC9WP3KR4"
};

// Initialize Firebase
let firebaseApp: FirebaseApp;

if(!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

const database = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth, database };