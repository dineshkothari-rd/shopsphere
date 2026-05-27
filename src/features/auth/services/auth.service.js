import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth, googleProvider } from "../../../services/firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/firebase/firestore";

export const registerUser = async (email, password, name = "") => {
  const response = await createUserWithEmailAndPassword(auth, email, password);

  const user = response.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email: user.email,
    role: "customer",
    createdAt: Date.now(),
  });

  return response;
};

export const loginUser = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const googleLogin = async () => {
  const response = await signInWithPopup(auth, googleProvider);

  const user = response.user;

  await setDoc(
    doc(db, "users", user.uid),
    {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email,
      role: "customer",
      createdAt: Date.now(),
    },
    {
      merge: true,
    },
  );

  return response;
};

export const logoutUser = async () => {
  return signOut(auth);
};
