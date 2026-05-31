import { useEffect, useState } from "react";

import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { ORDER_STATUS, ORDER_STATUS_STYLES } from "@/constants/order-status";
import { getUserOrders, updateOrderStatus } from "../services/order.service";
import { toast } from "sonner";

const orderSteps = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.CONFIRMED,
  ORDER_STATUS.SHIPPED,
  ORDER_STATUS.DELIVERED,
];

const formatOrderDate = (createdAt) => {
  const date = createdAt?.toDate?.();

  if (!date) return "Recently placed";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const OrdersPage = () => {
  const user = useAuthStore((state) => state.user);

  const [orders, setOrders] = useState([]);

  const [cancellingOrderId, setCancellingOrderId] = useState(null);

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

  const handleCancelOrder = async (orderId) => {
    try {
      setCancellingOrderId(orderId);

      await updateOrderStatus(orderId, ORDER_STATUS.CANCELLED);

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: ORDER_STATUS.CANCELLED,
              }
            : order,
        ),
      );

      toast.success("Order cancelled");
    } catch (error) {
      console.log(error);

      toast.error("Failed to cancel order");
    } finally {
      setCancellingOrderId(null);
    }
  };

  return (
    <section className="page-shell">
      <Container className="space-y-6">
        <h1 className="page-title">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="app-surface rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-black">No Orders Found</h2>

            <p className="mt-3 text-muted-foreground">
              Your orders will appear here.
            </p>
          </div>
        ) : (
          orders.map((order) => {
            const canCancel = [
              ORDER_STATUS.PENDING,
              ORDER_STATUS.CONFIRMED,
            ].includes(order.status);
            const activeStepIndex = orderSteps.indexOf(order.status);

            return (
              <div
                key={order.id}
                className="app-surface space-y-6 rounded-2xl p-5 sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="font-semibold">
                      Order #{order.id.slice(0, 8)}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      {formatOrderDate(order.createdAt)} • {order.address}
                    </p>
                  </div>

                  <div className="space-y-3 sm:text-right">
                    <p className="font-bold">₹{order.total}</p>

                    <span
                      className={`inline-flex rounded-full border px-4 py-2 text-xs font-medium capitalize ${
                        ORDER_STATUS_STYLES[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {order.status === ORDER_STATUS.CANCELLED ? (
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-medium text-red-500">
                    This order has been cancelled.
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-4">
                    {orderSteps.map((step, index) => {
                      const isActive = index <= activeStepIndex;

                      return (
                        <div
                          key={step}
                          className={`rounded-2xl border p-3 text-sm capitalize ${
                            isActive
                              ? "border-primary/30 bg-primary/10 text-primary"
                              : "border-border/70 bg-background/60 text-muted-foreground"
                          }`}
                        >
                          {step}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-xl border border-border/70 bg-background/60 p-3"
                    >
                      <img
                        src={item.image || item.images?.[0]}
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

                {canCancel && (
                  <Button
                    variant="outline"
                    className="h-11 rounded-2xl border-red-500/20 text-red-500 hover:bg-red-500/10 hover:text-red-500"
                    disabled={cancellingOrderId === order.id}
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    {cancellingOrderId === order.id
                      ? "Cancelling..."
                      : "Cancel Order"}
                  </Button>
                )}
              </div>
            );
          })
        )}
      </Container>
    </section>
  );
};

export default OrdersPage;
