'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboardPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-muted-foreground">Platform-wide statistics and management.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader><CardTitle>Total Users</CardTitle></CardHeader>
                    <CardContent className="text-2xl font-bold">1,234</CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Total Vendors</CardTitle></CardHeader>
                    <CardContent className="text-2xl font-bold">56</CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Total GMV</CardTitle></CardHeader>
                    <CardContent className="text-2xl font-bold">$124,500</CardContent>
                </Card>
            </div>
        </div>
    )
}
