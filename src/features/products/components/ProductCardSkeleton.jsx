import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="soft-card space-y-4 p-5">
      <Skeleton className="aspect-square w-full rounded-xl" />

      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />

        <Skeleton className="h-4 w-full" />

        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-20" />

        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  );
};

export default ProductCardSkeleton;
