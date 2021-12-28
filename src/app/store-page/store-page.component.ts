import { SortService } from './../shared/sort.service';
import { SearchService } from './../shared/search.service';
import { Component } from '@angular/core';
import { BooksService } from '../shared/books.service';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { map } from 'rxjs';
import { SortOptions } from '../shared/sort-options';
import { Book } from '../shared/books.interface';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.scss']
})
export class StorePageComponent {

  constructor(readonly booksService: BooksService,
              readonly searchService: SearchService,
              readonly sortService: SortService) {}

  private searchBooks(books: Book[], term: string): Book[] {
    const searchResult = [...books]
      if(term) {
        return searchResult.filter(book => book.title.toLowerCase().includes(term.toLowerCase()) || book.subtitle?.toLowerCase().includes(term.toLowerCase()))
      }
      return searchResult
  }     
  
  private sortedBooks(books: Book[], sortOption: SortOptions): Book[] {
    let sortedBooks: Book[] = [...books]
      switch(sortOption) {
        case SortOptions.PRICE_UP: 
          return sortedBooks.sort((a, b) => (a.price > b.price) ? 1 : -1)
        case SortOptions.PRICE_DOWN:
          return sortedBooks.sort((a, b) => (b.price > a.price) ? 1 : -1)
        case SortOptions.NAME_UP:
          return sortedBooks.sort((a, b) => (a.title > b.title) ? 1 : -1)
        case SortOptions.NAME_DOWN:
          return sortedBooks.sort((a, b) => (b.title > a.title) ? 1 : -1)
      }
      return sortedBooks
  }

  readonly books$ = combineLatest([this.booksService.books$, this.searchService.term$, this.sortService.option$])
  .pipe(
    map(([books, term, sortOption]) => this.searchBooks(this.sortedBooks(books, sortOption), term)
    )
  )
}
