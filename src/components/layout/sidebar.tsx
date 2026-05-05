'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Package, ShoppingBag, Settings, Users, BarChart3, Store } from 'lucide-react'

export function DashboardSidebar() {
    const pathname = usePathname()
    const { data: session } = useSession()
    const role = (session?.user as any)?.role || 'VENDOR'

    // In real app, check role from session. For now, we simulate based on URL path or session.
    // Actually, let's derive links based on current path segment to show relevant dashboard sidebar?
    // Or just show all if we want to demonstrate both.
    // Better: Show links based on "context" (Admin vs Vendor).

    const isAdmin = pathname?.startsWith('/dashboard/admin')
    const isVendor = pathname?.startsWith('/dashboard/vendor')

    // Common links or fallback
    let links = []

    if (isAdmin) {
        links = [
            { href: '/dashboard/admin', label: 'Overview', icon: LayoutDashboard },
            { href: '/dashboard/admin/users', label: 'Users', icon: Users },
            { href: '/dashboard/admin/vendors', label: 'Vendors', icon: Store },
            { href: '/dashboard/admin/products', label: 'Products', icon: Package },
            { href: '/dashboard/admin/orders', label: 'Orders', icon: ShoppingBag },
        ]
    } else {
        // Vendor links
        links = [
            { href: '/dashboard/vendor', label: 'Dashboard', icon: LayoutDashboard },
            { href: '/dashboard/vendor/products', label: 'My Products', icon: Package },
            { href: '/dashboard/vendor/orders', label: 'Orders', icon: ShoppingBag },
            { href: '/dashboard/vendor/settings', label: 'Settings', icon: Settings },
        ]
    }

    return (
        <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40 w-[240px] flex-shrink-0">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <span className="">MiniMarket {isAdmin ? 'Admin' : 'Vendor'}</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {links.map((link) => {
                            const Icon = link.icon
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                        pathname === link.href ? "bg-muted text-primary" : "text-muted-foreground"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {link.label}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </div>
        </div>
    )
}
