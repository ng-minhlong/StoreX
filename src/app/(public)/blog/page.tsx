import React from 'react'
import Link from 'next/link'

export default function BlogPage() {
    const posts = [
        {
            title: "The Future of E-commerce in 2025",
            excerpt: "Discover the trends shaping the online shopping landscape.",
            date: "October 12, 2024"
        },
        {
            title: "5 Tips for Smart Shopping",
            excerpt: "How to get the best deals and find high-quality products.",
            date: "September 28, 2024"
        },
        {
            title: "Meet Our Top Vendors",
            excerpt: "Spotlight on the creative minds behind our best-selling items.",
            date: "September 15, 2024"
        }
    ]

    return (
        <div className="container py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-2">MiniMarket Blog</h1>
            <p className="text-muted-foreground text-lg mb-10">News, updates, and stories from our community.</p>

            <div className="grid gap-8">
                {posts.map((post, i) => (
                    <article key={i} className="group cursor-pointer">
                        <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                        <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                        <p className="text-muted-foreground">{post.excerpt}</p>
                    </article>
                ))}
            </div>
        </div>
    )
}
