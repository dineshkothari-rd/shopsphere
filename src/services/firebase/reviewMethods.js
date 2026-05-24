import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { db } from "./firestore";

const reviewsRef = collection(db, "reviews");

export const addReview = async (reviewData) => {
  return addDoc(reviewsRef, {
    ...reviewData,
    createdAt: serverTimestamp(),
  });
};

export const subscribeToReviews = (productId, callback) => {
  const q = query(
    reviewsRef,
    where("productId", "==", productId),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(q, (snapshot) => {
    const reviews = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(reviews);
  });
};
