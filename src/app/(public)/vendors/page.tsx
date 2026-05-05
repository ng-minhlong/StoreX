'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Store, MapPin, Star } from "lucide-react"

const MOCK_VENDORS = [
    { id: '1', name: 'AudioTech Solutions', category: 'Electronics', rating: 4.8, location: 'New York, NY', image: '' },
    { id: '2', name: 'Furniture Hub', category: 'Home & Garden', rating: 4.5, location: 'Los Angeles, CA', image: '' },
    { id: '3', name: 'Fashion Forward', category: 'Clothing', rating: 4.9, location: 'Miami, FL', image: '' },
    { id: '4', name: 'Green Garden', category: 'Home & Garden', rating: 4.7, location: 'Portland, OR', image: '' },
    { id: '5', name: 'Sports Gear Pro', category: 'Sports', rating: 4.6, location: 'Denver, CO', image: '' },
]

export default function VendorsPage() {
    const [search, setSearch] = useState('')

    const filteredVendors = MOCK_VENDORS.filter(v =>
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.category.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="container py-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                <div className="space-y-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold tracking-tight">Our Vendors</h1>
                    <p className="text-muted-foreground">Discover trusted sellers from around the world.</p>
                </div>
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search vendors..."
                        className="pl-8"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVendors.map((vendor) => (
                    <Link href={`/vendors/${vendor.id}`} key={vendor.id} className="group">
                        <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500 relative">
                                <div className="absolute -bottom-8 left-6 h-16 w-16 rounded-full border-4 border-background bg-card flex items-center justify-center text-primary shadow-sm">
                                    <Store className="h-8 w-8" />
                                </div>
                            </div>
                            <CardHeader className="pt-10 pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-xl">{vendor.name}</CardTitle>
                                    <div className="flex items-center text-amber-500 text-sm font-medium gap-1">
                                        <Star className="h-3.5 w-3.5 fill-current" />
                                        {vendor.rating}
                                    </div>
                                </div>
                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                    <MapPin className="h-3 w-3" /> {vendor.location}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Specializing in {vendor.category}. Providing high quality products with excellent customer service.
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="secondary" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    Visit Store
                                </Button>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>

            {filteredVendors.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No vendors found matching your search.
                </div>
            )}
        </div>
    )
}
