import { SearchService } from './../shared/search.service';
import { Component } from '@angular/core';
import { BooksService } from '../shared/books.service';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { map } from 'rxjs';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.scss']
})
export class StorePageComponent {

  constructor(readonly booksService: BooksService, readonly searchService: SearchService) { }

  readonly books$ = combineLatest([this.booksService.books$, this.searchService.term$])
  .pipe(
    map(([books, term]) => {
      if(term) {
        return books.filter(book => book.title.toLowerCase().includes(term.toLowerCase()) || book.subtitle?.toLowerCase().includes(term.toLowerCase()))
      }
      return books
    })
  )
}
