import {Injectable} from "@angular/core";
import {Constants} from "../../../../shared/providers/constants";
import {ApiCrudService} from "../../../../shared/providers/api.crud.service";
import { Subject } from "rxjs";

/**
 * Created by Tech Group BWL on 02/10/2018.
 */
@Injectable()
export class FleetHealthService {
  ENDPOINT: string = "fleet-healt";

  constructor(private api: ApiCrudService, private C: Constants) {
      // this.api.DOMAIN = "assets/data/";//TODO: quitame cuando ya exista una api oficial
  }

  getDataForTableVehicles(params?: any) {
    // let shareGet = this.api.get(this.ENDPOINT, params).share();
    // return shareGet.map(res => res.json());
    let shareGet =[{
        "group": "MODELO T2",
        "severity": "Sin definir",
        "count": 1,
        "vehicles": 10
      },{
        "group": "GRUPO MODELO S.A.B. DE C.V",
        "severity": "Stop now",
        "count": 2,
        "vehicles": 10
      },{
        "group": "MODELO T2",
        "severity": "Service now",
        "count": 3,
        "vehicles": 10
      },{
        "group": "FREIGHTLINER",
        "severity": "information only",
        "count": 4,
        "vehicles": 10
      },{
        "group": "KENWORTH",
        "severity": "Service now",
        "count": 5,
        "vehicles": 10
      }];
    return shareGet;
  }
  getDataForTableFailures(params?: any) {
    // let shareGet = this.api.get(this.ENDPOINT, params).share();
    // return shareGet.map(res => res.json());
    let shareGet =[{
        "component": "Transmision",
        "severity": "Sin definir",
        "count": 1,
        "code": 52020103,
        "failures": 15,
      },{
        "component": "Motor",
        "severity": "Information Only",
        "count": 2,
        "code": 52354302,
        "failures": 12,
      },{
        "component": "Cabina",
        "severity": "Service Now",
        "count": 3,
        "code": 62703,
        "failures": 8,
      },{
        "component": "Cabina",
        "severity": "Service Soon",
        "count": 4,
        "code": -2555,
        "failures": 4,
      },{
        "component": "Frenos",
        "severity": "Sin definir",
        "count": 5,
        "code": 52030204,
        "failures": 3,
      }];
    return shareGet;
  }
  getDataChartGroups(params?: any) {
    let total:number = 0;
    let shareGet ={
      "labelList": [],
      "dataProvider":[{
        "value": 25,
        "label":"RED"
      },{
        "value": 19,
        "label":"CANACAR"
      },{
        "value": 2,
        "label":"CONQUEST"
      },{
        "value": 21,
        "label":"NVOACTROSS"
      },{
        "value": 25,
        "label":"DAIMELETRUCKS"
      }]
    };
    for (let i = 0; i < shareGet.dataProvider.length; i++) {
        total += shareGet.dataProvider[i].value;
    }
    shareGet.labelList.push(total);
    shareGet.labelList.push("Vehículos");
    return shareGet;
  }
  getDataChartFailures(params?: any) {
    let total:number = 0;
    let shareGet ={
      "labelList": [],
      "dataProvider":[{
        "value": 25,
        "label":"RED"
      },{
        "value": 25,
        "label":"CANACAR"
      },{
        "value": 25,
        "label":"CONQUEST"
      }]
    };
    for (let i = 0; i < shareGet.dataProvider.length; i++) {
        total += shareGet.dataProvider[i].value;
    }
    shareGet.labelList.push(total);
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
}
