import { Truck, Clock } from "lucide-react"

export function DeliveryEstimator() {
    const today = new Date()
    const fastDate = new Date(today)
    fastDate.setDate(today.getDate() + 1) // Tomorrow

    const standardDate = new Date(today)
    standardDate.setDate(today.getDate() + 3)

    const format = (d: Date) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

    // Simulate randomized "order within" time
    const hoursLeft = Math.floor(Math.random() * 5) + 2
    const minsLeft = Math.floor(Math.random() * 59)

    return (
        <div className="space-y-3 border rounded-lg p-4 bg-muted/30">
            <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-primary mt-0.5" />
                <div>
                    <div className="font-semibold text-sm">Free Delivery by {format(standardDate)}</div>
                    <div className="text-xs text-muted-foreground mt-1">Order within <span className="text-green-600 font-medium">{hoursLeft} hrs {minsLeft} mins</span> to get it by <span className="font-medium text-foreground">Tomorrow, {format(fastDate)}</span></div>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="text-xs text-muted-foreground">Free 30-Day Returns &amp; Exchange</div>
            </div>
        </div>
    )
}
