'use client'

import React from "react"
import Link from "next/link"
import { Search, Menu, ShoppingCart, MapPin, ChevronDown, User, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SmartSearch } from "@/components/layout/smart-search"
import { MegaMenu } from "@/components/layout/mega-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { useSession, signOut } from "next-auth/react"
import { useCartStore } from "@/store/cart"

export function Navbar() {
    const { data: session } = useSession()
    const cartItems = useCartStore((state) => state.items)
    const [isMounted, setIsMounted] = React.useState(false)

    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    const cartCount = isMounted ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0

    return (
        <nav className="w-full sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm transition-all">
            <div className="container mx-auto">

                {/* Main Header Row */}
                <div className="flex items-center h-16 gap-6 md:gap-8">

                    {/* 1. Mobile & Logo */}
                    <div className="flex items-center gap-2">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] p-0">
                                <SheetTitle className="sr-only">Menu</SheetTitle>
                                <div className="bg-primary text-primary-foreground p-6">
                                    <h2 className="text-xl font-bold mb-1">Hello,</h2>
                                    <p className="font-medium text-primary-foreground/80">{session?.user?.name || 'Guest'}</p>
                                </div>
                                <div className="p-4 space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Shop</h3>
                                        <Link href="/products" className="block py-2 px-3 rounded-lg hover:bg-muted font-medium">All Products</Link>
                                        <Link href="#deals" className="block py-2 px-3 rounded-lg hover:bg-muted font-medium">Today's Deals</Link>
                                        <Link href="#trending" className="block py-2 px-3 rounded-lg hover:bg-muted font-medium">Trending</Link>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Account</h3>
                                        <Link href="/account" className="block py-2 px-3 rounded-lg hover:bg-muted font-medium">Profile</Link>
                                        <Link href="/orders" className="block py-2 px-3 rounded-lg hover:bg-muted font-medium">Orders</Link>
                                        <Link href="/wishlist" className="block py-2 px-3 rounded-lg hover:bg-muted font-medium">Wishlist</Link>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>

                        <Link href="/" className="flex items-center gap-0.5 transition-opacity hover:opacity-80">
                            <span className="text-2xl font-black tracking-tighter text-foreground">MiniMarket</span>
                            <div className="h-2 w-2 bg-primary rounded-full mt-3 animate-pulse" />
                        </Link>
                    </div>

                    {/* 2. Location (Hidden on mobile) */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="hidden lg:flex flex-col text-xs leading-tight cursor-pointer hover:opacity-80 transition-opacity">
                                <span className="text-muted-foreground">Deliver to</span>
                                <div className="flex items-center font-bold text-foreground">
                                    <MapPin className="h-3 w-3 mr-1 text-primary" />
                                    <span>Indonesia</span>
                                    <ChevronDown className="h-3 w-3 ml-1 text-muted-foreground" />
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 max-h-[300px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                            <DropdownMenuLabel>Choose Location</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {[
                                "Argentina", "Australia", "Austria", "Bangladesh", "Belgium", "Brazil", "Canada", "Chile", "China", "Colombia",
                                "Czech Republic", "Denmark", "Egypt", "Finland", "France", "Germany", "Greece", "Hong Kong", "Hungary", "India",
                                "Indonesia", "Ireland", "Israel", "Italy", "Japan", "Malaysia", "Mexico", "Netherlands", "New Zealand", "Nigeria",
                                "Norway", "Pakistan", "Peru", "Philippines", "Poland", "Portugal", "Romania", "Russia", "Saudi Arabia", "Singapore",
                                "South Africa", "South Korea", "Spain", "Sweden", "Switzerland", "Taiwan", "Thailand", "Turkey", "United Kingdom", "United States", "Vietnam"
                            ].map((country) => (
                                <DropdownMenuItem key={country} className="cursor-pointer">
                                    {country}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* 3. Modern Pill Search Bar */}
                    <div className="flex-1 hidden md:flex items-center">
                        <SmartSearch />
                    </div>

                    {/* 4. Desktop Actions */}
                    <div className="flex items-center gap-1 md:gap-4 ml-auto">

                        {/* Search Trigger for Mobile */}
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Search className="h-5 w-5" />
                        </Button>

                        {/* Account Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="hidden md:flex items-center gap-2 h-auto py-2 px-3 rounded-full hover:bg-secondary/80">
                                    <div className="h-8 w-8 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col items-start gap-0.5">
                                        <span className="text-xs text-muted-foreground leading-none">Hello, {session?.user?.name?.split(' ')[0] || 'Sign in'}</span>
                                        <span className="text-sm font-bold leading-none">Account</span>
                                    </div>
                                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-lg border-border/50">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {session ? (
                                    <>
                                        <DropdownMenuItem asChild className="rounded-lg cursor-pointer"><Link href="/account">Profile</Link></DropdownMenuItem>
                                        <DropdownMenuItem asChild className="rounded-lg cursor-pointer"><Link href="/dashboard/vendor">Vendor Dashboard</Link></DropdownMenuItem>
                                        <DropdownMenuItem asChild className="rounded-lg cursor-pointer"><Link href="/dashboard/admin">Admin Dashboard</Link></DropdownMenuItem>
                                        <DropdownMenuItem asChild className="rounded-lg cursor-pointer"><Link href="/orders">Orders</Link></DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => signOut()} className="rounded-lg cursor-pointer text-destructive focus:text-destructive">Sign Out</DropdownMenuItem>
                                    </>
                                ) : (
                                    <div className="p-2 space-y-2">
                                        <Button className="w-full rounded-full" asChild><Link href="/auth/login">Sign in</Link></Button>
                                        <p className="text-xs text-center text-muted-foreground">New customer? <Link href="/auth/register" className="text-primary hover:underline">Start here</Link></p>
                                    </div>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Wishlist (Desktop) */}
                        <Button variant="ghost" size="icon" className="hidden lg:flex rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5">
                            <Heart className="h-5 w-5" />
                        </Button>

                        {/* Cart */}
                        <Link href="/cart">
                            <Button variant="ghost" className="relative rounded-full h-11 w-11 md:w-auto md:px-4 md:bg-primary text-primary-foreground md:hover:bg-primary/90 hover:bg-secondary">
                                <ShoppingCart className="h-5 w-5 md:mr-2" />
                                <span className="absolute md:static top-0 right-0 md:bg-transparent bg-destructive text-white rounded-full h-4 w-4 md:h-auto md:w-auto text-[10px] md:text-sm flex items-center justify-center">
                                    {cartCount}
                                </span>
                                <span className="hidden md:inline font-bold">Cart</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Secondary Navigation Row (Desktop only) */}
                <div className="hidden md:flex items-center gap-6 pb-3 text-sm font-medium text-muted-foreground border-t border-transparent">
                    <MegaMenu />
                    <Link href="/products" className="hover:text-primary transition-colors">Today's Deals</Link>
                    <Link href="/customer-service" className="hover:text-primary transition-colors">Customer Service</Link>
                    <Link href="/registry" className="hover:text-primary transition-colors">Registry</Link>
                    <Link href="/gift-cards" className="hover:text-primary transition-colors">Gift Cards</Link>
                    <Link href="/dashboard/vendor" className="ml-auto text-primary hover:text-primary/80">Sell on MiniMarket</Link>
                </div>
            </div>
        </nav>
    )
}
