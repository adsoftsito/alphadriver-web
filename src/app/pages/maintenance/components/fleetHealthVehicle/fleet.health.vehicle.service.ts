import {Injectable} from "@angular/core";
import {Constants} from "../../../../shared/providers/constants";
import {ApiCrudService} from "../../../../shared/providers/api.crud.service";
import { Subject } from "rxjs";

/**
 * Created by Tech Group BWL on 02/10/2018.
 */
@Injectable()
export class FleetHealthVehicleService {
  ENDPOINT: string = "fleet-healt";

  constructor(private api: ApiCrudService, private C: Constants) {
      // this.api.DOMAIN = "assets/data/";//TODO: quitame cuando ya exista una api oficial
  }

  getDataForTableVehiclesWithFaults(params?: any) {
    // let shareGet = this.api.get(this.ENDPOINT, params).share();
    // return shareGet.map(res => res.json());
    let shareGet ={
    "title" :"Conteo de vehículos con fallas",
    "header":[{
        "headerName": "#",
        "field": "rank"
      }, {
        "headerName": "Grupo",
        "field": "group"
      },{
        "headerName": "Severidad",
        "field": "severity"
      }, {
        "headerName": "Vehículos",
        "field": "vehicles",
        "cellClass": ["motum-hover-name"]
      }],
      "content":[{
        "group": "MODELO T2",
        "severity": "Sin definir",
        "rank": 1,
        "vehicles": this.getRandomInt(10)
      },{
        "group": "GRUPO MODELO S.A.B. DE C.V",
        "severity": "Stop now",
        "rank": 2,
        "vehicles": this.getRandomInt(10)
      }]
    };
    return shareGet;
  }
  getDataForTableCarrierAndComponent(params?: any) {
    // let shareGet = this.api.get(this.ENDPOINT, params).share();
    // return shareGet.map(res => res.json());
    let shareGet ={
    "title" :"Agrupacion por transportista y componente",
    "header":[{
        "headerName": "Transportista",
        "field": "carrier",
        "cellRenderer":"group",
        "suppressSizeToFit":true,
        "suppressMenu": true,
        "checkboxSelection": false,
        "cellRendererParams": {"suppressCount": true}
      },{
        "headerName": "Vehículos con fallas",
        "field": "vehicles"
      }],
      "content":[{
        "carrier": "DAIMLERTRUCKS",
        "vehicles": this.getRandomInt(15),
        "columnDefsSoon":[{
            "headerName": "Componente",
            "field": "component",
            "cellStyle":{"text-align":"center"},
            "suppressMenu": true
          },{
            "headerName": "Marca",
            "field": "brand",
            "cellStyle":{"text-align":"center"},
            "suppressMenu": true
          }, {
            "headerName": "Modelo",
            "field": "model",
            "cellStyle":{"text-align":"center"},
            "suppressMenu": true
          }, {
            "headerName": "Stop now",
            "field": "stopNow",
            "cellStyle":{"text-align":"center"},
            "suppressMenu": true
          }, {
            "headerName": "Service now",
            "field": "serviceNow",
            "cellStyle":{"text-align":"center"},
            "suppressMenu": true
          }, {
            "headerName": "Service soon",
            "field": "serviceSoon",
            "cellStyle":{"text-align":"center"},
            "suppressMenu": true
          }, {
            "headerName": "Information only",
            "field": "informationOnly",
            "cellStyle":{"text-align":"center"},
            "suppressMenu": true
          }, {
            "headerName": "Sin definir",
            "field": "undefined",
            "cellStyle":{"text-align":"center"},
            "suppressMenu": true
          }
        ],
        "detail":[{
            "component": "Cabina",
            "brand": "Sin definir",
            "model" : "Cascadia",
            "stopNow": this.getRandomInt(25),
            "serviceNow": this.getRandomInt(25),
            "serviceSoon": this.getRandomInt(15),
            "informationOnly": this.getRandomInt(15),
            "undefined": this.getRandomInt(15)
          },{
            "component": "Motor",
            "brand": "Sin definir",
            "model" : "T800",
            "stopNow": this.getRandomInt(25),
            "serviceNow": this.getRandomInt(25),
            "serviceSoon": this.getRandomInt(15),
            "informationOnly": this.getRandomInt(15),
            "undefined": this.getRandomInt(15)
          },{
            "component": "Frenos",
            "brand": "Information Only",
            "model" : "Cascadia",
            "stopNow": this.getRandomInt(25),
            "serviceNow": this.getRandomInt(25),
            "serviceSoon": this.getRandomInt(15),
            "informationOnly": this.getRandomInt(15),
            "undefined": this.getRandomInt(15)
          }
        ]
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
  getDataChartFailures(params?: any) {
    let total:number = 0;
    let shareGet ={
      "labelList": [],
      "dataProvider":[{
        "value": this.getRandomInt(25),
        "label":"RED"
      },{
        "value": this.getRandomInt(25),
        "label":"CANACAR"
      },{
        "value": this.getRandomInt(25),
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
