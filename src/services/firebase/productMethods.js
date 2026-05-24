import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firestore";

const productsRef = collection(db, "products");

export const addProduct = async (productData) => {
  return addDoc(productsRef, {
    ...productData,
    createdAt: serverTimestamp(),
  });
};

export const getProducts = async () => {
  const q = query(productsRef, orderBy("createdAt", "desc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
