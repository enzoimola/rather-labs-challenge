
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FR_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FR_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FR_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FR_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FR_MESSAGIN_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FR_APP_ID,
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
