export interface Book {
    title: string
    subtitle?: string
    isbn13: string
    price: string
    image: string
    inCart: boolean
}

export interface Info {
    error: string
    total: string
    books: Book[]
}

export interface storedBookInfo {
    books: Book[]
    totalItems: number
    totalAmount: number
}

