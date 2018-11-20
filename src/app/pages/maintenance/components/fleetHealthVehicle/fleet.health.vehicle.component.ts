import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FleetHealthVehicleService } from './fleet.health.vehicle.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from "@angular/router";

/**
* Created by Tech Group BWL on 01/10/2018.
*/
@Component({
  selector: 'fleet-health-vehicle-component.motum-grid-container .m-cover .motum-relative-container',
  templateUrl: './fleet.health.vehicle.component.html',
  styleUrls: ['./fleet.health.vehicle.component.scss']
})

export class FleetHealthVehicleComponent implements OnDestroy, OnInit {
  keyFindGroup = 'group';

  dataTableGroupComponent: any;
  dataTableFailures: any;

  configFloatButton: any;
  tabColumIdForFailures = 'vehicles';

  chartGroupsConfiguration: any = {
    "type": "pie",
    "theme": "light",
    "addClassNames": true,
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
    },
    "exportConfig": {
      "menuTop": 0,
      "menuItems": [{
        // "icon": '/lib/3/images/export.png',
        // "format": 'png'
      }]
    }
  };

  chartGroups: any;
  dataParam: any;
  chartGroupsTitle: string = 'Grupos';
  categories: any = [
    {
      "title":"Transportista",
      "key": "carrier"
    },{
      "title":"Componente",
      "key": "component"
    },{
      "title":"Marca",
      "key": "brand"
    },{
      "title":"Modelo",
      "key": "model"
    }
  ];

  constructor(private fleetHealthVehicleService: FleetHealthVehicleService, private route: ActivatedRoute, private router: Router) {
    const argCodified = this.route.snapshot.params['dataParam'];
    if (argCodified) {
      // this.dataParam = this.fleetHealthVehicleService.base2Json(argCodified);
      //filter by group

      // setTimeout(() => {
      //   this.dataTableGroupComponent = this.fleetHealthVehicleService.getDataForTableVehiclesWithFaults(this.dataParam);
      //   this.dataTableFailures = this.fleetHealthVehicleService.getDataForTableCarrierAndComponent(this.dataParam);
      //   this.chartGroups = this.fleetHealthVehicleService.getDataChartGroups(this.dataParam);
      // }, 100);
      this.dataParam = argCodified;
    }
    this.dataTableGroupComponent = fleetHealthVehicleService.getDataForTableVehiclesWithFaults();
    this.dataTableFailures = fleetHealthVehicleService.getDataForTableCarrierAndComponent();
    this.chartGroups = fleetHealthVehicleService.getDataChartGroups();
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

  faultCodes(event) {
    if (event.column.colId === this.tabColumIdForFailures) {
        this.router.navigate(['/', 'pages', 'maintenance', 'fault-codes', String(event.group)]);
    }
  }
  filterChange(event) {
    setTimeout(() => {
      this.dataTableGroupComponent = this.fleetHealthVehicleService.getDataForTableVehiclesWithFaults(event);
      this.dataTableFailures = this.fleetHealthVehicleService.getDataForTableCarrierAndComponent(event);
      this.chartGroups = this.fleetHealthVehicleService.getDataChartGroups(event);
    }, 100);
  }

}
