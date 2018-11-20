import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import {Subscription, Subject} from "rxjs";
/**
 * Created by Tech Group BWL on 15/10/2018.
 */

@Component({
  selector: 'motum-search-input',
  templateUrl: './motumSearchInput.component.html',
  styleUrls: ['./motumSearchInput.component.scss']
})
export class MotumSearchInputComponent implements OnInit, OnDestroy {

  //keys for values to default
  keyTypeDefault: string = 'default';
  keyTypeTables: string = 'table';
  keyTypeTooltip: string = 'tool';

  keyWidthPercent: string = '%';
  keyWidthPx: string = 'px';
  defaultIconClassSearch: string = 'motum-i tm-e91f';
  defaultIconClassReset: string = 'motum-i tm-e912';
  widthDigitDefault:number = 8;

  //keys for values to default
  isTypeDefault: boolean = false;
  isTypeTables: boolean = false;
  isTypeTooltip: boolean = false;

  //keys for values to default
  widthForPlaceholder: number = 100;
  widthType:string;

  // Determines the value of search input.
  @Input() modelSearchInput: string;

  // Determines the width minimum in pixels. If defaultWidthPercent is null
  @Input() widthMin: number = 140;

  // Determine the space between the value and the icon in pixels.
  @Input() space:number = 30;

  // Determines the style from a key: 'table', 'tool' or 'default'.
  @Input() styleInput:string;

  // Placeholder and determines the width in pixels. If defaultWidthPercent is null
  @Input() placeholder:string = '';

  // Determines if has icon Search. By default true for style: table and default
  @Input() iconSearch:boolean;

  // Determines if has icon Reset. By default true for style: tool
  @Input() iconReset:boolean;

  // Determines width in percentage.
  @Input() defaultWidthPercent:number;

  // Determines the icon for search.
  @Input() classIconSearch: string;

  // Determines the icon for reset.
  @Input() classIconReset: string;

  // Return the value input or modelSearchInput.
  @Output() changesSearchValue: EventEmitter<string> = new EventEmitter<string>();

  changesSearchValueInput = new Subject<any>();
  $search: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.setUpDebounceTimeInput();
    this.setStyleToInputSearch();
  }

  setStyleToInputSearch() {
    if (this.styleInput) {
        switch(this.styleInput) {
          case this.keyTypeTables: {
            if (!this.iconSearch) {
                this.iconSearch = true;
            }
            if (!this.iconReset) {
                this.iconReset = false;
            }
            this.isTypeTables = true;
            break;
          }
          case this.keyTypeTooltip: {
            if (!this.iconSearch) {
                this.iconSearch = false;
            }
            if (!this.iconReset) {
                this.iconReset = true;
            }
            this.isTypeTooltip = true;
            break;
          }
          case this.keyTypeDefault: {
            if (!this.iconSearch) {
                this.iconSearch = true;
            }
            if (!this.iconReset) {
                this.iconReset = false;
            }
            this.isTypeDefault = true;
            break;
          }
        }
        if(!this.classIconSearch) {
          this.classIconSearch = this.defaultIconClassSearch;
        }
        if(!this.classIconReset) {
          this.classIconReset = this.defaultIconClassReset;
        }
    }else {
      this.isTypeDefault = true;
    }
    if (!this.defaultWidthPercent) {
      if (this.placeholder.length > 1) {
          this.widthForPlaceholder = (this.placeholder.length * this.widthDigitDefault) + this.space;
          if(this.widthForPlaceholder < this.widthMin){
            this.widthForPlaceholder = this.widthMin;
          }
          this.widthType = this.widthForPlaceholder+this.keyWidthPx;
      }else{
        this.widthType = this.widthForPlaceholder+this.keyWidthPercent;
      }
    }else {
      this.widthType = this.defaultWidthPercent+this.keyWidthPercent;
    }

  }
  ngOnDestroy() {
    this.$search.unsubscribe();
  }
  callReset(){
    setTimeout(() => {
      this.changesSearchValue.emit(null);
    },100);
  }
  setUpDebounceTimeInput(){
    this.$search = this.changesSearchValueInput
    .map((event: any)=> event.target.value)
    .debounceTime(500)
    .subscribe(data => {
        this.changesSearchValue.emit(this.modelSearchInput);
    });
  }
}
