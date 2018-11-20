import {Injectable} from "@angular/core";
import {Constants} from "../../../../shared/providers/constants";
import {ApiCrudService} from "../../../../shared/providers/api.crud.service";
import { Subject } from "rxjs";
import * as moment from 'moment';
import { RequestOptions } from '@angular/http';

/**
* Created by Tech Group BWL on 02/10/2018.
*/
@Injectable()
export class FaultCodesService {
  ENDPOINT: string = 'fault-codes';

  constructor(private api: ApiCrudService, private C: Constants) {
    // this.api.DOMAIN = 'assets/data/';//TODO: quitame cuando ya exista una api oficial
  }

  getDataForTable(params?: any) {
    // let shareGet = this.api.get(this.ENDPOINT, params).share();
    // return shareGet.map(res => res.json());
    let shareGet =
    [
      {
        "rank": 1,
        "carrier": "DAIMLERTRUCKS",
        "economic": "37802",
        "motum": "MOT-037802",
        "brandMotum": "FREIGHTLINER",
        "modelMotum": "CASCADIA",
        "component": "Motor",
        "brandComponent": "Detroit Diesel",
        "modelComponent": "Generico",
        "severity": "Information Only",
        "detail":[
          {
            "code": this.getRandomInt(2555),
            "description": "Este diagnóstico ...",
            "SPN": this.getRandomInt(152),
            "PID": this.getRandomInt(152),
            "SID": this.getRandomInt(152),
            "MID": this.getRandomInt(152),
            "FMI": this.getRandomInt(152),
            "lamp": "Y",
            "activation": "2018/09/25 - 18:30:00 h",
            "happenedDate": "2018/09/25 - 18:30:00 h",
            "deactivation": "-",
            "lastPosition": "2018/09/25 - 18:30:00 h",
            "happened": this.getRandomInt(12)
          }
        ]
      },{
        "rank": 2,
        "carrier": "DAIMLERTRUCKS",
        "economic": "37802",
        "motum": "MOT-037802",
        "brandMotum": "FREIGHTLINER",
        "modelMotum": "CASCADIA",
        "component": "Motor",
        "brandComponent": "Detroit Diesel",
        "modelComponent": "Generico",
        "severity": "Information Only",
        "detail":[
          {
            "code": this.getRandomInt(2555),
            "description": "Este diagnóstico ...",
            "SPN": this.getRandomInt(152),
            "PID": this.getRandomInt(152),
            "SID": this.getRandomInt(152),
            "MID": this.getRandomInt(152),
            "FMI": this.getRandomInt(152),
            "lamp": "Y",
            "activation": "2018/09/25 - 18:30:00 h",
            "happenedDate": "2018/09/25 - 18:30:00 h",
            "deactivation": "-",
            "lastPosition": "2018/09/25 - 18:30:00 h",
            "happened": this.getRandomInt(12)
          }
        ]
      },{
        "rank": 3,
        "carrier": "DAIMLERTRUCKS",
        "economic": "37802",
        "motum": "MOT-037802",
        "brandMotum": "FREIGHTLINER",
        "modelMotum": "CASCADIA",
        "component": "Motor",
        "brandComponent": "Detroit Diesel",
        "modelComponent": "Generico",
        "severity": "Information Only",
        "detail":[
          {
            "code": this.getRandomInt(2555),
            "description": "Este diagnóstico ...",
            "SPN": this.getRandomInt(152),
            "PID": this.getRandomInt(152),
            "SID": this.getRandomInt(152),
            "MID": this.getRandomInt(152),
            "FMI": this.getRandomInt(152),
            "lamp": "Y",
            "activation": "2018/09/25 - 18:30:00 h",
            "happenedDate": "2018/09/25 - 18:30:00 h",
            "deactivation": "-",
            "lastPosition": "2018/09/25 - 18:30:00 h",
            "happened": this.getRandomInt(12)
          }
        ]
      },{
        "rank": 4,
        "carrier": "DAIMLERTRUCKS",
        "economic": "37802",
        "motum": "MOT-037802",
        "brandMotum": "FREIGHTLINER",
        "modelMotum": "CASCADIA",
        "component": "Motor",
        "brandComponent": "Detroit Diesel",
        "modelComponent": "Generico",
        "severity": "Information Only",
        "detail":[
          {
            "code": this.getRandomInt(2555),
            "description": "Este diagnóstico ...",
            "SPN": this.getRandomInt(152),
            "PID": this.getRandomInt(152),
            "SID": this.getRandomInt(152),
            "MID": this.getRandomInt(152),
            "FMI": this.getRandomInt(152),
            "lamp": "Y",
            "activation": "2018/09/25 - 18:30:00 h",
            "happenedDate": "2018/09/25 - 18:30:00 h",
            "deactivation": "-",
            "lastPosition": "2018/09/25 - 18:30:00 h",
            "happened": this.getRandomInt(12)
          }
        ]
      }
    ];
    return shareGet;
  }
  getDataBetweenDate(dateInit, dateFinal) {
    let inicial = this.getDateMoment(dateInit);
    let final = this.getDateMoment(dateFinal);
    let params = {
        dateInit: inicial,
        dateFinal: dateFinal
    };
    // let shareGet = this.api.get(this.ENDPOINT, { params: params }).share();
    // return shareGet.map(res => res.json());
    let shareGet =
    [
      {
        "rank": 1,
        "carrier": "DAIMLERTRUCKS",
        "economic": "37802",
        "motum": "MOT-037802",
        "brandMotum": "FREIGHTLINER",
        "modelMotum": "CASCADIA",
        "component": "Motor",
        "brandComponent": "Detroit Diesel",
        "modelComponent": "Generico",
        "severity": "Information Only",
        "detail":[
          {
            "code": this.getRandomInt(2555),
            "description": "Este diagnóstico ...",
            "SPN": this.getRandomInt(152),
            "PID": this.getRandomInt(152),
            "SID": this.getRandomInt(152),
            "MID": this.getRandomInt(152),
            "FMI": this.getRandomInt(152),
            "lamp": "Y",
            "activation": "2018/09/25 - 18:30:00 h",
            "happenedDate": "2018/09/25 - 18:30:00 h",
            "deactivation": "-",
            "lastPosition": "2018/09/25 - 18:30:00 h",
            "happened": this.getRandomInt(12)
          }
        ]
      },{
        "rank": 2,
        "carrier": "DAIMLERTRUCKS",
        "economic": "37802",
        "motum": "MOT-037802",
        "brandMotum": "FREIGHTLINER",
        "modelMotum": "CASCADIA",
        "component": "Motor",
        "brandComponent": "Detroit Diesel",
        "modelComponent": "Generico",
        "severity": "Information Only",
        "detail":[
          {
            "code": this.getRandomInt(2555),
            "description": "Este diagnóstico ...",
            "SPN": this.getRandomInt(152),
            "PID": this.getRandomInt(152),
            "SID": this.getRandomInt(152),
            "MID": this.getRandomInt(152),
            "FMI": this.getRandomInt(152),
            "lamp": "Y",
            "activation": "2018/09/25 - 18:30:00 h",
            "happenedDate": "2018/09/25 - 18:30:00 h",
            "deactivation": "-",
            "lastPosition": "2018/09/25 - 18:30:00 h",
            "happened": this.getRandomInt(12)
          }
        ]
      },{
        "rank": 3,
        "carrier": "DAIMLERTRUCKS",
        "economic": "37802",
        "motum": "MOT-037802",
        "brandMotum": "FREIGHTLINER",
        "modelMotum": "CASCADIA",
        "component": "Motor",
        "brandComponent": "Detroit Diesel",
        "modelComponent": "Generico",
        "severity": "Information Only",
        "detail":[
          {
            "code": this.getRandomInt(2555),
            "description": "Este diagnóstico ...",
            "SPN": this.getRandomInt(152),
            "PID": this.getRandomInt(152),
            "SID": this.getRandomInt(152),
            "MID": this.getRandomInt(152),
            "FMI": this.getRandomInt(152),
            "lamp": "Y",
            "activation": "2018/09/25 - 18:30:00 h",
            "happenedDate": "2018/09/25 - 18:30:00 h",
            "deactivation": "-",
            "lastPosition": "2018/09/25 - 18:30:00 h",
            "happened": this.getRandomInt(12)
          }
        ]
      },{
        "rank": 4,
        "carrier": "DAIMLERTRUCKS",
        "economic": "37802",
        "motum": "MOT-037802",
        "brandMotum": "FREIGHTLINER",
        "modelMotum": "CASCADIA",
        "component": "Motor",
        "brandComponent": "Detroit Diesel",
        "modelComponent": "Generico",
        "severity": "Information Only",
        "detail":[
          {
            "code": this.getRandomInt(2555),
            "description": "Este diagnóstico ...",
            "SPN": this.getRandomInt(152),
            "PID": this.getRandomInt(152),
            "SID": this.getRandomInt(152),
            "MID": this.getRandomInt(152),
            "FMI": this.getRandomInt(152),
            "lamp": "Y",
            "activation": "2018/09/25 - 18:30:00 h",
            "happenedDate": "2018/09/25 - 18:30:00 h",
            "deactivation": "-",
            "lastPosition": "2018/09/25 - 18:30:00 h",
            "happened": this.getRandomInt(12)
          }
        ]
      }
    ];
    return shareGet;
  }
  getRandomInt(max) {
    return (Math.floor(Math.random() * Math.floor(max))) + 1;
  }

  json2Base64 (decoded: any): string {
    return btoa(JSON.stringify(decoded));
  }

  base2Json (encoded: string): any {
    return JSON.parse(atob(encoded));
  }
  getDateMoment(params) {
    return  moment(params).format('YYYY/MM/DD');;
  }
}
