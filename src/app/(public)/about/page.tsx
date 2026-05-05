export default function AboutPage() {
    return (
        <div className="container py-12 md:py-24 max-w-3xl text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">About MiniMarket Hub</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
                MiniMarket Hub is a leading multi-vendor marketplace connecting customers with trusted sellers from around the world.
                We believe in empowering small businesses and providing shoppers with unique, high-quality products.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                    <div className="text-4xl font-bold text-primary mb-2">10k+</div>
                    <div className="text-sm font-medium">Active Vendors</div>
                </div>
                <div className="p-6 bg-muted/50 rounded-lg">
                    <div className="text-4xl font-bold text-primary mb-2">5M+</div>
                    <div className="text-sm font-medium">Products</div>
                </div>
                <div className="p-6 bg-muted/50 rounded-lg">
                    <div className="text-4xl font-bold text-primary mb-2">99%</div>
                    <div className="text-sm font-medium">Customer Satisfaction</div>
                </div>
            </div>
        </div>
    )
}
