import {Component} from '@angular/core';

import {GlobalState} from '../../../global.state';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ba-content-top',
  styleUrls: ['./baContentTop.scss'],
  templateUrl: './baContentTop.html',
})
export class BaContentTop {

  public activePageTitle:string = '';

  constructor(private _state:GlobalState, private translate: TranslateService) {
    this._state.subscribe('menu.activeLink', (activeLink) => {
      if (activeLink) {
        this.activePageTitle = activeLink.title;
      }
    });
  }
}
