import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Firebase configuration for your project
const firebaseConfig = {
  apiKey: "AIzaSyDBh96PF0pZoDct4qGiqs13PuQXX721du0",
  authDomain: "medilink-69cac.firebaseapp.com",
  databaseURL: "https://medilink-69cac-default-rtdb.firebaseio.com",
  projectId: "medilink-69cac",
  storageBucket: "medilink-69cac.appspot.com",
  messagingSenderId: "110671620592",
  appId: "1:110671620592:web:7af7ff463d91188aa59535",
  measurementId: "G-1JDKFS7QMW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null; // Only initialize analytics on the client-side

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore Database
const db = getFirestore(app);

const storage = getStorage(app)

// Export the Firebase services for use in your application
export { app, analytics, auth, db , storage};
