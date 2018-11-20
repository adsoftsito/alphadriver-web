import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FaultCodesService } from './fault.codes.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from "@angular/router";
import { BreadCrumManual } from "../../../../shared/providers/breadCrumbManual.service";
import {Constants} from "../../../../shared/providers/constants";
import {ChangeSpaceColsAndRowsService} from "../../../../shared/providers/changeSpaceColsAndRows.service";
import {EventsService} from "../../../../shared/providers/events";

/**
 * Created by Tech Group BWL on 01/10/2018.
 */
@Component({
  selector: 'fault-codes-component.motum-grid-container .m-cover .motum-relative-container',
  templateUrl: './fault.codes.component.html',
  styleUrls: ['./fault.codes.component.scss']
})

export class FaultCodesComponent implements OnDestroy, OnInit {
  keyFindGroup = 'group';
  dataTable: any;
  tableConfig:any ={
      "header":[
        {
          "headerName": "#",
          "field": "rank",
          "cellRenderer":"group",
          "suppressSizeToFit":true,
          "suppressMenu": true,
          "checkboxSelection": false,
          "width":80,
          "cellRendererParams": {"suppressCount": true}
        },{
          "headerName": "Transportista",
          "field": "carrier"
        },{
          "headerName": "#Económico",
          "field": "economic"
        },{
          "headerName": "Motum",
          "field": "motum"
        },{
          "headerName": "Marca",
          "field": "brandMotum"
        },{
          "headerName": "Modelo",
          "field": "modelMotum"
        },{
          "headerName": "Componente",
          "field": "component"
        },{
          "headerName": "Marca",
          "field": "brandComponent"
        },{
          "headerName": "Modelo",
          "field": "modelComponent"
        },{
          "headerName": "Severidad",
          "field": "severity"
        }
      ],
      "content":[]
  };

  configFloatButton: any;

  columnDefsSoon: Array<any>= [
      {
        "headerName": "Código",
        "field": "code",
        "cellStyle":{"text-align":"center"},
        "suppressMenu": true
      },{
        "headerName": "Descripción",
        "field": "description",
        "cellStyle":{"text-align":"center"},
        "suppressMenu": true
      }, {
        "headerName": "SPN",
        "field": "SPN",
        "cellStyle":{"text-align":"center"},
        "suppressMenu": true
      }, {
        "headerName": "PID",
        "field": "PID",
        "cellStyle":{"text-align":"center"},
        "suppressMenu": true
      }, {
        "headerName": "SID",
        "field": "SID",
        "cellStyle":{"text-align":"center"},
        "suppressMenu": true
      }, {
        "headerName": "MID",
        "field": "MID",
        "cellStyle":{"text-align":"center"},
        "suppressMenu": true
      }, {
        "headerName": "FMI",
        "field": "FMI",
        "cellStyle":{"text-align":"center"},
        "suppressMenu": true
      }, {
        "headerName": "Lámpara",
        "field": "lamp",
        "cellStyle":{"text-align":"center"},
        "suppressMenu": true
      }, {
        "headerName": "Activación",
        "field": "activation",
        "cellStyle":{"text-align":"center"},
        "suppressMenu": true
      }, {
        "headerName": "Ocurrencia",
        "field": "happenedDate",
        "cellStyle":{"text-align":"center"},
        "suppressMenu": true
      }, {
        "headerName": "Desactivación",
        "field": "deactivation",
        "cellStyle":{"text-align":"center"},
        "suppressMenu": true
      }, {
        "headerName": "Última posición",
        "field": "lastPosition",
        "cellStyle":{"text-align":"center"},
        "suppressMenu": true
      }, {
        "headerName": "Ocurrencia",
        "field": "happened",
        "cellStyle":{"text-align":"center"},
        "suppressMenu": true
      }
  ];

  configurationFilters = [{
    'key':'group',
    'label':'Grupo',
    'type': 'multiselect',
    'defaultValue':'',
      'data':[{
        'id': 1,
        'text':'test'
      },{
        'id': 2,
        'text':'test 1'
      },{
        'id': 3,
        'text':'test 2'
      },{
        'id': 4,
        'text':'test 3'
      },{
        'id': 5,
        'text':'test 4'
      },{
        'id': 6,
        'text':'test 5'
      },{
        'id': 7,
        'text':'test 6'
      },{
        'id': 8,
        'text':'test 7'
      },{
        'id': 9,
        'text':'test 8'
      }]
    },{
      'key':'vehicle',
      'label':'Vehículo',
      'type': 'multiselect',
      'defaultValue':'',
      'data':[{
          'id': 1,
          'text':'test'
        },{
          'id': 2,
          'text':'test 1'
        },{
          'id': 3,
          'text':'test 2'
        }]
    },{
      'key':'component',
      'label':'Componente',
      'type': 'multiselect',
      'defaultValue':'',
        'data':[{
          'id': 1,
          'text':'test'
        },{
          'id': 2,
          'text':'test 1'
        },{
          'id': 3,
          'text':'test 2'
        }]
    },{
      'key':'severity',
      'label':'Severidad',
      'type': 'multiselect',
      'defaultValue':'',
        'data':[{
          'id': 1,
          'text':'test'
        },{
          'id': 2,
          'text':'test 1'
        },{
          'id': 3,
          'text':'test 2'
        }]
    },{
      'key':'faultCodes',
      'label':'Código de falla',
      'type': 'multiselect',
      'defaultValue':'',
      'data':[{
          'id': 1,
          'text':'test'
        },{
          'id': 2,
          'text':'test 1'
        },{
          'id': 3,
          'text':'test 2'
        }]
    },{
      'key':'model',
      'label':'Modelo',
      'type': 'multiselect',
      'defaultValue':'',
      'data':[{
          'id': 1,
          'text':'test'
        },{
          'id': 2,
          'text':'test 1'
        },{
          'id': 3,
          'text':'test 2'
        }]
  }];

