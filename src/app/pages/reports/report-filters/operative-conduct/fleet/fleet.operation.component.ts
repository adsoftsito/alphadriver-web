import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AmChartsService } from '@amcharts/amcharts3-angular';

@Component({
  selector: 'report-conduct-fleet',
  templateUrl: 'fleet.operation.component.html',
  styleUrls: ['fleet.operation.component.scss']
})
export class OperativeFleetComponent implements OnInit, OnDestroy {
  @Input() dataprovider: any;
  dataSeverityFleet: Array<any>;
  stopNow: number;
  serviceNow: number;
  serviceSoon: number;
  maintenance: number; 
  disponibleUnits: number; 

  //Amcharts
  charPeriodPerformance: any;
  charComparisonRalenti: any;
  charTimeOperationRalenti: any;
  charDrivingTime: any;
  charTravelOperation: any;
  charSafetyIncidents: any;
  charSecurityIncidents: any;
  charSpeeding: any;
  chartSeverityFleet: any;

  constructor (private AmCharts: AmChartsService) {

  }
    ngOnInit() {
     
      if(this.dataprovider.performanceOperation.periodPerformance.dataProviderPeriodPerformance != null && this.dataprovider.performanceOperation.periodPerformance.title === 'Desempeño de la operación por día'){
        Promise.resolve(null).then(() => {
            this.periodPerformance(this.dataprovider.performanceOperation.periodPerformance.dataProviderPeriodPerformance);
          });
      }
        if(this.dataprovider.performanceOperation.comparisonRalenti.dataProviderComparisonRalenti != null && this.dataprovider.performanceOperation.comparisonRalenti.title === 'Comparación en Ralentí'){
          Promise.resolve(null).then(() => {
            this.comparisonRalenti(this.dataprovider.performanceOperation.comparisonRalenti.dataProviderComparisonRalenti);
          });
        }
          if(this.dataprovider.performanceOperation.timeOperationRalenti.dataProviderTimeOperationRalenti != null && this.dataprovider.performanceOperation.timeOperationRalenti.title === 'Tiempo de operación en Ralentí'){
            Promise.resolve(null).then(() => {
              this.timeOperationRalenti(this.dataprovider.performanceOperation.timeOperationRalenti.dataProviderTimeOperationRalenti);
            });        
          }
            if(this.dataprovider.performanceOperation.drivingTime.dataProviderDrivingTime != null && this.dataprovider.performanceOperation.drivingTime.title === 'Tiempo total de manejo'){
              Promise.resolve(null).then(() => {
                this.drivingTime(this.dataprovider.performanceOperation.drivingTime.dataProviderDrivingTime);
              });
            }
              if(this.dataprovider.operationTravels.travelOperation.dataProviderTravelOperation != null && this.dataprovider.operationTravels.travelOperation.title === 'Viajes de operación por semana'){
                Promise.resolve(null).then(() => {
                  this.travelOperation(this.dataprovider.operationTravels.travelOperation.dataProviderTravelOperation);
                });
              }
                if(this.dataprovider.operationTravels.fleetUtilization.dataProviderFleetUtilization != null && this.dataprovider.operationTravels.fleetUtilization.title === 'Utilización de la flota'){
                  Promise.resolve(null).then(() => {
                    this.fleetUtilization(this.dataprovider.operationTravels.fleetUtilization.dataProviderFleetUtilization);
                  });
                }
                  if(this.dataprovider.operationAlerts.safetyIncidents.dataProviderIncidents != null && this.dataprovider.operationAlerts.safetyIncidents.title === 'Total de incidencias Safety por semana'){
                    Promise.resolve(null).then(() => {
                      this.safetyIncidents(this.dataprovider.operationAlerts.safetyIncidents.dataProviderIncidents);
                    });
                  }
                    if(this.dataprovider.operationAlerts.securityIncidents.dataProviderIncidents != null && this.dataprovider.operationAlerts.securityIncidents.title === 'Total de incidencias Safety por semana'){
                      Promise.resolve(null).then(() => {
                        this.securityIncidents(this.dataprovider.operationAlerts.securityIncidents.dataProviderIncidents);
                      });
                    }
                      if(this.dataprovider.operationAlerts.speeding.dataProviderSpeeding != null && this.dataprovider.operationAlerts.speeding.title === 'Exceso de velocidad'){
                        Promise.resolve(null).then(() => {
                          this.speeding(this.dataprovider.operationAlerts.speeding.dataProviderSpeeding);
                        });
                      }
                      if(this.dataprovider.fleetHealth.severityFleet != null){

                        this.stopNow = this.dataprovider.fleetHealth.severityFleet.stopNow;
                        this.serviceNow = this.dataprovider.fleetHealth.severityFleet.serviceNow;
                        this.serviceSoon = this.dataprovider.fleetHealth.severityFleet.serviceSoon;
                        this.maintenance = this.dataprovider.fleetHealth.severityFleet.maintenance;
                        this.disponibleUnits = this.dataprovider.fleetHealth.severityFleet.disponibleUnits;

                        this.dataSeverityFleet = [
                              {
                                "category": "Stop Now",
                                "column-1": this.stopNow
                              },
                              {
                                "category": "Service Now",
                                "column-1": this.serviceNow
                              },
                              {
                                "category": "Service Soon",
                                "column-1": this.serviceSoon
                              },
                              {
                                "category": "Maintenance",
                                "column-1": this.maintenance
                              },
                              {
                                "category": "Disponible Units",
                                "column-1": this.disponibleUnits
                              }
                              ];
                              
                        Promise.resolve(null).then(() => {
                          this.severityFleet(this.dataSeverityFleet);
                        });
                      }
    }

