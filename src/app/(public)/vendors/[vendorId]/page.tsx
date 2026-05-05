'use client'

import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Star, Share2 } from "lucide-react"
import { ProductCard } from '@/components/product-card' // Reuse ProductCard

export default function VendorProfilePage() {
    const params = useParams()
    // Mock data fetching based on params.vendorId
    const vendor = {
        name: "AudioTech Solutions",
        description: "Premium audio equipment for professionals and audiophiles.",
        location: "New York, NY",
        rating: 4.8,
        joinDate: "Since 2021",
        products: [
            { id: '1', name: 'Premium Headphones', price: 199.99, category: 'Electronics', rating: 4.5 },
            { id: '4', name: 'Noise Cancelling Earbuds', price: 129.99, category: 'Electronics', rating: 4.7 },
            { id: '5', name: 'Studio Monitor Speakers', price: 299.99, category: 'Electronics', rating: 4.9 },
        ]
    }

    return (
        <div>
            {/* Vendor Header (Banner) */}
            <div className="h-48 md:h-64 bg-gradient-to-r from-gray-900 to-gray-800 relative">
                <div className="container h-full flex items-end pb-8 px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6 w-full text-white">
                        <div className="h-24 w-24 md:h-32 md:w-32 rounded-xl bg-white text-black flex items-center justify-center text-3xl font-bold shadow-xl border-4 border-white/10">
                            {vendor.name.charAt(0)}
                        </div>
                        <div className="flex-1 text-center md:text-left space-y-2 mb-2">
                            <h1 className="text-3xl md:text-4xl font-bold">{vendor.name}</h1>
                            <div className="flex items-center justify-center md:justify-start gap-4 text-gray-300 text-sm">
                                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {vendor.location}</span>
                                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-500 text-amber-500" /> {vendor.rating} Ratings</span>
                            </div>
                        </div>
                        <div className="flex gap-3 mb-2">
                            <Button variant="outline" className="bg-transparent text-white border-white/20 hover:bg-white/10">
                                <Share2 className="mr-2 h-4 w-4" /> Share
                            </Button>
                            <Button>Follow</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-10 px-4 md:px-6">
                <Tabs defaultValue="products">
                    <TabsList className="mb-8">
                        <TabsTrigger value="products">Products</TabsTrigger>
                        <TabsTrigger value="about">About</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>

                    <TabsContent value="products">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {vendor.products.map(product => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    category={product.category}
                                    vendor={vendor.name}
                                    vendorId={String(params.vendorId)}
                                    rating={product.rating}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="about">
                        <div className="max-w-2xl text-muted-foreground leading-relaxed">
                            <h3 className="text-xl font-semibold text-foreground mb-4">About {vendor.name}</h3>
                            <p>{vendor.description}</p>
                            <p className="mt-4">Member since {vendor.joinDate}.</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="reviews">
                        <div className="text-center py-12 text-muted-foreground">
                            No reviews yet.
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
