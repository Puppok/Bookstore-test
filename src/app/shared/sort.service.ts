import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SortOptions } from './sort-options';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  private option$$ = new BehaviorSubject<SortOptions>(SortOptions.NONE)
  readonly option$ = this.option$$.asObservable()

  constructor() { }

  updateOption(data: SortOptions) {
    this.option$$.next(data)
  }

  clearOption() {
    this.option$$.next(SortOptions.NONE)
  }
}
