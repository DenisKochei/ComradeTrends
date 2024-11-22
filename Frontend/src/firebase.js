// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "comrade-trends.firebaseapp.com",
  projectId: "comrade-trends",
  storageBucket: "comrade-trends.appspot.com",
  messagingSenderId: "468093542525",
  appId: "1:468093542525:web:82091e5eb800e80f95d114",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
