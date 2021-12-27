import { BooksService } from './../shared/books.service';
import { CartService } from './../shared/cart.service';
import { Book } from './../shared/books.interface';
import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input() book!: Book
  @Input() inList = false
  @Input() inCart = false

  bookImage = ''
  bookId = ''

  constructor(private cartService: CartService, private booksService: BooksService) { }

  ngOnInit(): void {
    this.bookImage = this.book.image
    this.bookId = this.book.isbn13
  }

  addToCart() {
    this.booksService.updateBook(this.bookId, {...this.book, inCart: true})
    this.cartService.addToCart(this.book)    
  }
  
  removeFromCart() {
    this.booksService.updateBook(this.bookId, {...this.book, inCart: false, itemCount: 0})
    this.cartService.removeFromCart(this.bookId)
  }

  moreBook() {
    // this.booksService.updateBook(this.bookId, {...this.book, itemCount: this.book.itemCount++})
    this.cartService.updateBookInCart(this.bookId, true)
  }

  lessBook() {
    // this.booksService.updateBook(this.bookId, {...this.book, itemCount: this.book.itemCount--})
    this.cartService.updateBookInCart(this.bookId, false)
  }
}
