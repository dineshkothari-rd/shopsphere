import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

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

    if (snapshot.exists()) {
      return snapshot.data();
    }

    return null;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const usersRef = collection(db, "users");

export const getAllUsers = async () => {
  try {
    const snapshot = await getDocs(usersRef);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.log(error);

    return [];
  }
};

export const updateUserRole = async (userId, role) => {
  try {
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      role,
    });
  } catch (error) {
    console.log(error);
  }
};
