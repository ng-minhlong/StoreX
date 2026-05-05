import React from 'react'

export default function CookiesPage() {
    return (
        <div className="container py-12 max-w-3xl">
            <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
            <div className="text-muted-foreground space-y-4">
                <p>
                    We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
                </p>
                <h3 className="text-xl font-bold text-foreground">What are Cookies?</h3>
                <p>
                    Cookies are files with small amount of data which may include an anonymous unique identifier.
                    Cookies are sent to your browser from a website and stored on your device.
                </p>
                <h3 className="text-xl font-bold text-foreground">How We Use Cookies</h3>
                <ul className="list-disc pl-5 space-y-2">
                    <li>To remember your login status.</li>
                    <li>To remember what is in your shopping cart.</li>
                    <li>To understand how you use our website.</li>
                </ul>
            </div>
        </div>
    )
}
