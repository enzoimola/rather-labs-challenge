
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth ,onAuthStateChanged } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQSvWTTWcC060CVvYe7YEXPUle1c4M78E",
    authDomain: "rather-labs-challenge.firebaseapp.com",
    projectId: "rather-labs-challenge",
    storageBucket: "rather-labs-challenge.appspot.com",
    messagingSenderId: "46505042684",
    appId: "1:46505042684:web:9f0f4b0e049d8c15c4ed79"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
