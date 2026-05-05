'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function QnASection() {
    return (
        <div className="mt-16 pt-10 border-t space-y-6">
            <h2 className="text-2xl font-bold">Questions & Answers</h2>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Have a question? Search for answers" className="pl-9" />
            </div>

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is this compatible with iPhone?</AccordionTrigger>
                    <AccordionContent>
                        Yes, it is fully compatible with all iOS devices via Bluetooth 5.0.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Does it come with a carrying case?</AccordionTrigger>
                    <AccordionContent>
                        Yes, a hard-shell protective carrying case is included in the box.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What is the battery life?</AccordionTrigger>
                    <AccordionContent>
                        It lasts up to 30 hours on a single charge with ANC turned on.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
