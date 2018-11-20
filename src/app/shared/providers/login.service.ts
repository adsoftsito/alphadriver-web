import {Injectable} from "@angular/core";
import {ApiCrudService} from "./api.crud.service";
import {Response, ResponseContentType} from "@angular/http";
import {Observable} from "rxjs";
import {StorageService} from "./storage.service";
import {Constants} from "./constants";
import 'rxjs/add/operator/map';

import { Http, Headers, RequestOptions } from '@angular/http';
// import { post } from "selenium-webdriver/http";

/**
 * Created by Tech Group BWL on 25/07/2018.
 */
@Injectable()
export class LoginService {

  private ENDPOINT: string = 'users';
  private ENDPOINT_AUTH: string = '/authenticate';
  headers: Headers = new Headers();
  constructor(
    private api: ApiCrudService,
    private _storage: StorageService,
    private C: Constants,
    private http: Http
  ) {}

  // authenticate(body): Observable<any> {
    
  //   if (!body) throw new Error("It's required a body");
  //   if (!body.username) throw new Error("It's required username field");
  //   if (!body.password) throw new Error("It's required password field");
  //   let post = this.api.post(`${this.ENDPOINT}${this.ENDPOINT_AUTH}`, body);
  //   post.map(this._extractData);
  //   return post;
  // }

  authenticate(body): Observable<any>{
    let url = 'https://auth-api-dot-socketavl.appspot.com/api/login';
    let res = this.http.post(url, body);
    res.map(r => r.json());
    return res;
  }

  loggedIn(userData): void {
    // this._storage.setLocal(this.C.USER_DATA_KEY, userData);

    if(userData && userData.accessToken){
      this._storage.setLocal(this.C.USER_DATA_KEY, userData);
    }
  }

  logout(): void {
    let url = 'https://auth-api-dot-socketavl.appspot.com/api/logout';
    let res = this.http.post(url, null, this.getOptions());
    res.map(r => r.json());
    
    res.subscribe( r => {
      this._storage.localDeleteAll();
    });

  }

  isLogged(): any {
    return this._storage.getLocal(this.C.USER_DATA_KEY);
  }

  private _extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private getOptions(): RequestOptions { 
    let auth =  new Headers({'Authorization': 'Bearer ' + this._storage.getLocal(this.C.USER_DATA_KEY).accessToken});
    return new RequestOptions({headers: auth});
  }
}