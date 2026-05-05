'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Gift, Baby, Heart, Search, ArrowRight, CheckCircle2, Sparkles, PackageCheck, RefreshCw } from "lucide-react"
import { toast } from 'sonner'
import { cn } from "@/lib/utils"

export default function RegistryPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (!searchQuery.trim()) return

        setIsSearching(true)
        // Mock search delay
        setTimeout(() => {
            setIsSearching(false)
            toast.info(`Searching for registries matching "${searchQuery}"...`)
            // In a real app, this would route to search results
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Section */}
            <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80"
                        alt="Celebration background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="container relative z-10 px-4 md:px-6">
                    <div className="max-w-2xl text-white space-y-8 animate-in slide-in-from-bottom-5 fade-in duration-700">
                        <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm backdrop-blur-md">
                            <Sparkles className="mr-2 h-4 w-4 text-yellow-300" />
                            <span className="font-medium">The new way to celebrate</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
                            Celebrate Life's <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">Big Moments.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-lg">
                            From weddings to baby showers, create a registry that reflects your style. Millions of items, one perfect list.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button size="lg" className="rounded-full text-lg h-14 px-8 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105">
                                Create a Registry
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full text-lg h-14 px-8 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm">
                                Find a Registry
                            </Button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Search Bar Float */}
            <div className="relative z-20 px-4 -mt-8">
                <div className="container max-w-4xl mx-auto">
                    <form
                        onSubmit={handleSearch}
                        className="bg-background/95 backdrop-blur-xl rounded-full shadow-2xl border border-white/20 p-2 pl-6 flex flex-col sm:flex-row gap-2 items-center transform transition-all hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] ring-1 ring-black/5"
                    >
                        <Search className="h-5 w-5 text-muted-foreground hidden sm:block" />
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground sm:hidden" />
                            <Input
                                placeholder="Find a registry by registrant name, role, or date..."
                                className="pl-10 sm:pl-2 h-12 sm:h-14 text-base sm:text-lg border-none bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground/60 w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            size="lg"
                            className="h-12 sm:h-14 rounded-full px-8 w-full sm:w-auto font-bold text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                            disabled={isSearching}
                        >
                            {isSearching ? (
                                <span className="flex items-center gap-2">
                                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Searching
                                </span>
                            ) : 'Find Registry'}
                        </Button>
                    </form>
                </div>
            </div>

            {/* Registry Types Section */}
            <div className="container py-32 px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Choose Your Registry</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Select the type of registry you'd like to create today. We have tailored experiences for every occasion.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <RegistryCard
                        title="Wedding Registry"
                        description="Start your new life together with everything you need, from kitchenware to honeymoon funds."
                        image="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80"
                        icon={<Heart className="h-6 w-6 text-rose-500" />}
                        color="bg-rose-500/10 text-rose-500"
                    />
                    <RegistryCard
                        title="Baby Registry"
                        description="Prepare for your little one's arrival with essentials, cute outfits, and nursery decor."
                        image="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80"
                        icon={<Baby className="h-6 w-6 text-sky-500" />}
                        color="bg-sky-500/10 text-sky-500"
                    />
                    <RegistryCard
                        title="Gift List"
                        description="For birthdays, housewarmings, or holidays. Make sure you get exactly what you want."
                        image="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80"
                        icon={<Gift className="h-6 w-6 text-purple-500" />}
                        color="bg-purple-500/10 text-purple-500"
                    />
                </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-muted/30 py-24 border-y border-border/50">
                <div className="container px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Why Register <br />with MiniMarket?</h2>
                            <p className="text-lg text-muted-foreground">
                                We make it easy for you to manage your gifts and for your guests to find exactly what you love.
                            </p>

                            <div className="space-y-6">
                                <BenefitItem
                                    icon={<PackageCheck className="h-6 w-6" />}
                                    title="Universal Registry"
                                    description="Add items from any website to your MiniMarket registry with our browser extension."
                                />
                                <BenefitItem
                                    icon={<Sparkles className="h-6 w-6" />}
                                    title="20% Completion Discount"
                                    description="Get a 20% discount on remaining items on your registry for 6 months after your event."
                                />
                                <BenefitItem
                                    icon={<RefreshCw className="h-6 w-6" />}
                                    title="Extended Returns"
                                    description="Don't love it? Returns are easy and free for 365 days for all registry items."
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-primary/50 opacity-20 blur-2xl rounded-full" />
                            <img
                                src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80"
                                alt="Happy couple unboxing gifts"
                                className="relative rounded-2xl shadow-2xl border border-white/10 rotate-2 hover:rotate-0 transition-transform duration-500"
                            />
                            {/* Floating Badge */}
                            <div className="absolute -bottom-8 -left-8 bg-background p-6 rounded-xl shadow-xl border border-border/50 animate-bounce delay-1000 duration-[3000ms]">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full text-green-600 dark:text-green-400">
                                        <CheckCircle2 className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold">1M+ Registries</p>
                                        <p className="text-xs text-muted-foreground">Created this year</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="container py-24 px-4 text-center">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-3xl md:text-4xl font-bold">Ready to get started?</h2>
                    <p className="text-muted-foreground text-lg">
                        Join millions of happy couples and parents who trust MiniMarket for their special moments.
                    </p>
                    <Button size="lg" className="h-14 px-10 rounded-full text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                        Create Your Registry
                    </Button>
                </div>
            </div>
        </div>
    )
}

function RegistryCard({ title, description, image, icon, color }: { title: string, description: string, image: string, icon: React.ReactNode, color: string }) {
    return (
        <div className="group relative bg-card rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="aspect-[4/3] overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="p-8">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", color)}>
                    {icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                    {description}
                </p>
                <Button variant="ghost" className="group/btn p-0 hover:bg-transparent hover:text-primary">
                    Start {title} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
            </div>
        </div>
    )
}

function BenefitItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="flex gap-4 items-start p-4 hover:bg-background rounded-xl transition-colors border border-transparent hover:border-border/50">
            <div className="mt-1 bg-primary/10 p-2 rounded-lg text-primary">
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-lg mb-1">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    )
}
