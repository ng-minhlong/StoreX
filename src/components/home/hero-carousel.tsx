'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides = [
        {
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=80",
            title: "Style Refined.",
            subtitle: "Discover the latest fashion trends for the season.",
            cta: "Shop Fashion"
        },
        {
            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=2000&q=80",
            title: "Tech Evolved.",
            subtitle: "Next-gen electronics for your modern life.",
            cta: "Explore Tech"
        },
        {
            image: "https://images.unsplash.com/photo-1520986606214-8b456906c813?auto=format&fit=crop&w=2000&q=80",
            title: "Home Comfort.",
            subtitle: "Elevate your living space with premium decor.",
            cta: "View Home"
        },
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 6000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="relative w-full h-[600px] overflow-hidden bg-black">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
                >
                    <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dark Overlay */}
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />

                    <div className="absolute inset-0 z-20 container mx-auto px-6 flex flex-col justify-center text-white">
                        <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
                                {slide.title}
                            </h1>
                            <p className="text-xl md:text-2xl font-medium text-white/90 max-w-lg">
                                {slide.subtitle}
                            </p>
                            <Button size="lg" className="rounded-full text-lg px-8 py-6 bg-white text-black hover:bg-white/90 border-none w-fit">
                                {slide.cta} <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            ))}

            <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"}`}
                    />
                ))}
            </div>
        </div>
    )
}
