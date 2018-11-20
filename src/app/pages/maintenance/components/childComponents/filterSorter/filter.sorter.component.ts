import { Component, OnDestroy, OnInit, ViewEncapsulation, Input, Output,
  EventEmitter } from '@angular/core';
/**
 * Created by Tech Group BWL on 01/10/2018.
 */
@Component({
  selector: 'motum-filter-sorter-component',
  templateUrl: './filter.sorter.component.html',
  styleUrls: ['./filter.sorter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilterSorterComponent implements OnDestroy, OnInit {
@Input() listElements;
@Output() listElementsChange = new EventEmitter();
public optionsSelect: Select2Options;

  constructor( ) {
    this.optionsSelect= {
      multiple: true,
      theme: 'classic',
      closeOnSelect: true,
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(){
  }
  onChangeValue(value, key, indice) {
    let event = {"value": value, "key": key, "indice":indice};
    this.listElementsChange.emit(event)
  }
}
