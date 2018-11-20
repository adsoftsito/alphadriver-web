import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { DashboardService } from "../../dashboard.service";

@Component({
  selector: 'motum-group-use',
  templateUrl: './groupUse.component.html',
  styleUrls: ['./groupUse.component.scss']
})
export class GroupUseComponent implements OnInit {
  @Input() dataGroupUse;
  @Output() closeDetails = new EventEmitter<any>();
  btnGroup = [];
  btnTime = [];
  data: Array<any> = [];
  idGroupVehicle = 'gv';
  idWeekMonthYear = 'wmy';
  showTools: boolean = false;
  
  //Amcharts
  chartMileageTrend: any;
  chartKilometersTraveled: any;

  constructor(private AmCharts: AmChartsService, private service: DashboardService) { }

  search = 'pages.userControl.clients.search';
  
  ngOnInit() {

    this.loadDashletDetails();

    if(this.dataGroupUse[0].type === 'serial'){
      
      Promise.resolve(null).then(() => {
        this.mileageTrend(this.dataGroupUse[0].dataChart);
      });
    }
      if(this.dataGroupUse[1].type === 'bar'){
        Promise.resolve(null).then(() => {
          this.kilometersTraveled(this.dataGroupUse[1].dataChart);
        });
      }

    this.btnGroup = [{
        label: 'Grupo',
        selected: 'active'
        },
        {
        label: 'Vehículos',
        selected: '' 
      }];
    this.btnTime = [{
        label: 'Semana',
        selected: 'active'
        },
        {
        label: 'Mes',
        selected: '' 
      },
      {
        label: 'Año',
        selected: '' 
    }];

  }

  loadDashletDetails(){

      this.service.retrieveUnits()
        .subscribe(
          res => {
  
              const body = JSON.parse(res['_body']);
              this.data = body.units;
  
          },
          err => {
            console.error(err);
  
          }
        )
  
  }

  mileageTrend(data){
    
      this.chartMileageTrend = this.AmCharts.makeChart( 'chart0', {
        "type": "serial",
      "theme": "light",
      "categoryField": "year",
      "startDuration": 1,
      "fontFamily": "'Rubik', sans-serif",
      "fontSize": 7,
      
      "categoryAxis": {
        "autoWrap": true,
        "gridPosition": "start",
        "position": "left",
        "axisAlpha": 0,
        "gridAlpha": 0,
        "gridThickness": 0,
        "tickLength": -5
      },
      "colors": [
        "#9FA1AA",
        "#EF8537",
        "#497CC8"
        
      ],
      "trendLines": [],
      "graphs": [
        {
          "balloonText": "NORTE_ZN [[category]]: [[value]]",
          "bullet": "round",
          "id": "AmGraph-1",
          "title": "NORTE_ZN",
          "valueField": "norte"
        },
        {
          "balloonText": "CENTROSUR_ZN [[category]]: [[value]]",
          "bullet": "round",
          "id": "AmGraph-2",
          "title": "CENTROSUR_ZN",
          "valueField": "sur"
        },
        {
          "balloonText": "CENTRALBAJIO_ZN [[category]]: [[value]]",
          "bullet": "round",
          "id": "AmGraph-3",
          "title": "CENTRALBAJIO_ZN",
          "valueField": "bajio"
        }
      ],
      "guides": [],
      "allLabels": [],
      "balloon": {
        "adjustBorderColor": false,
        "borderAlpha": 1,
        "borderThickness": 0,
        "horizontalPadding":15,
        "fontSize": 10,
        "color": "#ffffff"
      },
      "legend": {
        "useGraphSettings": true,
        "maxColumns": 4,
        "valueWidth": 0,
        "markerType": "square",
        "markerSize": 10,
        "align": "center",
        "verticalGap": 0
      },
      "dataProvider": data

    } );

}
kilometersTraveled(data){
    
    this.chartKilometersTraveled =  this.AmCharts.makeChart('chart1',{

      "type": "serial",
      "theme": "light",
      "categoryField": "time",
      "columnSpacing": 0,
      "startDuration": 1,
      "fontFamily": "'Rubik', sans-serif",
      "fontSize": 7,
      "columnWidth": 0.60,
      "balloon": {
        "adjustBorderColor": false,
        "borderAlpha": 1,
        "borderThickness": 0,
        "horizontalPadding":15,
        "fontSize": 10,
        "color": "#ffffff"
      },
      "colors": [
        "#497CC8",
        "#EF8537",
        "#9FA1AA"
      ],
      "categoryAxis": {
        "autoWrap": true,
        "gridPosition": "start",
        "position": "left",
        "axisAlpha": 0,
        "gridAlpha": 0,
        "gridThickness": 0,
        "tickLength": -5
      },
      "graphs": [
        {
          "balloonText": "[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-1",
          "lineAlpha": 0.2,
          // "labelText": "[[value]]",
          "title": "NORTE_ZN",
          "type": "column",
          "valueField": "norte"
        },
        {
          "balloonText": "[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-2",
          "lineAlpha": 0.2,
          // "labelText": "[[value]]",
          "title": "CENTROSUR_ZN",
          "type": "column",
          "valueField": "sur"
        },
        {
          "balloonText": "[[value]]",
          "fillAlphas": 0.8,
          "id": "AmGraph-3",
          "lineAlpha": 0.2,
          // "labelText": "[[value]]",
          "title": "CENTRALBAJIO_ZN",
          "type": "column",
          "valueField": "bajio"
        }
      ],
      "legend": {
        "markerType": "square",
        "markerSize": 10,
        "align": "center",
        "autoMargins": false,
        "maxColumns": 4,
        "valueWidth": 0,
        "verticalGap": 0
        
      },
      "dataProvider": data,
        "export": {
          "enabled": false
        }
    
    } );

}

  dashletDetails(event){
    this.closeDetails.emit(true);
  }

  groupVehicle(event){

    if(event === 'gv1'){
      this.showTools = true;
    }
    if(event === 'gv0'){
      this.showTools = false;
    }
  }
  time(event){
    
  }

}
