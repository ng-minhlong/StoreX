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
import { Eye } from "lucide-react"

const MOCK_ORDERS = [
    { id: 'ORD-001', customer: 'Alice Smith', date: '2023-10-25', total: 199.99, status: 'Completed', items: 1 },
    { id: 'ORD-002', customer: 'Bob Jones', date: '2023-10-26', total: 59.98, status: 'Processing', items: 2 },
    { id: 'ORD-003', customer: 'Charlie Brown', date: '2023-10-27', total: 299.99, status: 'Pending', items: 1 },
]

export default function VendorOrdersPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                <p className="text-muted-foreground">View and manage customer orders.</p>
            </div>

            <div className="border rounded-lg bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="w-[80px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {MOCK_ORDERS.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.customer}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>
                                    <Badge variant={order.status === 'Completed' ? 'default' : order.status === 'Processing' ? 'secondary' : 'outline'}>{order.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">${order.total}</TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
