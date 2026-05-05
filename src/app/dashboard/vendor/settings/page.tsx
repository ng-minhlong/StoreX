'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from 'sonner'

export default function VendorSettingsPage() {
    const onSave = (e: React.FormEvent) => {
        e.preventDefault()
        toast.success("Settings saved successfully")
    }

    return (
        <div className="max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Shop Settings</h1>
                <p className="text-muted-foreground">Manage your shop profile and settings.</p>
            </div>

            <form onSubmit={onSave}>
                <Card>
                    <CardHeader>
                        <CardTitle>Shop Profile</CardTitle>
                        <CardDescription>This information will be displayed publicly on your shop page.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="shopName">Shop Name</Label>
                                <Input id="shopName" defaultValue="My Awesome Shop" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">Shop URL Slug</Label>
                                <Input id="slug" defaultValue="my-awesome-shop" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">About the Shop</Label>
                            <Textarea id="description" defaultValue="We sell the best products in town." rows={3} />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="email">Contact Email</Label>
                                <Input id="email" type="email" defaultValue="contact@shop.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Contact Phone</Label>
                                <Input id="phone" type="tel" defaultValue="+1234567890" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button type="submit">Save Changes</Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}
