import { Star, MessageSquare } from "lucide-react";
import type { Review } from "../../types";
import EmptyState from "../common/EmptyState";

interface ReviewsListProps {
    reviews: Review[];
    averageRating?: number;
}

function StarRow({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    size={13}
                    className={
                        i < Math.round(rating)
                            ? "fill-[#FF8A22] text-[#FF8A22]"
                            : "fill-transparent text-[#0D0E12]/20"
                    }
                />
            ))}
        </div>
    );
}

function timeAgo(dateString: string) {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (days <= 0) return "Today";
    if (days === 1) return "1 day ago";
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} mo ago`;
    return `${Math.floor(months / 12)} yr ago`;
}

export default function ReviewsList({ reviews, averageRating }: ReviewsListProps) {
    if (reviews.length === 0) {
        return (
            <EmptyState
                icon={<MessageSquare size={28} />}
                title="No reviews yet"
                description="Be the first to share what you thought about this product."
            />
        );
    }

    const avg =
        averageRating ?? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    return (
        <div className="w-full bg-transparent">
            <div className="mb-5 flex items-center gap-3">
                <span className="text-2xl font-extrabold text-[#0D0E12]"
                style={{ fontFamily: "Bold, sans-serif" }}
                >{avg.toFixed(1)}</span>
                <div>
                    <StarRow rating={avg} />
                    <span className="text-xs text-[#0D0E12]/45"
                    style={{ fontFamily: "Medium, sans-serif" }}
                    >{reviews.length} reviews</span>
                </div>
            </div>

            <div className="flex flex-col divide-y divide-[#0D0E12]/8">
                {reviews.map((review) => (
                    <div key={review.id} className="py-4 first:pt-0">
                        <div className="flex items-center justify-between">
                            <span className="text-md text-[#2b2b2b]"
                            style={{ fontFamily: "Medium, sans-serif" }}
                            >
                                {review.userName}
                            </span>
                            <span className="text-xs text-[#0D0E12]/40"
                            style={{ fontFamily: "Regular, sans-serif" }}
                            >
                                {timeAgo(review.createdAt)}
                            </span>
                        </div>
                        <div className="mt-1">
                            <StarRow rating={review.rating} />
                        </div>
                        <p className="mt-2 text-sm text-[#0D0E12]/65"
                        style={{ fontFamily: "Regular, sans-serif" }}
                        >{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}