import { Books } from './../shared/books.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input() book!: Books

  bookImage: string = ''

  constructor() { }

  ngOnInit(): void {
    this.bookImage = this.book.image
  }
}
