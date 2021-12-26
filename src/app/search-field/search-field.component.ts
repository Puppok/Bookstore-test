import { SearchService } from './../shared/search.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit, OnDestroy{

  searchTerm: FormControl = new FormControl('')
  searchTermStream: Subscription = new Subscription()
  
  constructor(readonly searchService: SearchService ) {}

  ngOnInit(): void {
    this.searchTermStream.add(this.searchTerm.valueChanges
    .pipe(debounceTime(1500))
    .subscribe(value => this.searchService.updateTerm(value)))
  }

  ngOnDestroy(): void {
      this.searchTermStream.unsubscribe()
  }

}
