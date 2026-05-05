'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCartStore } from '@/store/cart'
import { toast } from 'sonner'
import { Gift, Check, ShieldCheck, Zap, Infinity, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"

export default function GiftCardsPage() {
    const addItem = useCartStore((state) => state.addItem)

    // State for the form
    const [selectedAmount, setSelectedAmount] = useState<number | null>(50)
    const [customAmount, setCustomAmount] = useState('')
    const [selectedDesign, setSelectedDesign] = useState(0)
    const [recipientEmail, setRecipientEmail] = useState('')
    const [senderName, setSenderName] = useState('')
    const [message, setMessage] = useState('')

    const designs = [
        { src: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80", name: "Classic" },
        { src: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=600&q=80", name: "Celebration" },
        { src: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=600&q=80", name: "Modern" },
        { src: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=600&q=80", name: "Holiday" },
        { src: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=600&q=80", name: "Thank You" },
        { src: "https://images.unsplash.com/photo-1490623970972-ae8bb3da443e?auto=format&fit=crop&w=600&q=80", name: "Abstract" },
    ]

    const handleAddToCart = () => {
        let price = selectedAmount
        if (!price && customAmount) {
            price = parseFloat(customAmount)
        }

        if (!price || price <= 0) {
            toast.error("Please enter a valid amount")
            return
        }

        if (!recipientEmail) {
            toast.error("Please enter a recipient email")
            return
        }

        addItem({
            productId: `gift-card-${Date.now()}`,
            name: `MiniMarket Gift Card - ${designs[selectedDesign].name} Edition`,
            price: price,
            quantity: 1,
            vendorId: "MM-OFFICIAL",
            image: designs[selectedDesign].src
        })
        toast.success(`Gift Card for $${price} added to cart!`)
        // Reset form optional? No, user might want to buy another one.
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Section */}
            <div className="relative bg-foreground text-background py-16 md:py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-primary/30 to-transparent" />
                    <div className="absolute -right-20 -top-40 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px]" />
                </div>
                <div className="container px-4 md:px-6 relative z-10 text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center justify-center p-1.5 mb-6 bg-background/10 rounded-full border border-white/10 backdrop-blur-sm">
                        <span className="flex items-center text-sm font-medium px-3 text-primary-foreground">
                            <Gift className="w-4 h-4 mr-2" />
                            The Perfect Gift
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                        Give the Gift of Choice
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground/80 leading-relaxed mb-8 max-w-2xl mx-auto">
                        MiniMarket Gift Cards are the easiest way to give friends and family exactly what they want. Instant delivery, no expiration dates.
                    </p>
                </div>
            </div>

            <div className="container px-4 md:px-6 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* Left Column: Preview & Trust */}
                    <div className="lg:col-span-5 space-y-8 sticky top-24">
                        {/* Interactive Card Preview */}
                        <div className="relative group perspective-1000">
                            <div className="aspect-[1.586/1] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02] hover:rotate-1 relative bg-black">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10 pointer-events-none" />
                                <img
                                    src={designs[selectedDesign].src}
                                    alt="Gift Card Design"
                                    className="w-full h-full object-cover opacity-90 transition-opacity duration-300"
                                />

                                {/* Card Overlay Content */}
                                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-20 text-white select-none">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-2xl font-black tracking-tighter">MiniMarket</h3>
                                            <p className="text-xs uppercase tracking-widest opacity-80 mt-1">Gift Card</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-3xl font-bold tracking-tight">
                                                ${(selectedAmount || parseFloat(customAmount) || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/10">
                                            <p className="text-[10px] uppercase opacity-70 mb-1">To</p>
                                            <p className="font-medium truncate">{recipientEmail || 'recipient@example.com'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Reflection effect */}
                            <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/20 blur-xl rounded-[100%]" />
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-card p-4 rounded-xl border border-border/50 text-center space-y-2">
                                <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <Zap className="h-5 w-5" />
                                </div>
                                <h4 className="font-bold text-sm">Instant Delivery</h4>
                                <p className="text-xs text-muted-foreground">Sent via email immediately</p>
                            </div>
                            <div className="bg-card p-4 rounded-xl border border-border/50 text-center space-y-2">
                                <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <h4 className="font-bold text-sm">Secure Payment</h4>
                                <p className="text-xs text-muted-foreground">Encrypted transactions</p>
                            </div>
                            <div className="bg-card p-4 rounded-xl border border-border/50 text-center space-y-2">
                                <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <Infinity className="h-5 w-5" />
                                </div>
                                <h4 className="font-bold text-sm">No Expiration</h4>
                                <p className="text-xs text-muted-foreground">Valid forever</p>
                            </div>
                            <div className="bg-card p-4 rounded-xl border border-border/50 text-center space-y-2">
                                <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <CreditCard className="h-5 w-5" />
                                </div>
                                <h4 className="font-bold text-sm">Easy Redeem</h4>
                                <p className="text-xs text-muted-foreground">Use code at checkout</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Configuration Form */}
                    <div className="lg:col-span-7 bg-card rounded-2xl shadow-xl border border-border/50 overflow-hidden">
                        <div className="p-6 md:p-8 space-y-10">

                            {/* 1. Choose Design */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                                    <h3 className="font-bold text-lg">Choose a design</h3>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {designs.map((design, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedDesign(i)}
                                            className={cn(
                                                "group relative aspect-video rounded-xl overflow-hidden border-2 transition-all p-0.5",
                                                selectedDesign === i
                                                    ? "border-primary ring-2 ring-primary/20 scale-[1.02]"
                                                    : "border-transparent hover:border-border scale-100"
                                            )}
                                        >
                                            <div className="relative w-full h-full rounded-lg overflow-hidden">
                                                <img src={design.src} alt={design.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                                <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white uppercase tracking-wider">{design.name}</span>
                                                {selectedDesign === i && (
                                                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-[1px]">
                                                        <div className="bg-primary text-white rounded-full p-1.5 shadow-lg relative z-10 animate-in zoom-in spin-in-180 duration-300">
                                                            <Check className="h-4 w-4" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 2. Select Amount */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                                    <h3 className="font-bold text-lg">Select amount</h3>
                                </div>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                    {[25, 50, 75, 100, 200, 500].map((amt) => (
                                        <Button
                                            key={amt}
                                            variant={selectedAmount === amt ? "default" : "outline"}
                                            onClick={() => { setSelectedAmount(amt); setCustomAmount('') }}
                                            className={cn(
                                                "h-12 text-lg font-medium transition-all",
                                                selectedAmount === amt ? "shadow-md scale-105" : "hover:bg-muted"
                                            )}
                                        >
                                            ${amt}
                                        </Button>
                                    ))}
                                </div>
                                <div className="relative pt-2">
                                    <span className="absolute left-4 top-5 text-muted-foreground font-medium">$</span>
                                    <Input
                                        type="number"
                                        placeholder="Enter custom amount (USD)"
                                        className="pl-8 h-14 rounded-xl text-lg bg-background border-input hover:border-primary/50 focus:border-primary focus:ring-primary/20 transition-all"
                                        value={customAmount}
                                        onChange={(e) => {
                                            setCustomAmount(e.target.value);
                                            if (e.target.value) setSelectedAmount(null)
                                        }}
                                    />
                                </div>
                            </div>

                            {/* 3. Personalize */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                                    <h3 className="font-bold text-lg">Personalize</h3>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Recipient's Email</label>
                                        <Input
                                            placeholder="friend@example.com"
                                            className="h-12 rounded-xl"
                                            value={recipientEmail}
                                            onChange={(e) => setRecipientEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Your Name</label>
                                        <Input
                                            placeholder="Your name"
                                            className="h-12 rounded-xl"
                                            value={senderName}
                                            onChange={(e) => setSenderName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Message (Optional)</label>
                                    <Textarea
                                        className="min-h-[100px] p-4 rounded-xl resize-none bg-background focus:ring-primary/20"
                                        placeholder="Write a warm wish..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="pt-4 border-t border-border/50">
                                <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span className="text-xl font-bold text-foreground">
                                        ${(selectedAmount || parseFloat(customAmount) || 0).toFixed(2)}
                                    </span>
                                </div>
                                <Button
                                    size="lg"
                                    className="w-full h-14 text-lg rounded-full font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.01] transition-all"
                                    onClick={handleAddToCart}
                                >
                                    <Gift className="mr-2 h-5 w-5" /> Add to Cart
                                </Button>
                                <p className="text-center text-xs text-muted-foreground mt-4">
                                    By purchasing, you agree to our <a href="/terms" className="underline hover:text-primary">Terms of Service</a>.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
