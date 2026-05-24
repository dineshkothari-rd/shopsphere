import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "./firestore";
import { ORDER_STATUS } from "@/constants/order-status";

const ordersRef = collection(db, "orders");

export const createOrder = async (orderData) => {
  return addDoc(ordersRef, {
    ...orderData,
    status: ORDER_STATUS.PENDING,
    createdAt: serverTimestamp(),
  });
};

export const getUserOrders = async (userId) => {
  const q = query(
    ordersRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getAllOrders = async () => {
  const q = query(ordersRef, orderBy("createdAt", "desc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const updateOrderStatus = async (orderId, status) => {
  const orderRef = doc(db, "orders", orderId);

  return updateDoc(orderRef, {
    status,
  });
};

export const subscribeToOrders = (callback) => {
  const q = query(ordersRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(orders);
  });
};
