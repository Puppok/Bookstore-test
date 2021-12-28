import { BooksService } from './shared/books.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Bookstore-test';

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
      this.booksService.init()
      localStorage.removeItem('Token')
  }
}
