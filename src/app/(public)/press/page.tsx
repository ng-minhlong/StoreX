import React from 'react'

export default function PressPage() {
    return (
        <div className="container py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-6">Press & Media</h1>
            <p className="text-muted-foreground text-lg mb-8">
                Latest news and press resources for MiniMarket.
            </p>

            <div className="prose max-w-none">
                <p>For press inquiries, please contact <a href="mailto:press@minimarket.com" className="text-primary hover:underline">press@minimarket.com</a>.</p>
            </div>
        </div>
    )
}
