// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZAnuyoxnznf3Ptn1bOmdGsupQLRnp6g4",
  authDomain: "barber-booking-6f8c6.firebaseapp.com",
  projectId: "barber-booking-6f8c6",
  storageBucket: "barber-booking-6f8c6.firebasestorage.app",
  messagingSenderId: "985412098017",
  appId: "1:985412098017:web:0c6204960eb865028d64a0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
