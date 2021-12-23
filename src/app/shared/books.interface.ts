export interface Books {
    title: string
    subtitle?: string
    isbn13: string
    price: string
    image: string
}

export interface Info {
    error: string
    total: string
    books: Books[]
}

