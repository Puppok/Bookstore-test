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
    const books = [...this.storedBooks$$.getValue().books, {...book, inCart: true, itemCount: 1}]
    
    this.storedBooks$$.next({
      books,
      totalItems: books.reduce((total, book) => {return total + book.itemCount}, 0),
      totalAmount: this.calculateAmount(books)
    })
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
      .map(book => { return {amount: +book.price.replace(/[$]/gi, ''), count: book.itemCount} })
      .reduce((total, current) => { return total + +current.amount*current.count }, 0)) || 0
  }

  updateBookInCart(id: string, increment: boolean) {   
    const bookList = [...this.storedBooks$$.getValue().books]
    const books = bookList.map(innerBook => {
      if(innerBook.isbn13 === id) { return ({...innerBook, itemCount: increment ? innerBook.itemCount+1 : innerBook.itemCount-1})}
      return innerBook
    })
    this.storedBooks$$.next({
      books,
      totalItems: books.reduce((total, book) => {return total + book.itemCount}, 0),
      totalAmount: this.calculateAmount(books)
    })
  }
}
