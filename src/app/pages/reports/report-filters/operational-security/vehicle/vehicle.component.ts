import { Component,Input, OnInit, OnDestroy } from '@angular/core';
import { AmChartsService } from '@amcharts/amcharts3-angular';
import { ReportsService } from '../../../reports.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'report-security-vehicle',
  templateUrl: 'vehicle.component.html',
  styleUrls: ['vehicle.component.scss'],
  providers: [AmChartsService, ReportsService]
})
export class OperationalSecuriyVehicleComponent implements OnInit, OnDestroy {
  @Input() dataprovider: any;
  // barra salud de motor
  healthbar: any = './assets/images/healthbar.png';
  indicator: any = './assets/images/indicador.png';
  indicator2: any = './assets/images/indicador2.png';

  // Amcharts
  chartFuel: any;
  chartSecurity: any;
  chartFuelR: any;
  chartSecurityAceleration: any;
  chartSecuritySpeed: any;
  chartSecurityBraking: any;
  chartSecurityTurns: any;
  chartOperationsAlerts: any;
  chartpassengerComfort: any;

  showPrintIcons: boolean = false;
  classReportForPrint: boolean = false;

  constructor(private AmCharts: AmChartsService,
    private route: ActivatedRoute,
    private reportsService: ReportsService) {}

    ngOnInit() {

      const argCodified = this.route.snapshot.params['dataProvider'];
      if (!argCodified) {
        this.showPrintIcons = true;
      } else {
        this.classReportForPrint = true;
        this.dataprovider = this.reportsService.base2Json(argCodified);
      }
      if (!this.dataprovider) {
        return;
      }

      if (this.dataprovider.vehiclePerformance.fuelEfficiency.dataProvider != null) {
        this.fuelEfficiency(this.dataprovider.vehiclePerformance.fuelEfficiency.dataProvider
          , this.dataprovider.vehiclePerformance.fuelEfficiency.title);
        }

        if(this.dataprovider.ratings.security.dataProvider != null){
          this.ratingsSecurity(this.dataprovider.ratings.security.dataProvider);
        }

        if(this.dataprovider.ratings.fuel.dataProvider != null){
          this.ratingsFuel(this.dataprovider.ratings.fuel.dataProvider);
        }

        if(this.dataprovider.event100h.securityEvents.acceleration.dataProvider != null){
          this.eventSecurityAceleration(this.dataprovider.event100h.securityEvents.acceleration.dataProvider
            ,this.dataprovider.event100h.securityEvents.acceleration.title);
          }

          if(this.dataprovider.event100h.securityEvents.speed.dataProvider != null){
            this.eventSecuritySpeed(this.dataprovider.event100h.securityEvents.speed.dataProvider
              ,this.dataprovider.event100h.securityEvents.speed.title);
            }

            if(this.dataprovider.event100h.securityEvents.Braking.dataProvider != null){
              this.eventSecurityBraking(this.dataprovider.event100h.securityEvents.Braking.dataProvider
                ,this.dataprovider.event100h.securityEvents.Braking.title);
              }

              if(this.dataprovider.event100h.securityEvents.turns.dataProvider != null){
                this.eventSecurityTurns(this.dataprovider.event100h.securityEvents.turns.dataProvider
                  ,this.dataprovider.event100h.securityEvents.turns.title);
                }

                if(this.dataprovider.operationAlerts.dataProvider != null){
                  this.operationsAlerts(this.dataprovider.operationAlerts.dataProvider);
                }

                if(this.dataprovider.passengerComfortEvents.dataProvider != null){
                  this.passengerComfortEvents(this.dataprovider.passengerComfortEvents.dataProvider);
                }
                // });
              }
              fuelEfficiency(data, title) {
                this.chartFuel = this.AmCharts.makeChart('fuelEfficiency', {
                  'type': 'serial',
                  'theme': 'light',
                  'dataProvider': data,
                  'valueAxes': [{
                    'stackType': 'regular',
                    'minimum': 0,
                    'maximum': 5,
                    'position': 'left',
                    'title': 'km/l',
                    'gridAlpha': 0,
                    'axisAlpha': 0
                  }],
                  'graphs': [{
                    'balloonText': '[[category]]: <b>[[value]]</b>',
                    'fontSize': 12,
                    'fillAlphas': 1,
                    'lineAlpha': 0.0,
                    'type': 'column',
                    'fillColors': '#38acb8',
                    'valueField': 'performance',
                    'labelText': '[[value]]'
                  }],
                  'chartCursor': {
                    'categoryBalloonEnabled': false,
                    'cursorAlpha': 0,
                    'zoomable': false
                  },
                  'categoryField': 'month',
                  'categoryAxis': {
                    'gridPosition': 'start',
                    'labelRotation': 0
                  }
                });
              }

