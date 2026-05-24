import { updateOrderStatus } from "@/services/firebase/orderMethods";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrders } from "@/hooks/useOrders";
import { ORDER_STATUS } from "@/constants/order-status";

const AdminOrdersPage = () => {
  const { orders } = useOrders();

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
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
                <SelectItem value={ORDER_STATUS.PENDING}>Pending</SelectItem>

                <SelectItem value={ORDER_STATUS.CONFIRMED}>
                  Confirmed
                </SelectItem>

                <SelectItem value={ORDER_STATUS.SHIPPED}>Shipped</SelectItem>

                <SelectItem value={ORDER_STATUS.DELIVERED}>
                  Delivered
                </SelectItem>

                <SelectItem value={ORDER_STATUS.CANCELLED}>
                  Cancelled
                </SelectItem>
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
