import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Headers , RequestOptions } from '@angular/http';
/**
* Created by Tech Group BWL on 29/06/2018.
*/
const url = "http://localhost:3000/upload"; //destino en el servidor

@Injectable()
export class fileService {

  constructor(private http: Http) {
  }

  uploadFiles(file): Observable<string> {
      let formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      const headers = new Headers({});
      let options = new RequestOptions({ headers: headers });
      return this.http.post(url, formData, options).map(response => response.text());
  }
}
