'use client'

import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Ruler, Check } from "lucide-react"
import { useState } from "react"

export function SizeGuideModal() {
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [recommendation, setRecommendation] = useState<string | null>(null)

    const calculate = () => {
        if (height && weight) {
            setRecommendation(parseInt(weight) > 80 ? 'Large' : 'Medium')
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="text-sm underline text-muted-foreground hover:text-primary flex items-center gap-1">
                    <Ruler className="h-3 w-3" /> Size Guide
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Find Your Perfect Fit</DialogTitle>
                    <DialogDescription>
                        Enter your details to get a smart size recommendation.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="height">Height (cm)</Label>
                            <Input id="height" placeholder="175" value={height} onChange={e => setHeight(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input id="weight" placeholder="70" value={weight} onChange={e => setWeight(e.target.value)} />
                        </div>
                    </div>
                    {recommendation && (
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg flex items-center gap-2 animate-in zoom-in-95">
                            <Check className="h-5 w-5" />
                            <span>Recommended Size: <strong>{recommendation}</strong></span>
                        </div>
                    )}
                    <Button onClick={calculate}>Calculate Size</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
