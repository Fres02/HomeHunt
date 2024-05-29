// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "homehunt-4f0ff.firebaseapp.com",
  projectId: "homehunt-4f0ff",
  storageBucket: "homehunt-4f0ff.appspot.com",
  messagingSenderId: "155353157410",
  appId: "1:155353157410:web:4c23b5441b0d6f0f031f7b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);