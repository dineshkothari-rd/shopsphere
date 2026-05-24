import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "../ui/button";

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Card className="overflow-hidden rounded-2xl transition hover:shadow-lg">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      <CardContent className="space-y-3 p-4">
        <div>
          <h2 className="line-clamp-1 text-lg font-semibold">
            {product.title}
          </h2>

          <p className="line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">₹{product.price}</span>

          <span className="rounded-full bg-secondary px-3 py-1 text-xs">
            {product.category}
          </span>
        </div>
        <Button className="w-full" onClick={() => addToCart(product)}>
          Add To Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
