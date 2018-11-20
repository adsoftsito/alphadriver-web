import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridsterComponent, GridsterConfig, GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { DataChartsService } from './data-charts.service';
import * as moment from 'moment';
@Component({
  selector: 'app-content-dashlet',
  templateUrl: './content-dashlet.component.html',
  styleUrls: ['./content-dashlet.component.scss']
})
export class ContentDashletComponent implements OnInit {
  
  menuDashlet: boolean = false;
  clickCloseMenu: string;
  @Input() reciveItem: Array<GridsterItem>;
  @Input() recibeI: number;
  @Input() idItemChart: number;
  @Input() lastItemAdd: number;
  @Input() dataDashlet = [];
  @Output() deleteGridsterI = new EventEmitter<any>();
  // @Output() titleDashboard = new EventEmitter<any>();
  
  constructor(private dataChartsService:DataChartsService) {
   }

ngOnInit() {
  if(this.idItemChart){
    setTimeout(() => {
      this.createChartDrop(this.lastItemAdd, this.idItemChart);
    }, 0);
  }
  if(this.recibeI >= 0){
    setTimeout(() => {
      this.createChart(this.recibeI);
    }, 0);
  }

  // this.titleDashboard.emit('DAIMLER / RAME');
}

optionSimpleColumn(idItemChart){
  return{
  "type": "serial",
  "theme": "light",
  "fontFamily": "'Rubik', sans-serif",
  "fontSize": 7,
  "dataProvider": this.dataChartsService.getDataCharts(idItemChart),
  "valueAxes": [ {
    "gridColor": "#",
    "gridAlpha": 0.2,
    "dashLength": 0
  } ],
  //"gridAboveGraphs": true,
  //"startDuration": 1,
  "graphs": [ {
    "balloonText": "[[category]]: <b>[[value]]</b>",
    "fillAlphas": 0.8,
    "lineAlpha": 0, //borde de la barra
    "fillColors": "#99C9FF",
    "type": "column",
    "valueField": "visits"
  } ],
  "chartCursor": {
    "categoryBalloonEnabled": false,
    "cursorAlpha": 0,
    "zoomable": false
  },
  "categoryField": "country",
  "categoryAxis": {
    "gridPosition": "start",
    "gridAlpha": 0,
    "tickPosition": "start",
    "tickLength": 0
  },
  "export": {
    "enabled": false
  }

  }
}

optionsPie(idItemChart){
  return{
    "type": "pie",
    "startDuration": 0,
    "labelText": "",
    "radius": "40%",
    "fontFamily": "'Rubik', sans-serif",
    "fontSize": 7,
    "colors": [
      "#5AA2FF",
      "#66A9FF",
      "#84BAFF",
      "#B0D3FF",
      "#CEE4FF"
    ],
    "addClassNames": true,
    "legend":{
       "position":"right",
      //"marginRight":100,
      "markerSize": 8,
      "autoMargins":false
    },
    
    "defs": {
      "filter": [{
        "id": "shadow",
        "width": "200%",
        "height": "200%",
        "feOffset": {
          "result": "offOut",
          "in": "SourceAlpha",
          "dx": 0,
          "dy": 0
        },
        "feGaussianBlur": {
          "result": "blurOut",
          "in": "offOut",
          "stdDeviation": 5
        },
        "feBlend": {
          "in": "SourceGraphic",
          "in2": "blurOut",
          "mode": "normal"
        }
      }]
    },
    "dataProvider": this.dataChartsService.getDataCharts(idItemChart),
    "valueField": "litres",
    "titleField": "country",
    "export": {
      "enabled": false
    }
  }

}

optionsLineChart(idItemChart){
  return{
    "type": "serial",
    "theme": "light",
    "marginTop":0,
    "fontFamily": "'Rubik', sans-serif",
    "fontSize": 7,
    "marginRight": 80,
    "dataProvider": this.dataChartsService.getDataCharts(idItemChart),
    "valueAxes": [{
        "axisAlpha": 0,
        "position": "left"
    }],
    "graphs": [{
        "id":"g1",
        "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
        "bullet": "round",
        "bulletSize": 8,
        "lineColor": "#d1655d",
        "lineThickness": 2,
        "negativeLineColor": "#637bb6",
        "type": "smoothedLine",
        "valueField": "value"
    }],
    "chartCursor": {
        "categoryBalloonDateFormat": "YYYY",
        "cursorAlpha": 0,
        "valueLineEnabled":true,
        "valueLineBalloonEnabled":true,
        "valueLineAlpha":0.5,
        "fullWidth":true
    },
    "dataDateFormat": "YYYY",
    "categoryField": "year",
    "categoryAxis": {
        "minPeriod": "YYYY",
        "parseDates": true,
        "minorGridAlpha": 0.1,
        "minorGridEnabled": true
    },
    "export": {
        "enabled": false
    }
  }
}

optionsValueAxis(idItemChart){
  return{
    "type": "serial",
    "theme": "light",
    "fontFamily": "'Rubik', sans-serif",
    "fontSize": 7,
    "legend": {
        "useGraphSettings": true,
        "maxColumns": 3,
        "markerSize": 10,
        "align": "center",
        "autoMargins": false,
        "valueWidth": 5
    },
    "dataProvider": this.dataChartsService.getDataCharts(idItemChart) ,
    "valueAxes": [{
        "integersOnly": true,
        "maximum": 1,
        "minimum": 20,
        "reversed": false,
        "axisAlpha": 0,
        "dashLength": 5,
        "gridCount": 10,
        "position": "left",
        "title": "Place taken"
    }],
    "startDuration": 0.5,
    "graphs": [{
        "balloonText": "place taken by Italy in [[category]]: [[value]]",
        "bullet": "round",
        "hidden": true,
        "title": "Italy",
        "valueField": "italy",
		"fillAlphas": 0
    }, {
        "balloonText": "place taken by Germany in [[category]]: [[value]]",
        "bullet": "round",
        "title": "Germany",
        "valueField": "germany",
		"fillAlphas": 0
    }, {
        "balloonText": "place taken by UK in [[category]]: [[value]]",
        "bullet": "round",
        "title": "United Kingdom",
        "valueField": "uk",
		"fillAlphas": 0
    }],
    "chartCursor": {
        "cursorAlpha": 0,
        "zoomable": false
    },
    "categoryField": "year",
    "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "fillAlpha": 0.05,
        
        "gridAlpha": 0,
    },
    "export": {
    	"enabled": false,
        "position": "bottom-right"
     }
  }
}

