import {Injectable, Inject} from "@angular/core";
import {ReplaySubject, Observable} from "rxjs";
import {TM_THEME_OPTIONS} from "../../motum-theme.config";
/**
 * Created by Tech Group BWL on 14/08/2018.
 */
@Injectable()
export class TmThemeService {
  currentTheme: string;
  private themeChanges$ = new ReplaySubject(1);

  constructor(
    @Inject(TM_THEME_OPTIONS) protected options: any
  ) {
    if (options && options.name) {
      this.changeTheme(options.name);
    }
  }

  changeTheme(name: string): void {
    this.themeChanges$.next({name, previous: this.currentTheme});
    this.currentTheme = name;
  }

  /**
   * Listen when theme has changed
   * @returns {ReplaySubject}
   */
  onThemeChange(): Observable<any> {
    return this.themeChanges$;
  }
}