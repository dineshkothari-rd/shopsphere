import { useEffect, useState } from "react";

import Container from "@/components/shared/Container";

import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { getUserOrders } from "../services/order.service";

const OrdersPage = () => {
  const user = useAuthStore((state) => state.user);

  const [orders, setOrders] = useState([]);

  console.log({ orders });

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
    <section className="relative overflow-hidden py-8 sm:py-10">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      <Container className="relative space-y-6">
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="glass premium-shadow rounded-[2rem] border border-white/10 p-10 text-center">
            <h2 className="text-2xl font-black">No Orders Found</h2>

            <p className="mt-3 text-muted-foreground">
              Your orders will appear here.
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="glass premium-shadow space-y-5 rounded-[2rem] border border-white/10 p-5 sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
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

                  <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-medium text-primary">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-background/30 p-3"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-16 w-16 rounded-2xl object-cover"
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
