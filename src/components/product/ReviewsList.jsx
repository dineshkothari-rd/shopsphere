import { useEffect, useMemo, useState } from "react";

import { Star } from "lucide-react";

import { subscribeToReviews } from "@/services/firebase/reviewMethods";

const ReviewsList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToReviews(productId, (data) => {
      queueMicrotask(() => {
        setReviews(data);
      });
    });

    return () => unsubscribe();
  }, [productId]);

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;

    const total = reviews.reduce((acc, review) => acc + review.rating, 0);

    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border p-6">
        <div className="flex items-center gap-4">
          <div className="text-5xl font-bold">{averageRating}</div>

          <div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              {reviews.length} reviews
            </p>
          </div>
        </div>
      </div>

      {reviews.map((review) => (
        <div key={review.id} className="rounded-3xl border p-6">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="font-semibold">{review.userEmail}</p>

              <div className="mt-1 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <p className="text-muted-foreground">{review.review}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
