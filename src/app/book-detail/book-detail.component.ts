import { CartService } from './../shared/cart.service';
import { Book } from './../shared/books.interface';
import { BooksService } from './../shared/books.service';
import { APIService } from '../shared/API.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, merge, mergeMap } from 'rxjs';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  book?: Book

  constructor(private route: ActivatedRoute,
              private router: Router,
              private booksService: BooksService,
              private cartService: CartService) {}

  ngOnInit(): void {
    this.route.params.pipe(
      mergeMap(params => this.booksService.books$.pipe(
        map(books => books.find(book => book.isbn13 === params['id']))
      ))
    ).subscribe(book => {
      if(book) {
        this.book = book
      } else {
        this.router.navigateByUrl('/store')
      }
    })
  }

  addToCart() {
    if(this.book) {
      this.booksService.updateBook(this.book.isbn13, {...this.book, inCart: true})
      this.cartService.addToCart(this.book)
    }
  }
}
