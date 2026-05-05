# MiniMarket Hub

A modern fullstack multi-vendor e-commerce platform built with Next.js 15, featuring real-time flash sales, advanced product filtering, vendor management, and premium UI/UX design.

## 🚀 Features

### Core Functionality
- **Multi-Vendor Marketplace**: Support for multiple vendors with individual storefronts and product management
- **Advanced Product Filtering**: Filter by category, price range, rating, and vendor with real-time updates
- **Flash Sales System**: Time-limited deals with countdown timers and stock progress indicators
- **Shopping Cart**: Persistent cart state with Zustand, supporting add/remove/update operations
- **Product Search**: Intelligent search with recent searches and trending products
- **Vendor Profiles**: Dedicated vendor pages with ratings, product listings, and store information
- **Product Reviews**: User ratings and reviews with average score calculation
- **Wishlist**: Save favorite products for later
- **Registry System**: Gift registry creation and management for special occasions

### User Experience
- **Responsive Design**: Mobile-first approach with seamless tablet and desktop experiences
- **Dark Mode**: Full dark mode support across all pages
- **Mega Menu**: Structured category navigation with promotional content
- **Mobile Bottom Navigation**: App-like navigation for mobile users
- **Recently Viewed**: Floating widget tracking user browsing history
- **Loading States**: Skeleton loaders and optimistic UI updates
- **Empty States**: User-friendly messages when no data is available

### Authentication & Security
- **User Authentication**: Secure login and registration system
- **Protected Routes**: Role-based access control for customer and vendor areas
- **Session Management**: Persistent authentication state

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI, Radix UI
- **State Management**: Zustand
- **Icons**: Lucide React

### Backend
- **API**: Next.js API Routes
- **ORM**: Prisma
- **Database**: PostgreSQL (Neon)
- **Authentication**: Custom implementation with session management

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (or Neon account)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pusri27/minimarket-hub.git
   cd minimarket-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="your_postgresql_connection_string"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
minimarket-hub/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding script
├── src/
│   ├── app/
│   │   ├── (public)/          # Public pages (home, products, vendors)
│   │   ├── auth/              # Authentication pages
│   │   ├── api/               # API routes
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/                # Shadcn UI components
│   │   ├── layout/            # Layout components (navbar, footer)
│   │   └── home/              # Home page specific components
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client instance
│   │   └── utils.ts           # Utility functions
│   └── store/
│       └── cart-store.ts      # Zustand cart state management
├── public/                    # Static assets
└── package.json
```

## 🔑 Key Components

### Pages
- **Home (`/`)**: Hero carousel, flash sales, category grid, trending products, featured stores
- **Products (`/products`)**: Product listing with advanced filtering and sorting
- **Product Detail (`/products/[id]`)**: Detailed product view with reviews and related products
- **Vendors (`/vendors`)**: Vendor directory with search and filtering
- **Vendor Profile (`/vendors/[id]`)**: Individual vendor storefront
- **Cart (`/cart`)**: Shopping cart management
- **Registry (`/registry`)**: Gift registry creation and management
- **Customer Service (`/customer-service`)**: Help center with FAQs

### API Routes
- `GET /api/products`: Fetch products with filtering and pagination
- `GET /api/vendors`: Fetch vendor listings
- Additional routes for authentication, cart management, and data operations

## 🎨 Design Philosophy

The application follows modern e-commerce design principles:
- **Premium Aesthetics**: Clean, professional interface with attention to visual hierarchy
- **Performance First**: Optimized images, lazy loading, and efficient data fetching
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation support
- **Consistency**: Unified design system using Shadcn/UI components
- **User-Centric**: Intuitive navigation, clear CTAs, and helpful feedback messages

## 🚢 Deployment

The application is optimized for deployment on Vercel:

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Import your repository on Vercel
   - Configure environment variables
   - Deploy

3. **Database Migration**
   - Ensure your production database is set up
   - Run migrations via Vercel CLI or dashboard

## 📝 Database Schema

The application uses the following main models:
- **User**: Customer and vendor accounts
- **Vendor**: Vendor profiles and shop information
- **Product**: Product listings with images, pricing, and inventory
- **Category**: Product categorization
- **Review**: Product reviews and ratings
- **Cart**: Shopping cart items
- **Order**: Order management and history
- **Registry**: Gift registry system

## 🤝 Contributing

This is a personal portfolio project. However, feedback and suggestions are welcome through GitHub issues.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Pusri27**
- GitHub: [@Pusri27](https://github.com/Pusri27)
- Project Link: [https://github.com/Pusri27/minimarket-hub](https://github.com/Pusri27/minimarket-hub)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Shadcn for the beautiful UI component library
- Vercel for hosting and deployment platform
- The open-source community for inspiration and tools
