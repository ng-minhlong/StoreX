'use client'

import Link from "next/link"
import { ArrowRight, Zap } from "lucide-react"
import { CountdownTimer } from "@/components/home/countdown-timer"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

// Quick Mock Data for Flash Sale (since we need specific progress data not in DB)
const FLASH_DEALS = [
    {
        id: "fs-1",
        title: "Wireless Noise Cancelling Headphones",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
        price: 129.99,
        originalPrice: 299.99,
        sold: 85,
        total: 100,
        link: "/category/electronics" // Direct link since id isn't real
    },
    {
        id: "fs-2",
        title: "Smart Fitness Watch Series 5",
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
        price: 199.50,
        originalPrice: 350.00,
        sold: 45,
        total: 120,
        link: "/category/electronics"
    },
    {
        id: "fs-3",
        title: "Ergonomic Office Chair",
        image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
        price: 149.00,
        originalPrice: 249.00,
        sold: 92,
        total: 100,
        link: "/category/home-garden"
    },
    {
        id: "fs-4",
        title: "Premium Leather Backpack",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
        price: 79.99,
        originalPrice: 159.99,
        sold: 15,
        total: 50,
        link: "/category/fashion"
    }
]

export function FlashSaleSection() {
    // Set timer for 4 hours from now
    const targetDate = new Date(new Date().getTime() + 4 * 60 * 60 * 1000)

    return (
        <section className="rounded-3xl bg-gradient-to-r from-red-600 to-orange-600 p-1 md:p-8 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>

            <div className="relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8 px-4 md:px-0 pt-6 md:pt-0">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Zap className="h-8 w-8 fill-yellow-300 text-yellow-300 animate-pulse" />
                            <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase">Flash Sale</h2>
                        </div>
                        <p className="text-white/80 font-medium">Limited time offers. Grab them before they're gone!</p>
                    </div>

                    <div className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-white/10 backdrop-blur-md">
                        <span className="text-xs font-bold uppercase tracking-wider text-white/70">Ending in</span>
                        <CountdownTimer targetDate={targetDate} />
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {FLASH_DEALS.map((item) => (
                        <Link href={item.link} key={item.id} className="group bg-white rounded-2xl p-3 shadow-lg hover:translate-y-[-4px] transition-transform duration-300">
                            <div className="aspect-[4/5] rounded-xl overflow-hidden relative mb-3 bg-gray-100">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-sm shadow-sm">
                                    {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                                </div>
                            </div>

                            <div className="space-y-2 p-1">
                                <h3 className="font-bold text-gray-900 leading-tight line-clamp-2 h-10 text-sm">
                                    {item.title}
                                </h3>

                                <div className="flex items-end gap-2">
                                    <span className="text-xl font-bold text-red-600">${item.price}</span>
                                    <span className="text-xs text-gray-400 line-through mb-1">${item.originalPrice}</span>
                                </div>

                                <div className="space-y-1.5 pt-1">
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                        <span>{item.sold} Sold</span>
                                        <span className="text-red-500">Only {item.total - item.sold} Left</span>
                                    </div>
                                    <Progress value={(item.sold / item.total) * 100} className="h-1.5 bg-gray-100" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Button variant="secondary" size="lg" className="rounded-full px-8 font-bold text-red-600 hover:text-red-700 shadow-xl" asChild>
                        <Link href="/products?tag=featured">View All Flash Deals <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