              ratingsSecurity(data) {
                let color = '#97be11';
                if(data[0].security > data[0].previousResult){
                  color = '#ff0036';
                }
                this.chartSecurity = this.AmCharts.makeChart('ratingsSecurity', {
                  'type': 'serial',
                  'theme': 'light',
                  'dataProvider': data,
                  'valueAxes': [{
                    'minimum': 0,
                    'position': 'bottom',
                    'gridAlpha': 0,
                    'axisAlpha': 0,
                    'axisColor': '#FFFFFF',
                  }],
                  'graphs': [{
                    'balloonText': 'Seguridad: [[value]]',
                    'fillAlphas': 1,
                    'lineAlpha': 0.0,
                    'fillColors': ''+color,
                    'type': 'column',
                    'valueField': 'security',
                    'labelText': '[[value]]'
                  }, {
                    'balloonText': 'Resultado anterior: [[value]]',
                    'fillColors': '#f6b63d',
                    'fillAlphas': 1,
                    'lineAlpha': 0.0,
                    'type': 'column',
                    'valueField': 'previousResult',
                    'labelText': '[[value]]'
                  }, {
                    'balloonText': 'Promedio de Grupo: [[value]]',
                    'fillColors': '#67b7dc',
                    'fillAlphas': 1,
                    'lineAlpha': 0.0,
                    'type': 'column',
                    'valueField': 'averageGroup',
                    'labelText': '[[value]]'
                  }],
                  'rotate': true,
                  'categoryAxis': {
                    'labelsEnabled': false
                  }
                });
              }

              ratingsFuel(data) {
                let color = '#97be11';
                if (data[0].fuel > data[0].previousResult) {
                  color = '#ff0036';
                }
                this.chartFuelR = this.AmCharts.makeChart('ratingsFuel', {
                  'type': 'serial',
                  'theme': 'light',
                  'dataProvider': data,
                  'valueAxes': [{
                    'position': 'bottom',
                    'minimum': 0,
                    'gridAlpha': 0,
                    'axisAlpha': 0
                  }],
                  'graphs': [{
                    'balloonText': 'Combustible: [[value]]',
                    'fillColors':''+color,
                    'fillAlphas': 1,
                    'lineAlpha': 0.0,
                    'type': 'column',
                    'valueField': 'fuel',
                    'labelText': '[[value]]'
                  }, {
                    'balloonText': 'Resultado anterior: [[value]]',
                    'fillColors': '#f6b63d',
                    'fillAlphas': 1,
                    'lineAlpha': 0.0,
                    'type': 'column',
                    'labelText': '[[value]]',
                    'valueField': 'previousResult'
                  }, {
                    'balloonText': 'Promedio de Grupo: [[value]]',
                    'fillColors': '#67b7dc',
                    'fillAlphas': 1,
                    'lineAlpha': 0.0,
                    'type': 'column',
                    'valueField': 'averageGroup',
                    'labelText': '[[value]]'
                  }],
                  'rotate': true,
                  'categoryAxis': {
                    'labelsEnabled': false
                  }
                });
              }

