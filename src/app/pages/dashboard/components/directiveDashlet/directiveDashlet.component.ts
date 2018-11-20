import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'motum-directive-dashlet',
  templateUrl: './directiveDashlet.component.html',
  styleUrls: ['./directiveDashlet.component.scss']
})
export class DirectiveDashletComponent implements OnInit {

  @Input() dataDirective;
  @Input() idChart;
  @Output() openDetails = new EventEmitter<any>();

  //Amcharts
  charFuelIndicator: any;
  charMaintenance: any;
  chartConsumedFuel: any;
  chartPositioning: any;
  constructor(private AmCharts: AmChartsService) { }

  ngOnInit() {
    
    if(this.dataDirective.type === 'pie' && this.dataDirective.subtitle === 'Indicador Kilometraje (Km)'){
      Promise.resolve(null).then(() => {
        this.fuelIndicator(this.dataDirective.data);
      });
    }
    if(this.dataDirective.type === 'pie' && this.dataDirective.subtitle === 'Mantenimiento'){
    Promise.resolve(null).then(() => {
        this.maintenance(this.dataDirective.data);
      });
    }
      if(this.dataDirective.type === 'serial' && this.dataDirective.subtitle === 'Combustible consumido (l)'){
      Promise.resolve(null).then(() => {
          this.consumedFuel(this.dataDirective.data);
        });
      }
        if(this.dataDirective.type === 'serial' && this.dataDirective.subtitle === 'Up Time posicionamiento'){
        Promise.resolve(null).then(() => {
            this.positioning(this.dataDirective.data);
          });
        }
  }

  dashletDetails(){
    this.openDetails.emit(false);
  }

