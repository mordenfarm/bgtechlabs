import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:000000000000:web:0000000000000000000000"
};

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
});

let authInstance: Auth;
try {
  authInstance = getAuth(app);
} catch {
  authInstance = new Proxy({} as Auth, {
    get: (_target, prop) => {
      if (prop === "onAuthStateChanged") {
        return (cb: (user: null) => void) => {
          if (typeof cb === "function") cb(null);
          return () => {};
        };
      }
      return () => Promise.resolve();
    }
  });
}

export const auth = authInstance;
export const googleProvider = new GoogleAuthProvider();
