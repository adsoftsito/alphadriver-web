import { Injectable } from "@angular/core";
import { ApiCrudService } from "../../../../shared/providers/api.crud.service";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { Response} from "@angular/http";
import { EventsService } from "../../../../shared/providers/events";
import { Constants } from "../../../../shared/providers/constants";


/**
 * Created by Tech Group BWL 8/10/2018
 */

@Injectable()
export class PatrimonialSecurityService{
    //-------
    //ENDPOINTS
    ENDPOINT: string = 'units';
    ENDPOINT_SAFETIES: string = '/safeties';
    ENPOINT_SEARCH: string = '/search';
    

    //--------
    exportToExcellTable$:Subject<boolean>;
    updateTable$:Subject<boolean>;
    selectionTable$:Subject<any>;
    dataSearch$:Subject<any>;


    constructor(private api:ApiCrudService, private events:EventsService, private _C:Constants){
        this.exportToExcellTable$ = new Subject<boolean>();
        this.updateTable$ = new Subject<boolean>();
        this.selectionTable$ = new Subject<any>();
        this.dataSearch$= new Subject<any>();
        // this.getUnitsSafeties(null,null);
        // this.searchUnit("12585");
        // this.updateUnitSafetie("14",[{comment:'fuera de cobertura', motorStopStatus:true}]);
    }

    /**
     * Set status true or false to active export
     * @param status 
     */
    exportToExcell(status){
        this.exportToExcellTable$.next(status);
    }

    /**
     * Set status to update table
     * @param status 
     */
    updateTable(status){
        this.updateTable$.next(status);
    }

    /**
     * Set status to show the checks in table

     * @param status 
     */
    selectWithCheck(status){
        this.selectionTable$.next(status);        
    }
    /**
     * Value To Search
     * @param Value
     */
     search(value){
         this.dataSearch$.next(value);         
     }

     //API 
     /**
      * Retrieve the information of the vehicles to activate or deactivate engine stop, current information or bitacora.
      * @param startDate 
      * @param endDate 
      *  @returns {Observable<Response>}
      */
     getUnitsSafeties(startDate:number,endDate:number):Observable<Response>{
         let get;
        ///If the dates are not sent, current information will be obtained otherwise the log will be obtained.
         if( startDate === null && endDate === null){
            get = this.api.get(`${this.ENDPOINT}${this.ENDPOINT_SAFETIES}`);
            console.log("get curreent");
            
         }
         else if(startDate!=-1 && endDate!=-1){
            get = this.api.get(`${this.ENDPOINT}${this.ENDPOINT_SAFETIES}`,
                            [{param:'start-date',val:startDate},
                             {param:'end-date', val:endDate}
                            ]);
            console.log("Data bitácora");
            
         }
         get.map(_=>_.json());
         console.log(`${this.ENDPOINT}${this.ENDPOINT_SAFETIES}`);
         return get;
     }
     
     /**
      * Return the units according to the filter, by economic number, engine stop status or transmitter
      * @param value 
      *  @returns {Observable<Response>}
      */
     searchUnit(value):Observable<Response>{
         let get = this.api.get(`${this.ENDPOINT}${this.ENDPOINT_SAFETIES}${this.ENPOINT_SEARCH}`,[{param:'searchValue',val:value}]);
         console.log(`${this.ENDPOINT}${this.ENDPOINT_SAFETIES}${this.ENPOINT_SEARCH}`);
         get.map(_=>_.json());
        return null;
     }
     /**
      * 
      * @param idUnit 
      * @param valuesOfUnit 
      * @returns {Observable<Response>}
      */
     updateUnitSafetie(idUnit:string,valuesOfUnit:any[]):Observable<Response>{
         console.log("updateUnitSafetie");
         let patch = this.api.patch(`${this.ENDPOINT}/${idUnit}${this.ENDPOINT_SAFETIES}`,[
             {param:'comment', value: valuesOfUnit[0].comment},
             {param: 'motorStopActive',value:valuesOfUnit[0].motorStopStatus},
             {param: 'fecha',value:  '2018-10-26'}
            ]);
         console.log(patch);
        return null;
     }


}