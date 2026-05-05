import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

// Use a direct connection string to bypass the potential proxy issue
// Derived from the .env file's internal params: postgres://postgres:postgres@localhost:51214/postgres
const DIRECT_URL = "postgres://postgres:postgres@127.0.0.1:51214/postgres?sslmode=disable"
// Fallback to template1 if postgres doesn't exist? usually 'postgres' is the default.

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: DIRECT_URL
        }
    }
})

const CATEGORIES = [
    { name: 'Electronics', slug: 'electronics', description: 'Gadgets and devices' },
    { name: 'Fashion', slug: 'fashion', description: 'Clothing and accessories' },
    { name: 'Home & Garden', slug: 'home-garden', description: 'Decor and furniture' },
    { name: 'Sports', slug: 'sports', description: 'Athletic gear and equipment' },
    { name: 'Books', slug: 'books', description: 'Fiction and non-fiction' },
]

const PRODUCT_IMAGES: Record<string, string[]> = {
    'electronics': [
        'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80', // smartwatch
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', // headphones
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80', // camera
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80', // laptop
        'https://images.unsplash.com/photo-1588872657578-838097e3f4f7?auto=format&fit=crop&w=800&q=80', // speaker
    ],
    'fashion': [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80', // t-shirt
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', // shoes
        'https://images.unsplash.com/photo-1572230740693-549b027d73f4?auto=format&fit=crop&w=800&q=80', // denim jacket
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80', // dress
        'https://images.unsplash.com/photo-1551028919-ac66e613ec65?auto=format&fit=crop&w=800&q=80', // leather jacket
    ],
    'home-garden': [
        'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80', // chair
        'https://images.unsplash.com/photo-1565193566173-09290b164967?auto=format&fit=crop&w=800&q=80', // lamp
        'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80', // plant
        'https://images.unsplash.com/photo-1596162955024-873d611ee67d?auto=format&fit=crop&w=800&q=80', // table
        'https://images.unsplash.com/photo-1520986606214-8b456906c813?auto=format&fit=crop&w=800&q=80', // sofa
    ],
    'sports': [
        'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=800&q=80', // soccer ball
        'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80', // weights
        'https://images.unsplash.com/photo-1540914124281-342587941389?auto=format&fit=crop&w=800&q=80', // gym equipment
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80', // runner shoes
        'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80', // yoga mat
    ],
    'books': [
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80', // book cover
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80', // open book
        'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80', // library
        'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80', // stack of books
        'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80', // reading
    ]
}

const ADJECTIVES = ['Premium', 'Deluxe', 'Portable', 'Durable', 'Modern', 'Classic', 'Elegant', 'Smart', 'Compact', 'Pro', 'Ultra', 'Essential']

export async function GET() {
    try {
        console.log('Start seeding via API using custom connection...')

        // Test connection
        const count = await prisma.product.count()
        console.log(`Current product count: ${count}`)

        // 1. Create Categories
        const categories = []
        for (const cat of CATEGORIES) {
            const category = await prisma.category.upsert({
                where: { slug: cat.slug },
                update: {},
                create: cat,
            })
            categories.push(category)
        }

        // 2. Create Vendor User and Vendor Profile
        const vendorUser = await prisma.user.upsert({
            where: { email: 'vendor@example.com' },
            update: {},
            create: {
                email: 'vendor@example.com',
                name: 'Super Vendor',
                passwordHash: 'hashed_password_placeholder',
                role: 'VENDOR',
            },
        })

        const vendor = await prisma.vendor.upsert({
            where: { userId: vendorUser.id },
            update: {},
            create: {
                userId: vendorUser.id,
                shopName: 'Super Store',
                slug: 'super-store',
                description: 'Your one-stop shop for everything awesome.',
                isApproved: true,
            },
        })

        // 3. Create 50 Products
        const createdProducts = []

        for (let i = 0; i < 50; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)]
            const images = PRODUCT_IMAGES[category.slug] || PRODUCT_IMAGES['electronics']
            const mainImage = images[Math.floor(Math.random() * images.length)]

            // Pick unique image pair if possible
            const secondImage = images[(images.indexOf(mainImage) + 1) % images.length]

            const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
            const baseName = category.name.slice(0, -1) // e.g. Electronic, Book
            const randomNum = Math.floor(Math.random() * 1000)

            const productName = `${adjective} ${baseName} ${randomNum}`
            const slug = `${productName.toLowerCase().replace(/ /g, '-')}-${Math.random().toString(36).substring(7)}`

            const product = await prisma.product.create({
                data: {
                    name: productName,
                    slug: slug,
                    description: `This is a high-quality ${productName}. It features state-of-the-art design and premium materials. Perfect for your daily needs. Buy now and experience the difference!`,
                    price: (Math.random() * 100 + 10).toFixed(2), // Random price 10-110
                    stock: Math.floor(Math.random() * 100),
                    images: [mainImage, secondImage],
                    categoryId: category.id,
                    vendorId: vendor.id,
                    ratingAverage: parseFloat((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
                    ratingCount: Math.floor(Math.random() * 50),
                    tags: [category.slug, adjective.toLowerCase(), 'featured'],
                }
            })
            createdProducts.push(product)
        }

        await prisma.$disconnect()

        return NextResponse.json({
            message: 'Seeding successful',
            productsCreated: createdProducts.length,
            initialCount: count
        })
    } catch (error) {
        console.error('Seeding failed', error)
        await prisma.$disconnect()
        return NextResponse.json({ error: 'Seeding failed', details: String(error) }, { status: 500 })
    }
}
