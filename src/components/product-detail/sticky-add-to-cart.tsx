'use client'

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { ShoppingCart } from "lucide-react"

interface StickyAddToCartProps {
    name: string
    price: number
    image: string
    onAddToCart: () => void
}

export function StickyAddToCart({ name, price, image, onAddToCart }: StickyAddToCartProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 600) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("scroll", toggleVisibility)
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    if (!isVisible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t shadow-lg z-50 p-4 animate-in slide-in-from-bottom-5 duration-300">
            <div className="container flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image} alt={name} className="h-10 w-10 rounded-md object-cover hidden sm:block" />
                    <div>
                        <h4 className="font-semibold text-sm line-clamp-1">{name}</h4>
                        <div className="text-sm font-bold">${price.toFixed(2)}</div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button onClick={onAddToCart} className="rounded-full shadow-lg">
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    )
}
