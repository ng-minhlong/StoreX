'use client'

import { Card } from "@/components/ui/card"
// import { Carousel } from ... (If we wanted a carousel, but simples grid is fine for "Big Tech" footer usually)
// Let's use a simple grid for now to avoid complex carousel setup if not strictly needed, 
// or implement a simple scroll container.

export function RecentlyViewed() {
    return (
        <div className="mt-16 pt-10 border-t bg-muted/20 -mx-4 px-4 md:-mx-8 md:px-8 pb-10">
            <div className="container">
                <h2 className="text-xl font-bold mb-6">Your Browsing History</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Card key={i} className="p-0 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                            <div className="aspect-[3/4] bg-white relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={`https://images.unsplash.com/photo-${[
                                        '1607082348824-0a96f2a4b9da',
                                        '1556742049-0cfed4f7a07d',
                                        '1555529771-83ae75c51825',
                                        '1472851294608-415522f96385',
                                        '1523275335684-37898b6baf30',
                                        '1505740420926-70d130236f6a'
                                    ][i - 1]}?q=80&w=200&auto=format&fit=crop`}
                                    className="object-cover w-full h-full"
                                    alt="Recent"
                                />
                            </div>
                            <div className="p-2">
                                <div className="text-xs font-medium truncate">Viewed Product {i}</div>
                                <div className="text-xs font-bold text-muted-foreground">$99.00</div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
