'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import { Loader2, Mail, Lock, ShoppingBag, ArrowRight } from "lucide-react"

export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                toast.error("Invalid email or password")
            } else {
                toast.success("Welcome back!")
                router.push('/')
                router.refresh()
            }
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-2 text-center items-center">
                <div className="h-10 w-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-2">
                    <ShoppingBag className="h-6 w-6" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            className="pl-10"
                            required
                            disabled={isLoading}
                        />
                    </div>
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link
                            href="/forgot-password"
                            className="text-sm font-medium text-primary hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            className="pl-10"
                            required
                            disabled={isLoading}
                        />
                    </div>
                </div>
                <Button type="submit" className="w-full h-11" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign in with Email
                </Button>

                {/* Horizontal Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Demo Access
                        </span>
                    </div>
                </div>

                {/* Demo Credentials Box */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-muted/50 rounded-lg border border-border/50 hover:border-primary/20 transition-colors">
                        <p className="font-semibold text-foreground mb-1">Admin</p>
                        <p className="text-muted-foreground truncate">admin@example.com</p>
                        <p className="text-muted-foreground font-mono mt-1">pass: admin</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg border border-border/50 hover:border-primary/20 transition-colors">
                        <p className="font-semibold text-foreground mb-1">Vendor</p>
                        <p className="text-muted-foreground truncate">vendor@example.com</p>
                        <p className="text-muted-foreground font-mono mt-1">pass: vendor</p>
                    </div>
                </div>
            </form>

            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/auth/register" className="font-semibold text-primary hover:underline inline-flex items-center">
                    Sign up <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
            </div>
        </div>
    )
}
