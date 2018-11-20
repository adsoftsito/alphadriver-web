import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dashboard-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  @Output() buttonClose = new EventEmitter<any>();
  
  items = [
    {id: 1, nomClient: 'Barras', company: 'empresa1'},
    {id: 2, nomClient: 'Circular', company: 'empresa2'},
    {id: 3, nomClient: 'Linea', company: 'empresa3'},
    {id: 4, nomClient: 'Value axis', company: 'empresa4'}
  ];
  
  constructor() { }

  ngOnInit() {
  }

  closeTemplates(){
    this.buttonClose.emit(false);
  }
}
