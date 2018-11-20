import { Directive, Input, ElementRef, Output, EventEmitter} from '@angular/core';
import '../../../../assets/js/daterangepicker.js';
import * as jQuery from 'jquery';

@Directive({
  selector: '[motumCalender]'
})
export class MotumCalenderDirective {
  @Input() ranges:any;
  @Input() star:any;
  @Input() end:any;
  @Output() fecha: EventEmitter<any> = new EventEmitter<any>();
  jsonDate:any;
  
  constructor(public el: ElementRef) {
  }

  ngOnInit(){ 
    jQuery(this.el.nativeElement).daterangepicker({
        "startDate": this.star,
        "endDate": this.end,
        "ranges": this.ranges,
        "opens": "left",
        "alwaysShowCalendars": true
    }, (start, end, label) => {
      this.jsonDate = {
          "startDate": start,
          "endDate": end,
          "label": label
      };
       this.fecha.emit(this.jsonDate);
    });
    
  }


}