  dataParam: any;

  flagFilterin: boolean = false;
  MR_HTML_CLASSES: any;

  constructor(private faultCodesService: FaultCodesService, private route: ActivatedRoute,
    private _service: BreadCrumManual, private router: Router,
    private serviceColsAndRows:ChangeSpaceColsAndRowsService, private C: Constants, private event: EventsService) {
     this.MR_HTML_CLASSES = this.serviceColsAndRows.MR_HTML_CLASSES;
     this.event.subscribe(this.C.EVENTS_SERVICE.MONITORING_REACTION_MENU_CHANGE_CLASS_2_1, (menuName, classes) => {
       this.onChangeMenuClasses(menuName, classes);
     });
    const argCodified = this.route.snapshot.params['dataParam'];
    if (argCodified) {
      // this.dataParam = this.faultCodesService.base2Json(argCodified);
      //filter by group
      for (let i = 0; i < this.configurationFilters.length; i++) {
          if(this.configurationFilters[i].key === this.keyFindGroup) {
            this.configurationFilters[i].defaultValue = argCodified;
          }
      }
      this.dataParam = argCodified;
    }
    try {
      this.dataTable = faultCodesService.getDataForTable();
      this.tableConfig.content= faultCodesService.getDataForTable();
      this.tableConfig.content.columnDefsSoon = this.columnDefsSoon.slice();
      this.dataTable = Object.assign({}, this.tableConfig);
    }catch (e) {
      console.info (e);
    }
  }

  ngOnInit() {
    this.configFloatButton = {
      "listTitle":[],
      "iconoCambio": "motum-i tm-e97b",
      "icono": "motum-i tm-e97b",
      "direccion": "left"
    };
  }

  ngOnDestroy() {
  }

  onChangeMenuClasses(menuName, classes) {
    Promise.resolve(null).then(() => {this.MR_HTML_CLASSES[menuName] = classes;});
  }

  faultCodes(event) {
    this.router.navigate(['/', 'pages', 'maintenance', 'fleet-healt-vehicle', String(event.group)]);
  }
  filterChange(event) {
    try {
      setTimeout(() => {
        this.tableConfig.content= this.faultCodesService.getDataForTable();
        this.tableConfig.content.columnDefsSoon = this.columnDefsSoon.slice();
        this.dataTable = Object.assign({}, this.tableConfig);
      }, 100);
    }catch (e) {
      console.info (e);
    }
  }
  updateDataTable() {
    try {
      setTimeout(() => {
        this.tableConfig.content= this.faultCodesService.getDataForTable();
        this.tableConfig.content.columnDefsSoon = this.columnDefsSoon.slice();
        this.dataTable = Object.assign({}, this.tableConfig);
      }, 100);
    }catch (e) {
      console.info (e);
    }
  }
  updateDataTableByDate(event) {
    try {
      setTimeout(() => {
        this.tableConfig.content= this.faultCodesService.getDataBetweenDate(event[0],event[1]);
        this.tableConfig.content.columnDefsSoon = this.columnDefsSoon.slice();
        this.dataTable = Object.assign({}, this.tableConfig);
      }, 100);
    }catch (e) {
      console.info (e);
    }
  }

  openFiltering(flagFilteringOptions){
    this.flagFilterin = flagFilteringOptions;
      let breadcrumbLabels = ['Menu.mantenimiento', 'pages.maintenance.faultCodes','pages.monitoringreaction.filteringOptions.filteringOptions'];
      this._service.generateManualRouting(breadcrumbLabels, [], [0,0,1], []);
  }

  openOrCloseFiltering(event) {
    this.flagFilterin = !this.flagFilterin;
    if(this.flagFilterin){
      let breadcrumbLabels = ['Menu.mantenimiento', 'pages.maintenance.faultCodes','pages.monitoringreaction.filteringOptions.filteringOptions'];
      this._service.generateManualRouting(breadcrumbLabels, [], [0,0,1], []);
    }else {
      let breadcrumbLabels = ['Menu.mantenimiento', 'pages.maintenance.faultCodes'];
      this._service.generateManualRouting(breadcrumbLabels, [], [0,0], []);
    }
  }

  closeFiltering(close){
    this.flagFilterin = !this.flagFilterin;
    let breadcrumbLabels = ['Menu.mantenimiento', 'pages.maintenance.faultCodes'];
    this._service.generateManualRouting(breadcrumbLabels, [], [0,0], []);
  }
}
