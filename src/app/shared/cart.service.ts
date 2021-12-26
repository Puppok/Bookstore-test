import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Book, storedBookInfo } from './books.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private storedBooks$$ = new BehaviorSubject<storedBookInfo>({books: [], totalItems: 0, totalAmount: 0})

  readonly storedBooks$ = this.storedBooks$$.asObservable()
  readonly books$ = this.storedBooks$.pipe(map(({books}) => books))
  readonly totalCount$ = this.storedBooks$.pipe(map(({totalItems}) => totalItems))
  readonly amount$ = this.storedBooks$.pipe(map(({totalAmount}) => totalAmount))

  addToCart(book: Book) { 
    const books = [...this.storedBooks$$.getValue().books, {...book, inCart: true}]
    
    this.storedBooks$$.next({
      books,
      totalItems: books.length,
      totalAmount: this.calculateAmount(books)
    })

    console.log('Book added: ', book)
  }

  clearCart() {
    this.storedBooks$$.next({
      books: [],
      totalAmount: 0,
      totalItems: 0
    })
  }

  private calculateAmount(list: Book[]): number {
    return  Math.floor(list
      .map(book => { return book.price.replace(/[$]/gi, '') })
      .reduce((total, current) => { return total + +current }, 0)) || 0
  }
}
