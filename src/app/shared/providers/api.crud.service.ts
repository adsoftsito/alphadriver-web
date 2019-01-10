import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import {Constants} from "./constants";
import {StorageService} from "./storage.service";
/**
 * Created by Tech Group BWL on 08/05/2018.
 */

@Injectable()
export class ApiCrudService {

    DOMAIN: string;//TODO: NEED TO BE PRIVATE TO PREVENT CHANGE ITS VALUE

    constructor(public http: Http, private C: Constants, private _storage: StorageService, ) {
        this.DOMAIN = this.C.DOMAIN;
    }

    /**
     * Allows to use http get sending only params as a unique option or
     * custom RequestOptions.
     *
     * @param endpoint
     * @param params: It should be [{param: string, val: string|number}, ...]
     * @param options
     * @returns {Observable<Response>}
     */
    get(endpoint: string, params?: any, options?: RequestOptions) {

        if (params) {
            let p = new URLSearchParams();
            params.forEach(param => { p.set(param['param'], param['val']) });
            options = new RequestOptions({params: p});
        } else if (!options) {
            options = new RequestOptions();
        }
        // console.log('ruta ',this.DOMAIN + '/' + endpoint, options);
        return this.http.get(this.DOMAIN + '/' + endpoint, options);
    }

    /**
     * Allows to use http post.
     *
     * @param endpoint
     * @param body
     * @param options
     * @returns {Observable<Response>}
     */
    post(endpoint: string, body: any, options?: RequestOptions) {

        let headers = new Headers({ 'Content-Type' : 'application/json' }); // ... Set content type to JSON
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Accept', 'application/json');

        let myoptions = new RequestOptions({ headers: headers });
        
        return this.http.post(this.DOMAIN + '/' + endpoint, body, myoptions);
    }

    /**
     * Allows to use http patch as goal to edit an specific field of
     * the endpoint.
     *
     * @param endpoint
     * @param body
     * @param options
     * @returns {Observable<Response>}
     */
    patch(endpoint: string, body: any, options?: RequestOptions) {
        return this.http.patch(this.DOMAIN + '/' + endpoint, body, options);
    }

    /**
     * Allows to use http put as goal to edit all data of the endpoint.
     *
     * @param endpoint
     * @param body
     * @param options
     * @returns {Observable<Response>}
     */
    put(endpoint: string, body?: any, options?: RequestOptions) {
        let headers = new Headers({ 'Content-Type' : 'application/json' }); // ... Set content type to JSON
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Accept', 'application/json');

        let myoptions = new RequestOptions({ headers: headers });
        
      
        return this.http.put(this.DOMAIN + '/' + endpoint, body, myoptions);
    }
    /**
     * Allows to use http delete as goal to edit all data of the endpoint.
     *
     * @param endpoint
     * @param options
     * @returns {Observable<Response>}
     */
    remove(endpoint: string, options?: RequestOptions) {
        return this.http.delete(this.DOMAIN + '/' + endpoint, options);
    }

    private getOptions(): RequestOptions {
        let auth =  new Headers({'Authorization': 'Bearer ' +  this._storage.getSession(this.C.USER_DATA_KEY)});
        let options = new RequestOptions({headers: auth});
        return options;
    }
}
