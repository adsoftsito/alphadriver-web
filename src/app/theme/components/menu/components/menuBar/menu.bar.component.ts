import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
 import { MenuService } from '../../menu.service' ;
import { Subscription } from 'rxjs/Subscription';
 import { Observable } from 'rxjs/Rx';
// import { FormComponent } from "../../../MenuGrafiComponent/form/form.components";
@Component({
    moduleId: module.id.toString(),
    selector: 'menu-bar-component',
    templateUrl: './menu.bar.component.html',
    styleUrls: ['./menubar.scss'],
    animations: [
    trigger('slideInOut', [
      state('in', style({
        display: 'none',
      })),
      state('out', style({
        display: 'inline',
        opacity: 1,
      })),
    ]),
  ],
})

export class MenuBarComponent implements OnChanges, OnInit {
  tableState: boolean = false;
  // FormComponent = FormComponent;
  @Input() menuState: string = 'in';
  @Input() listaToShow: string;
  @Input() comunicationIn: any= null;
  @Output() comunicationOut = new EventEmitter();
  @Output() comunicationOutMain = new EventEmitter();
  statusBar: any;
  subscription: Subscription;
  @Input() partsM: string = 'one';
  /*
  Ejemplo de unidades para mostrar localización
  */
  units: any = [{
      id: 'Unit 1',
      lat: -98.83275702595711,
      lng: 19.76717304598569}, {
      id: 'Unit 2',
      lat: -96.92113593220711,
      lng: 19.849863208699517}, {
      id: 'Unit 3',
      lat: -98.04174140095711,
      lng: 18.91715173227222
      }, {
      id: 'BT8003',
      lat: -102.30443805456161,
      lng: 21.86196174760067
      }, {
      id: 'GT452',
      lat: -99.55785602331161,
      lng: 17.288185403272355
      }, {
      id: 'ATM4521',
      lat: -92.35082343220711,
      lng: 17.87467872841784
      }]

  constructor (private _serviceMenu: MenuService) {
    _serviceMenu.stateBarMainOb$.subscribe(
      state => {
        this.statusBar = state;
        console.info(state);
      });
  }

     toggleMenu(control) {
       // this.menuService.setStatusBarMain('in');
       this.comunicationIn = null;
       switch (control) {
         case false:
             this.menuState = 'in';
           break;
         case true:
                this.menuState = 'out';
          break;
         default:
            this.menuState = this.menuState === 'out' ? 'in' : 'out';
          break;
       }
     }

  localizarUnit(longitude, latitude, uId) {
    this.comunicationOut.emit({ coords: { lat: longitude, lng: latitude, id: uId } });
  }

   outData(event) {
      // Usamos el método emit
      this.tableState = !this.tableState;
      this.comunicationOut.emit({ showTable: this.tableState });
  }

  changeParts(value) {
    if (value !== null) {
      this.partsM = value;
    }
  }

  ngOnChanges() {
      // this.statusBar = this._menuService.getStatusBarMain();
  }

  ngOnInit() {
    // this.statusBar = this._menuService.getStatusBarMain();
     // this.subscription = this.pubSubService.on('status-bar').subscribe(() => this.ngOnChanges());
  }
}
