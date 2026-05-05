'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Share2, ShieldCheck, RefreshCw, Loader2 } from "lucide-react"
import { useCartStore } from '@/store/cart'
import { toast } from 'sonner'
import { Skeleton } from "@/components/ui/skeleton"

// Feature Components
import { ImageMagnifier } from '@/components/product-detail/image-magnifier'
import { StickyAddToCart } from '@/components/product-detail/sticky-add-to-cart'
import { DeliveryEstimator } from '@/components/product-detail/delivery-estimator'
import { BnplWidget } from '@/components/product-detail/bnpl-widget'
import { VariantSelector } from '@/components/product-detail/variant-selector'
import { SizeGuideModal } from '@/components/product-detail/size-guide-modal'
import { ProductBundles } from '@/components/product-detail/product-bundles'
import { ReviewGallery } from '@/components/product-detail/review-gallery'
import { QnASection } from '@/components/product-detail/qna-section'
import { RecentlyViewed } from '@/components/product-detail/recently-viewed'
import { ProductBreadcrumb } from '@/components/breadcrumb-nav'

interface ProductDetail {
    id: string
    name: string
    price: number
    description: string
    vendor: string
    vendorId: string
    category: string
    stock: number
    images: string[]
    rating: number
    reviewsCount: number
    reviews: any[]
}

export default function ProductDetailPage() {
    const params = useParams()
    const productId = params?.productId as string

    const [product, setProduct] = useState<ProductDetail | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    const addItem = useCartStore((state) => state.addItem)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${productId}`)
                if (!res.ok) {
                    if (res.status === 404) throw new Error('Product not found')
                    throw new Error('Failed to load product')
                }
                const data = await res.json()
                setProduct(data)
            } catch (err: any) {
                console.error(err)
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        if (productId) {
            fetchProduct()
        }
    }, [productId])

    // Save to Recently Viewed
    useEffect(() => {
        if (!product) return

        const addToHistory = () => {
            try {
                const saved = localStorage.getItem("recently_viewed")
                let history = saved ? JSON.parse(saved) : []

                // Remove this product if it already exists (to push to top)
                history = history.filter((p: any) => p.id !== product.id)

                // Add to front
                history.unshift({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0]
                })

                // Keep max 10
                history = history.slice(0, 10)

                localStorage.setItem("recently_viewed", JSON.stringify(history))

                // Dispatch event so widget updates immediately
                window.dispatchEvent(new Event("history-updated"))
            } catch (e) {
                console.error("Failed to save history", e)
            }
        }

        addToHistory()
    }, [product])

    const handleAddToCart = () => {
        if (!product) return
        addItem({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            vendorId: product.vendorId,
            image: product.images[0]
        })
        toast.success("Added to cart")
    }

    if (isLoading) {
        return (
            <div className="container py-20 flex flex-col items-center justify-center min-h-[50vh]">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Loading product details...</p>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="container py-20 text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Product</h2>
                <p className="text-muted-foreground mb-6">{error || "Product not found"}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
        )
    }

    return (
        <>
            <div className="container py-8 md:py-12">
                <ProductBreadcrumb />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left Column: Media */}
                    <div className="space-y-6">
                        <div className="aspect-square bg-white rounded-2xl overflow-hidden border relative">
                            {/* FEATURE 1: Image Zoom */}
                            <ImageMagnifier src={product.images[0] || ''} alt={product.name} />
                            {/* Feature: Low Stock Warning in API? Not yet, using mock logic for UI */}
                            {product.stock < 10 && (
                                <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-sm animate-pulse">
                                    LOW STOCK: Only {product.stock} left
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.slice(0, 4).map((img, i) => (
                                <div key={i} className="aspect-square bg-muted rounded-lg cursor-pointer hover:ring-2 ring-primary transition-all overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={img} alt="thumbnail" className="w-full h-full object-cover opacity-70 hover:opacity-100" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Details & Buy Box */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center justify-between">
                                <Badge variant="secondary" className="mb-3 text-primary bg-primary/10 hover:bg-primary/20">{product.category}</Badge>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="hover:text-primary"><Share2 className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon" className="hover:text-red-500"><Heart className="h-4 w-4" /></Button>
                                </div>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-foreground">{product.name}</h1>
                            <div className="flex items-center gap-4 mt-3">
                                <div className="flex items-center text-amber-500">
                                    {/* Mock Stars for now based on average */}
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span key={i} className={`text-lg ${i < Math.round(product.rating) ? "text-amber-500" : "text-gray-300"}`}>★</span>
                                    ))}
                                    <a href="#reviews" className="text-muted-foreground ml-2 text-sm underline hover:text-primary">({product.reviewsCount} reviews)</a>
                                </div>
                                <span className="text-muted-foreground text-sm border-l pl-4">Item #: {product.id.substring(0, 8).toUpperCase()}</span>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-baseline gap-3">
                                <div className="text-4xl font-bold tracking-tight text-foreground">${product.price}</div>
                                <div className="text-lg text-muted-foreground line-through decoration-destructive/50">${(product.price * 1.2).toFixed(2)}</div>
                                <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20 shadow-none border-green-200">Save 20%</Badge>
                            </div>

                            {/* FEATURE 7: BNPL Widget */}
                            <BnplWidget price={product.price} />

                            {/* FEATURE 4: Delivery Estimator */}
                            <DeliveryEstimator />
                        </div>

                        {/* FEATURE 5: Variant Selector - Mocked logic for UI as Schema is simple */}
                        <VariantSelector />

                        {/* FEATURE 8: Size Guide (Contextual) */}
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm">Size: Universal</span>
                            <SizeGuideModal />
                        </div>

                        <div className="flex gap-4 pt-4 border-t">
                            <Button size="lg" className="flex-1 text-lg h-14 rounded-full shadow-lg shadow-primary/20" onClick={handleAddToCart}>
                                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-primary" /> 2 Year Warranty
                            </div>
                            <div className="flex items-center gap-2">
                                <RefreshCw className="h-4 w-4 text-primary" /> 30-Day Money Back
                            </div>
                        </div>
                    </div>
                </div>

                {/* FEATURE 3: Bundles */}
                <ProductBundles mainProductPrice={product.price} />

                <div className="grid md:grid-cols-[1fr_300px] gap-12 mt-16">
                    <div className="min-w-0">
                        {/* Description */}
                        <div className="prose dark:prose-invert max-w-none">
                            <h2 className="text-2xl font-bold mb-4">Product Description</h2>
                            <p>{product.description}</p>
                            <ul>
                                <li>Sold by <strong>{product.vendor}</strong></li>
                                <li>Verified Quality</li>
                            </ul>
                        </div>

                        {/* FEATURE 6: Review Gallery */}
                        <div id="reviews">
                            <ReviewGallery
                                reviews={product.reviews}
                                rating={product.rating}
                                reviewsCount={product.reviewsCount}
                            />
                        </div>

                        {/* FEATURE 9: Q&A */}
                        <QnASection />
                    </div>

                    {/* Sticky Side Rail for related/ads (optional, keeping clean for now) */}
                    <div className="hidden md:block">
                        {/* Could put related items here */}
                    </div>
                </div>
            </div>

            {/* FEATURE 10: Recently Viewed */}
            <RecentlyViewed />

            {/* FEATURE 2: Sticky Add to Cart Bar */}
            <StickyAddToCart
                name={product.name}
                price={product.price}
                image={product.images[0]}
                onAddToCart={handleAddToCart}
            />
        </>
    )
}
