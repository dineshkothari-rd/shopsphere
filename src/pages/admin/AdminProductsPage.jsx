import AddProductForm from "@/components/admin/AddProductForm";

const AdminProductsPage = () => {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
          Products
        </h1>

        <p className="mt-2 text-muted-foreground">
          Add and manage your ecommerce products.
        </p>
      </div>

      <div className="glass premium-shadow mx-auto max-w-3xl rounded-[2rem] border border-white/10 p-5 sm:p-8">
        <AddProductForm />
      </div>
    </div>
  );
};

export default AdminProductsPage;
