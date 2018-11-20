import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { BaMenuService } from '../../services';
import { GlobalState } from '../../../global.state';
import {EventsService} from "../../../shared/providers/events";
import {Constants} from "../../../shared/providers/constants";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ba-menu',
  templateUrl: './baMenu.html',
  styleUrls: ['./baMenu.scss']
})
export class BaMenu {

  @Input() sidebarCollapsed: boolean = false;
  @Input() menuHeight: number;

  @Output() expandMenu = new EventEmitter<any>();

  
  currentSelectedItem: String;

  public menuItems: any[];
  protected _menuItemsSub: Subscription;
  public showHoverElem: boolean;
  public hoverElemHeight: number;
  public hoverElemTop: number;
  protected _onRouteChange: Subscription;
  public outOfArea: number = -200;
  checkTrue: boolean = false;

  constructor(private translate: TranslateService, private _router: Router, private _service: BaMenuService, private _state: GlobalState, private events: EventsService,
    private C: Constants) {

    this.events.subscribe(C.EVENTS_SERVICE.APPLICATIONS_MENU_TO_BA_MENU_STATUS, (statusCheckTrue) => {
      
      this.updateCheckTrue(statusCheckTrue);
      // console.log('dddd ',this.checkTrue);
    });
  }

  public updateMenu(newMenuItems) {
    this.menuItems = newMenuItems;
    // console.log(this.menuItems)
    this.selectMenuAndNotify();
  }

  public selectMenuAndNotify(): void {
    if (this.menuItems) {
      
      this.menuItems = this._service.selectMenuItem(this.menuItems);
      // Este servicio es para mandar al componente bacontenttop el titulo que se tiene en el routing
      // this._state.notifyDataChanged('menu.activeLink', this._service.getCurrentItem());
    }
  }

  public ngOnInit(): void {

    this._onRouteChange = this._router.events.subscribe((event) => {
      // console.log('event ',event);
      if (event instanceof NavigationEnd) {
        // console.log('menuItems ',this.menuItems);
        if (this.menuItems) {
          this.selectMenuAndNotify();
        } else {
          // on page load we have to wait as event is fired before menu elements are prepared
          setTimeout(() => this.selectMenuAndNotify());
        }
      }
    });

    this._menuItemsSub = this._service.menuItems.subscribe(this.updateMenu.bind(this));

    // setTimeout(() => {
    //   for(let i in this.menuItems){
    //     console.log('i ',this.menuItems[i])
    //     this.menuItems[i].selected = false;
    //   }
    // }, 6000);
    
  }

  public ngOnDestroy(): void {
    this._onRouteChange.unsubscribe();
    this._menuItemsSub.unsubscribe();
  }

  updateCheckTrue(event){
    this.checkTrue = event;
  }

  activateStatusAppMenu($event){
    if(!$event.status){

      
      if(this.checkTrue){
        for(let i in this.menuItems){
          if(this.menuItems[i].selected === true){
            this.currentSelectedItem = this.menuItems[i]._id;
            
          }
          // console.log('name actual, ',this.currentSelectedItem);
        }
        }else{
          this.currentSelectedItem = '';
        }
      
      
      for(let i in this.menuItems){
        if(this.menuItems[i]._id === $event.name){
          this.menuItems[i].selected = true;
        }else{
          this.menuItems[i].selected = false;
        }
      }
      
    }else{
      // console.log('name actual else, ',this.currentSelectedItem);
      let currentComponent = this._service.getCurrentComponent();
      
      // console.log('componente actual, ',currentComponent);
      if(currentComponent != null){
        for(let i in this.menuItems){
          if(this.menuItems[i]._id === currentComponent){
            this.menuItems[i].selected = true;
          }else{
            this.menuItems[i].selected = false;
          }
        }
      }else{
        if(this.checkTrue){
          for(let i in this.menuItems){
            if(this.menuItems[i]._id === this.currentSelectedItem){
              this.menuItems[i].selected = true;
            }else{
              this.menuItems[i].selected = false;
            }
          }
          this.currentSelectedItem = '';
  
        }else{
          for(let i in this.menuItems){
              this.menuItems[i].selected = false;
          }
        }

      }


    }
    // console.log($event);
  }
  activateStatus($event){
    if(!$event.status){

      for(let i in this.menuItems){
        if(this.menuItems[i]._id === $event.name){
          this.menuItems[i].selected = true;
          this.checkTrue = true;
        }else{
          this.menuItems[i].selected = false;
        }
      }
      // console.log('name actual, ',this.currentSelectedItem,' flag ',this.checkTrue);
    }
  }
  noRedirect(){
    for(let i in this.menuItems){
        this.menuItems[i].selected = false;
      }
    this._service.statusUpdate();
    this.checkTrue = false;
  }
  public hoverItem($event): void {
    this.showHoverElem = true;
    this.hoverElemHeight = $event.currentTarget.clientHeight;
    // TODO: get rid of magic 66 constant
    this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 66;
  }

  public toggleSubMenu($event): boolean {
    
    let submenu = jQuery($event.currentTarget).next();

    if (this.sidebarCollapsed) {
      this.expandMenu.emit(null);
      if (!$event.item.expanded) {
        $event.item.expanded = true;
      }
    } else {
      $event.item.expanded = !$event.item.expanded;
      submenu.slideToggle();
    }

    return false;
  }

  close(event){
    if(!event){
      this.events.publish(this.C.EVENTS_SERVICE.BA_MENU_ITEM_TO_APPLICATIONS_MENU_TOGGLE, false);
      let currentC = this._service.getCurrentComponent();
      this._service.statusUpdate();

      if(currentC != null){
        for(let i in this.menuItems){
          if(this.menuItems[i]._id === currentC){
            this.menuItems[i].selected = true;
            // this.checkTrue = true;
          }else{
            this.menuItems[i].selected = false;
          }
        }
      }else{
        for(let i in this.menuItems){
          this.menuItems[i].selected = false;
        }
      }
    
    }
  }


}
