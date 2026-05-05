'use client'

import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Star, ThumbsUp } from "lucide-react"
import { useState, useMemo } from "react"

interface Review {
    id: string
    user: string
    rating: number
    comment: string | null
    date: string
}

interface ReviewGalleryProps {
    reviews?: Review[]
    rating?: number
    reviewsCount?: number
}

export function ReviewGallery({ reviews = [], rating = 0, reviewsCount = 0 }: ReviewGalleryProps) {
    const [filter, setFilter] = useState('all')

    // Calculate rating distribution dynamically
    const ratingsDistribution = useMemo(() => {
        const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        reviews.forEach(r => {
            const rounded = Math.round(r.rating) as 1 | 2 | 3 | 4 | 5
            if (counts[rounded] !== undefined) counts[rounded]++
        })

        const total = reviews.length || 1
        return [5, 4, 3, 2, 1].map(star => ({
            star,
            percent: Math.round(((counts[star as 1 | 2 | 3 | 4 | 5] || 0) / total) * 100)
        }))
    }, [reviews])

    // Filter logic can be expanded here if we have verified/photo flags in DB data
    const filteredReviews = reviews

    return (
        <div className="space-y-8 mt-16 pt-10 border-t" id="reviews">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Summary */}
                <div className="space-y-4">
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold">{rating.toFixed(1)}</span>
                        <div className="text-yellow-500 text-sm">★★★★★</div>
                    </div>
                    <div className="text-muted-foreground text-sm">Based on {reviewsCount} reviews</div>

                    <div className="space-y-2">
                        {ratingsDistribution.map(({ star, percent }) => (
                            <div key={star} className="flex items-center gap-2 text-sm">
                                <span className="w-3">{star}</span>
                                <Progress value={percent} className="h-2" />
                                <span className="w-8 text-right text-muted-foreground">{percent}%</span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4">
                        <h4 className="font-semibold mb-2 text-sm">Filter Reviews</h4>
                        <div className="flex flex-wrap gap-2">
                            {/* Disabled un-implemented filters for now */}
                            {['All Reviews'].map(f => (
                                <Button
                                    key={f}
                                    variant={filter === f ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setFilter(filter === f ? 'all' : f)}
                                >
                                    {f}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="md:col-span-2 space-y-6">
                    {filteredReviews.length === 0 ? (
                        <p className="text-muted-foreground">No reviews yet for this product.</p>
                    ) : (
                        filteredReviews.map((review) => (
                            <div key={review.id} className="border-b pb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs">
                                            {review.user.substring(0, 2).toUpperCase()}
                                        </div>
                                        <span className="font-semibold text-sm">{review.user}</span>
                                        {/* Mock verified badge until DB supports it */}
                                        <span className="text-green-600 text-[10px] bg-green-50 px-1.5 py-0.5 rounded-full border border-green-200">Verified</span>
                                    </div>
                                    <div className="text-muted-foreground text-xs">{new Date(review.date).toLocaleDateString()}</div>
                                </div>
                                <div className="flex text-yellow-500 text-xs mb-2">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span key={i} className={i < Math.round(review.rating) ? "fill-current" : "text-gray-300"}>★</span>
                                    ))}
                                </div>
                                {/* Comment can be null */}
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {review.comment || "No comment provided."}
                                </p>

                                <div className="flex items-center gap-4 mt-3">
                                    <button className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground">
                                        <ThumbsUp className="h-3 w-3" /> Helpful
                                    </button>
                                </div>
                            </div>
                        ))
                    )}

                    {filteredReviews.length > 5 && (
                        <Button variant="outline" className="w-full">Load More Reviews</Button>
                    )}
                </div>
            </div>
        </div>
    )
}
