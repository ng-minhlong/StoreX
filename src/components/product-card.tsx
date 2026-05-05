'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCartStore } from '@/store/cart'
import { toast } from 'sonner'

interface ProductCardProps {
    id: string
    name: string
    price: number | string
    category: string
    vendor: string
    vendorId: string // needed for cart
    image?: string
    rating?: number | string
    reviews?: number
    className?: string
}

export function ProductCard({
    id,
    name,
    price,
    category,
    vendor,
    vendorId,
    image,
    rating = 4.5,
    reviews = 120,
    className
}: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem)
    const [imageError, setImageError] = useState(false)

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        addItem({
            productId: id,
            name,
            price: Number(price),
            quantity: 1,
            vendorId,
            image
        })
        toast.success("Added to Cart")
    }

    return (
        <div className={cn("group relative flex flex-col h-full bg-card rounded-xl border border-border/50 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 overflow-hidden", className)}>

            {/* Image Area */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-white/50 group-hover:bg-white transition-colors">
                <Link href={`/products/${id}`} className="flex items-center justify-center w-full h-full p-6">
                    {image && !imageError ? (
                        <img
                            src={image}
                            alt={name}
                            className="object-contain max-h-full max-w-full transition-transform duration-500 group-hover:scale-110"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-muted-foreground w-full h-full bg-secondary/30">
                            <span className="text-xs font-medium">No Image</span>
                        </div>
                    )}
                </Link>

                {/* Overlay Action Buttons */}
                <div className="absolute right-3 top-3 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm hover:bg-primary hover:text-primary-foreground" title="Quick View">
                        <Eye className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 p-4 pt-3 flex-1">
                {/* Vendor / Category Label */}
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{category}</div>

                {/* Title */}
                <Link href={`/products/${id}`} className="text-sm font-semibold text-foreground leading-snug line-clamp-2 hover:text-primary transition-colors">
                    {name}
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-auto">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium text-foreground">{rating}</span>
                    <span className="text-xs text-muted-foreground">({reviews})</span>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2 mt-1 border-t border-border/40">
                    {/* Price */}
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-primary">${Number(price).toFixed(2)}</span>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                        size="sm"
                        className="rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all shadow-none hover:shadow-md px-3 h-8"
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="h-4 w-4 mr-1.5" />
                        Add
                    </Button>
                </div>
            </div>
        </div>
    )
}

