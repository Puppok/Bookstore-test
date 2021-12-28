import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private term$$: BehaviorSubject<string> = new BehaviorSubject('')
  readonly term$ = this.term$$.asObservable()

  constructor() { }

  updateTerm(data: string) {
    this.term$$.next(data)
  }

  clearTerm() {
    this.term$$.next('')
  }
}
