import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'motum-calender',
  templateUrl: './motum-calender.component.html',
  styleUrls: ['./motum-calender.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MotumCalender implements OnInit {


  @Input() ranges:any;
  @Input() star:any;
  @Input() end:any;
  @Input() date:any;
  @Output() dateModification: EventEmitter<any> = new EventEmitter<any>();

  
  fecha: any;

  constructor() {
  
  }

  ngOnInit() {
  }

  eventFecha(event){
    this.dateModification.emit(event);
  }

}
