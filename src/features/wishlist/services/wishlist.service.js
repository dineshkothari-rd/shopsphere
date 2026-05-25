import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { db } from "@/services/firebase/firestore";

const wishlistRef = collection(db, "wishlists");

export const addToWishlist = async (data) => {
  return addDoc(wishlistRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const removeFromWishlist = async (wishlistId) => {
  return deleteDoc(doc(db, "wishlists", wishlistId));
};

export const subscribeToWishlist = (userId, callback) => {
  const q = query(wishlistRef, where("userId", "==", userId));

  return onSnapshot(q, (snapshot) => {
    const wishlist = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(wishlist);
  });
};
