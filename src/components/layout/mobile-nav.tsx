'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, ShoppingCart, User, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCartStore } from "@/store/cart"

export function MobileBottomNav() {
    const pathname = usePathname()
    const cartCount = useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0))

    const NAV_ITEMS = [
        {
            label: "Home",
            icon: Home,
            href: "/"
        },
        {
            label: "Explore",
            icon: Search,
            href: "/products"
        },
        {
            label: "Cart",
            icon: ShoppingCart,
            href: "/cart",
            badge: cartCount
        },
        {
            label: "Wishlist",
            icon: Heart,
            href: "/wishlist"
        },
        {
            label: "Account",
            icon: User,
            href: "/account"
        }
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/50 md:hidden pb-safe">
            <div className="flex items-center justify-around h-16 px-2">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors relative",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <div className="relative">
                                <item.icon className={cn("h-6 w-6", isActive && "fill-current")} />
                                {item.badge ? (
                                    <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                        {item.badge}
                                    </span>
                                ) : null}
                            </div>
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
