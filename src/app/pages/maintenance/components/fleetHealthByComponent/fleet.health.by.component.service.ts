import {Injectable} from "@angular/core";
import {Constants} from "../../../../shared/providers/constants";
import {ApiCrudService} from "../../../../shared/providers/api.crud.service";
import { Subject } from "rxjs";

/**
 * Created by Tech Group BWL on 02/10/2018.
 */
@Injectable()
export class FleetHealthByComponentService {
  ENDPOINT: string = 'fleet-healt';

  constructor(private api: ApiCrudService, private C: Constants) {
      // this.api.DOMAIN = 'assets/data/';//TODO: quitame cuando ya exista una api oficial
  }

  getDataForTableCountFailures(params?: any) {
    // let shareGet = this.api.get(this.ENDPOINT, params).share();
    // return shareGet.map(res => res.json());
    let shareGet ={
    "title" :"Conteo de fallas",
    "header":[{
        "headerName": "#",
        "field": "number"
      }, {
        "headerName": "Grupo",
        "field": "group"
      },{
        "headerName": "Severidad",
        "field": "severity"
      }, {
        "headerName": "Vehículos",
        "field": "vehicles",
        "cellClass": ['motum-hover-name']
      }],
      "content":[{
        "group": "MODELO T2",
        "severity": "Sin definir",
        "number": 1,
        "vehicles": this.getRandomInt(10)
      },{
        "group": "GRUPO MODELO S.A.B. DE C.V",
        "severity": "Stop now",
        "number": 2,
        "vehicles": this.getRandomInt(10)
      }]
    };
    return shareGet;
  }
  getDataForTableFailures(params?: any) {
    // let shareGet = this.api.get(this.ENDPOINT, params).share();
    // return shareGet.map(res => res.json());
    let shareGet ={
    "title" :"Agrupación por grupo y componente",
    "header":[{
        "headerName": "Componente",
        "field": "component"
      },{
        "headerName": "Marca",
        "field": "severity"
      }, {
        "headerName": "Modelo",
        "field": "code"
      }, {
        "headerName": "Stop now",
        "field": "code"
      }, {
        "headerName": "Service soon",
        "field": "code"
      }, {
        "headerName": "Information only",
        "field": "code"
      }, {
        "headerName": "Sin definir",
        "field": "code"
      }, {
        "headerName": "Vehículos",
        "field": "code"
      }],
      "content":[{
        "component": "Cabina",
        "severity": "Sin definir",
        "number": 1,
        "code": this.getRandomInt(2555),
        "failures": this.getRandomInt(15),
      },{
        "component": "Motor",
        "severity": "Sin definir",
        "number": 2,
        "code": this.getRandomInt(2555),
        "failures": this.getRandomInt(12),
      },{
        "component": "Frenos",
        "severity": "Information Only",
        "number": 3,
        "code": this.getRandomInt(2555),
        "failures": this.getRandomInt(8),
      },{
        "component": "Motor",
        "severity": "Service Now",
        "number": 4,
        "code": this.getRandomInt(2555),
        "failures": this.getRandomInt(4),
      },{
        "component": "Cabina",
        "severity": "Sin definir",
        "number": 5,
        "code": this.getRandomInt(2555),
        "failures": this.getRandomInt(3),
      }]
    };
    return shareGet;
  }
  getDataChartGroups(params?: any) {
    let total:number = 0;
    let shareGet ={
      "labelList": [],
      "dataProvider":[{
        "value": this.getRandomInt(25),
        "label":"RED"
      },{
        "value": this.getRandomInt(19),
        "label":"CANACAR"
      },{
        "value": this.getRandomInt(2),
        "label":"CONQUEST"
      },{
        "value": this.getRandomInt(21),
        "label":"NVOACTROSS"
      },{
        "value": this.getRandomInt(25),
        "label":"DAIMELETRUCKS"
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