  fuelIndicator(data){
    
      this.charFuelIndicator = this.AmCharts.makeChart( 'chart0', {
        "type": "pie",
        "theme": "light",
        "labelText": "",
        "fontFamily": "'Rubik', sans-serif",
        "fontSize": 7,
        "radius": "45%",
        "addClassNames": true,
        "colors": [
          "#61ADD5",
          "#F8CE27",
          "#7AAD58",
          "#C13B42",
          "#C476A2",
          "#3BA1CE",
          "#D1A211",
          "#6C9153",
          "#9E1B24",
          "#DF93C3",
          "#076182",
          "#7A6A57",
        ],
        // "titles": [{
        //   "text": "Total: 9,402.17 Km",
        //   "position":"top",
        // }],
        "legend":{
          "position":"right",
         "autoMargins":false,
         "valueWidth": 20,
         "markerSize": 8,
         "verticalGap": 1
        //  "marginTop": 48,
        },
        "dataProvider": data,
        "valueField": "value",
        "titleField": "title",
         "balloon":{
         "fixedPosition":true
        },
        "export": {
          "enabled": false
        }
      } );

}
maintenance(data){
    
    
        
      this.charMaintenance = this.AmCharts.makeChart( 'chart4', {
        "type": "pie",
        "theme": "light",
        "labelText": "",
        "fontFamily": "'Rubik', sans-serif",
        "fontSize": 7,
        "radius": "45%",
        "innerRadius": 25,
        "colors": [
          "#FF001A",
          "#FFDF03",
          "#02AA58",
          "#9FA1AA",
          "#3E53D1"
        ],
        "allLabels": [{
          "y": "36%",
          "align": "center",
          "size": 15,
          // "bold": true,
          "text": "585",
          "color": "#555"
        }, {
          "y": "52%",
          "align": "center",
          "size": 10,
          "text": "Fallas",
          "color": "#555"
        }],
        "legend":{
          "position":"right",
         "autoMargins":false,
         "valueWidth": 20,
         "markerSize": 8,
         "verticalGap": 1
        //  "marginTop": 48,
        },
        "dataProvider": data,
        "valueField": "value",
        "titleField": "title",
         "balloon":{
         "fixedPosition":true
        },
        "export": {
          "enabled": false
        }
      } );

}

consumedFuel(data){

  // Calculates a point Z(x), the Probability Density Function, on any normal curve. 
// This is the height of the point ON the normal curve.
// For values on the Standard Normal Curve, call with Mean = 0, StdDev = 1.
function NormalDensityZx( x, Mean, StdDev ) {
  var a = x - Mean;
  return Math.exp( -( a * a ) / ( 2 * StdDev * StdDev ) ) / ( Math.sqrt( 2 * Math.PI ) * StdDev );
}
//----------------------------------------------------------------------------------------------
// Calculates Q(x), the right tail area under the Standard Normal Curve. 
function StandardNormalQx( x ) {
  if ( x === 0 ) // no approximation necessary for 0
    return 0.50;

  var t1, t2, t3, t4, t5, qx;
  var negative = false;
  if ( x < 0 ) {
    x = -x;
    negative = true;
  }
  t1 = 1 / ( 1 + ( 0.2316419 * x ) );
  t2 = t1 * t1;
  t3 = t2 * t1;
  t4 = t3 * t1;
  t5 = t4 * t1;
  qx = NormalDensityZx( x, 0, 1 ) * ( ( 0.319381530 * t1 ) + ( -0.356563782 * t2 ) +
    ( 1.781477937 * t3 ) + ( -1.821255978 * t4 ) + ( 1.330274429 * t5 ) );
  if ( negative == true )
    qx = 1 - qx;
  return qx;
}
//----------------------------------------------------------------------------------------------
// Calculates P(x), the left tail area under the Standard Normal Curve, which is 1 - Q(x). 
function StandardNormalPx( x ) {
  return 1 - StandardNormalQx( x );
}
//----------------------------------------------------------------------------------------------
// Calculates A(x), the area under the Standard Normal Curve between +x and -x. 
function StandardNormalAx( x ) {
  return 1 - ( 2 * StandardNormalQx( Math.abs( x ) ) );
}
//----------------------------------------------------------------------------------------------

/**
* Define values where to put vertical lines at
*/
var verticals = [
-1.4, -0.2, 1.2
];

/**
* Calculate data
*/
var chartData = [];
for ( var i = -5; i < 5.1; i += 0.1 ) {
var dp = {
  category: i,
  value: NormalDensityZx( i, 0, 1 ),
  vertical: null
};
if ( verticals.indexOf( Math.round( i * 10 ) / 10 ) !== -1 ) {
  dp.vertical = dp.value;
}
chartData.push( dp );
}


/**
* Create a chart
*/

  var chart = AmCharts.makeChart( "chart2", {
    "type": "serial",
    "theme": "light",
    "dataProvider": chartData,
    "precision": 2,
    "colors": [
      "#90D889"
    ],
    "valueAxes": [ {
      "gridAlpha": 0.2,
      "dashLength": 0
    } ],
    "startDuration": 1,
    "graphs": [ {
      "balloonText": "[[category]]: <b>[[value]]</b>",
      "lineThickness": 3,
      "valueField": "value"
    }, {
      "balloonText": "",
      "fillAlphas": 1,
      "type": "column",
      "valueField": "vertical",
      "fixedColumnWidth": 2,
      "labelText": "[[value]]",
      "labelOffset": 20
    } ],
    "chartCursor": {
      "categoryBalloonEnabled": false,
      "cursorAlpha": 0,
      "zoomable": false
    },
    "categoryField": "category",
    "categoryAxis": {
      "gridAlpha": 0.05,
      "startOnAxis": true,
      // "tickLength": 5,
      "tickLength": 0,
      "labelsEnabled": false,
      "labelFunction": function( label, item ) {
        return '' + Math.round( item.dataContext.category * 10 ) / 10;
      }
    }
  
  } );

  // this.chartConsumedFuel = this.AmCharts.makeChart( 'chart2', {
  //   "type": "serial",
  //   "theme": "light",
  //   "labelText": "",
  //   "fontFamily": "'Rubik', sans-serif",
  //   "fontSize": 7,
  //   "marginTop":10,
  //   "marginRight": 40,
  //   "dataProvider": data,
  //   "valueAxes": [{
  //       "axisAlpha": 0,
  //       "position": "left"
  //   }],
  //   "graphs": [{
  //       "id":"g1",
  //       "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
  //       "bullet": "round",
  //       "bulletSize": 8,
  //       "lineColor": "#79D270",
  //       "lineThickness": 2,
  //       "negativeLineColor": "#79D270",
  //       "type": "smoothedLine",
  //       "valueField": "value"
  //   }],
  //   "chartCursor": {
  //       "categoryBalloonDateFormat": "YYYY",
  //       "cursorAlpha": 0,
  //       "valueLineEnabled":true,
  //       "valueLineBalloonEnabled":true,
  //       "valueLineAlpha":0.5,
  //       "fullWidth":true
  //   },
  //   "dataDateFormat": "YYYY",
  //   "categoryField": "title",
  //   "categoryAxis": {
  //       "minPeriod": "YYYY",
  //       "parseDates": true,
  //       "minorGridAlpha": 0.1,
  //       "minorGridEnabled": true,
  //       "labelsEnabled": false,
  //       "tickLength": 0,
  //       "axisThickness": 0
  //   },
  //   "export": {
  //       "enabled": false
  //   }
  // } );

}

positioning(data){

  this.chartPositioning = this.AmCharts.makeChart( 'chart5', {
    "type": "serial",
    "theme": "light",
    "fontFamily": "'Rubik', sans-serif",
    "fontSize": 7,
    "columnWidth": 0.60,
    "colors": [
      "#497CC8"
    ],
    "dataProvider": data,
    "valueAxes": [ {
      "gridColor": "#555",
      "gridAlpha": 0.2,
      "dashLength": 0
    } ],
    "gridAboveGraphs": true,
    "startDuration": 1,
    "graphs": [ {
      "balloonText": "[[category]]: <b>[[value]]</b>",
      "fillAlphas": 0.8,
      "id": "AmGraph-1",
      "title": "Unidades sin posición",
      "lineAlpha": 0.2,
      "type": "column",
      "valueField": "value",
      "labelText": "[[value]]"
    } ],
    "chartCursor": {
      "categoryBalloonEnabled": false,
      "cursorAlpha": 0,
      "zoomable": false
    },
    "categoryField": "title",
    "categoryAxis": {
      "gridPosition": "start",
      "gridAlpha": 0,
      "tickPosition": "start",
      "tickLength": 0,
      "axisThickness": 0
    },
    "legend": {
      "markerType": "square",
      "markerSize": 5,
      "align": "center",
      "autoMargins": false,
      "maxColumns": 4,
      "valueWidth": 0,
      "verticalGap": 0
      
    },
    "export": {
      "enabled": false
    }
  } );

}

}