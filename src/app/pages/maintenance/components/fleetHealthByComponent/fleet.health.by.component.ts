import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FleetHealthByComponentService } from './fleet.health.by.component.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from "@angular/router";
/**
 * Created by Tech Group BWL on 01/10/2018.
 */
@Component({
  selector: 'fleet-health-by-component.motum-grid-container .m-cover .motum-relative-container',
  templateUrl: './fleet.health.by.component.html',
  styleUrls: ['./fleet.health.by.component.scss']
})

export class FleetHealthByComponent implements OnDestroy, OnInit {
  keyFindGroup = 'group';

  configFloatButton: any;

  dataTableGroupComponent: any;
  dataTableFailures: any;

  categories: any = [
    {
    "title":"Marca",
    "key": "brand"
    },{
    "title":"Modelo",
    "key": "model"
    },{
    "title":"Código",
    "key": "code"
    },{
    "title":"Severidad",
    "key": "severity"
    }
  ];

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

  constructor(private fleetHealthVehicleService: FleetHealthByComponentService, private route: ActivatedRoute, private router: Router) {
    const argCodified = this.route.snapshot.params['dataParam'];
    if (argCodified) {
      // this.dataParam = this.fleetHealthVehicleService.base2Json(argCodified);
      //filter by group

      // setTimeout(() => {
      //   this.dataTableGroupComponent = this.fleetHealthVehicleService.getDataForTableCountFailures(this.dataParam);
      //   this.dataTableFailures = this.fleetHealthVehicleService.getDataForTableFailures(this.dataParam);
      //   this.chartGroups = this.fleetHealthVehicleService.getDataChartGroups(this.dataParam);
      // }, 100);
      this.dataParam = argCodified;
    }
    this.dataTableGroupComponent = fleetHealthVehicleService.getDataForTableCountFailures();
    this.dataTableFailures = fleetHealthVehicleService.getDataForTableFailures();
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
    this.router.navigate(['/', 'pages', 'maintenance', 'fault-codes', String(event.group)]);
    // .then(nav => {
    //     console.info(event);
    //   //console.log(nav); // true if navigation is successful
    // }, err => {
    //   //console.log(err) // when there's an error
    // });
  }
  filterChange(event) {
    setTimeout(() => {
      this.dataTableGroupComponent = this.fleetHealthVehicleService.getDataForTableCountFailures(event);
      this.dataTableFailures = this.fleetHealthVehicleService.getDataForTableFailures(event);
      this.chartGroups = this.fleetHealthVehicleService.getDataChartGroups(event);
    }, 100);
  }

}
