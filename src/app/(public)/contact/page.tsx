import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
    return (
        <div className="container py-12 md:py-24 max-w-2xl">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
                <p className="text-muted-foreground">We&apos;d love to hear from you. Send us a message.</p>
            </div>

            <form className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="How can we help?" rows={5} />
                </div>
                <Button className="w-full">Send Message</Button>
            </form>
        </div>
    )
}
