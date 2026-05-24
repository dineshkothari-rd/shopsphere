import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { db } from "./firestore";

export const createUserInFirestore = async (user) => {
  try {
    const userRef = doc(db, "users", user.uid);

    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "",
        photoURL: user.photoURL || "",
        role: "customer",
        createdAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserData = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);

    const snapshot = await getDoc(userRef);

    return snapshot.data();
  } catch (error) {
    console.log(error);
  }
};
