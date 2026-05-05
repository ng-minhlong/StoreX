import React from 'react'

export default function PrivacyPage() {
    return (
        <div className="container py-12 max-w-3xl">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <div className="text-muted-foreground space-y-4">
                <p>Last updated: December 2024</p>
                <p>
                    Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information
                    when you use our website.
                </p>
                <h3 className="text-xl font-bold text-foreground">1. Information We Collect</h3>
                <p>
                    We collect information you provide directly to us, such as when you create an account, make a purchase,
                    or contact customer support. This may include your name, email address, shipping address, and payment information.
                </p>
                <h3 className="text-xl font-bold text-foreground">2. How We Use Your Information</h3>
                <p>
                    We use your information to process your orders, communicate with you, and improve our services.
                    We do not sell your personal information to third parties.
                </p>
                {/* More legal text would go here */}
            </div>
        </div>
    )
}
