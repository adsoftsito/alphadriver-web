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
export class DriversService {

    // ----------
    // ENDPOINTS
    // ----------
    ENDPOINT: string = '/ranking';
    ENDPOINT_RANKING: string = '/operators';

    ENDPOINT_INCIDENTS: string = '/incidents';
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
    retrieveDrivers(): Observable<Response> {
        let get = this.api.get(`${this.ENDPOINT}${this.ENDPOINT_RANKING }`);
        get.map(_ => _.json());
        return get;
    }



    retrieveIncidents(): Observable<Response>{
        let get = this.api.get(`${this.ENDPOINT}${this.ENDPOINT_RANKING }${this.ENDPOINT_INCIDENTS}`);
        get.map(_=> _.json());
        return get;
    }

    retrieveIncidentsById(id: number): Observable<Response>{
        let get = this.api.get(`${this.ENDPOINT}${this.ENDPOINT_RANKING }${'/'}${id}${this.ENDPOINT_INCIDENTS}`);
        get.map(_=> _.json());
        return get;
    }
}