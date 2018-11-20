import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'floatbutton',
  templateUrl: './floatbutton.component.html',
  styleUrls: ['./floatbutton.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FloatbuttonComponent implements OnInit {

  @Input() configFloatButton:any;
  @Output() eventoBottun: EventEmitter<any> = new EventEmitter<any>();
  @Output() openTemplate = new EventEmitter<any>();
  direction:any;
  icon:any;
  iconChange:any;
  titulo:any;


  constructor() { }

  ngOnInit() {
    this.direction = this.configFloatButton.direccion;
    this.icon = this.configFloatButton.icono;
    this.iconChange = this.configFloatButton.iconoCambio;
    this.titulo= this.configFloatButton.listTitle;
  }


  configureRoutingEvent(numero:number){

    this.eventoBottun.emit(numero);
  }

  openTemplates(event){
    if(event.id === 2)
    this.openTemplate.emit(event);
  }



}
