import ProductDialog from "@/features/products/components/ProductDialog";
import AdminProductList from "@/features/products/pages/AdminProductList";

const AdminProductsPage = () => {
  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            Products
          </h1>

          <p className="text-muted-foreground">
            Manage your ecommerce inventory.
          </p>
        </div>

        <ProductDialog mode="create" />
      </div>

      <AdminProductList />
    </div>
  );
};

export default AdminProductsPage;
