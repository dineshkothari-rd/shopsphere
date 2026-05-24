import { collection, onSnapshot } from "firebase/firestore";

import { db } from "./firestore";

export const subscribeToDashboardStats = (callback) => {
  const unsubscribers = [];

  let products = [];
  let users = [];
  let orders = [];

  const emit = () => {
    const revenue = orders.reduce((acc, order) => acc + order.total, 0);

    callback({
      totalProducts: products.length,
      totalUsers: users.length,
      totalOrders: orders.length,
      totalRevenue: revenue,
    });
  };

  const productsUnsub = onSnapshot(collection(db, "products"), (snapshot) => {
    products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    emit();
  });

  const usersUnsub = onSnapshot(collection(db, "users"), (snapshot) => {
    users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    emit();
  });

  const ordersUnsub = onSnapshot(collection(db, "orders"), (snapshot) => {
    orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    emit();
  });

  unsubscribers.push(productsUnsub, usersUnsub, ordersUnsub);

  return () => {
    unsubscribers.forEach((unsub) => unsub());
  };
};
