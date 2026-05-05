import React from 'react'

export default function TermsPage() {
    return (
        <div className="container py-12 max-w-3xl">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <div className="text-muted-foreground space-y-4">
                <p>Last updated: December 2024</p>
                <p>
                    Please read these Terms of Service carefully before using our website. By accessing or using the Service,
                    you agree to be bound by these Terms.
                </p>
                <h3 className="text-xl font-bold text-foreground">1. Accounts</h3>
                <p>
                    When you create an account with us, you must provide us information that is accurate, complete, and current at all times.
                    Failure to do so constitutes a breach of the Terms.
                </p>
                <h3 className="text-xl font-bold text-foreground">2. Intellectual Property</h3>
                <p>
                    The Service and its original content, features, and functionality are and will remain the exclusive property of
                    MiniMarket and its licensors.
                </p>
                {/* More legal text would go here */}
            </div>
        </div>
    )
}
