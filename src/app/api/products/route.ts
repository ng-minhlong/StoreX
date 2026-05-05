
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const limit = searchParams.get('limit')

        const products = await prisma.product.findMany({
            take: limit ? parseInt(limit) : undefined,
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

        const formattedProducts = products.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price.toString(),
            category: p.category.name,
            vendor: p.vendor.shopName,
            image: p.images[0] || '',
            rating: p.ratingAverage,
            createdAt: p.createdAt.getTime(),
            // Add default brand as it's not in DB schema yet, or map from vendor
            brand: p.vendor.shopName
        }))

        return NextResponse.json(formattedProducts)
    } catch (error) {
        console.error('Failed to fetch products:', error)
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
    }
}
