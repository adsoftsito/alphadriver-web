import { Component, OnDestroy } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';
import { TranslateService } from '@ngx-translate/core';
import {EventsService} from "../shared/providers/events";
import {Constants} from "../shared/providers/constants";

@Component({
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <tm-motum-layout></tm-motum-layout>
    <div class="al-main">
      <!--<div class="al-content">-->
        <router-outlet></router-outlet>
      <!--</div>-->
      <application-menu *ngIf="flagAppMenu"
        ></application-menu>
    </div>
    <ba-back-top position="200"></ba-back-top>
    `,
    // <footer class="al-footer clearfix">
    //   <div class="al-footer-main clearfix">
    //
    //   </div>
    // </footer>
  styles: [`.al-main {padding: 66px 0 0 0;}`]
})
export class Pages implements OnDestroy {

  lang: string;
  flagAppMenu:boolean = false;
  
  constructor(private _menuService: BaMenuService, private translate: TranslateService, private events: EventsService,
    private C: Constants ) {
    this.events.subscribe(this.C.EVENTS_SERVICE.BA_MENU_ITEM_TO_APPLICATIONS_MENU_TOGGLE, (flag) => {
      this.appMenu(flag);
      
    });
    this.changeLenguage();
  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
  }

  changeLenguage(){
    this.lang = localStorage.getItem('lang');
    if(this.lang === null){
      this.translate.getBrowserLang();
    }else{
      this.translate.use(this.lang);
    }
  }

  appMenu(flag){
    this.flagAppMenu = flag;
  }

  ngOnDestroy(){
    this.events.unsubscribe(this.C.EVENTS_SERVICE.BA_MENU_ITEM_TO_APPLICATIONS_MENU_TOGGLE);
  }


}
