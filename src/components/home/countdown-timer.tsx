'use client'

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface CountdownTimerProps {
    targetDate: Date
    className?: string
}

export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +targetDate - +new Date()

            if (difference > 0) {
                setTimeLeft({
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                })
            } else {
                // Timer finished logic could go here
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
            }
        }

        calculateTimeLeft()
        const timer = setInterval(calculateTimeLeft, 1000)

        return () => clearInterval(timer)
    }, [targetDate])

    return (
        <div className={cn("flex items-center gap-2 font-mono text-sm font-bold text-white", className)}>
            <TimeUnit value={timeLeft.hours} label="HRS" />
            <span className="mb-4 text-xl">:</span>
            <TimeUnit value={timeLeft.minutes} label="MIN" />
            <span className="mb-4 text-xl">:</span>
            <TimeUnit value={timeLeft.seconds} label="SEC" />
        </div>
    )
}

function TimeUnit({ value, label }: { value: number, label: string }) {
    return (
        <div className="flex flex-col items-center bg-white/10 rounded-md p-1 min-w-[3rem] backdrop-blur-sm">
            <span className="text-xl leading-none">{String(value).padStart(2, '0')}</span>
            <span className="text-[10px] opacity-70 font-sans font-normal">{label}</span>
        </div>
    )
}
