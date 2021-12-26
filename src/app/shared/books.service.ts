import { APIService } from './API.service';
import { Injectable } from '@angular/core';
import { Book, Info } from './books.interface';
import { BehaviorSubject, map } from 'rxjs';

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

  constructor(private apiService: APIService) { }

  loadInfo() {
    this.apiService.loadInfo().subscribe(info => this.info = info)
  }

  loadBooks() {
    this.apiService.loadInfo()
    .pipe(map(() => this.info.books))
    .subscribe(books => this.books$$.next(books))
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
    this.books$$.next(outerBook)
  }
}
