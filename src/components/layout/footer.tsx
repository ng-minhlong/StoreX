'use client'

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="bg-foreground text-background pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-1">
                            <span className="text-2xl font-black tracking-tighter">MiniMarket</span>
                            <div className="h-2 w-2 bg-primary rounded-full mt-2" />
                        </Link>
                        <p className="text-muted-foreground/60 text-sm leading-relaxed max-w-xs">
                            The premier marketplace for quality goods. Verified vendors, premium products, and exceptional customer service.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <SocialIcon href="https://facebook.com" icon={<Facebook className="h-4 w-4" />} />
                            <SocialIcon href="https://twitter.com" icon={<Twitter className="h-4 w-4" />} />
                            <SocialIcon href="https://instagram.com" icon={<Instagram className="h-4 w-4" />} />
                            <SocialIcon href="https://linkedin.com" icon={<Linkedin className="h-4 w-4" />} />
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="font-bold mb-6 text-lg">Shop</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground/80">
                            <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
                            <li><Link href="/category/electronics" className="hover:text-primary transition-colors">Electronics</Link></li>
                            <li><Link href="/category/fashion" className="hover:text-primary transition-colors">Fashion</Link></li>
                            <li><Link href="/category/home-garden" className="hover:text-primary transition-colors">Home & Living</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-lg">Company</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground/80">
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="/press" className="hover:text-primary transition-colors">Press</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-lg">Support</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground/80">
                            <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link href="/returns" className="hover:text-primary transition-colors">Returns</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping Info</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Column - Newly Added */}
                    <div className="md:col-span-1">
                        <h4 className="font-bold mb-6 text-lg">Stay Connected</h4>
                        <p className="text-muted-foreground/60 text-sm mb-4">
                            Subscribe to our newsletter for early access to sales and new arrivals.
                        </p>
                        <form className="space-y-2" onSubmit={(e) => {
                            e.preventDefault();
                            alert("Thanks for subscribing!");
                        }}>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm w-full text-white placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    required
                                />
                            </div>
                            <Button type="submit" size="sm" className="w-full">Subscribe</Button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/60">
                    <p>© 2024 MiniMarket Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                    <Button variant="ghost" size="sm" onClick={scrollToTop} className="ml-auto md:ml-0 gap-2 text-white hover:bg-white/10">
                        Back to top <ArrowUp className="h-3 w-3" />
                    </Button>
                </div>
            </div>
        </footer>
    )
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all"
        >
            {icon}
        </a>
    )
}
