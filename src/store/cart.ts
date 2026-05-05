import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
    id: string
    productId: string
    name: string
    price: number
    quantity: number
    vendorId: string
    image?: string
}

interface CartState {
    items: CartItem[]
    addItem: (item: Omit<CartItem, 'id'>) => void
    removeItem: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    totalItems: () => number
    totalPrice: () => number
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => {
                const currentItems = get().items
                const existingItem = currentItems.find((i) => i.productId === item.productId)

                if (existingItem) {
                    set({
                        items: currentItems.map((i) =>
                            i.productId === item.productId
                                ? { ...i, quantity: i.quantity + item.quantity }
                                : i
                        ),
                    })
                } else {
                    set({ items: [...currentItems, { ...item, id: `${item.productId}-${Date.now()}` }] })
                }
            },
            removeItem: (productId) => {
                set({ items: get().items.filter((i) => i.productId !== productId) })
            },
            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId)
                    return
                }
                set({
                    items: get().items.map((i) =>
                        i.productId === productId ? { ...i, quantity } : i
                    ),
                })
            },
            clearCart: () => set({ items: [] }),
            totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
            totalPrice: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        }),
        {
            name: 'minimarket-cart',
        }
    )
)
