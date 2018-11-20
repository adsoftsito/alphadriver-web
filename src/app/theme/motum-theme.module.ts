/**
 * Created by Tech Group BWL on 14/08/2018.
 */
import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DOCUMENT} from "@angular/platform-browser";
import {TmThemeService} from "./services/tmTheme/tmThemeService";
import {TmThemeOptions, TM_THEME_OPTIONS, TM_DOCUMENT} from "./motum-theme.config";


@NgModule({
  exports: [],
  imports: [
    CommonModule,


  ]
})
export class TmThemeModule {
  static forRoot(tmThemeOptions: TmThemeOptions) {
    return <ModuleWithProviders> {
      ngModule: TmThemeModule,
      providers: [
        { provide: TM_THEME_OPTIONS, useValue: tmThemeOptions || {}},
        { provide: TM_DOCUMENT, useExisting: DOCUMENT},
        TmThemeService
      ]
    }
  }
}