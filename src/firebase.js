// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_FIREBASE_API_KEY,
  authDomain: "routourist-4dbb0.firebaseapp.com",
  projectId: "routourist-4dbb0",
  storageBucket: "routourist-4dbb0.appspot.com",
  messagingSenderId: "814465646719",
  appId: "1:814465646719:web:e99bc097276bcd07dcbf4a",
  databaseURL: "https://routourist-4dbb0-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
