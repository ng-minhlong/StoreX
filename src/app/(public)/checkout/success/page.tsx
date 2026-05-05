import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function CheckoutSuccessPage() {
    return (
        <div className="container flex flex-col items-center justify-center min-h-[60vh] py-12 text-center space-y-6">
            <div className="h-20 w-20 text-green-500">
                <CheckCircle2 className="h-full w-full" />
            </div>
            <h1 className="text-3xl font-bold">Order Placed Successfully!</h1>
            <p className="text-muted-foreground max-w-md">
                Thank you for your purchase. Your order has been received and is being processed by our vendors.
            </p>
            <div className="flex gap-4">
                <Button asChild variant="outline">
                    <Link href="/">Back to Home</Link>
                </Button>
                <Button asChild>
                    <Link href="/products">Continue Shopping</Link>
                </Button>
            </div>
        </div>
    )
}
