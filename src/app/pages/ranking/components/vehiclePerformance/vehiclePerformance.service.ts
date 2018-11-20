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
export class VehiclePerformanceService{

    // ----------
    // ENDPOINTS
    // ----------
    ENDPOINT: string = '/ranking';
    ENDPOINT_PERFORMANCE: string = '/performance';
    ENDPOINT_RANKING: string = '/vehicles/performance';
    ENDPOINT_SEARCH: string  = '/search';
    ENDPOINT_PERFORMANCE_CHART = '/vehicles/ranking/performance';
    ENDPOINT_VEHICLES = "/vehicles";


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
    retrieveVehicles(): Observable<Response> {
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
    searchVehicles(find:string):Observable<Response>{
        let found=this.api.get(`${this.ENDPOINT}${this.ENDPOINT_RANKING}${this.ENDPOINT_SEARCH}`,[{param:'q',val:find}]);
        found.map(_=>_.json());
        return found;
    }

    retrieveCharts(): Observable<Response> {
        let get = this.api.get(this.ENDPOINT_PERFORMANCE_CHART);
        get.map(_ => _.json());
        return get;
    }
    retrieveChartsById(id: number): Observable<Response> {
        let get = this.api.get(`${this.ENDPOINT_VEHICLES}${'/'}${id}${this.ENDPOINT}${this.ENDPOINT_PERFORMANCE}`);
        get.map(_ => _.json());
        return get;
    }
}