'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react"
import { useCartStore } from '@/store/cart'

export default function CartPage() {
    const { items, removeItem, updateQuantity, totalPrice } = useCartStore()

    if (items.length === 0) {
        return (
            <div className="container flex flex-col items-center justify-center min-h-[60vh] py-12 text-center space-y-4">
                <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mb-4">
                    <h1 className="text-4xl">🛒</h1>
                </div>
                <h2 className="text-2xl font-bold">Your cart is empty</h2>
                <p className="text-muted-foreground max-w-sm">Looks like you haven&apos;t added anything to your cart yet.</p>
                <Button asChild className="mt-4">
                    <Link href="/products">Start Shopping</Link>
                </Button>
            </div>
        )
    }

    const total = totalPrice()
    const tax = total * 0.1 // Mock tax
    const finalTotal = total + tax

    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 border rounded-lg bg-card">
                            <div className="h-24 w-24 bg-muted rounded-md flex-shrink-0" />
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">Vendor: {item.vendorId}</p>
                                    </div>
                                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center border rounded-md">
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90 hover:bg-destructive/10" onClick={() => removeItem(item.productId)}>
                                        <Trash2 className="h-4 w-4 mr-2" /> Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Tax (Estimate)</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${finalTotal.toFixed(2)}</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" size="lg" asChild>
                                <Link href="/checkout">
                                    Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
