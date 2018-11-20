import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridsterComponent, GridsterConfig, GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';

@Component({
  selector: 'app-menu-dashlet',
  templateUrl: './menu-dashlet.component.html',
  styleUrls: ['./menu-dashlet.component.scss']
})
export class MenuDashletComponent implements OnInit {

  @Input() reciveMenuDashlet: boolean;
  @Input() reciveItemMenu: Array<GridsterItem>;
  @Output() sendDeleteDashlet = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit() {
  }
  
  deleteDashlet(){
    this.sendDeleteDashlet.emit(this.reciveItemMenu);
  }

}
