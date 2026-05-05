'use client'

import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const CATEGORIES = [
    {
        name: "Electronics",
        items: ["Smartphones", "Laptops", "Audio", "Cameras", "Wearables"]
    },
    {
        name: "Fashion",
        items: ["Men", "Women", "Kids", "Bags", "Watches"]
    },
    {
        name: "Home & Living",
        items: ["Furniture", "Decor", "Lighting", "Kitchen", "Bedding"]
    },
    {
        name: "Sports",
        items: ["Gym Equipment", "Cycling", "Running", "Yoga", "Team Sports"]
    }
]

export function MegaMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-secondary h-8 rounded-full px-3 font-medium">
                        Shop Categories
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid grid-cols-[1fr_250px] gap-6 p-6 w-[800px] bg-background rounded-xl shadow-xl">
                            <div className="grid grid-cols-2 gap-6">
                                {CATEGORIES.map((category) => (
                                    <div key={category.name} className="space-y-3">
                                        <h4 className="font-bold text-sm uppercase tracking-wider text-primary">{category.name}</h4>
                                        <ul className="space-y-2">
                                            {category.items.map((item) => (
                                                <li key={item}>
                                                    <Link
                                                        href={`/products?category=${category.name.toLowerCase()}&q=${item.toLowerCase()}`}
                                                        className="block text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all"
                                                    >
                                                        {item}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-4">
                                <Link href="/products" className="group relative h-40 rounded-lg overflow-hidden flex items-end p-4">
                                    <img
                                        src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80"
                                        alt="Ad"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <div className="relative text-white">
                                        <span className="text-xs font-bold bg-primary px-2 py-0.5 rounded-sm mb-2 inline-block">NEW</span>
                                        <p className="font-bold leading-tight">New Arrivals in Tech</p>
                                    </div>
                                </Link>
                                <Link href="/sales" className="group relative h-40 rounded-lg overflow-hidden flex items-end p-4">
                                    <img
                                        src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=400&q=80"
                                        alt="Ad"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <div className="relative text-white">
                                        <span className="text-xs font-bold bg-red-600 px-2 py-0.5 rounded-sm mb-2 inline-block">SALE</span>
                                        <p className="font-bold leading-tight">Up to 50% Off Fashion</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