  periodPerformance(data){
    
      this.charPeriodPerformance =  this.AmCharts.makeChart('periodPerformance',{
          "type": "serial",
          "theme": "light",
          "categoryField": "period",
          "columnSpacing": 0,
          "startDuration": 1,
          "columnWidth": 0.32,
          "colors": [
            "#c5daeb",
            "#00b1db",
          ],
          "categoryAxis": {
            "autoWrap": true,
            "gridPosition": "start",
            "position": "left",
            "axisAlpha": 0,
            "gridAlpha": 0,
            "gridThickness": 0
          },
          "graphs": [
            {
              "balloonText": "currentPerformance:[[value]]",
              "fillAlphas": 0.8,
              "id": "AmGraph-1",
              "lineAlpha": 0.2,
              "labelText": "[[value]]",
              "title": "currentPerformance",
              "type": "column",
              "valueField": "currentPerformance"
            },
            {
              "balloonText": "previousPerformance:[[value]]",
              "fillAlphas": 0.8,
              "id": "AmGraph-2",
              "lineAlpha": 0.2,
              "labelText": "[[value]]",
              "title": "previousPerformance",
              "type": "column",
              "valueField": "previousPerformance"
            }
          ],
          "legend": {
            "maxColumns": 2,
            "markerType": "circle",
            "markerSize": 10,
            "align": "center",
            "autoMargins": false,
            "valueWidth": 10
          },
          "dataProvider": data,
            "export": {
              "enabled": true
            }
        
        } );
      }
    
