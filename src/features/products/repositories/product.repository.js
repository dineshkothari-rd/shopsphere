import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/services/firebase/firestore";

const productsRef = collection(db, "products");

const normalizeProductImages = (data) => {
  const images = data.images?.length
    ? data.images
    : data.image
      ? [data.image]
      : [];

  return {
    ...data,
    images,
    image: data.image || images[0] || "",
  };
};

export const getProductsDB = async () => {
  const q = query(productsRef, orderBy("createdAt", "desc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...normalizeProductImages(doc.data()),
  }));
};

export const subscribeToProductsDB = (callback) => {
  const q = query(productsRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...normalizeProductImages(doc.data()),
    }));

    callback(products);
  });
};

export const getSingleProductDB = async (productId) => {
  const productRef = doc(db, "products", productId);

  const snapshot = await getDoc(productRef);

  return {
    id: snapshot.id,
    ...normalizeProductImages(snapshot.data() || {}),
  };
};

export const createProductDB = async (data) => {
  return addDoc(productsRef, {
    ...normalizeProductImages(data),
    createdAt: serverTimestamp(),
  });
};

export const updateProductDB = async (productId, data) => {
  return updateDoc(doc(db, "products", productId), normalizeProductImages(data));
};

export const deleteProductDB = async (productId) => {
  return deleteDoc(doc(db, "products", productId));
};
