import {Injectable} from "@angular/core";
import {Constants} from "../../shared/providers/constants";
import {EventsService} from "../../shared/providers/events";
import {ApiCrudService} from "../../shared/providers/api.crud.service";
import {Response} from "@angular/http";
import {Observable, Subject} from "rxjs";
/**
 * Created by Tech Group BWL on 09/07/2018.
 */

@Injectable()
export class MonitoringReactionService {

  // ----------
  // ENDPOINTS
  // ----------
  ENDPOINT: string = 'monitoring-reaction';
  //ENDPOINT_UNITS: string = '/units';
  ENDPOINT_UNITS: string = 'units';
  ENDPOINT_SEARCH: string  = '/search';
  ENDPOINT_SEARCHUNIT_DETAIL:string = "/details";
  ENDPOINT_SEARCHUNIT_OPERATOR:string = "/operators";
  ENDPOINT_SEARCHUNIT_TRAVEL:string = "/travels";
  ENDPOINT_SEARCHUNIT_MAINTENANCES:string = "/maintenances";
  ENDPOINT_SEARCHUNIT_ALERTS:string ="/alerts";
  ENDPOINT_SEARCHUNIT_SETTINGS:string = "/settings";
  ENDPOINT_SEARCHUNIT_SENSORS:string = "/sensors";

  ENDPOINT_INTEREST_POINTS:string = "interestPoints";  ENDPOINT_GROUPS:string = "/groups";
  //--------
  vehicleSelectedSubject$:Subject<any>;

  constructor(
    private C: Constants,
    private events: EventsService,
    private api: ApiCrudService
  ) { 
    this.vehicleSelectedSubject$ = new Subject<any>();
   }

  /**
   * Retrieve all units from API that an user can monitoring
   *
   * @param filter
   * @returns {Observable<Response>}
   */
  retrieveUnits(filter?: string): Observable<Response> {
    let get = this.api.get(`${this.ENDPOINT_UNITS}`);

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
    let found=this.api.get(`${this.ENDPOINT_UNITS}${this.ENDPOINT_SEARCH}`,[{param:'q',val:find}]);
    
    found.map(_=>_.json());
    return found;
  }
 /**
   * set id  of Vehicle selected///test
   * @param numEconimic
   */
  idVehicleSelected(numEconomic){
    this.vehicleSelectedSubject$.next(numEconomic);
  }
  /**
   *Retrieve information about vehicle tab like groups, sensors, position,vehicle information.
   * @param idVehicle
   * @return {Observable<Response>}
   */
  unitDetailPosition(idVehicle):Observable<Response>{
    let get = this.api.get(`${this.ENDPOINT_UNITS}/${idVehicle}${this.ENDPOINT_SEARCHUNIT_DETAIL}`);
    get.map(_=>_.json());
    return get;
  }
  /**
   * Get information about operator like name, contact, address, assigned unit.
   * @param idVehicle
   * @return {Observable<Response>}
   */
  unitDetailOperator(idVehicle){
    let get = this.api.get(`${this.ENDPOINT_UNITS}/${idVehicle}${this.ENDPOINT_SEARCHUNIT_OPERATOR}`)
    get.map(_=>_.json());
    return get;
  }
  /**
   *Get information about unit travel like timeline, origin, destination, TEA, so on.
   * @param idVehicle 
   * @return {Observable<Response>}
   */
  unitDetailTravel(idVehicle){
    let get = this.api.get(`${this.ENDPOINT_UNITS}/${idVehicle}${this.ENDPOINT_SEARCHUNIT_TRAVEL}`);;
    get.map(_=>_.json());
    return get;
  }
  /**
   * Get information about unit travel like mechanical information and vehicular health.
   * @param idVehicle 
   * @return {Observable<Response>}
   */
  unitDetailMaintenances(idVehicle){
    let get = this.api.get(`${this.ENDPOINT_UNITS}/${idVehicle}${this.ENDPOINT_SEARCHUNIT_MAINTENANCES}`);
    get.map(_=>_.json());
    return get;
  }
  /**
   * Get information about alerts that an user has committed.
   * @param idVehicle 
   * @return {Observable<Response>}
   */
  unitDetailAlerts(idVehicle){
    let get =this.api.get(`${this.ENDPOINT_UNITS}/${idVehicle}${this.ENDPOINT_SEARCHUNIT_ALERTS}`);
    get.map(_=>_.json());
    return get;
  }

  /**
   * Get information about settings that a unit has.
   * @param idVehicle 
   * @return {Observable<Response>}
   */
  unitDetailSettings(idVehicle){
    let get = this.api.get(`${this.ENDPOINT_UNITS}/${idVehicle}${this.ENDPOINT_SEARCHUNIT_SETTINGS}`);
    get.map(_=>_.json());
    return get;
  }
  /**
   *Get information about sensors like device name, sensor type, so on.
   * @param idVehicle 
   * @return {Observable<Response>}
   */
  unitDetailSensors(idVehicle){
    let get = this.api.get(`${this.ENDPOINT_UNITS}/${idVehicle}${this.ENDPOINT_SEARCHUNIT_SENSORS}`);
    get.map(_=>_.json());
    return get;
  }

  /**
   * You can retrieve all interest point that an specific user will monitoring.
   * 
   */
  getInterestPoints():Observable<Response>{
   let get = this.api.get(`${this.ENDPOINT_INTEREST_POINTS}`);
   get.map(_=>_.json());
    return  get;
  }

  /**
   * You can retrieve all groups that an specific user will monitoring.
   * @return {Observable<Response>}
   */
  getGroups():Observable<Response>{
    let get = this.api.get(`${this.ENDPOINT_GROUPS}`);
    get.map(_=>_.json());
    return get;
  }
}
