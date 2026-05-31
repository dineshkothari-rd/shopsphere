import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { ORDER_STATUS } from "@/constants/order-status";
import { db } from "@/services/firebase/firestore";

const ordersRef = collection(db, "orders");

export const createOrder = async (orderData) => {
  const orderRef = doc(ordersRef);

  await runTransaction(db, async (transaction) => {
    const productRefs = orderData.items.map((item) =>
      doc(db, "products", item.id),
    );

    const productSnapshots = await Promise.all(
      productRefs.map((productRef) => transaction.get(productRef)),
    );

    productSnapshots.forEach((snapshot, index) => {
      const item = orderData.items[index];

      if (!snapshot.exists()) {
        throw new Error(`${item.title} is no longer available.`);
      }

      const stock = Number(snapshot.data().stock || 0);

      if (stock < item.quantity) {
        throw new Error(`Only ${stock} unit(s) of ${item.title} are available.`);
      }
    });

    productSnapshots.forEach((snapshot, index) => {
      const item = orderData.items[index];
      const productRef = productRefs[index];
      const stock = Number(snapshot.data().stock || 0);

      transaction.update(productRef, {
        stock: stock - item.quantity,
      });
    });

    transaction.set(orderRef, {
      ...orderData,
      status: ORDER_STATUS.PENDING,
      createdAt: serverTimestamp(),
    });
  });

  return orderRef;
};

export const getUserOrders = async (userId) => {
  try {
    const q = query(ordersRef, where("userId", "==", userId));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.log(error);

    return [];
  }
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

  return runTransaction(db, async (transaction) => {
    const orderSnapshot = await transaction.get(orderRef);

    if (!orderSnapshot.exists()) {
      throw new Error("Order not found.");
    }

    const order = orderSnapshot.data();
    const shouldRestock =
      status === ORDER_STATUS.CANCELLED &&
      order.status !== ORDER_STATUS.CANCELLED;

    if (shouldRestock) {
      const productRefs = order.items.map((item) => doc(db, "products", item.id));
      const productSnapshots = await Promise.all(
        productRefs.map((productRef) => transaction.get(productRef)),
      );

      productSnapshots.forEach((snapshot, index) => {
        if (!snapshot.exists()) return;

        const item = order.items[index];
        const productRef = productRefs[index];
        const stock = Number(snapshot.data().stock || 0);

        transaction.update(productRef, {
          stock: stock + item.quantity,
        });
      });
    }

    transaction.update(orderRef, {
      status,
    });
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
