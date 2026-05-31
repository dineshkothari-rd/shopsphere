import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrders } from "@/hooks/useOrders";
import { ORDER_STATUS, ORDER_STATUS_STYLES } from "@/constants/order-status";
import { updateOrderStatus } from "../services/order.service";

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
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <h1 className="page-title">
        Manage Orders
      </h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="soft-card space-y-5 p-5 sm:p-6"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Order ID
                </p>

                <p className="text-sm font-medium">#{order.id.slice(0, 8)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Customer</p>

                <h2 className="text-xl font-black">
                  {order.name || "Unknown User"}
                </h2>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {order.userEmail}
                </p>

                <p className="text-sm text-muted-foreground">
                  {order.phone || "No Contact"}
                </p>
              </div>

              <div className="pt-2">
                <p className="text-sm text-muted-foreground">
                  Delivery Address
                </p>

                <p className="font-medium">{order.address}</p>
              </div>

              <p className="pt-2 text-2xl font-black">₹{order.total}</p>
              <div
                className={`inline-flex rounded-full border px-4 py-2 text-xs font-semibold capitalize ${
                  ORDER_STATUS_STYLES[order.status]
                }`}
              >
                {order.status}
              </div>
            </div>

            <Select
              value={order.status}
              onValueChange={(value) => handleStatusChange(order.id, value)}
            >
              <SelectTrigger className="h-12 min-h-12 w-full rounded-xl border-border/70 bg-background/70 lg:w-56">
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

          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl border border-border/70 bg-background/60 p-3"
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
      ))}
    </div>
  );
};

export default AdminOrdersPage;
