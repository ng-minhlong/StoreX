'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Check, X } from "lucide-react"

const MOCK_VENDORS = [
    { id: '1', name: 'AudioTech Solutions', owner: 'Vendor User', status: 'Approved', products: 12 },
    { id: '2', name: 'Furniture Hub', owner: 'Alice Vendor', status: 'Pending', products: 5 },
]

export default function AdminVendorsPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Vendors</h1>
                <p className="text-muted-foreground">Manage and approve vendors.</p>
            </div>

            <div className="border rounded-lg bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Shop Name</TableHead>
                            <TableHead>Owner</TableHead>
                            <TableHead>Products</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-[100px] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {MOCK_VENDORS.map((vendor) => (
                            <TableRow key={vendor.id}>
                                <TableCell className="font-medium">{vendor.name}</TableCell>
                                <TableCell>{vendor.owner}</TableCell>
                                <TableCell>{vendor.products}</TableCell>
                                <TableCell>
                                    <Badge variant={vendor.status === 'Approved' ? 'default' : 'secondary'}>{vendor.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600">
                                            <Check className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
