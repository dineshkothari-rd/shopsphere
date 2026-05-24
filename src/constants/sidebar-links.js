import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";

import { ROUTES } from "./routes";

export const ADMIN_SIDEBAR_LINKS = [
  {
    title: "Dashboard",

    href: ROUTES.ADMIN,

    icon: LayoutDashboard,
  },

  {
    title: "Products",

    href: ROUTES.ADMIN_PRODUCTS,

    icon: Package,
  },

  {
    title: "Orders",

    href: ROUTES.ADMIN_ORDERS,

    icon: ShoppingCart,
  },

  {
    title: "Users",

    href: ROUTES.ADMIN_USERS,

    icon: Users,
  },
];
