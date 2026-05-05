'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from 'sonner'
import { Loader2, Upload } from 'lucide-react'

export default function NewProductPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API Call
        await new Promise(resolve => setTimeout(resolve, 1500))

        toast.success("Product created successfully")
        router.push('/dashboard/vendor/products')
        setIsLoading(false)
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
                <p className="text-muted-foreground">Create a new product for your store.</p>
            </div>

            <form onSubmit={onSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Product Details</CardTitle>
                        <CardDescription>Fill in the details about your product.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input id="name" placeholder="e.g. Premium Wireless Headphones" required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Price ($)</Label>
                                <Input id="price" type="number" step="0.01" placeholder="0.00" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="stock">Stock</Label>
                                <Input id="stock" type="number" placeholder="0" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="electronics">Electronics</SelectItem>
                                    <SelectItem value="fashion">Fashion</SelectItem>
                                    <SelectItem value="home">Home & Garden</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="Describe your product..." rows={5} required />
                        </div>

                        <div className="space-y-2">
                            <Label>Product Images</Label>
                            <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                <span className="text-sm text-muted-foreground">Click to upload images</span>
                                <span className="text-xs text-muted-foreground mt-1">(Simulation Only)</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-4">
                        <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Create Product"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}
