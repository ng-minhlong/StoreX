import React from 'react'

export default function ReturnsPage() {
    return (
        <div className="container py-12 max-w-3xl">
            <h1 className="text-3xl font-bold mb-6">Returns & Exchanges</h1>
            <div className="prose prose-neutral max-w-none">
                <p>
                    We want you to be completely satisfied with your purchase. If you are not happy with your order,
                    we accept returns within 30 days of delivery.
                </p>
                <h3>How to Return</h3>
                <ol>
                    <li>Log in to your account and go to "Order History".</li>
                    <li>Select the order you wish to return.</li>
                    <li>Print the prepaid shipping label.</li>
                    <li>Pack your items and drop them off at the nearest carrier location.</li>
                </ol>
                <p>
                    Refunds are processed within 5-7 business days after we receive your return.
                </p>
            </div>
        </div>
    )
}
