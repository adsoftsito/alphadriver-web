/**
 * Created by Tech Group BWL on 14/08/2018.
 */
import {Component, AfterViewInit, Inject, Renderer2} from "@angular/core";
import {TmThemeService} from "../../services/tmTheme/tmThemeService";
import {TM_DOCUMENT} from "../../motum-theme.config";
/**
 * All this component helps to
 * start the theme process for this
 * project. Even this doesn't have
 * any other function.
 */
@Component({
  selector: 'tm-motum-layout',
  template: `<div></div>`
})
export class MotumLayoutComponent implements AfterViewInit {
  private alive: boolean = true;
  constructor(
    protected tmThemeService: TmThemeService,
    protected renderer: Renderer2,
    @Inject(TM_DOCUMENT) protected document: any,
  ) {
    this.tmThemeService.onThemeChange()
      .subscribe((theme: any) => {
        if (this.alive) {
          const body = this.document.getElementsByTagName('body')[0];
          if (theme.previous) {
            this.renderer.removeClass(body, `tm-theme-${theme.previous}`);//Theme name
          }
          this.renderer.addClass(body, `tm-theme-${theme.name}`);//Theme name
        }
      });
  }
  ngAfterViewInit(){}
}