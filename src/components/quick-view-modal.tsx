'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Heart } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface QuickViewModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    product: {
        id: string
        name: string
        price: string
        category: string
        rating: string
        image: string
    }
}

export function QuickViewModal({ isOpen, onOpenChange, product }: QuickViewModalProps) {
    const [selectedSize, setSelectedSize] = useState("M")

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl overflow-hidden p-0">
                <div className="grid md:grid-cols-2 gap-0">
                    {/* Filter/Image Side */}
                    <div className="relative aspect-square md:aspect-auto bg-muted">
                        <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-muted-foreground">
                            {/* Placeholder for real image */}
                            <span className="text-4xl font-bold opacity-10">{product.name}</span>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="p-6 md:p-8 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                                <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
                                <div className="flex items-center gap-1 mt-1 text-amber-500 text-sm font-medium">
                                    <Star className="h-4 w-4 fill-current" />
                                    <span>{product.rating}</span>
                                    <span className="text-muted-foreground ml-1">(120 reviews)</span>
                                </div>
                            </div>
                            <div className="text-xl font-bold">${product.price}</div>
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Experience premium quality with our latest collection.
                            Designed for comfort and durability, this item is perfect for everyday use.
                        </p>

                        <div className="space-y-3">
                            <span className="text-sm font-medium">Size</span>
                            <div className="flex gap-2">
                                {["XS", "S", "M", "L", "XL"].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`h-9 w-9 rounded-md border flex items-center justify-center text-sm transition-all ${selectedSize === size
                                                ? "border-primary bg-primary text-primary-foreground"
                                                : "border-input hover:border-foreground"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-auto flex flex-col gap-3 pt-4">
                            <Button size="lg" className="w-full">
                                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                            </Button>
                            <Button variant="outline" className="w-full">
                                <Heart className="mr-2 h-4 w-4" /> Add to Wishlist
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
