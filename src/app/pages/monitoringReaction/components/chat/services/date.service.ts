import * as moment from 'moment';
import { HttpModule, JsonpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class dateService {

  constructor(private translate: TranslateService) {
    moment.locale(this.translate.getBrowserLang());
  }

  getDateFormat(formatDate): any {
    return moment(formatDate).format('dddd DD/MM/YY');
  }
  getHourFormat(formatDate): any {
    return moment(formatDate).format('HH:mm');
  }
}
