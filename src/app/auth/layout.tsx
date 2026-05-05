'use client'

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { useEffect, useState } from "react"

const BACKGROUND_IMAGES = [
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop", // Online Shopping
    "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop", // Payment/Tech
    "https://images.unsplash.com/photo-1555529771-83ae75c51825?q=80&w=2070&auto=format&fit=crop", // Delivery/Lifestyle
    "https://images.unsplash.com/photo-1472851294608-415522f96385?q=80&w=2070&auto=format&fit=crop" // Fashion/Retail
]

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length)
        }, 5000) // Change image every 5 seconds

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    {children}
                </div>
            </div>
            <div className="hidden bg-muted lg:block relative overflow-hidden">
                {/* Background Image Slideshow */}
                {BACKGROUND_IMAGES.map((src, index) => (
                    <div
                        key={src}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        {/* Image with Zoom Animation */}
                        <div
                            className={`absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear ${index === currentImageIndex ? "scale-110" : "scale-100"
                                }`}
                            style={{ backgroundImage: `url(${src})` }}
                        />
                        {/* Overlay for readability */}
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                    </div>
                ))}

                <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
                    <div className="flex items-center gap-2 text-lg font-bold">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                            <ShoppingBag className="h-5 w-5" />
                        </div>
                        MiniMarket Hub
                    </div>
                    <div className="space-y-2">
                        <blockquote className="space-y-2 max-w-lg">
                            <p className="text-xl font-medium leading-relaxed">
                                &ldquo;The most robust platform we've used. It handles our multi-vendor scale effortlessly while looking stunning.&rdquo;
                            </p>
                            <footer className="text-sm text-white/80 font-semibold tracking-wide">
                                Alex Chen, CTO of GlobalMart
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    )
}
