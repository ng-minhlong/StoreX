'use client'

import React, { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Mail, Phone, MessageCircle, Package, CreditCard, RefreshCw, User, Truck, ShieldQuestion, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CustomerServicePage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Section */}
            <div className="relative bg-muted/30 py-20 px-4 md:px-6 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/30 via-background to-background" />
                <div className="container max-w-4xl mx-auto text-center relative z-10 space-y-8">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
                        How can we <span className="text-primary">help you?</span>
                    </h1>

                    <div className="max-w-2xl mx-auto relative group">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Search for answers (e.g., 'return policy', 'track order')"
                                className="pl-12 h-14 text-lg bg-background/80 backdrop-blur-xl border-2 border-primary/10 hover:border-primary/30 focus-visible:ring-primary/30 rounded-full shadow-xl transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container px-4 md:px-6 py-12 -mt-10 relative z-20">
                {/* Visual Topic Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
                    <TopicCard icon={<Package className="h-6 w-6" />} label="Orders" />
                    <TopicCard icon={<Truck className="h-6 w-6" />} label="Shipping" />
                    <TopicCard icon={<RefreshCw className="h-6 w-6" />} label="Returns" />
                    <TopicCard icon={<CreditCard className="h-6 w-6" />} label="Payments" />
                    <TopicCard icon={<User className="h-6 w-6" />} label="Account" />
                    <TopicCard icon={<ShieldQuestion className="h-6 w-6" />} label="Safety" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content: FAQs */}
                    <div className="lg:col-span-8 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Truck className="h-5 w-5 text-primary" /> Shipping & Delivery
                            </h2>
                            <Accordion type="single" collapsible className="w-full bg-card rounded-xl border px-4 shadow-sm">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Where is my order?</AccordionTrigger>
                                    <AccordionContent>
                                        You can track your order status in the "Orders" section of your account. Once your order ships, we'll send you a tracking number via email.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>What are the shipping costs?</AccordionTrigger>
                                    <AccordionContent>
                                        Shipping is calculated based on the weight of items and delivery location. Free shipping is available for MiniMarket Plus members on eligible items over $50.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3" className="border-b-0">
                                    <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                                    <AccordionContent>
                                        Yes, we currently ship to over 50 countries. International shipping rates and delivery times vary by location.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <RefreshCw className="h-5 w-5 text-primary" /> Returns & Refunds
                            </h2>
                            <Accordion type="single" collapsible className="w-full bg-card rounded-xl border px-4 shadow-sm">
                                <AccordionItem value="ret-1">
                                    <AccordionTrigger>How do I return an item?</AccordionTrigger>
                                    <AccordionContent>
                                        Go to "Your Orders," find the order, and select "Return or Replace Items." You can print a shipping label or use a QR code at a drop-off location.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="ret-2" className="border-b-0">
                                    <AccordionTrigger>When will I get my refund?</AccordionTrigger>
                                    <AccordionContent>
                                        Refunds are processed within 2-3 business days after we receive your return. It may take an additional 3-5 days for your bank to reflect the credit.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </section>
                    </div>

                    {/* Sidebar: Contact */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-card p-6 rounded-2xl border shadow-sm sticky top-24">
                            <h3 className="font-bold text-xl mb-6">Still need help?</h3>
                            <div className="space-y-4">
                                <ContactOption
                                    icon={<MessageCircle className="h-5 w-5" />}
                                    title="Live Chat"
                                    desc="Wait time: < 2 min"
                                    action="Chat Now"
                                />
                                <ContactOption
                                    icon={<Phone className="h-5 w-5" />}
                                    title="Call Us"
                                    desc="24/7 Support"
                                    action="1-800-MINI-MKT"
                                />
                                <ContactOption
                                    icon={<Mail className="h-5 w-5" />}
                                    title="Email Support"
                                    desc="Response within 24h"
                                    action="Send Email"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function TopicCard({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <button className="flex flex-col items-center justify-center p-6 bg-card hover:bg-muted/50 border border-transparent hover:border-primary/20 rounded-xl shadow-sm hover:shadow-md transition-all group">
            <div className="mb-3 bg-primary/10 text-primary p-3 rounded-full group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <span className="font-medium text-sm text-foreground/80 group-hover:text-primary transition-colors">{label}</span>
        </button>
    )
}

function ContactOption({ icon, title, desc, action }: { icon: React.ReactNode, title: string, desc: string, action: string }) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl border hover:border-primary/30 hover:bg-primary/5 transition-all group cursor-pointer">
            <div className="h-10 w-10 bg-muted group-hover:bg-background rounded-full flex items-center justify-center text-foreground group-hover:text-primary border transition-colors">
                {icon}
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-sm">{title}</h4>
                <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
    )
}
