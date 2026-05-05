import React from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

export default function HelpPage() {
    return (
        <div className="container py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-6">Help Center</h1>
            <div className="relative mb-12">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search for help..." className="pl-10 h-12 text-lg" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold">Orders & Shipping</h3>
                    <ul className="space-y-2 text-primary">
                        <li><a href="#" className="hover:underline">Where is my order?</a></li>
                        <li><a href="#" className="hover:underline">Shipping rates and times</a></li>
                        <li><a href="#" className="hover:underline">International shipping</a></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold">Returns & Refunds</h3>
                    <ul className="space-y-2 text-primary">
                        <li><a href="#" className="hover:underline">Start a return</a></li>
                        <li><a href="#" className="hover:underline">Return policy</a></li>
                        <li><a href="#" className="hover:underline">Refund status</a></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold">Account & Payments</h3>
                    <ul className="space-y-2 text-primary">
                        <li><a href="#" className="hover:underline">Reset password</a></li>
                        <li><a href="#" className="hover:underline">Payment methods</a></li>
                        <li><a href="#" className="hover:underline">Managing your address book</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
