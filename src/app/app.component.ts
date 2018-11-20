import { Component, ViewContainerRef } from '@angular/core';
import * as $ from 'jquery';

import { GlobalState } from './global.state';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from './theme/services';
import { BaThemeConfig } from './theme/theme.config';
import { layoutPaths } from './theme/theme.constants';
import { Route, Router, NavigationEnd } from '@angular/router';
import { NavigationEvent } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import { TranslateService } from '@ngx-translate/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  styleUrls: ['./app.component.scss'],
  template: `
    <main [class.menu-collapsed]="isMenuCollapsed" baThemeRun>
      <div class="additional-bg"></div>
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {

  isMenuCollapsed: boolean = false;
  mydatos: any;


  constructor(private _state: GlobalState,
              private _imageLoader: BaImageLoaderService,
              private _spinner: BaThemeSpinner,
              private viewContainerRef: ViewContainerRef,
              private themeConfig: BaThemeConfig,
              private router: Router,private translate: TranslateService
            ) {

              this.router.events.subscribe(event => {
                  if (event instanceof NavigationEnd) {
                    (<any>window).ga('set', 'page', event.urlAfterRedirects);
                    (<any>window).ga('send', 'pageview');
                  }
                });

    themeConfig.config();

    this._loadImages();

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    //this. myTitleJson();
  }

  public ngAfterViewInit(): void {
    // hide spinner once all loaders are completed
    BaThemePreloader.load().then((values) => {
      this._spinner.hide();
      this._spinner.hideLoginSkeleton();
      this._spinner.hideLoginAdminSkeleton();
    });
  }

  private _loadImages(): void {
    // register some loaders
    // BaThemePreloader.registerLoader(this._imageLoader.load('assets/img/sky-bg.jpg'));
  }

  private myTitleJson(lang: string){
      this.translate.use(lang);
  }



}
