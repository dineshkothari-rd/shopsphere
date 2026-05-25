import { useState } from "react";

import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useAuthStore } from "@/features/auth/store/useAuthStore";

import { addReview } from "@/features/reviews/services/review.service";

import { toast } from "sonner";
import { motion } from "framer-motion";

const ReviewForm = ({ productId }) => {
  const user = useAuthStore((state) => state.user);

  const [rating, setRating] = useState(5);

  const [review, setReview] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return toast.error("Please login first");
    }

    try {
      setLoading(true);

      await addReview({
        productId,
        userId: user.uid,
        userEmail: user.email,
        rating,
        review,
      });

      toast.success("Review added successfully");

      setReview("");

      setRating(5);
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass premium-shadow space-y-6 rounded-[2rem] border border-white/10 p-5 sm:p-8"
    >
      <h2 className="text-2xl font-black tracking-tight">Write a Review</h2>

      <div className="flex flex-wrap gap-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            whileTap={{
              scale: 0.9,
            }}
            whileHover={{
              scale: 1.1,
            }}
            type="button"
            key={star}
            onClick={() => setRating(star)}
            className="transition"
          >
            <Star
              className={`h-8 w-8 transition ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          </motion.button>
        ))}
      </div>

      <Textarea
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="min-h-[140px] rounded-3xl border-white/10 bg-background/50 p-5"
      />

      <Button
        type="submit"
        disabled={loading}
        className="h-14 rounded-2xl px-8 text-base font-semibold"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
};

export default ReviewForm;
