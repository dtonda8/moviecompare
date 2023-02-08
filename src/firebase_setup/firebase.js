// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMMxEDdheNcY4ee_DkZDSx1XbJBAzgEq0",
  authDomain: "moviecompare-a570f.firebaseapp.com",
  projectId: "moviecompare-a570f",
  storageBucket: "moviecompare-a570f.appspot.com",
  messagingSenderId: "108073573618",
  appId: "1:108073573618:web:e2e254ef09409038c9846b",
  measurementId: "G-E5LXSFJR5X",
  databaseURL: 'https://moviecompare-a570f-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