// createChart(lastItemAdd, idItemChart){
createChart(id){
  switch(id){
      case 0:
          AmCharts.makeChart( "chart"+id, this.optionSimpleColumn(id));
        break;
      case 1:
          AmCharts.makeChart( "chart"+id, this.optionsPie(id));
        break;
      case 2:
          AmCharts.makeChart( "chart"+id, this.optionsLineChart(id));
        break;
      case 3:
          AmCharts.makeChart( "chart"+id, this.optionsValueAxis(id));
        break;
      case 4:
      AmCharts.makeChart( "chart"+id, this.optionSimpleColumn(id));
        break;
      case 5:
      AmCharts.makeChart( "chart"+id, this.optionsPie(id));
        break;
    }
  }

  createChartDrop(lastItemAdd, idItemChart){
    
    switch(idItemChart){
        case 1:
            AmCharts.makeChart( "chart"+lastItemAdd, this.optionSimpleColumn(idItemChart-1));
          break;
        case 2:
            AmCharts.makeChart( "chart"+lastItemAdd, this.optionsPie(idItemChart-1));
          break;
        case 3:
            AmCharts.makeChart( "chart"+lastItemAdd, this.optionsLineChart(idItemChart-1));
          break;
        case 4:
            AmCharts.makeChart( "chart"+lastItemAdd, this.optionsValueAxis(idItemChart-1));
          break;
      }
    }

  openMenu($event){
      if($event == false){
        this.menuDashlet = true;
        this.clickCloseMenu = 'closeMenuDashlet';
      }else{
        this.menuDashlet = false;
        this.clickCloseMenu = '';
      }
  }

  removeItem($event){
      this.deleteGridsterI.emit($event);
  }


  // configuracion calendario...


  start = moment();

  end = moment();

  inputDateMy:any;
  
  ranges={
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 15 Days': [moment().subtract(14, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
 };

 receivesModifiedDate(event){
    this.inputDateMy=(event.startDate.format('DD/MM/YYYY') + ' - ' + event.endDate.format('DD/MM/YYYY'));
 }


}
