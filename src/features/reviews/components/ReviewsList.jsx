import { useEffect, useMemo, useState } from "react";

import { Star } from "lucide-react";

import { subscribeToReviews } from "@/features/reviews/services/review.service";
import { motion } from "framer-motion";

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
      <div className="app-surface rounded-2xl p-5 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="text-4xl font-black sm:text-5xl">{averageRating}</div>

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
        <motion.div
          key={review.id}
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="soft-card p-5 sm:p-6"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-black text-primary">
              {review.userEmail?.charAt(0).toUpperCase()}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-bold">{review.userEmail}</p>

                <span className="rounded-full border border-green-500/20 bg-green-500/10 px-2 py-1 text-[10px] font-semibold text-green-500">
                  Verified
                </span>
              </div>

              <div className="mt-2 flex">
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

          <p className="leading-relaxed text-muted-foreground">
            {review.review}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default ReviewsList;
