'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, ShoppingCart, Filter, ArrowUpDown, ChevronDown, List, Grid3X3, ArrowRight, XCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ProductCard } from '@/components/product-card'
import { ProductBreadcrumb } from '@/components/breadcrumb-nav'

// Shared Constants
const CATEGORIES = ['Electronics', 'Fashion', 'Home & Garden', 'Books', 'Beauty', 'Sports', 'Automotive'];
const BRANDS = ['Sony', 'Nike', 'Samsung', 'Adidas', 'Apple', 'Generic'];

function ProductsContent() {
    const searchParams = useSearchParams()
    const initialSearchString = searchParams.get('search') || ''
    const [searchQuery, setSearchQuery] = useState(initialSearchString)

    // State
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [sort, setSort] = useState('featured')
    const [allProducts, setAllProducts] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Filter State
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])

    // Pagination & Loading
    const [loadingMore, setLoadingMore] = useState(false)
    const [visibleCount, setVisibleCount] = useState(9)

    // URL Sync Effect
    useEffect(() => {
        const searchParam = searchParams.get('search')
        const qParam = searchParams.get('q')
        setSearchQuery(searchParam || qParam || '')

        const categoryParam = searchParams.get('category')
        if (categoryParam) {
            const matchedCategory = CATEGORIES.find(c => c.toLowerCase() === categoryParam.toLowerCase())
            if (matchedCategory) setSelectedCategories([matchedCategory])
        } else {
            setSelectedCategories([])
        }
    }, [searchParams])

    // Data Fetching
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Determine if we need to filter by vendor based on URL path if this was a vendor page, 
                // but this is the global products page.
                const res = await fetch('/api/products')
                if (!res.ok) throw new Error('Failed to fetch')
                const data = await res.json()
                setAllProducts(data)
            } catch (error) {
                console.error("Error loading products", error)
            } finally {
                // Artificial delay to show off the skeleton loading state
                setTimeout(() => setIsLoading(false), 800)
            }
        }
        fetchProducts()
    }, [])

    // Logic Handlers
    const loadMore = async () => {
        setLoadingMore(true)
        await new Promise(resolve => setTimeout(resolve, 600))
        setVisibleCount(prev => prev + 9)
        setLoadingMore(false)
    }

    const toggleCategory = (cat: string) => {
        setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])
    }

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand])
    }

    const clearFilters = () => {
        setPriceRange([0, 1000])
        setSelectedCategories([])
        setSelectedBrands([])
        setSearchQuery('')
    }

    // Derived State: Filtering & Sorting
    const filteredProducts = allProducts.filter(p => {
        if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
        if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;

        const price = parseFloat(p.price)
        if (price < priceRange[0] || price > priceRange[1]) return false;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchesName = p.name.toLowerCase().includes(query);
            const matchesDesc = p.description?.toLowerCase().includes(query);
            const matchesCategory = p.category.toLowerCase().includes(query);
            if (!matchesName && !matchesDesc && !matchesCategory) return false;
        }
        return true;
    }).sort((a, b) => {
        if (sort === 'price-low') return parseFloat(a.price) - parseFloat(b.price)
        if (sort === 'price-high') return parseFloat(b.price) - parseFloat(a.price)
        if (sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        return 0; // featured
    })

    const products = filteredProducts.slice(0, visibleCount)
    const hasMore = visibleCount < filteredProducts.length

    return (
        <div className="container py-6 min-h-screen">
            <ProductBreadcrumb />

            {/* Header */}
            <div className="flex flex-col gap-2 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                <h1 className="text-4xl font-black tracking-tight">Browse Products</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Discover our curated collection of premium items. Filter by category, price, or brand to find exactly what you need.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 items-start">

                {/* Desktop Sidebar */}
                <aside className="hidden lg:block sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin">
                    <FilterContent
                        priceRange={priceRange} setPriceRange={setPriceRange}
                        selectedCategories={selectedCategories} toggleCategory={toggleCategory}
                        selectedBrands={selectedBrands} toggleBrand={toggleBrand}
                        activeCount={filteredProducts.length}
                    />
                </aside>

                {/* Main Content */}
                <div className="flex-1 min-w-0">

                    {/* Controls Bar */}
                    <div className="sticky top-[64px] z-30 bg-background/80 backdrop-blur-md py-4 mb-6 border-b flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            {/* Mobile Filter Trigger */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" className="lg:hidden gap-2 w-full sm:w-auto">
                                        <Filter className="h-4 w-4" /> Filters
                                        {(selectedCategories.length + selectedBrands.length > 0) &&
                                            <Badge variant="secondary" className="ml-1 px-1 h-5">{selectedCategories.length + selectedBrands.length}</Badge>
                                        }
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                                    <SheetHeader>
                                        <SheetTitle>Filters</SheetTitle>
                                        <SheetDescription>Refine your product search</SheetDescription>
                                    </SheetHeader>
                                    <div className="mt-8">
                                        <FilterContent
                                            priceRange={priceRange} setPriceRange={setPriceRange}
                                            selectedCategories={selectedCategories} toggleCategory={toggleCategory}
                                            selectedBrands={selectedBrands} toggleBrand={toggleBrand}
                                            activeCount={filteredProducts.length}
                                        />
                                    </div>
                                </SheetContent>
                            </Sheet>

                            <div className="text-sm text-muted-foreground hidden sm:block">
                                Showing <span className="font-bold text-foreground">{isLoading ? '...' : Math.min(visibleCount, filteredProducts.length)}</span> of <span className="font-bold text-foreground">{isLoading ? '...' : filteredProducts.length}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                            <Select value={sort} onValueChange={setSort}>
                                <SelectTrigger className="w-[160px] h-10">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="featured">Featured</SelectItem>
                                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="border rounded-md flex items-center p-1 bg-muted/50 hidden sm:flex">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`h-8 px-2 rounded-sm ${viewMode === 'grid' ? 'bg-background shadow-sm' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <Grid3X3 className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`h-8 px-2 rounded-sm ${viewMode === 'list' ? 'bg-background shadow-sm' : ''}`}
                                    onClick={() => setViewMode('list')}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Active Filters Display */}
                    {(selectedCategories.length > 0 || selectedBrands.length > 0 || searchQuery) && (
                        <div className="flex flex-wrap gap-2 mb-6 animate-in fade-in zoom-in-95">
                            {searchQuery && (
                                <Badge variant="secondary" className="px-3 py-1 text-sm bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer" onClick={() => setSearchQuery('')}>
                                    "{searchQuery}" <XCircle className="ml-2 h-3 w-3" />
                                </Badge>
                            )}
                            {selectedCategories.map(c => (
                                <Badge key={c} variant="secondary" className="px-3 py-1 text-sm cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors" onClick={() => toggleCategory(c)}>
                                    {c} <XCircle className="ml-2 h-3 w-3" />
                                </Badge>
                            ))}
                            {selectedBrands.map(b => (
                                <Badge key={b} variant="secondary" className="px-3 py-1 text-sm cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors" onClick={() => toggleBrand(b)}>
                                    {b} <XCircle className="ml-2 h-3 w-3" />
                                </Badge>
                            ))}
                            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs text-muted-foreground hover:text-foreground">
                                Clear All
                            </Button>
                        </div>
                    )}

                    {/* Content Grid */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <ProductCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <EmptyState onReset={clearFilters} />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                            {products.map((product, index) => {
                                // Dynamic Promo Tile
                                if (index === 4 && filteredProducts.length > 8) {
                                    return (
                                        <div key="promo-tile" className="col-span-1 sm:col-span-2 xl:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white p-8 flex flex-col justify-center min-h-[300px] shadow-lg">
                                            <div className="relative z-10 max-w-md space-y-4">
                                                <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md">Limited Time Offer</Badge>
                                                <h2 className="text-3xl md:text-4xl font-bold leading-tight">Summer Sale <br />Extravaganza</h2>
                                                <p className="text-white/90 text-lg">Get up to 50% off on selected items. Free shipping on all orders over $99.</p>
                                                <Button size="lg" variant="secondary" className="rounded-full font-bold">
                                                    Shop the Sale <ArrowRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="absolute right-0 top-0 h-full w-[60%] bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop')] bg-cover opacity-20 mix-blend-overlay gradient-mask-l" />
                                        </div>
                                    )
                                }
                                return (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        name={product.name}
                                        price={product.price}
                                        category={product.category}
                                        vendor={product.vendor}
                                        vendorId={`v-${product.vendor}`}
                                        image={product.image}
                                        rating={product.rating}
                                        className={viewMode === 'list' ? 'col-span-full flex-row' : ''}
                                    />
                                )
                            })}
                        </div>
                    )}

                    {/* Load More */}
                    {!isLoading && hasMore && (
                        <div className="mt-16 text-center">
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full max-w-xs rounded-full h-12 border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
                                onClick={loadMore}
                                disabled={loadingMore}
                            >
                                {loadingMore ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                                        Loading more...
                                    </div>
                                ) : "Load More Products"}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// Reusable Filter Component
function FilterContent({
    priceRange, setPriceRange,
    selectedCategories, toggleCategory,
    selectedBrands, toggleBrand,
    activeCount
}: any) {
    return (
        <div className="space-y-8 animate-in slide-in-from-left-4 fade-in duration-500">
            {/* Price Filter */}
            <div className="bg-card/50 p-4 rounded-xl border shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">Price Range</h3>
                    <span className="text-xs text-muted-foreground font-mono">${priceRange[0]} - ${priceRange[1]}</span>
                </div>
                <Slider
                    min={0}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-4"
                />
            </div>

            {/* Categories */}
            <div>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                    Categories
                    {selectedCategories.length > 0 && <span className="text-xs font-normal text-muted-foreground">({selectedCategories.length})</span>}
                </h3>
                <div className="space-y-2">
                    {CATEGORIES.map((cat) => (
                        <label key={cat} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group">
                            <Checkbox
                                id={cat}
                                checked={selectedCategories.includes(cat)}
                                onCheckedChange={() => toggleCategory(cat)}
                                className="data-[state=checked]:bg-primary"
                            />
                            <span className="text-sm group-hover:text-primary transition-colors">{cat}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Brands */}
            <div>
                <h3 className="font-bold mb-4">Brands</h3>
                <div className="space-y-2">
                    {BRANDS.map((brand) => (
                        <label key={brand} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group">
                            <Checkbox
                                id={brand}
                                checked={selectedBrands.includes(brand)}
                                onCheckedChange={() => toggleBrand(brand)}
                                className="data-[state=checked]:bg-primary"
                            />
                            <span className="text-sm group-hover:text-primary transition-colors">{brand}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Loading Skeleton
function ProductCardSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="aspect-square rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
            </div>
            <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-9 w-9 rounded-full" />
            </div>
        </div>
    )
}

// Empty State
function EmptyState({ onReset }: { onReset: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in zoom-in-95">
            <div className="bg-muted p-6 rounded-full mb-6">
                <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No products found</h2>
            <p className="text-muted-foreground max-w-sm mb-8">
                We couldn't find any products matching your current filters. Try adjusting your search or criteria.
            </p>
            <Button onClick={onReset} size="lg" className="rounded-full">
                Clear Filters & Reset
            </Button>
        </div>
    )
}

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="container py-6 min-h-screen">
                <ProductBreadcrumb />
                <div className="space-y-4 mt-8">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-4 w-96" />
                    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 mt-8">
                        <div className="hidden lg:block space-y-6">
                            <Skeleton className="h-64 w-full rounded-xl" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <ProductCardSkeleton key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        }>
            <ProductsContent />
        </Suspense>
    )
}
