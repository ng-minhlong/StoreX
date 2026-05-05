import React from 'react'
import { Button } from "@/components/ui/button"

export default function CareersPage() {
    return (
        <div className="container py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-6">Careers at MiniMarket</h1>
            <p className="text-muted-foreground text-lg mb-8">
                Join us in building the future of commerce. We are always looking for talented individuals to join our team.
            </p>

            <div className="space-y-6">
                <div className="border p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">Senior Frontend Engineer</h3>
                    <p className="text-muted-foreground mb-4">Remote • Engineering</p>
                    <Button>Apply Now</Button>
                </div>
                <div className="border p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">Product Designer</h3>
                    <p className="text-muted-foreground mb-4">New York, NY • Design</p>
                    <Button>Apply Now</Button>
                </div>
                <div className="border p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">Customer Success Manager</h3>
                    <p className="text-muted-foreground mb-4">London, UK • Operations</p>
                    <Button>Apply Now</Button>
                </div>
            </div>
        </div>
    )
}
