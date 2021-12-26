import { SortOptions } from './../shared/sort-options';
import { SortService } from './../shared/sort.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  readonly sortOptions = SortOptions

  option: FormControl = new FormControl(SortOptions.NONE)
  optionStream: Subscription = new Subscription()

  constructor(readonly sortService: SortService) { }

  ngOnInit(): void {
    this.optionStream.add(this.option.valueChanges.subscribe(value => this.sortService.updateOption(value)))
  }
}
