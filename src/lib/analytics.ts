import { doc, getDoc, setDoc, updateDoc, increment, collection } from "firebase/firestore";
import { db } from "./firebase";

export const trackPageVisit = async (path: string) => {
  const pageId = path === "/" ? "home" : path.replace(/^\//, "").replace(/\//g, "-");
  if (!pageId) return;

  const docRef = doc(db, "analytics", pageId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        visits: increment(1)
      });
    } else {
      await setDoc(docRef, {
        path: path,
        visits: 1,
        buttonClicks: {}
      });
    }
  } catch (e) {
    console.error("Error tracking visit: ", e);
  }
};

export const trackButtonClick = async (path: string, buttonName: string) => {
  const pageId = path === "/" ? "home" : path.replace(/^\//, "").replace(/\//g, "-");
  if (!pageId) return;

  const docRef = doc(db, "analytics", pageId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        [`buttonClicks.${buttonName}`]: increment(1)
      });
    } else {
      await setDoc(docRef, {
        path: path,
        visits: 1,
        buttonClicks: {
          [buttonName]: 1
        }
      });
    }
  } catch (e) {
    console.error("Error tracking button click: ", e);
  }
};
