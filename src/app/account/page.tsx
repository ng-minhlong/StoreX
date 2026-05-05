'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function AccountPage() {
    const { data: session } = useSession()

    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-8">My Account</h1>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal details.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Name</Label>
                                    <Input defaultValue={session?.user?.name || 'User'} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input defaultValue={session?.user?.email || ''} readOnly className="bg-muted" />
                                </div>
                            </div>
                            <Button>Update Profile</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="orders">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order History</CardTitle>
                            <CardDescription>View your past purchases.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8 text-muted-foreground">No orders found.</div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="wishlist">
                    <Card>
                        <CardHeader>
                            <CardTitle>Wishlist</CardTitle>
                            <CardDescription>Items you have saved for later.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8 text-muted-foreground">Your wishlist is empty.</div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
