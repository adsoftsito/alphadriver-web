import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AmChartsService } from '@amcharts/amcharts3-angular';
import { ReportsService } from '../../../reports.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'report-conduct-operator',
  templateUrl: 'operator.component.html',
  styleUrls: ['operator.component.scss'],
  providers: [AmChartsService, ReportsService]
})
export class ConductOperativeOperatorComponent implements OnInit, OnDestroy {
  @Input() dataprovider: any;
  chartFuel: any;
  chartSecurity: any;
  chartMechanics: any;
  chartSecurityAceleration: any;
  chartSecuritySpeed: any;
  chartSecurityBraking: any;
  chartSecurityTurns: any;
  chartMechanicsBrakes: any;
  chartMechanicsGearbox: any;
  chartMechanicsFuel: any;
  chartMechanicsEngine: any;
  chartMechanicsGear: any;

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
     console.info(this.dataprovider);
    if (this.dataprovider.performance.fuelEfficiency.dataProvider != null) {
      this.fuelEfficiency(this.dataprovider.performance.fuelEfficiency.dataProvider);
    }

    if (this.dataprovider.ratings.security.dataProvider != null){
      this.ratingsSecurity(this.dataprovider.ratings.security.dataProvider);
    }

    if(this.dataprovider.ratings.mechanics.dataProvider != null){
      this.tabRatingsMechanics(this.dataprovider.ratings.mechanics.dataProvider);
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

            if(this.dataprovider.event100h.mechanicalEvents.brakes.dataProvider != null){
              this.eventMechanicsBrakes(this.dataprovider.event100h.mechanicalEvents.brakes.dataProvider
                ,this.dataprovider.event100h.mechanicalEvents.brakes.title);
              }

              if(this.dataprovider.event100h.mechanicalEvents.gearbox.dataProvider != null){
                this.eventMechanicsGearbox(this.dataprovider.event100h.mechanicalEvents.gearbox.dataProvider
                  ,this.dataprovider.event100h.mechanicalEvents.gearbox.title);
                }

                if(this.dataprovider.event100h.mechanicalEvents.fuel.dataProvider != null){
                  this.eventMechanicsFuel(this.dataprovider.event100h.mechanicalEvents.fuel.dataProvider
                    ,this.dataprovider.event100h.mechanicalEvents.fuel.title);
                  }
                  if(this.dataprovider.event100h.mechanicalEvents.engine.dataProvider != null){
                    this.eventMechanicsEngine(this.dataprovider.event100h.mechanicalEvents.engine.dataProvider
                      ,this.dataprovider.event100h.mechanicalEvents.engine.title);
                    }

                    if(this.dataprovider.event100h.mechanicalEvents.gear.dataProvider != null){
                      this.eventMechanicsGear(this.dataprovider.event100h.mechanicalEvents.gear.dataProvider
                        ,this.dataprovider.event100h.mechanicalEvents.gear.title);
                      }
                    }
                    fuelEfficiency(data){
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
                        },{
                          'position': 'top'
                        }],
                        'graphs': [{
                          'balloonText': '[[category]]: <b>[[value]]</b>',
                          'fontSize': 12,
                          'fillAlphas': 1,
                          'lineAlpha': 0.1,
                          'fillColors': '#38acb8',
                          'type': 'column',
                          'valueField': 'performance',
                          'labelText':'[[value]]'
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
                      if (data[0].security > data[0].previousResult) {
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
                          'axisAlpha': 0
                        }],
                        'graphs': [{
                          'balloonText': 'Seguridad: [[value]]',
                          'fillAlphas': 1,
                          'lineAlpha': 0.2,
                          'fillColors': ''+color,
                          'type': 'column',
                          'valueField': 'security',
                          'labelText':'[[value]]'
                        },{
                          'balloonText': 'Resultado anterior: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':'#f6b63d',
                          'lineAlpha': 0.2,
                          'type': 'column',
                          'valueField': 'previousResult',
                          'labelText':'[[value]]'
                        },{
                          'balloonText': 'Promedio de Grupo: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':'#67b7dc',
                          'lineAlpha': 0.2,
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

                    tabRatingsMechanics(data){
                      let color = '#97be11';
                      if(data[0].mechanics > data[0].previousResult){
                        color = '#ff0036';
                      }
                      this.chartMechanics = this.AmCharts.makeChart('ratingsMechanics', {
                        'type': 'serial',
                        'theme': 'light',
                        'dataProvider': data,
                        'valueAxes': [{
                          'minimum': 0,
                          'position': 'bottom',
                          'gridAlpha': 0,
                          'axisAlpha': 0
                        }],
                        'graphs': [{
                          'balloonText': 'Mecánica: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':''+color,
                          'lineAlpha': 0.2,
                          'type': 'column',
                          'valueField': 'mechanics',
                          'labelText':'[[value]]'
                        },{
                          'balloonText': 'Resultado anterior: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':'#f6b63d',
                          'lineAlpha': 0.2,
                          'type': 'column',
                          'valueField': 'previousResult',
                          'labelText':'[[value]]'
                        },{
                          'balloonText': 'Promedio de Grupo: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':'#67b7dc',
                          'lineAlpha': 0.2,
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

                    eventSecurityAceleration(data, title){
                      let color = '#4ba92b';
                      if(data[0].currentPeriod > data[0].previousPeriod){
                        color = '#ff0036';
                      }
                      this.chartSecurityAceleration = this.AmCharts.makeChart('eventSecurityAceleration', {
                        'type': 'serial',
                        'theme': 'light',
                        'dataProvider': data,
                        'valueAxes': [{
                          'minimum': 0,
                          'position': 'bottom',
                          'gridAlpha': 0,
                          'axisAlpha': 0
                        }],
                        'graphs': [{
                          'balloonText': 'Periodo actual: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':''+color,
                          'lineAlpha': 0.2,
                          'type': 'column',
                          'valueField': 'currentPeriod',
                          'labelText':'[[value]]'
                        },{
                          'balloonText': 'Periodo anterior: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':'#27509d',
                          'lineAlpha': 0.2,
                          'type': 'column',
                          'valueField': 'previousPeriod',
                          'labelText':'[[value]]'
                        },{
                          'balloonText': 'Promedio de Grupo: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':'#38acb8',
                          'lineAlpha': 0.2,
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
                          'minimum': 0,
                          'position': 'bottom',
                          'gridAlpha': 0,
                          'axisAlpha': 0
                        }],
                        'graphs': [{
                          'balloonText': 'Periodo actual: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':''+color,
                          'lineAlpha': 0.2,
                          'type': 'column',
                          'valueField': 'currentPeriod',
                          'labelText':'[[value]]'
                        },{
                          'balloonText': 'Periodo anterior: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':'#27509d',
                          'lineAlpha': 0.2,
                          'type': 'column',
                          'valueField': 'previousPeriod',
                          'labelText':'[[value]]'
                        },{
                          'balloonText': 'Promedio de Grupo: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':'#38acb8',
                          'lineAlpha': 0.2,
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
                          'minimum': 0,
                          'position': 'bottom',
                          'gridAlpha': 0,
                          'axisAlpha': 0
                        }],
                        'graphs': [{
                          'balloonText': 'Periodo actual: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':''+color,
                          'lineAlpha': 0.2,
                          'type': 'column',
                          'valueField': 'currentPeriod',
                          'labelText':'[[value]]'
                        },{
                          'balloonText': 'Periodo anterior: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':'#27509d',
                          'lineAlpha': 0.2,
                          'type': 'column',
                          'valueField': 'previousPeriod',
                          'labelText':'[[value]]'
                        },{
                          'balloonText': 'Promedio de Grupo: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':'#38acb8',
                          'lineAlpha': 0.2,
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
                    eventSecurityTurns(data,title){
                      let color = '#4ba92b';
                      if(data[0].currentPeriod > data[0].previousPeriod){
                        color = '#ff0036';
                      }
                      this.chartSecurityTurns = this.AmCharts.makeChart('eventSecurityTurns', {
                        'type': 'serial',
                        'theme': 'light',
                        'dataProvider': data,
                        'valueAxes': [{
                          'minimum': 0,
                          'position': 'bottom',
                          'gridAlpha': 0,
                          'axisAlpha': 0
                        }],
                        'graphs': [{
                          'balloonText': 'Periodo actual: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':''+color,
                          'lineAlpha': 0.2,
                          'type': 'column',
                          'valueField': 'currentPeriod',
                          'labelText':'[[value]]'
                        },{
                          'balloonText': 'Periodo anterior: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':'#27509d',
                          'lineAlpha': 0.2,
                          'type': 'column',
                          'valueField': 'previousPeriod',
                          'labelText':'[[value]]'
                        },{
                          'balloonText': 'Promedio de Grupo: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':'#38acb8',
                          'lineAlpha': 0.2,
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

                    eventMechanicsBrakes(data,title){
                      let color = '#4ba92b';
                      if(data[0].currentPeriod > data[0].previousPeriod){
                        color = '#ff0036';
                      }
                      this.chartMechanicsBrakes = this.AmCharts.makeChart('eventMechanicsBrakes', {
                        'type': 'serial',
                        'theme': 'light',
                        'dataProvider': data,
                        'valueAxes': [{
                          'minimum': 0,
                          'position': 'bottom',
                          'gridAlpha': 0,
                          'axisAlpha': 0
                        }],
                        'graphs': [{
                          'balloonText': 'Periodo actual: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':''+color,
                          'lineAlpha': 0.2,
                          'type': 'column',
                          'valueField': 'currentPeriod',
                          'labelText':'[[value]]'
                        },{
                          'balloonText': 'Resultado anterior: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':'#27509d',
                          'lineAlpha': 0.2,
                          'type': 'column',
                          'valueField': 'previousPeriod',
                          'labelText':'[[value]]'
                        },{
                          'balloonText': 'Promedio de Grupo: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':'#38acb8',
                          'lineAlpha': 0.2,
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

                    eventMechanicsGearbox(data,title){
                      let color = '#4ba92b';
                      if(data[0].currentPeriod > data[0].previousPeriod){
                        color = '#ff0036';
                      }
                      this.chartMechanicsGearbox = this.AmCharts.makeChart('eventMechanicsGearbox', {
                        'type': 'serial',
                        'theme': 'light',
                        'dataProvider': data,
                        'valueAxes': [{
                          'minimum': 0,
                          'position': 'bottom',
                          'gridAlpha': 0,
                          'axisAlpha': 0
                        }],
                        'graphs': [{
                          'balloonText': 'Periodo actual: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':''+color,
                          'lineAlpha': 0.2,
                          'type': 'column',
                          'valueField': 'currentPeriod',
                          'labelText':'[[value]]'
                        },{
                          'balloonText': 'Resultado anterior: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':'#27509d',
                          'lineAlpha': 0.2,
                          'type': 'column',
                          'valueField': 'previousPeriod',
                          'labelText':'[[value]]'
                        },{
                          'balloonText': 'Promedio de Grupo: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':'#38acb8',
                          'lineAlpha': 0.2,
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

                    eventMechanicsFuel(data,title){
                      let color = '#4ba92b';
                      if(data[0].currentPeriod > data[0].previousPeriod){
                        color = '#ff0036';
                      }
                      this.chartMechanicsFuel = this.AmCharts.makeChart('eventMechanicsFuel', {
                        'type': 'serial',
                        'theme': 'light',
                        'dataProvider': data,
                        'valueAxes': [{
                          'minimum': 0,
                          'position': 'bottom',
                          'gridAlpha': 0,
                          'axisAlpha': 0
                        }],
                        'graphs': [{
                          'balloonText': 'Periodo actual: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':''+color,
                          'lineAlpha': 0.2,
                          'type': 'column',
                          'valueField': 'currentPeriod',
                          'labelText':'[[value]]'
                        },{
                          'balloonText': 'Resultado anterior: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':'#27509d',
                          'lineAlpha': 0.2,
                          'type': 'column',
                          'valueField': 'previousPeriod',
                          'labelText':'[[value]]'
                        },{
                          'balloonText': 'Promedio de Grupo: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':'#38acb8',
                          'lineAlpha': 0.2,
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

                    eventMechanicsEngine(data,title){
                      let color = '#4ba92b';
                      if(data[0].currentPeriod > data[0].previousPeriod){
                        color = '#ff0036';
                      }
                      this.chartMechanicsEngine = this.AmCharts.makeChart('eventMechanicsEngine', {
                        'type': 'serial',
                        'theme': 'light',
                        'dataProvider': data,
                        'valueAxes': [{
                          'minimum': 0,
                          'position': 'bottom',
                          'gridAlpha': 0,
                          'axisAlpha': 0
                        }],
                        'graphs': [{
                          'balloonText': 'Periodo actual: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':''+color,
                          'lineAlpha': 0.2,
                          'type': 'column',
                          'valueField': 'currentPeriod',
                          'labelText':'[[value]]'
                        },{
                          'balloonText': 'Resultado anterior: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':'#27509d',
                          'lineAlpha': 0.2,
                          'type': 'column',
                          'valueField': 'previousPeriod',
                          'labelText':'[[value]]'
                        },{
                          'balloonText': 'Promedio de Grupo: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':'#38acb8',
                          'lineAlpha': 0.2,
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
                    eventMechanicsGear(data,title){
                      let color = '#4ba92b';
                      if(data[0].currentPeriod > data[0].previousPeriod){
                        color = '#ff0036';
                      }
                      this.chartMechanicsGear = this.AmCharts.makeChart('eventMechanicsGear', {
                        'type': 'serial',
                        'theme': 'light',
                        'dataProvider': data,
                        'valueAxes': [{
                          'minimum': 0,
                          'position': 'bottom',
                          'gridAlpha': 0,
                          'axisAlpha': 0
                        }],
                        'graphs': [{
                          'balloonText': 'Periodo actual: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':''+color,
                          'lineAlpha': 0.2,
                          'type': 'column',
                          'valueField': 'currentPeriod',
                          'labelText':'[[value]]'
                        },{
                          'balloonText': 'Resultado anterior: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':'#27509d',
                          'lineAlpha': 0.2,
                          'type': 'column',
                          'valueField': 'previousPeriod',
                          'labelText':'[[value]]'
                        },{
                          'balloonText': 'Promedio de Grupo: [[value]]',
                          'fillAlphas': 1,
                          'fillColors':'#38acb8',
                          'lineAlpha': 0.2,
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
                    ngOnDestroy() {
                      this.AmCharts.destroyChart(this.chartFuel);
                      this.AmCharts.destroyChart(this.chartSecurity);
                      this.AmCharts.destroyChart(this.chartMechanics);
                      this.AmCharts.destroyChart(this.chartSecurityAceleration);
                      this.AmCharts.destroyChart(this.chartSecuritySpeed);
                      this.AmCharts.destroyChart(this.chartSecurityBraking);
                      this.AmCharts.destroyChart(this.chartSecurityTurns);
                    }

                    printProcess(printType: string): void {
                        this.reportsService.printReport(printType, this.dataprovider, 'conduct/operator');
                    }

                  }
