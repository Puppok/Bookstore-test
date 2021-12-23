import { BooksService } from './../shared/books.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, find, map } from 'rxjs';
import { Books, Info } from '../shared/books.interface';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  currentId: string = ''

  books: Books[] = []

  book: Books = {
    title: '',
    subtitle: '',
    isbn13: '',
    price: '',
    image: ''
  }

  info: Info = {
    error: '',
    total: '',
    books: []
  }

  constructor(private route: ActivatedRoute, private booksService: BooksService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentId = params['id']
      console.log(this.currentId)
    })

    this.booksService.loadInfo().subscribe(info => {
      this.info = info
      console.log(info)
    })

    this.booksService.loadInfo()
      .pipe(
        map(() => this.info.books.find(book => book.isbn13 == this.currentId))
      )
      .subscribe(book => {
        this.book.title = book!.title
        this.book.price = book!.price
        this.book.subtitle = book!.subtitle
        this.book.image = book!.image
        console.log(this.book)
      })
  }
}
