import { Info, Books } from '../shared/books.interface';
import { BooksService } from '../shared/books.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.scss']
})
export class StorePageComponent implements OnInit {

  books: Books[] = []

  info: Info = {
    error: '',
    total: '',
    books: []
  }
 
  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.booksService.loadInfo().subscribe(info => {
      this.info = info
      console.log(info)
    })

    this.booksService.loadInfo()
    .pipe(
      map(() => this.info.books)
    )
    .subscribe(books => {
      this.books = books
      console.log(this.books)
    })
  }
}
