import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Read from .env file using import.meta.env (Vite specific)
const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "AIzaSyDR8iUKGH5xSNxxadHXURLww4svFlGyUWA",
  authDomain: "notes-app-1f946.firebaseapp.com",
  databaseURL: "https://notes-app-1f946-default-rtdb.firebaseio.com",
  projectId: "notes-app-1f946",
  storageBucket: "notes-app-1f946.firebasestorage.app",
  messagingSenderId: "211368205758",
  appId: "1:211368205758:web:1cb0b877198349474badef"
=======
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
>>>>>>> main
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);