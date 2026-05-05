'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus } from "lucide-react"
import { useState } from "react"

export function ProductBundles({ mainProductPrice }: { mainProductPrice: number }) {
    const [selected, setSelected] = useState([true, true]) // Default both selected

    // Mock bundled item
    const bundleItem = {
        name: "Premium Carry Case",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=200&auto=format&fit=crop"
    }

    const totalPrice = mainProductPrice + (selected[1] ? bundleItem.price : 0)

    return (
        <div className="mt-12 p-6 border rounded-xl">
            <h3 className="text-lg font-bold mb-6">Frequently Bought Together</h3>

            <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Images Chain */}
                <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden border">
                        {/* Main Product Placeholder */}
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-center text-muted-foreground">This Item</div>
                    </div>
                    <Plus className="text-muted-foreground" />
                    <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={bundleItem.image} alt="Bundle" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Selection List */}
                <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-2">
                        <Checkbox checked={selected[0]} disabled />
                        <span className="font-medium text-sm">This item: Premium Wireless Headphones</span>
                        <span className="font-bold text-sm ml-auto">${mainProductPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="bundle-1"
                            checked={selected[1]}
                            onCheckedChange={(c) => setSelected([true, c as boolean])}
                        />
                        <label htmlFor="bundle-1" className="font-medium text-sm cursor-pointer">{bundleItem.name}</label>
                        <span className="font-bold text-sm text-red-600 ml-auto">${bundleItem.price}</span>
                    </div>
                </div>

                {/* Action */}
                <div className="w-full md:w-auto p-4 bg-muted/50 rounded-lg flex flex-col gap-2 min-w-[200px]">
                    <div className="text-sm">Total price:</div>
                    <div className="text-2xl font-bold">${totalPrice.toFixed(2)}</div>
                    <Button size="sm" className="w-full">Add Both to Cart</Button>
                </div>
            </div>
        </div>
    )
}
