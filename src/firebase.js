import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_ID,
};

console.log(firebaseConfig);

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
