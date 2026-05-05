'use client'

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Sparkles, Store, ShieldCheck, Zap } from "lucide-react"
import { HeroCarousel } from "@/components/home/hero-carousel"
import { FlashSaleSection } from "@/components/home/flash-sale"
import { ProductCard } from "@/components/product-card"
import { useEffect, useState } from "react"

export default function Home() {
    const [bestSellers, setBestSellers] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Fetch best sellers dynamically
        const fetchBestSellers = async () => {
            try {
                const res = await fetch('/api/products')
                if (res.ok) {
                    const data = await res.json()
                    // Sort by rating for "Best Sellers" mock logic if API doesn't already
                    const sorted = data.sort((a: any, b: any) => b.rating - a.rating).slice(0, 8)
                    setBestSellers(sorted)
                }
            } catch (e) {
                console.error("Failed to fetch best sellers", e)
            } finally {
                setIsLoading(false)
            }
        }
        fetchBestSellers()
    }, [])

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Hero Section */}
            <HeroCarousel />

            {/* Main Content Container */}
            <div className="container px-4 md:px-6 py-12 space-y-24">

                {/* FEATURE: Flash Sale */}
                <FlashSaleSection />

                {/* CATEGORIES: Premium Grid */}
                <section>
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight text-foreground mb-2">Shop by Category</h2>
                            <p className="text-muted-foreground">Explore our wide range of premium collections.</p>
                        </div>
                        <Button variant="ghost" asChild className="hidden sm:flex text-primary hover:text-primary/80">
                            <Link href="/products">
                                View all Categories <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <CategoryCard label="Electronics" slug="Electronics" image="https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=400&q=80" />
                        <CategoryCard label="Home & Garden" slug="Home & Garden" image="https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=400&q=80" />
                        <CategoryCard label="Fashion" slug="Fashion" image="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80" />
                        <CategoryCard label="Beauty" slug="Beauty" image="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=400&q=80" />
                        <CategoryCard label="Sports" slug="Sports" image="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80" />
                        <CategoryCard label="Automotive" slug="Automotive" image="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=400&q=80" />
                    </div>
                </section>

                {/* FEATURED STORES: Multi-Vendor Highlight */}
                <section>
                    <SectionHeader title="Official Stores" subtitle="Shop directly from top brands and verified sellers." icon={<Store className="h-6 w-6 text-primary" />} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StoreCard
                            name="TechGiant Official"
                            rating={4.9}
                            products={1240}
                            image="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80"
                            logo="https://cdn-icons-png.flaticon.com/512/3004/3004213.png"
                        />
                        <StoreCard
                            name="Urban Fashion Hub"
                            rating={4.8}
                            products={850}
                            image="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80"
                            logo="https://cdn-icons-png.flaticon.com/512/3050/3050253.png"
                        />
                        <StoreCard
                            name="Home & Living"
                            rating={4.7}
                            products={2100}
                            image="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
                            logo="https://cdn-icons-png.flaticon.com/512/2203/2203124.png"
                        />
                    </div>
                </section>

                {/* TRENDING: Modern Bento Grid */}
                <section>
                    <SectionHeader title="Trending Now" subtitle="Items catching everyone's eye this week." icon={<TrendingUp className="h-6 w-6 text-primary" />} />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[300px]">
                        <ModernFeatureCard
                            title="Summer Collection"
                            subtitle="Refresh your wardrobe"
                            image="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80"
                            link="/products?category=Fashion"
                            className="lg:col-span-2 lg:row-span-2"
                        />
                        <ModernFeatureCard
                            title="Smart Living"
                            subtitle="Upgrade your home"
                            image="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
                            link="/products?category=Home%20%26%20Garden"
                            className="lg:col-span-1"
                        />
                        <ModernFeatureCard
                            title="Active Life"
                            subtitle="Gear up"
                            image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80"
                            link="/products?category=Sports"
                            className="lg:col-span-1"
                        />
                        <ModernFeatureCard
                            title="Sonic Bliss"
                            subtitle="Premium Audio"
                            image="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80"
                            link="/products?category=Electronics"
                            className="lg:col-span-2"
                        />
                    </div>
                </section>

                {/* BEST SELLERS: Horizontal Scroll with Snap */}
                <section className="bg-muted/30 rounded-[2.5rem] p-8 md:p-12 border border-border/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Sparkles className="h-96 w-96 text-primary animate-pulse duration-[3000ms]" />
                    </div>

                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <SectionHeader title="Best Sellers" subtitle="Top rated products loved by shoppers." />
                        <Button variant="outline" asChild className="rounded-full">
                            <Link href="/products?sort=featured">Shop All</Link>
                        </Button>
                    </div>

                    {isLoading ? (
                        <div className="flex gap-6 overflow-hidden">
                            {/* Simplified Skeletons */}
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="min-w-[280px] h-[400px] bg-muted rounded-xl animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="flex gap-6 overflow-x-auto pb-8 pt-2 -mx-4 px-4 md:px-0 md:mx-0 no-scrollbar snap-x snap-mandatory">
                            {bestSellers.map((product) => (
                                <div key={product.id} className="min-w-[280px] md:min-w-[300px] snap-center">
                                    <ProductCard
                                        id={product.id}
                                        name={product.name}
                                        price={Number(product.price)}
                                        category={product.category}
                                        vendor={product.vendor}
                                        vendorId={`v-${product.vendor}`}
                                        image={product.image}
                                        rating={product.rating}
                                        className="h-full shadow-md hover:shadow-xl transition-shadow duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* TRUST BADGES */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t">
                    <TrustBadge icon={<ShieldCheck className="h-8 w-8 text-primary" />} title="Verified Sellers" desc="100% genuine products" />
                    <TrustBadge icon={<Store className="h-8 w-8 text-primary" />} title="Secure Payment" desc="Encrypted transactions" />
                    <TrustBadge icon={<Zap className="h-8 w-8 text-primary" />} title="Fast Delivery" desc="Tracked shipping" />
                    <TrustBadge icon={<Sparkles className="h-8 w-8 text-primary" />} title="Quality Guarantee" desc="30-day returns" />
                </section>

                {/* NEWSLETTER CTA */}
                <section className="rounded-3xl bg-primary text-primary-foreground p-12 md:p-20 text-center relative overflow-hidden isolate shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
                    <div className="absolute -left-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Join MiniMarket Plus</h2>
                        <p className="text-xl text-primary-foreground/90 font-medium max-w-2xl mx-auto">Unlock free shipping, early access to flash sales, and exclusive member-only discounts.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Button size="lg" variant="secondary" className="rounded-full h-14 px-8 text-lg font-bold shadow-lg hover:scale-105 transition-transform">Start Free Trial</Button>
                            <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">Learn More</Button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

function SectionHeader({ title, subtitle, icon }: { title: string, subtitle?: string, icon?: React.ReactNode }) {
    return (
        <div className="mb-8 space-y-2">
            <div className="flex items-center gap-3">
                {icon && <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>}
                <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2>
            </div>
            {subtitle && <p className="text-lg text-muted-foreground ml-1">{subtitle}</p>}
        </div>
    )
}

function CategoryCard({ label, slug, image }: { label: string, slug: string, image: string }) {
    return (
        <Link href={`/products?category=${slug}`} className="group relative block aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <img src={image} alt={label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-xl drop-shadow-md text-center px-2 group-hover:-translate-y-1 transition-transform">{label}</span>
            </div>
        </Link>
    )
}

function ModernFeatureCard({ title, subtitle, image, link, className }: { title: string, subtitle: string, image: string, link: string, className?: string }) {
    return (
        <Link href={link} className={`group relative block rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ${className}`}>
            <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-0 left-0 p-6 text-white space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold leading-tight">{title}</h3>
                <p className="text-white/90 font-medium">{subtitle}</p>
                <div className="w-8 h-1 bg-primary rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        </Link>
    )
}

function StoreCard({ name, rating, products, image, logo }: any) {
    return (
        <div className="bg-card rounded-2xl border shadow-sm hover:shadow-lg transition-all overflow-hidden group">
            <div className="h-32 bg-muted relative overflow-hidden">
                <img src={image} alt={name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-6 pt-0 relative">
                <div className="absolute -top-10 left-6">
                    <div className="h-20 w-20 rounded-xl border-4 border-card bg-white shadow-md p-1">
                        <img src={logo} alt="logo" className="w-full h-full object-contain rounded-lg" />
                    </div>
                </div>
                <div className="mt-12">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-bold text-lg">{name}</h3>
                            <p className="text-xs text-muted-foreground">{products} products</p>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 px-2 py-1 rounded-full text-xs font-bold">
                            ⭐ {rating}
                        </div>
                    </div>
                    <Button variant="outline" className="w-full rounded-full mt-4 text-xs h-9 uppercase tracking-wide font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">Visit Store</Button>
                </div>
            </div>
        </div>
    )
}

function TrustBadge({ icon, title, desc }: any) {
    return (
        <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-3 bg-primary/5 rounded-full mb-1">{icon}</div>
            <div>
                <h4 className="font-bold text-sm">{title}</h4>
                <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
        </div>
    )
}
