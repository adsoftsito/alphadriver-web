import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FleetHealthService } from './fleet.health.service';
import {Router} from "@angular/router";
import { BreadCrumManual } from "../../../../shared/providers/breadCrumbManual.service";
import {Constants} from "../../../../shared/providers/constants";
import {ChangeSpaceColsAndRowsService} from "../../../../shared/providers/changeSpaceColsAndRows.service";
import {EventsService} from "../../../../shared/providers/events";
/**
* Created by Tech Group BWL on 01/10/2018.
*/
@Component({
  selector: 'fleet-health-component .motum-grid-container .m-cover .motum-relative-container',
  templateUrl: './fleet.health.component.html',
  styleUrls: ['./fleet.health.component.scss']
})

export class FleetHealthComponent implements OnDestroy, OnInit {
  chartFailuresTitle: string = 'Fallas';
  chartGroupsTitle: string = 'Vehículos';
  tabColumIdForHealtVehicle = 'vehicles';
  tabColumIdForFailures = 'failures';

  configFloatButton: any;
  tableVehicles:any ={
    "title" :"Vehículos clasificados por severidad",
      "header":[{
          "headerName": "#",
          "field": "count"
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
        "content":[]
      };

  tableFailures:any ={
    "title" :"Fallas clasificadas por severidad",
    "header":[{
        "headerName": "#",
        "field": "count"
      }, {
        "headerName": "Componente",
        "field": "component"
      },{
        "headerName": "Severidad",
        "field": "severity"
      }, {
        "headerName": "Código",
        "field": "code"
      }, {
        "headerName": "Fallas",
        "field": "failures",
        "cellClass": ["motum-hover-name"]
      }
    ],
    "content":[]
  };

  dataTableVehicles: any;
  dataTableFailures: any;

  chartGroupsConfiguration: any = {
    "type": "pie",
    "theme": "light",
    "addClassNames": true,
    "outlineColor": "",
    "legend":{
      "position":"right",
      "autoMargins":false,
      "marginRight": 60,
      "fontSize": 9,
      "markerSize": 9,
      "verticalGap": 1,
      "combineLegend":true
      },
    "valueField": "value",
    "titleField": "label",
    "startDuration": 0,
    "innerRadius": 27,
    "pullOutRadius": "10%",
    "marginTop": 2,
    "labelText": "",
    "allLabels": [{
      "y": "34%",
      "align": "center",
      "size": 14,
      "color": "#555"
    },{
      "y": "48%",
      "align": "center",
      "size": 9,
      "color": "#555"
    }],
    "export": {
      // "enabled": true,
      "divId": "chart-group-id"
    }
  };

  chartFailuresConfiguration: any = {
    "type": "pie",
    "theme": "light",
    "addClassNames": true,
    "outlineColor": "",
    "legend":{
      "position":"right",
      "autoMargins":false,
      "marginRight": 60,
      "fontSize": 9,
      "markerSize": 9,
      "verticalGap": 1
    },
    "valueField": "value",
    "titleField": "label",
    "startDuration": 0,
    "innerRadius": 27,
    "pullOutRadius": "10%",
    "marginTop": 2,
    "labelText": "",
    "allLabels": [{
      "y": "40%",
      "align": "center",
      "size": 14,
      "color": "#555"
    }],
    "export": {
      // "enabled": true,
      "divId": "chart-failures-id"
    }
  };

  chartGroups: any;
  chartFailures: any;

  MR_HTML_CLASSES: any;

  categories: any = [{
    "title":"Transportista",
    "key": "carrier"
    },{
    "title":"Severidad",
    "key": "severity"
    },{
    "title":"Componente",
    "key": "component"
    }];

  flagFilterin: boolean = false;

  constructor(private fleetHealthService: FleetHealthService, private router: Router, private _service: BreadCrumManual,
     private serviceColsAndRows:ChangeSpaceColsAndRowsService, private C: Constants, private event: EventsService) {
      this.MR_HTML_CLASSES = this.serviceColsAndRows.MR_HTML_CLASSES;
      this.event.subscribe(this.C.EVENTS_SERVICE.MONITORING_REACTION_MENU_CHANGE_CLASS_2_1, (menuName, classes) => {
        this.onChangeMenuClasses(menuName, classes);
      });
      try {
        this.tableVehicles.content= this.fleetHealthService.getDataForTableVehicles();
        this.dataTableVehicles = Object.assign({}, this.tableVehicles);
        this.tableFailures.content = this.fleetHealthService.getDataForTableFailures();
        this.dataTableFailures = Object.assign({}, this.tableFailures);

        this.chartGroups = fleetHealthService.getDataChartGroups();
        this.chartFailures = fleetHealthService.getDataChartFailures();
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
      this.event.unsubscribe(this.C.EVENTS_SERVICE.MONITORING_REACTION_MENU_CHANGE_CLASS_2_1);
  }

  onChangeMenuClasses(menuName, classes) {
    Promise.resolve(null).then(() => {this.MR_HTML_CLASSES[menuName] = classes;});
  }

  filterChange(event) {
    setTimeout(() => {
      try {
        this.tableVehicles.content= this.fleetHealthService.getDataForTableVehicles();
        this.dataTableVehicles = Object.assign({}, this.tableVehicles);
        this.tableFailures.content = this.fleetHealthService.getDataForTableFailures();
        this.dataTableFailures = Object.assign({}, this.tableFailures);

        this.chartGroups = this.fleetHealthService.getDataChartGroups(event);
        this.chartFailures = this.fleetHealthService.getDataChartFailures(event);
      }catch (e) {
        console.info (e);
      }
    }, 100);
  }

  healthVehicle(event) {
    if (event.column.colId === this.tabColumIdForHealtVehicle) {
      if(event.data.group){
        this.router.navigate(['/', 'pages', 'maintenance', 'fleet-healt-vehicle', String(event.data.group)]);
      }
    }
  }
  faultCodes(event) {
      if (event.column.colId === this.tabColumIdForFailures) {
        if(event.data.component){
          this.router.navigate(['/', 'pages', 'maintenance', 'fault-codes', String(event.data.component)]);
        }
      }
    }

  getDataCategoryFailures(event) {
    setTimeout(() => {
      this.tableVehicles.content= this.fleetHealthService.getDataForTableVehicles();
      this.dataTableVehicles = Object.assign({}, this.tableVehicles);
      this.tableFailures.content = this.fleetHealthService.getDataForTableFailures();
      this.dataTableFailures = Object.assign({}, this.tableFailures);

      this.chartFailures = this.fleetHealthService.getDataChartFailures(event);
      this.chartGroups = this.fleetHealthService.getDataChartGroups(event);
    }, 100);
  }

  getDataCategoryGroups(event) {
    setTimeout(() => {
      this.chartGroups = this.fleetHealthService.getDataChartGroups(event);
    }, 100);
  }

  openFiltering(flagFilteringOptions){
    this.flagFilterin = flagFilteringOptions;
      let breadcrumbLabels = ['Menu.mantenimiento', 'pages.maintenance.fleetHealth','pages.monitoringreaction.filteringOptions.filteringOptions'];
      this._service.generateManualRouting(breadcrumbLabels, [], [0,0,1], []);
  }

  openOrCloseFiltering(event) {
    this.flagFilterin = !this.flagFilterin;
    if(this.flagFilterin){
      let breadcrumbLabels = ['Menu.mantenimiento', 'pages.maintenance.fleetHealth','pages.monitoringreaction.filteringOptions.filteringOptions'];
      this._service.generateManualRouting(breadcrumbLabels, [], [0,0,1], []);
    }else {
      let breadcrumbLabels = ['Menu.mantenimiento', 'pages.maintenance.fleetHealth'];
      this._service.generateManualRouting(breadcrumbLabels, [], [0,0], []);
    }
  }

  closeFiltering(close){
    this.flagFilterin = !this.flagFilterin;
    let breadcrumbLabels = ['Menu.mantenimiento', 'pages.maintenance.fleetHealth'];
    this._service.generateManualRouting(breadcrumbLabels, [], [0,0], []);
  }
}
