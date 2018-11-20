import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing';

// App is our top level components
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';
import {Constants} from "./shared/providers/constants";
import {ApiCrudService} from "./shared/providers/api.crud.service";
import {EventsService} from "./shared/providers/events";
import {StorageService} from "./shared/providers/storage.service";
import {LoginService} from "./shared/providers/login.service";
import {APP_BASE_HREF} from "@angular/common";
import {ChangeSpaceColsAndRowsService} from "./shared/providers/changeSpaceColsAndRows.service";

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState,
  Constants,
  ApiCrudService,
  EventsService,
  StorageService,
  LoginService,
  ChangeSpaceColsAndRowsService
];

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    NgbModule.forRoot(),
    PagesModule,
    routing,
    TranslateModule,
    BrowserAnimationsModule,
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
    // {
    //   provide: APP_BASE_HREF,
    //   useValue: '/'
    // }
  ]
})

export class AppModule {

  constructor(public appState: AppState) {
  }
}
