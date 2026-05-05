
import { prisma } from "@/lib/prisma"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { notFound } from "next/navigation"

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    // Capitalize slug for display title
    const categoryTitle = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Category'

    // Fetch category to ensure it exists
    const categoryExists = await prisma.category.findUnique({
        where: { slug: slug }
    })

    if (!categoryExists) {
        // Option 1: Show 404
        // notFound()

        // Option 2: Show empty state (preferred for this UX so users don't hit a hard 404 wall if they mistype)
    }

    // Fetch products for this category
    const products = await prisma.product.findMany({
        where: {
            category: {
                slug: slug
            }
        },
        include: {
            vendor: {
                select: {
                    shopName: true
                }
            },
            category: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    // Map to ProductCard props
    const formattedProducts = products.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price.toString(), // Check if ProductCard expects number or string. 
        // Based on previous mocks, it seemed to expect number, but API returned string. 
        // Let's check ProductCard definition or previous usage. 
        // Mock in previous file had `price: 299.99` (number).
        // API in `route.ts` returned `price.toString()` (string).
        // I will trust the ProductCard is flexible or I should look at it.
        // Actually, let's peek at ProductCard but for now assume string/number agnostic or cast.
        // Waiting... I'll check ProductCard in next step to be 100% sure, but for now sticking to "safe" assumption logic.
        // Correction: Let's assume number for now based on the old mock file I just read.
        // But prisma `Decimal` to string is standard. 
        // Let's coerce to number for matching the old mock type.
        category: p.category.name,
        vendor: p.vendor.shopName,
        vendorId: p.vendorId,
        image: p.images[0] || '',
        rating: p.ratingAverage,
        reviews: p.ratingCount
    }))


    return (
        <div className="min-h-screen bg-muted/20 pb-20">
            {/* Header */}
            <div className="bg-background border-b border-border/50 sticky top-16 z-30">
                <div className="container py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{categoryTitle}</h1>
                        <p className="text-sm text-muted-foreground">{formattedProducts.length} results</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Filter className="h-4 w-4" /> Filter
                    </Button>
                </div>
            </div>

            {/* Product Grid */}
            <div className="container py-8">
                {formattedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {formattedProducts.map((product) => (
                            <div key={product.id} className="h-[400px]">
                                <ProductCard
                                    {...product}
                                    price={parseFloat(product.price as unknown as string) || 0} // Safely handle potential Decimal/string mismatch
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <h2 className="text-xl font-semibold mb-2">No products found</h2>
                        <p className="text-muted-foreground">Try looking for something else or check back later.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
