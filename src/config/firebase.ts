
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB5Cb1WNQqT5SEHi-7TvfnNtLM2gDjcNo",
  authDomain: "mtg-boot.firebaseapp.com",
  databaseURL: "https://mtg-boot-default-rtdb.firebaseio.com",
  projectId: "mtg-boot",
  storageBucket: "mtg-boot.firebasestorage.app",
  messagingSenderId: "326876779308",
  appId: "1:326876779308:web:ddf81c0121ae3ccc3d41b1",
  measurementId: "G-TQ6LKY83RN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const rtdb = getDatabase(app);

export { app, db, auth, analytics, storage, rtdb };