              eventSecurityAceleration(data, title) {
                let color = '#4ba92b';
                if(data[0].currentPeriod > data[0].previousPeriod) {
                  color = '#ff0036';
                }
                this.chartSecurityAceleration = this.AmCharts.makeChart('eventSecurityAceleration', {
                  'type': 'serial',
                  'theme': 'light',
                  'dataProvider': data,
                  'valueAxes': [{
                    'position': 'bottom',
                    'minimum': 0,
                    'gridAlpha': 0,
                    'axisAlpha': 0
                  }],
                  'graphs': [{
                    'balloonText': 'Periodo actual: [[value]]',
                    'fillAlphas': 1,
                    'fillColors':''+color,
                    'lineAlpha': 0.0,
                    'type': 'column',
                    'valueField': 'currentPeriod',
                    'labelText':'[[value]]'
                  },{
                    'balloonText': 'Periodo anterior: [[value]]',
                    'fillAlphas': 1,
                    'fillColors':'#27509d',
                    'lineAlpha': 0.0,
                    'type': 'column',
                    'valueField': 'previousPeriod',
                    'labelText':'[[value]]'
                  },{
                    'balloonText': 'Promedio de Grupo: [[value]]',
                    'fillColors':'#38acb8',
                    'fillAlphas': 1,
                    'lineAlpha': 0.0,
                    'type': 'column',
                    'valueField': 'averageGroup',
                    'labelText':'[[value]]'
                  }],
                  'rotate': true,
                  'categoryAxis': {
                    'labelsEnabled': false
                  }
                });
              }

              eventSecuritySpeed(data, title){
                let color = '#4ba92b';
                if(data[0].currentPeriod > data[0].previousPeriod){
                  color = '#ff0036';
                }
                this.chartSecuritySpeed = this.AmCharts.makeChart('eventSecuritySpeed', {
                  'type': 'serial',
                  'theme': 'light',
                  'dataProvider': data,
                  'valueAxes': [{
                    'position': 'bottom',
                    'minimum': 0,
                    'gridAlpha': 0,
                    'axisAlpha': 0
                  }],
                  'graphs': [{
                    'balloonText': 'Periodo actual: [[value]]',
                    'fillColors':''+color,
                    'fillAlphas': 1,
                    'lineAlpha': 0.0,
                    'type': 'column',
                    'valueField': 'currentPeriod',
                    'labelText':'[[value]]'
                  },{
                    'balloonText': 'Periodo anterior: [[value]]',
                    'fillAlphas': 1,
                    'fillColors':'#27509d',
                    'lineAlpha': 0.0,
                    'type': 'column',
                    'valueField': 'previousPeriod',
                    'labelText':'[[value]]'
                  },{
                    'balloonText': 'Promedio de Grupo: [[value]]',
                    'fillColors':'#38acb8',
                    'fillAlphas': 1,
                    'lineAlpha': 0.0,
                    'type': 'column',
                    'valueField': 'averageGroup',
                    'labelText':'[[value]]'
                  }],
                  'rotate': true,
                  'categoryAxis': {
                    'labelsEnabled': false
                  }
                });
              }

