import {
  addDoc,
  collection,
  doc,
  getDoc,
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

export const getSingleProduct = async (productId) => {
  const productRef = doc(db, "products", productId);

  const snapshot = await getDoc(productRef);

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};
