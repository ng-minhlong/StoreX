'use client'

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { History, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ViewedProduct {
    id: string
    name: string
    price: number
    image: string
}

export function FloatingHistory() {
    const [history, setHistory] = useState<ViewedProduct[]>([])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // Poll for changes or just load once? 
        // For a smoother experience, we can listen to storage events or just load on mount.
        // Since we are on client side navigation, a simple interval or event listener might be better.
        const loadHistory = () => {
            const saved = localStorage.getItem("recently_viewed")
            if (saved) {
                setHistory(JSON.parse(saved).slice(0, 4))
            }
        }

        loadHistory()

        // Listen for storage events (cross-tab) or custom events
        window.addEventListener("storage", loadHistory)

        // Custom event for same-tab updates
        const handleUpdate = () => loadHistory()
        window.addEventListener("history-updated", handleUpdate)

        return () => {
            window.removeEventListener("storage", loadHistory)
            window.removeEventListener("history-updated", handleUpdate)
        }
    }, [])

    if (history.length === 0) return null

    return (
        <div className="fixed  bottom-24 right-4 z-40 flex flex-col items-end gap-2 pointer-events-none">
            <div className={`pointer-events-auto bg-background/80 backdrop-blur-md border border-border rounded-xl shadow-xl overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? "w-64 opacity-100 scale-100 mb-2" : "w-0 h-0 opacity-0 scale-90"}`}>
                <div className="p-3 border-b flex items-center justify-between bg-muted/50">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Recently Viewed</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
                        <X className="h-3 w-3" />
                    </Button>
                </div>
                <div className="max-h-[300px] overflow-y-auto p-2 space-y-2">
                    {history.map((item) => (
                        <Link href={`/products/${item.id}`} key={item.id} className="flex gap-3 hover:bg-secondary/50 p-2 rounded-lg transition-colors group">
                            <div className="h-12 w-12 rounded-md overflow-hidden bg-white shrink-0 border">
                                <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                            </div>
                            <div className="flex flex-col justify-center min-w-0">
                                <span className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">{item.name}</span>
                                <span className="text-xs font-bold text-muted-foreground">${item.price}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center transition-all hover:scale-105"
            >
                <History className="h-6 w-6" />
            </Button>
        </div>
    )
}
