import {Component, Input, Output, EventEmitter, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {GlobalState} from '../../../../../../global.state';
import {EventsService} from "../../../../../../shared/providers/events";
import {Constants} from "../../../../../../shared/providers/constants";
import {BaMenuService} from "../../../../../services/baMenu/baMenu.service";
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'application-menu',
  templateUrl: './applicationMenu.html',
  styleUrls: ['./applicationMenu.scss'],
  animations: [
      trigger('togglingMenu', [
          state('in', style({ opacity: 1, transform: 'translateX(0)' })),
          transition('void => *', [
              style({
                  transform: 'translateX(-100%)',
              }),
              animate('0.4s ease'),
          ]),
          transition('* => void', [
              animate('0.4s ease-out', style({ transform: 'translateX(-100%)' })),
          ]),
      ]),
  ]
})
export class ApplicationMenu implements OnInit, OnDestroy {

arrayAppMenu1: Array<any> = [];
arrayAppMenu2: Array<any> = [];
showBtnOpen: boolean = false;
showBtnClose: boolean = false;

changeWidth: string = '';
menuClass1: string = '';
menuClass2: string = '';
// arrayAppMenu: Array<any>;



// changedWidth: String;

  constructor(private service: BaMenuService, private _state:GlobalState, private events: EventsService,
    private C: Constants) {
    this.events.subscribe(this.C.EVENTS_SERVICE.BA_MENU_ITEM_TO_APPLICATIONS_MENU_DATA, (data) => {
      this.arrayAppMenu1 = [];
      this.arrayAppMenu2 = [];
      this.showBtnOpen = false;
      this.showBtnClose = false;
      this.menuClass1 = '';
      this.menuClass2 = '';
      this.changeWidth = '';
      this.addData(data);
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.events.unsubscribe(this.C.EVENTS_SERVICE.BA_MENU_ITEM_TO_APPLICATIONS_MENU_DATA);
    this.arrayAppMenu1 = [];
    this.arrayAppMenu2 = [];
  }

  itemClick(event){
    this.service.statusUpdate();
    this.service.setCurrentComponent(event._id);
    // console.log(event);
    this.events.publish(this.C.EVENTS_SERVICE.BA_MENU_ITEM_TO_APPLICATIONS_MENU_TOGGLE, false);
    this.events.publish(this.C.EVENTS_SERVICE.APPLICATIONS_MENU_TO_BA_MENU_STATUS, true);
  }

  addData(data){

    if(data.length <= 8){
      this.arrayAppMenu1 = data;
    }
    if(data.length > 8){
      for(let i in data){

        if(i <= '7'){
          this.arrayAppMenu1.push(data[i]);
        }
        if(i > '7'){
          this.arrayAppMenu2.push(data[i]);
        }
      }
      this.showBtnOpen = true;
    }

  }
  changeSizeOpen(){
    // this.events.publish(this.C.EVENTS_SERVICE.BA_MENU_ITEM_TO_APPLICATIONS_MENU_TOGGLE, true);
    this.changeWidth = 'size50';
    this.showBtnOpen = false;
    this.showBtnClose = true;
    this.menuClass1 = 'menu1';
    this.menuClass2 = 'menu2';

  }

  changeSizeClose(){

    this.changeWidth = '';
    this.menuClass1 = '';
    this.menuClass2 = '';
    this.showBtnClose = false;
    this.showBtnOpen = true;
  }
 
}
