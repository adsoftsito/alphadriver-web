import {Injectable} from "@angular/core";
import {Constants} from "../../shared/providers/constants";
import {EventsService} from "../../shared/providers/events";
import {ApiCrudService} from "../../shared/providers/api.crud.service";
import {Response} from "@angular/http";
import {Observable} from "rxjs";
/**
 * Created by Tech Group BWL on 09/07/2018.
 */

@Injectable()
export class DashboardService {

  // ----------
  // ENDPOINTS
  // ----------
  ENDPOINT: string = 'monitoring-reaction';
  ENDPOINT_UNITS: string = '/units';
  ENDPOINT_SEARCH: string  = '/search';

  constructor(
    private C: Constants,
    private events: EventsService,
    private api: ApiCrudService
  ) {}

  /**
   * Retrieve all units from API that an user can monitoring
   *
   * @param filter
   * @returns {Observable<Response>}
   */
  retrieveUnits(filter?: string): Observable<Response> {
    let get = this.api.get(`${this.ENDPOINT}${this.ENDPOINT_UNITS}`);
    get.map(_ => _.json());
    return get;
  }

  /**
  *Search unit from API for an user can monitoring
  *
  * @param find
  * @returns {Observable<Response>}
  */
  searchUnits(find:string):Observable<Response>{
    let found=this.api.get(`${this.ENDPOINT}${this.ENDPOINT_UNITS}${this.ENDPOINT_SEARCH}`,[{param:'q',val:find}]);
    found.map(_=>_.json());
    return found;
  }
}