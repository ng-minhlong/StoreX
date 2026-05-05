'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from '@/store/cart'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function CheckoutPage() {
    const router = useRouter()
    const { items, totalPrice, clearCart } = useCartStore()
    const [isProcessing, setIsProcessing] = useState(false)

    if (items.length === 0) {
        return <div className="container py-10 text-center">Your cart is empty. <br /> <Button variant="link" onClick={() => router.push('/products')}>Go shopping</Button></div>
    }

    const total = totalPrice()
    const tax = total * 0.1
    const finalTotal = total + tax

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsProcessing(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))

        toast.success("Order placed successfully!")
        clearCart()
        router.push('/checkout/success')
        setIsProcessing(false)
    }

    return (
        <div className="container py-10 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Shipping Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fname">First Name</Label>
                                    <Input id="fname" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lname">Last Name</Label>
                                    <Input id="lname" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="payment">Payment Method</Label>
                                <div className="p-3 border rounded-md bg-muted/50 text-sm">
                                    Simulated Credit Card ( **** 4242 )
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span>{item.name} x {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>${finalTotal.toFixed(2)}</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" form="checkout-form" className="w-full" size="lg" disabled={isProcessing}>
                            {isProcessing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : "Place Order"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
