import { Http, Response, Headers , RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MenuService {

constructor(private _http: Http) {}
  private stateBarMain = new Subject<string>();
  stateBarMainOb$ = this.stateBarMain.asObservable();
  getMenuContent(url) {
    let myTemplate: any;
    // Haciendo una peticion de un archivo al servidor y colocandolo en el HTML.
    return this._http.get('http://landcserveraws.dyndns.org/bhcomercial/index.html').
    map((html: any) => myTemplate = html);
  }

  setStatusBarMain(value: any) {
      this.stateBarMain.next(value);
  }

  buildStructure(configuration: any) {
    return null;
  }
}