  comparisonRalenti(data){
    
    this.charComparisonRalenti =  this.AmCharts.makeChart('comparisonRalenti',{
      "type": "serial",
      "theme": "light",
      "categoryField": "period",
      "startDuration": 1,
      "categoryAxis": {
        "autoWrap": true,
        "gridPosition": "start",
        "position": "left",
        "axisAlpha": 0,
        "gridAlpha": 0,
        "gridThickness": 0
      },
      "colors": [
        "#b84543",
        "#6e92b6"
      ],
      "trendLines": [],
      "graphs": [
        {
          "balloonText": "[[title]] of [[period]]:[[value]]",
          "bullet": "round",
          "id": "AmGraph-1",
          "title": "eventsRalenti",
          "type": "smoothedLine",
          "valueField": "eventsRalenti"
        },
        {
          "balloonText": "[[title]] of [[period]]:[[value]]",
          "bullet": "round",
          "id": "AmGraph-2",
          "title": "costRalenti",
          "type": "smoothedLine",
          "valueField": "costRalenti"
        }
      ],
      "guides": [],
      "allLabels": [],
      "balloon": {},
      "legend": {
        "maxColumns": 2,
        "markerType": "circle",
        "markerSize": 10,
        "align": "center",
        "autoMargins": false,
        "valueWidth": 0
      },
      "dataProvider": data
    } );
  }

  timeOperationRalenti(data){
    
    this.charTimeOperationRalenti =  this.AmCharts.makeChart('timeOperationRalenti',{
        "type": "serial",
        "categoryField": "period",
        "columnSpacing": 0,
        "startDuration": 1,
        "colors": [
          "#c5daeb",
          "#00b1db",
        ],
        "categoryAxis": {
          "autoWrap": true,
          "gridPosition": "start",
          "position": "left",
          "axisAlpha": 0,
          "gridAlpha": 0,
          "gridThickness": 0
        },
        "graphs": [
          {
            "balloonText": "timeRalenti:[[value]]",
            "fillAlphas": 0.8,
            "id": "AmGraph-1",
            "lineAlpha": 0.2,
            "labelText": "[[value]]",
            "title": "timeRalenti",
            "type": "column",
            "valueField": "timeRalenti"
          },
          {
            "balloonText": "performance:[[value]]",
            "fillAlphas": 0.8,
            "id": "AmGraph-2",
            "lineAlpha": 0.2,
            "labelText": "[[value]]",
            "title": "performance",
            "type": "column",
            "valueField": "performance"
          }
        ],
        "valueAxes": [
          {
            "id": "ValueAxis-1",
          },
          {
            "id": "ValueAxis-1",
            "position": "right",
          }
        ],
        "legend": {
          "maxColumns": 2,
          "markerType": "circle",
          "markerSize": 10,
          "align": "center",
          "autoMargins": false,
          "valueWidth": 0
        },
        "dataProvider": data,
          "export": {
            "enabled": true
          }
      
    } );
  }

  drivingTime(data){
    
    this.charDrivingTime =  this.AmCharts.makeChart('drivingTime',{
      "type": "serial",
      "theme": "light",
      "colors": [
        "#c5daeb",
        "#00b1db",
      ],
      "legend": {
          "maxColumns": 5,
          "markerType": "circle",
          "markerSize": 10,
          "align": "center",
          "autoMargins": false,
          "valueWidth": -15
      },
      "dataProvider": data,
      "valueAxes": [{
          "stackType": "regular",
          "timeRalenti": 10.59,
          "drivingTime": 2.71
      }],
      "graphs": [{
          "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
          "fillAlphas": 0.8,
          "labelText": "[[value]]",
          "lineAlpha": 0.3,
          "title": "timeRalenti",
          "type": "column",
      "color": "#000000",
          "valueField": "timeRalenti"
      }, {
          "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
          "fillAlphas": 0.8,
          "labelText": "[[value]]",
          "lineAlpha": 0.3,
          "title": "drivingTime",
          "type": "column",
      "color": "#000000",
          "valueField": "drivingTime"
      }],
      "categoryField": "period",
      "categoryAxis": {
        "autoWrap": true,
        "gridPosition": "start",
        "axisAlpha": 0,
        "gridAlpha": 0,
        "gridThickness": 0
      },
      "export": {
        "enabled": true
       }
  
    } );
  }

