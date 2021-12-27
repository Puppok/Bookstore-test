import { APIService } from './API.service';
import { Injectable } from '@angular/core';
import { Book, Info } from './books.interface';
import { BehaviorSubject, of, Observable, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  info: Info = {
    error: '',
    total: '',
    books: []
  }

  private books$$ = new BehaviorSubject<Book[]>([])
  readonly books$ = this.books$$.asObservable()

  constructor(private apiService: APIService) {
  }

  loadInfo() {
    this.apiService.loadInfo().subscribe(info => this.info = info)
  }

  loadBooks() {
    zip(this.apiService.loadInfo(), this.loadState()).subscribe(([info, books]) => {
      const res = info.books.map((book, index) => {
        return Object.assign({}, book, books[index])
      })
      this.books$$.next(res)
    })
  }

  init() {
    this.loadInfo()
    this.loadBooks()
  }

  updateBook(id: string, book: Book) {
    const bookList = this.books$$.getValue()
    const outerBook = bookList.map(innerBook => {
      if(innerBook.isbn13 === id) {
        return {...innerBook, ...book}
      }
      return innerBook
    })
    this.saveState(outerBook)
  }

  clearBook() {
    this.books$$.next(this.books$$.getValue().map(innerBook => {
      return {...innerBook, inCart: false}
    }))
  }

  saveState(books: Book[]) {
    this.books$$.next(books)
    localStorage.setItem('Book-list', JSON.stringify(books))
  }

  loadState() {
    const test: Observable<Book[]> = of(JSON.parse(localStorage.getItem('Book-list') ?? '[]'))
    return test
  }
}
