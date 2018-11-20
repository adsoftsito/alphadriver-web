import { Component, Input, ViewChild, EventEmitter, Output, OnInit } from '@angular/core';
import { MenuBarComponent } from '../menuBar/menu.bar.component';
import { MenuService } from '../../menu.service';
@Component({
    moduleId: module.id.toString(),
    selector: 'menu-item-component',
    templateUrl: './menu.item.component.html',
    styleUrls: ['./menuitem.scss'],
    providers: [MenuService],
})
export class MenuItemComponent implements OnInit {
  @ViewChild(MenuBarComponent) menuBarComponent: MenuBarComponent;
  // @Output() itemHover = new EventEmitter<any>();
  @Input() comunicationIn: any;
  @Input() comunicationInSoon: any;
  @Input() statusOffBar: boolean;
  @Input() structureData: any;
  @Output() comunicationOut = new EventEmitter();
  @Input() configuration: any;
  elementList:string = '' ;

  constructor( private _menuService: MenuService) {}
  // onHoverItem($event): void {
  //   this.itemHover.emit($event);
  // }
   toggleNewBar(option) {
   let element = this.configuration.menuList[option].component;
   console.log("se imprime en menu.item.components.ts l 28",element);
   console.log("se imprime opcion",this.configuration.menuList);
     if(element !== null && element !== undefined) {
       this.elementList = element;
       this.menuBarComponent.toggleMenu(true);
     }
   }

   ComunicationOutMenuBar (event) {
    this.comunicationOut.emit(event);
   }

   ngOnInit () {
     // if (this.configuration !== null && this.configuration !== undefined) {
     //   this._menuService.buildStructure(this.structureData);
     //   this.toggleNewBar(this.configuration.componentSoon);
     // }
   }
}
