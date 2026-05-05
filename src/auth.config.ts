import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
            const isOnVendors = nextUrl.pathname.startsWith('/vendors')
            const isOnAccount = nextUrl.pathname.startsWith('/account')

            // Protect Dashboard routes
            if (isOnDashboard) {
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to login page
            }

            // Protect Vendor routes
            if (isOnVendors) {
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to login page
            }

            // Protect Account routes
            if (isOnAccount) {
                if (isLoggedIn) return true
                return false
            }

            return true
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