  travelOperation(data){
    
  this.charTravelOperation =  this.AmCharts.makeChart('travelOperation',{
      "type": "serial",
      "theme": "light",
      "categoryField": "category",
      "columnSpacing": 0,
      "startDuration": 1,
      "colors": [
        "#c5daeb",
        "#00b1db",
      ],
      "categoryAxis": {
        "autoWrap": true,
        "gridPosition": "start",
        "position": "left",
        "axisAlpha": 0,
        "gridAlpha": 0,
        "gridThickness": 0
      },
      "graphs": [
        {
          "balloonText": "previous:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-1",
          "lineAlpha": 0.2,
          "labelText": "[[value]]",
          "title": "previous",
          "type": "column",
          "valueField": "previous"
        },
        {
          "balloonText": "current:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-2",
          "lineAlpha": 0.2,
          "labelText": "[[value]]",
          "title": "current",
          "type": "column",
          "valueField": "current"
        }
      ],
      "legend": {
        "maxColumns": 2,
        "markerType": "circle",
        "markerSize": 10,
        "align": "center",
        "autoMargins": false,
        "valueWidth": 10
      },
      "dataProvider": data,
        "export": {
          "enabled": true
        }
    
  } );
}

fleetUtilization(data){
     
  this.charDrivingTime =  this.AmCharts.makeChart('fleetUtilization',{
    "type": "serial",
    "theme": "light",
    "columnWidth": 0.32,
    "colors": [
      "#c5daeb",
      "#00b1db",
    ],
    "legend": {
        "maxColumns": 5,
        "markerType": "circle",
        "markerSize": 10,
        "align": "center",
        "autoMargins": false,
        "valueWidth": -15
    },
    "dataProvider": data,
    "valueAxes": [{
        "stackType": "regular",
        "start": 10.59,
        "notStart": 2.71
    }],
    "graphs": [{
        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
        "fillAlphas": 0.8,
        "labelText": "[[value]]",
        "lineAlpha": 0.3,
        "title": "start",
        "labelOffset": 20,
  			"labelPosition": "right",
        "type": "column",
    "color": "#000000",
        "valueField": "start"
    }, {
        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
        "fillAlphas": 0.8,
        "labelText": "[[value]]",
        "lineAlpha": 0.3,
        "title": "notStart",
        "labelOffset": 20,
			  "labelPosition": "right",
        "type": "column",
    "color": "#000000",
        "valueField": "notStart"
    }],
    "categoryField": "period",
    "categoryAxis": {
      "autoWrap": true,
      "gridPosition": "start",
      "axisAlpha": 0,
      "gridAlpha": 0,
      "gridThickness": 0
    },
    "export": {
      "enabled": true
     }

  } );
}

safetyIncidents(data){
    
  this.charSafetyIncidents =  this.AmCharts.makeChart('safetyIncidents',{
      "type": "serial",
      "theme": "light",
      "categoryField": "incident",
      "columnSpacing": 0,
      "startDuration": 1,
      "colors": [
        "#c5daeb",
        "#00b1db",
      ],
      "categoryAxis": {
        "autoWrap": true,
        "gridPosition": "start",
        "position": "left",
        "axisAlpha": 0,
        "gridAlpha": 0,
        "gridThickness": 0
      },
      "graphs": [
        {
          "balloonText": "previousPerformance:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-1",
          "lineAlpha": 0.2,
          "labelText": "[[value]]",
          "title": "previousPerformance",
          "type": "column",
          "valueField": "previousPerformance"
        },
        {
          "balloonText": "currentPerformance:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-2",
          "lineAlpha": 0.2,
          "labelText": "[[value]]",
          "title": "currentPerformance",
          "type": "column",
          "valueField": "currentPerformance"
        }
      ],
      "legend": {
        "maxColumns": 2,
        "markerType": "circle",
        "markerSize": 10,
        "align": "center",
        "autoMargins": false,
        "valueWidth": 10
      },
      "dataProvider": data,
        "export": {
          "enabled": true
        }
    
    } );
}

securityIncidents(data){
    
  this.charSecurityIncidents =  this.AmCharts.makeChart('securityIncidents',{
      "type": "serial",
      "theme": "light",
      "categoryField": "incident",
      "columnSpacing": 0,
      "startDuration": 1,
      "colors": [
        "#c5daeb",
        "#00b1db",
      ],
      "categoryAxis": {
        "autoWrap": true,
        "gridPosition": "start",
        "position": "left",
        "axisAlpha": 0,
        "gridAlpha": 0,
        "gridThickness": 0
      },
      "graphs": [
        {
          "balloonText": "previousPerformance:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-1",
          "lineAlpha": 0.2,
          "labelText": "[[value]]",
          "title": "previousPerformance",
          "type": "column",
          "valueField": "previousPerformance"
        },
        {
          "balloonText": "currentPerformance:[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-2",
          "lineAlpha": 0.2,
          "labelText": "[[value]]",
          "title": "currentPerformance",
          "type": "column",
          "valueField": "currentPerformance"
        }
      ],
      "legend": {
        "maxColumns": 2,
        "markerType": "circle",
        "markerSize": 10,
        "align": "center",
        "autoMargins": false,
        "valueWidth": 10
      },
      "dataProvider": data,
        "export": {
          "enabled": true
        }
    
    } );
}

speeding(data){
    
  this.charSpeeding =  this.AmCharts.makeChart('speeding',{
    "type": "serial",
    "theme": "light",
    "categoryField": "period",
    "startDuration": 1,
    "categoryAxis": {
      "autoWrap": true,
      "gridPosition": "start",
      "position": "left",
      "axisAlpha": 0,
      "gridAlpha": 0,
      "gridThickness": 0
    },
    "colors": [
      "#b84543",
      "#6e92b6"
    ],
    "trendLines": [],
    "graphs": [
      {
        "balloonText": "[[title]] of [[period]]:[[value]]",
        "bullet": "round",
        "id": "AmGraph-1",
        "title": "previousPerformance",
        "type": "smoothedLine",
        "valueField": "previousPerformance"
      },
      {
        "balloonText": "[[title]] of [[period]]:[[value]]",
        "bullet": "round",
        "id": "AmGraph-2",
        "title": "currentPerformance",
        "type": "smoothedLine",
        "valueField": "currentPerformance"
      }
    ],
    "guides": [],
    "allLabels": [],
    "balloon": {},
    "legend": {
      "maxColumns": 2,
      "markerType": "circle",
      "markerSize": 10,
      "align": "center",
      "autoMargins": false,
      "valueWidth": 0
    },
    "dataProvider": data
  } );
}

severityFleet(data){

  this.chartSeverityFleet = this.AmCharts.makeChart('severityFleet',{
    "type": "pie",
    "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
    "innerRadius": "45%",
    "colors": [
      "#FF0021",
      "#FFEF03",
      "#33DF69",
      "#7B379F",
      "#ead3d3"
    ],
    "radius": "35%",
    "labelText": " [[percents]]%",
    "titleField": "category",
    "valueField": "column-1",
    "allLabels": [],
    "balloon": {},
    // "legend": {
    //   "enabled": true,
    //   "align": "center",
    //   "markerType": "circle"
    // },
    "titles": [],
    "dataProvider": data
  });

}

    ngOnDestroy(){
      this.AmCharts.destroyChart(this.charPeriodPerformance);
      this.AmCharts.destroyChart(this.charComparisonRalenti);
      this.AmCharts.destroyChart(this.charTimeOperationRalenti);
      this.AmCharts.destroyChart(this.charDrivingTime);
      this.AmCharts.destroyChart(this.charTravelOperation);
      this.AmCharts.destroyChart(this.charSafetyIncidents);
      this.AmCharts.destroyChart(this.charSecurityIncidents);
      this.AmCharts.destroyChart(this.charSpeeding);
      this.AmCharts.destroyChart(this.chartSeverityFleet);
    }
}
