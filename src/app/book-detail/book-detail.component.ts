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

  constructor(private route: ActivatedRoute, private booksService: BooksService, private router: Router, private cartService: CartService) { }

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
    // this.booksService.loadInfo().subscribe(info => {
    //   this.info = info
    //   console.log(info)
    // })

    // this.booksService.loadInfo()
    //   .pipe(
    //     map(() => this.info.books.find(book => book.isbn13 == this.currentId)),
    //     filter(Boolean)
    //   )
    //   .subscribe(book => {
    //     this.book.title = book.title
    //     this.book.price = book.price
    //     this.book.subtitle = book.subtitle
    //     this.book.image = book.image
    //     console.log(this.book)
    //   })
  }

  addToCart() {
    if(this.book) {
      this.booksService.updateBook(this.book.isbn13, {...this.book, inCart: true})
      this.cartService.addToCart(this.book)
    }
  }
}
