import {Injectable} from "@angular/core";
import {Constants} from "../../../../shared/providers/constants";
import {EventsService} from "../../../../shared/providers/events";
import {ApiCrudService} from "../../../../shared/providers/api.crud.service";
import {Response} from "@angular/http";
import {Observable} from "rxjs";
/**
 * Created by Tech Group BWL on 08/10/2018.
 */

@Injectable()
export class UsersService {

    // ----------
    // ENDPOINTS
    // ----------
    ENDPOINT: string = '/ranking';
    ENDPOINT_RANKING: string = '/users';
    ENDPOINT_SEARCH: string  = '/search';

    constructor(
        private C: Constants,
        private events: EventsService,
        private api: ApiCrudService
    ) {}

    /**
     * Retrieve all users from API
     *
     * @param filter
     * @returns {Observable<Response>}
     */
    retrieveUsers(filter?: string): Observable<Response> {
        let get = this.api.get(`${this.ENDPOINT}${this.ENDPOINT_RANKING }`);
        get.map(_ => _.json());
        return get;
    }

    /**
     *Search user from API
     *
     * @param find
     * @returns {Observable<Response>}
     */
    searchUsers(find:string):Observable<Response>{
        let found=this.api.get(`${this.ENDPOINT}${this.ENDPOINT_RANKING}${this.ENDPOINT_SEARCH}`,[{param:'q',val:find}]);
        found.map(_=>_.json());
        return found;
    }
}