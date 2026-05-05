
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ productId: string }> }
) {
    try {
        const { productId } = await params

        const product = await prisma.product.findUnique({
            where: { id: productId },
            include: {
                vendor: true,
                category: true,
                reviews: {
                    include: {
                        user: {
                            select: { name: true, image: true }
                        }
                    },
                    orderBy: { createdAt: 'desc' }
                }
            }
        })

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 })
        }

        // Format for frontend
        const formattedProduct = {
            id: product.id,
            name: product.name,
            price: Number(product.price),
            description: product.description,
            vendor: product.vendor.shopName,
            vendorId: product.vendor.id,
            category: product.category.name,
            stock: product.stock,
            images: product.images,
            rating: product.ratingAverage,
            reviewsCount: product.reviews.length,
            reviews: product.reviews.map(r => ({
                id: r.id,
                user: r.user.name || 'Anonymous',
                rating: r.rating,
                comment: r.comment,
                date: r.createdAt.toISOString()
            }))
        }

        return NextResponse.json(formattedProduct)
    } catch (error) {
        console.error('Failed to fetch product:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
