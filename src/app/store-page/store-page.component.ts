import { Component } from '@angular/core';
import { BooksService } from '../shared/books.service';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.scss']
})
export class StorePageComponent {

  constructor(readonly booksService: BooksService) { }
}
