import { useState } from "react";

import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useAuthStore } from "@/features/auth/store/useAuthStore";

import { addReview } from "@/features/reviews/services/review.service";

import { toast } from "sonner";

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
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border p-6">
      <h2 className="text-2xl font-bold">Write a Review</h2>

      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button type="button" key={star} onClick={() => setRating(star)}>
            <Star
              className={`h-7 w-7 ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          </button>
        ))}
      </div>

      <Textarea
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
};

export default ReviewForm;
