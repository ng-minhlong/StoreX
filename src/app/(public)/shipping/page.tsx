import React from 'react'

export default function ShippingPage() {
    return (
        <div className="container py-12 max-w-3xl">
            <h1 className="text-3xl font-bold mb-6">Shipping Information</h1>
            <div className="prose prose-neutral max-w-none">
                <h3>Domestic Shipping</h3>
                <p>
                    We offer free standard shipping on all orders over $50. Standard shipping typically takes 3-5 business days.
                    Expedited options are available at checkout.
                </p>

                <h3>International Shipping</h3>
                <p>
                    We ship to over 50 countries worldwide. International shipping rates and times vary by location
                    and will be calculated at checkout.
                </p>

                <h3>Order Tracking</h3>
                <p>
                    Once your order ships, you will receive a confirmation email with a tracking number.
                    You can also track your order status in your account dashboard.
                </p>
            </div>
        </div>
    )
}
