import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "invoice-app-2fced.firebaseapp.com",
  projectId: "invoice-app-2fced",
  storageBucket: "invoice-app-2fced.appspot.com",
  messagingSenderId: "708380483545",
  appId: "1:708380483545:web:f4221733264ba4a45c03c8",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth();

// Passwordless auth set up
export const actionCodeSettings = {
  // http://localhost:3000
  // url: `${window.location.origin}`,
  url: `https://invoice-app-react-simas.netlify.app/`,
  handleCodeInApp: true,
};
