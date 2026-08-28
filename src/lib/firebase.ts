import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZDYeCEKrXYJZNTQsVdECVBLUYVJMxe0c",
  authDomain: "bg-tl-de4e0.firebaseapp.com",
  projectId: "bg-tl-de4e0",
  storageBucket: "bg-tl-de4e0.firebasestorage.app",
  messagingSenderId: "390966791643",
  appId: "1:390966791643:web:67ca1e592d965e966bebfe"
};

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
});
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
