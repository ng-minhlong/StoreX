'use client'

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

export function VariantSelector() {
    const [color, setColor] = useState('black')

    const colors = [
        { id: 'black', name: 'Midnight Black', class: 'bg-zinc-900' },
        { id: 'silver', name: 'Sterling Silver', class: 'bg-gray-200' },
        { id: 'blue', name: 'Navy Blue', class: 'bg-blue-900' },
    ]

    return (
        <div className="space-y-3">
            <div className="flex justify-between">
                <Label>Color: <span className="font-bold text-foreground">{colors.find(c => c.id === color)?.name}</span></Label>
            </div>
            <div className="flex gap-3">
                {colors.map((c) => (
                    <button
                        key={c.id}
                        onClick={() => setColor(c.id)}
                        className={cn(
                            "group relative w-10 h-10 rounded-full flex items-center justify-center transition-all",
                            color === c.id ? "ring-2 ring-offset-2 ring-primary" : "hover:ring-1 hover:ring-offset-1 hover:ring-gray-400"
                        )}
                        aria-label={c.name}
                    >
                        <span className={cn("w-8 h-8 rounded-full shadow-inner border border-black/10", c.class)} />
                        {/* Checkmark inside if selected */}
                    </button>
                ))}
            </div>
        </div>
    )
}
