import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Info } from './books.interface';

@Injectable({
  providedIn: 'root'
})

export class BooksService {

  constructor(private http: HttpClient) { }

  loadInfo():Observable<Info> {
    const url = '../../assets/books.json'
    return this.http.get<Info>(url)
  }
}