              eventSecurityBraking(data, title){
                let color = '#4ba92b';
                if(data[0].currentPeriod > data[0].previousPeriod){
                  color = '#ff0036';
                }
                this.chartSecurityBraking = this.AmCharts.makeChart('eventSecurityBraking', {
                  'type': 'serial',
                  'theme': 'light',
                  'dataProvider': data,
                  'valueAxes': [{
                    'position': 'bottom',
                    'minimum': 0,
                    'gridAlpha': 0,
                    'axisAlpha': 0
                  }],
                  'graphs': [{
                    'balloonText': 'Periodo actual: [[value]]',
                    'fillAlphas': 1,
                    'fillColors':''+color,
                    'lineAlpha': 0.0,
                    'type': 'column',
                    'valueField': 'currentPeriod',
                    'labelText':'[[value]]'
                  },{
                    'balloonText': 'Periodo anterior: [[value]]',
                    'fillColors':'#27509d',
                    'fillAlphas': 1,
                    'lineAlpha': 0.0,
                    'type': 'column',
                    'valueField': 'previousPeriod',
                    'labelText':'[[value]]'
                  },{
                    'balloonText': 'Promedio de Grupo: [[value]]',
                    'fillColors':'#38acb8',
                    'fillAlphas': 1,
                    'lineAlpha': 0.0,
                    'type': 'column',
                    'valueField': 'averageGroup',
                    'labelText':'[[value]]'
                  }],
                  'rotate': true,
                  'categoryAxis': {
                    'labelsEnabled': false
                  }
                });
              }
              eventSecurityTurns(data, title) {
                let color = '#4ba92b';
                if(data[0].currentPeriod > data[0].previousPeriod){
                  color = '#ff0036';
                }
                this.chartSecurityTurns = this.AmCharts.makeChart('eventSecurityTurns', {
                  'type': 'serial',
                  'theme': 'light',
                  'dataProvider': data,
                  'valueAxes': [{
                    'position': 'bottom',
                    'minimum': 0,
                    'gridAlpha': 0,
                    'axisAlpha': 0
                  }],
                  'graphs': [{
                    'balloonText': 'Periodo actual: [[value]]',
                    'fillAlphas': 1,
                    'fillColors':''+color,
                    'lineAlpha': 0.0,
                    'type': 'column',
                    'valueField': 'currentPeriod',
                    'labelText':'[[value]]'
                  },{
                    'balloonText': 'Periodo anterior: [[value]]',
                    'fillAlphas': 1,
                    'fillColors':'#27509d',
                    'lineAlpha': 0.0,
                    'type': 'column',
                    'valueField': 'previousPeriod',
                    'labelText':'[[value]]'
                  },{
                    'balloonText': 'Promedio de Grupo: [[value]]',
                    'fillColors':'#38acb8',
                    'fillAlphas': 1,
                    'lineAlpha': 0.0,
                    'type': 'column',
                    'valueField': 'averageGroup',
                    'labelText':'[[value]]'
                  }],
                  'rotate': true,
                  'categoryAxis': {
                    'labelsEnabled': false
                  }
                });
              }
              operationsAlerts(data) {
                this.chartOperationsAlerts = this.AmCharts.makeChart('operationsAlerts', {
                  'type': 'serial',
                  'theme': 'light',
                  'dataProvider': data,
                  'valueAxes': [{
                    'position': 'bottom',
                    'minimum': 0,
                    'gridAlpha': 0,
                    'axisAlpha': 0
                  }],
                  'graphs': [{
                    'balloonText': 'Valor: [[value]]',
                    'fillAlphas': 1,
                    'fillColors': '#38acb8',
                    'lineAlpha': 0.0,
                    'type': 'column',
                    'valueField': 'value',
                    'labelText': '[[value]]'
                  }],
                  'rotate': true,
                  'categoryField': 'data',
                  'categoryAxis': {
                    'gridPosition': 'start'
                  }
                });
              }

              passengerComfortEvents(data) {
                for (let i = 0; i < data.length; i++) {
                  if (data[i].value < 5) {
                    data[i].color = '#4ba92b'
                  }else {
                    if (data[i].value >= 5 && data[i].value < 10) {
                      data[i].color = '#e8b449'
                    }else {
                      data[i].color = '#ff0036'
                    }
                  }
                }
                this.chartpassengerComfort = this.AmCharts.makeChart('passengerComfortEvents', {
                  'type': 'serial',
                  'theme': 'light',
                  'dataProvider': data,
                  'valueAxes': [{
                    'stackType': '3d',
                    'position': 'bottom',
                    'minimum': 0,
                    'gridAlpha': 0,
                    'axisAlpha': 0
                  }],
                  'graphs': [{
                    'balloonText': 'Valor: [[value]]',
                    'fillColorsField': 'color',
                    'fillAlphas': 1,
                    'lineAlpha': 0.0,
                    'type': 'column',
                    'valueField': 'value',
                    'labelText': '[[value]]'
                  }],
                  'categoryField': 'data',
                  'categoryAxis': {
                    'gridPosition': 'start',
                    'autoWrap': true
                  }
                });
              }
              ngOnDestroy() {
                this.AmCharts.destroyChart(this.chartFuel);
                this.AmCharts.destroyChart(this.chartSecurity);
                this.AmCharts.destroyChart(this.chartFuelR);
                this.AmCharts.destroyChart(this.chartSecurityAceleration);
                this.AmCharts.destroyChart(this.chartSecuritySpeed);
                this.AmCharts.destroyChart(this.chartSecurityBraking);
                this.AmCharts.destroyChart(this.chartSecurityTurns);
                this.AmCharts.destroyChart(this.chartOperationsAlerts);
                this.AmCharts.destroyChart(this.chartpassengerComfort);
              }
              printProcess(printType: string): void {
                this.reportsService.printReport(printType, this.dataprovider, 'security/vehicle');
              }
            }
