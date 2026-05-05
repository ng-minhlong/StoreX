import { DashboardSidebar } from "@/components/layout/sidebar"
import { Navbar } from "@/components/layout/navbar" // Reusing Navbar or create distinct Topbar?
// Let's use a simpler Topbar or just the Sidebar + Content structure.
// We can reuse Navbar but hide some elements if passed 'dashboard' prop, or just layout properly.
// import { UserNav } from "@/components/layout/user-nav" // Placeholder or reuse standard nav logic

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[240px_1fr]">
            <DashboardSidebar />
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6 lg:h-[60px] dark:bg-muted/10">
                    <div className="w-full flex-1">
                        {/* Breadcrumbs or Title could go here */}
                    </div>
                    {/* Simple User Menu placeholder if not using full Navbar */}
                    <div className="text-sm font-medium text-muted-foreground p-2">Logged in as Vendor</div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
