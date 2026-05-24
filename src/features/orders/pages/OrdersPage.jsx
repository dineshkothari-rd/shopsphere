import { useEffect, useState } from "react";

import Container from "@/components/shared/Container";

import { useAuthStore } from "@/features/auth/store/useAuthStore";

import { getUserOrders } from "@/services/firebase/orderMethods";

const OrdersPage = () => {
  const user = useAuthStore((state) => state.user);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user) return;

        const data = await getUserOrders(user.uid);

        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <section className="py-10">
      <Container className="space-y-6">
        <h1 className="text-4xl font-bold">My Orders</h1>

        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="space-y-4 rounded-2xl border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">
                    Order #{order.id.slice(0, 8)}
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    {order.address}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold">₹{order.total}</p>

                  <span className="rounded-full bg-secondary px-3 py-1 text-xs">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-16 w-16 rounded-lg object-cover"
                    />

                    <div>
                      <p>{item.title}</p>

                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </Container>
    </section>
  );
};

export default OrdersPage;
