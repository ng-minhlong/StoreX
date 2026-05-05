'use client'

import React, { useState, useEffect, useRef } from "react"
import { Search, X, Clock, TrendingUp, Sparkles, ArrowUpLeft } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const TRENDING_SEARCHES = [
    "Wireless Headphones",
    "Running Shoes",
    "Gaming Laptop",
    "Smart Watch",
    "Coffee Maker"
]

const POPULAR_CATEGORIES = [
    { name: "Electronics", slug: "electronics" },
    { name: "Fashion", slug: "fashion" },
    { name: "Home & Garden", slug: "home-garden" },
]

export function SmartSearch() {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [recentSearches, setRecentSearches] = useState<string[]>([])
    // Simple cache for suggestions
    const [allSuggestions, setAllSuggestions] = useState<string[]>([])
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Load recent searches from local storage
        const saved = localStorage.getItem("recent_searches")
        if (saved) {
            setRecentSearches(JSON.parse(saved).slice(0, 3))
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Fetch products for autocomplete
    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                // Fetch basic list - in a real large app we'd use a dedicated search/suggestion endpoint
                const res = await fetch('/api/products')
                if (!res.ok) return
                const data = await res.json()

                // Extract unique names and categories to build a suggestion pool
                const names = data.map((p: any) => p.name)
                const categories = Array.from(new Set(data.map((p: any) => p.category)))
                // @ts-ignore
                const pool = [...categories, ...names]
                // @ts-ignore
                setAllSuggestions(Array.from(new Set(pool)))
            } catch (e) {
                console.error("Failed to load search suggestions", e)
            }
        }

        // Only fetch once on mount/interaction to keep it light
        fetchSuggestions()
    }, [])

    // Filter suggestions when query changes
    useEffect(() => {
        if (!query.trim()) {
            setFilteredSuggestions([])
            return
        }

        const lowerQuery = query.toLowerCase()
        const matches = allSuggestions
            .filter(item => item.toLowerCase().includes(lowerQuery))
            .slice(0, 8) // Limit to 8 suggestions

        setFilteredSuggestions(matches)
        setIsOpen(true)
    }, [query, allSuggestions])

    const handleSearch = (term: string) => {
        // Save to recent searches
        const newRecent = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5)
        setRecentSearches(newRecent)
        localStorage.setItem("recent_searches", JSON.stringify(newRecent))

        // Navigate
        window.location.href = `/products?search=${encodeURIComponent(term)}`
        setIsOpen(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch(query)
        }
    }

    return (
        <div ref={containerRef} className="relative w-full max-w-2xl mx-auto group z-50">
            <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <Input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search products, brands, and categories..."
                    className="w-full pl-10 pr-4 py-2 h-11 rounded-full bg-secondary/50 border-transparent hover:bg-secondary focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                />
                {query && (
                    <button
                        onClick={() => { setQuery(""); setIsOpen(false) }}
                        className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Dropdown Overlay */}
            {isOpen && (
                <div className="absolute top-14 left-0 right-0 bg-background border border-border/50 rounded-2xl shadow-xl p-0 overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                    {query.length > 0 ? (
                        <div className="py-2">
                            {filteredSuggestions.length > 0 ? (
                                <div className="flex flex-col">
                                    {filteredSuggestions.map((suggestion, idx) => (
                                        <button
                                            key={idx}
                                            className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-secondary/50 text-left group/item transition-colors"
                                            onClick={() => handleSearch(suggestion)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Search className="h-4 w-4 text-muted-foreground group-hover/item:text-primary" />
                                                <span>
                                                    {/* Highlight match - simple implementation */}
                                                    {suggestion.split(new RegExp(`(${query})`, 'gi')).map((part, i) =>
                                                        part.toLowerCase() === query.toLowerCase() ? <span key={i} className="font-bold text-foreground">{part}</span> : <span key={i} className="text-muted-foreground/90">{part}</span>
                                                    )}
                                                </span>
                                            </div>
                                            <ArrowUpLeft className="h-4 w-4 opacity-0 group-hover/item:opacity-50 -rotate-45" />
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 text-center text-sm text-muted-foreground">
                                    No suggestions found for "{query}"
                                </div>
                            )}

                            <div className="border-t border-border/50 mt-1 pt-1">
                                <Button variant="ghost" className="w-full justify-start text-primary text-xs h-8 px-4" onClick={() => handleSearch(query)}>
                                    View all results for "{query}"
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 space-y-6">
                            {/* Recent Searches */}
                            {recentSearches.length > 0 && (
                                <div>
                                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Recent Searches</h3>
                                    <div className="space-y-1">
                                        {recentSearches.map((term, i) => (
                                            <Button key={i} variant="ghost" className="w-full justify-start h-9 px-2 font-normal" onClick={() => handleSearch(term)}>
                                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                                {term}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Trending */}
                            <div>
                                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2 flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" /> Trending Now
                                </h3>
                                <div className="flex flex-wrap gap-2 px-2">
                                    {TRENDING_SEARCHES.map((term, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSearch(term)}
                                            className="text-sm bg-secondary/50 hover:bg-primary/10 hover:text-primary px-3 py-1.5 rounded-full transition-colors"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Popular Categories */}
                            <div>
                                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Popular Categories</h3>
                                <div className="grid grid-cols-2 gap-2 px-2">
                                    {POPULAR_CATEGORIES.map((cat, i) => (
                                        <Link
                                            key={i}
                                            href={`/category/${cat.slug}`}
                                            className="flex items-center p-2 rounded-lg hover:bg-secondary transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center mr-3 text-lg">
                                                {i === 0 ? "💻" : i === 1 ? "👕" : "🏠"}
                                            </div>
                                            <span className="text-sm font-medium">{cat.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
