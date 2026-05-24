import { useEffect, useState } from "react";

import {
  getAllOrders,
  updateOrderStatus,
} from "@/services/firebase/orderMethods";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getAllOrders();

        queueMicrotask(() => {
          setOrders(data);
        });
      } catch (error) {
        console.log(error);
      }
    };

    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);

      const updatedOrders = await getAllOrders();

      queueMicrotask(() => {
        setOrders(updatedOrders);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6 p-8">
      <h1 className="text-3xl font-bold">Manage Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="space-y-4 rounded-2xl border p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-semibold">{order.userEmail}</h2>

              <p className="text-sm text-muted-foreground">{order.address}</p>

              <p className="mt-2 font-bold">₹{order.total}</p>
            </div>

            <Select
              value={order.status}
              onValueChange={(value) => handleStatusChange(order.id, value)}
            >
              <SelectTrigger className="w-52">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>

                <SelectItem value="confirmed">Confirmed</SelectItem>

                <SelectItem value="shipped">Shipped</SelectItem>

                <SelectItem value="delivered">Delivered</SelectItem>

                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
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
      ))}
    </div>
  );
};

export default AdminOrdersPage;
