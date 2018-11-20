import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AmChartsService } from '@amcharts/amcharts3-angular';
import { ReportsService } from '../../../reports.service';
import { NgFor } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'report-security-conductor',
  templateUrl: 'operator.component.html',
  styleUrls: ['operator.component.scss'],
  providers: [AmChartsService, ReportsService]
})
export class OperationalSecurityOperatorComponent implements OnInit, OnDestroy {
  @Input() dataprovider: any;
  chartFuel: any;
  chartSecurity: any;
  chartFuelR: any;
  chartSecurityAceleration: any;
  chartSecuritySpeed: any;
  chartSecurityBraking: any;
  chartSecurityTurns: any;
  chartSecurityCount: any;

  showPrintIcons: boolean = false;
  classReportForPrint: boolean = false;

  constructor(
      private AmCharts: AmChartsService,
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

    if (this.dataprovider.driverPerformance.fuelEfficiency.dataProvider !== null) {
      this.fuelEfficiency(this.dataprovider.driverPerformance.fuelEfficiency.dataProvider
      , this.dataprovider.driverPerformance.fuelEfficiency.title);
    }

    if (this.dataprovider.ratings.security.dataProvider !== null) {
      this.ratingsSecurity(this.dataprovider.ratings.security.dataProvider);
    }

    if (this.dataprovider.ratings.fuel.dataProvider !== null) {
      this.ratingsFuel(this.dataprovider.ratings.fuel.dataProvider);
    }

    if (this.dataprovider.event100h.securityEvents.acceleration.dataProvider !== null) {
      this.eventSecurityAceleration(this.dataprovider.event100h.securityEvents.acceleration.dataProvider);
    }

    if (this.dataprovider.event100h.securityEvents.speed.dataProvider !== null) {
      this.eventSecuritySpeed(this.dataprovider.event100h.securityEvents.speed.dataProvider);
    }

    if (this.dataprovider.event100h.securityEvents.Braking.dataProvider !== null) {
      this.eventSecurityBraking(this.dataprovider.event100h.securityEvents.Braking.dataProvider);
    }

    if (this.dataprovider.event100h.securityEvents.turns.dataProvider !== null) {
      this.eventSecurityTurns(this.dataprovider.event100h.securityEvents.turns.dataProvider);
    }

    if (this.dataprovider.event100h.countSecurityEvents.dataProvider !== null) {
      this.eventSecurityCounts(this.dataprovider.event100h.countSecurityEvents.dataProvider,
        this.dataprovider.event100h.countSecurityEvents.subTitle);
      }
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
        }, {
          'position': 'top',
          'title': title
        }],
        'graphs': [{
          'balloonText': '[[category]]: <b>[[value]]</b>',
          'fontSize': 12,
          'fillAlphas': 1,
          'lineAlpha': 0,
          'fillColors': '#38acb8',
          'type': 'column',
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
          'lineAlpha': 0,
          'fillColors': ''+color,
          'type': 'column',
          'labelText': '[[value]]',
          'valueField': 'security',
          'title': 'Seguridad',
        }, {
          'balloonText': 'Resultado anterior: [[value]]',
          'fillColors': '#f6b63d',
          'fillAlphas': 1,
          'lineAlpha': 0,
          'type': 'column',
          'labelText': '[[value]]',
          'valueField': 'previousResult',
          'title': 'Resultado Previo',
        }, {
          'balloonText': 'Promedio de Grupo: [[value]]',
          'fillColors': '#67b7dc',
          'fillAlphas': 1,
          'lineAlpha': 0,
          'type': 'column',
          'labelText': '[[value]]',
          'valueField': 'averageGroup',
          'title': 'Promedio de Grupo',
        }],
        'rotate': true,
        'categoryAxis': {
          'gridPosition': 'start',
          'gridAlpha': 0,
          'labelsEnabled': false,
        },
      });
    }

    ratingsFuel(data) {
      let color = '#97be11';
      if (data[0].fuel > data[0].previousResult) {
        color = '#ff0036';
      }
      this.chartFuelR = this.AmCharts.makeChart('ratingsFuelR', {
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
          'fillColors': ''+color,
          'fillAlphas': 1,
          'lineAlpha': 0,
          'type': 'column',
          'labelText': '[[value]]',
          'valueField': 'fuel'
        }, {
          'balloonText': 'Resultado anterior: [[value]]',
          'fillColors': '#f6b63d',
          'fillAlphas': 1,
          'lineAlpha': 0,
          'type': 'column',
          'labelText': '[[value]]',
          'valueField': 'previousResult'
        }, {
          'balloonText': 'Promedio de Grupo: [[value]]',
          'fillColors': '#67b7dc',
          'fillAlphas': 1,
          'lineAlpha': 0,
          'type': 'column',
          'labelText': '[[value]]',
          'valueField': 'averageGroup'
        }],
        'rotate': true,
        'categoryAxis': {
          'labelsEnabled': false
        }
      });
    }

    eventSecurityAceleration(data) {
      let color = '#4ba92b';
      if(data[0].currentPeriod > data[0].previousPeriod) {
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
          'fillColors': ''+color,
          'fillAlphas': 1,
          'lineAlpha': 0,
          'type': 'column',
          'valueField': 'currentPeriod',
          'labelText': '[[value]]'
        }, {
          'balloonText': 'Periodo anterior: [[value]]',
          'fillColors': '#27509d',
          'fillAlphas': 1,
          'lineAlpha': 0,
          'type': 'column',
          'labelText': '[[value]]',
          'valueField': 'previousPeriod'
        }, {
          'balloonText': 'Promedio de Grupo: [[value]]',
          'fillColors': '#38acb8',
          'fillAlphas': 1,
          'lineAlpha': 0,
          'type': 'column',
          'labelText': '[[value]]',
          'valueField': 'averageGroup'
        }],
        'rotate': true,
        'categoryAxis': {
          'labelsEnabled': false
        }
      });
    }

    eventSecuritySpeed(data) {
      let color = '#4ba92b';
      if(data[0].currentPeriod > data[0].previousPeriod) {
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
          'fillColors': ''+color,
          'fillAlphas': 1,
          'lineAlpha': 0,
          'type': 'column',
          'labelText': '[[value]]',
          'valueField': 'currentPeriod'
        }, {
          'balloonText': 'Periodo anterior: [[value]]',
          'fillColors': '#27509d',
          'fillAlphas': 1,
          'lineAlpha': 0,
          'type': 'column',
          'labelText': '[[value]]',
          'valueField': 'previousPeriod'
        }, {
          'balloonText': 'Promedio de Grupo: [[value]]',
          'fillColors': '#38acb8',
          'fillAlphas': 1,
          'lineAlpha': 0,
          'type': 'column',
          'labelText': '[[value]]',
          'valueField': 'averageGroup'
        }],
        'rotate': true,
        'categoryAxis': {
          'labelsEnabled': false
        }
      });
    }

    eventSecurityBraking(data) {
      let color = '#4ba92b';
      if (data[0].currentPeriod > data[0].previousPeriod) {
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
          'fillColors':  ''+color,
          'fillAlphas': 1,
          'lineAlpha': 0,
          'type': 'column',
          'labelText': '[[value]]',
          'valueField': 'currentPeriod'
        }, {
          'balloonText': 'Periodo anterior: [[value]]',
          'fillColors': '#27509d',
          'fillAlphas': 1,
          'lineAlpha': 0,
          'type': 'column',
          'labelText': '[[value]]',
          'valueField': 'previousPeriod'
        }, {
          'balloonText': 'Promedio de Grupo: [[value]]',
          'fillColors': '#38acb8',
          'fillAlphas': 1,
          'lineAlpha': 0,
          'type': 'column',
          'labelText': '[[value]]',
          'valueField': 'averageGroup'
        }],
        'rotate': true,
        'categoryAxis': {
          'labelsEnabled': false
        }
      });
    }
    eventSecurityTurns(data) {
      let color = '#4ba92b';
      if (data[0].currentPeriod > data[0].previousPeriod) {
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
          'fillColors': ''+color,
          'fillAlphas': 1,
          'lineAlpha': 0,
          'type': 'column',
          'labelText': '[[value]]',
          'valueField': 'currentPeriod'
        }, {
          'balloonText': 'Periodo anterior: [[value]]',
          'fillColors': '#27509d',
          'fillAlphas': 1,
          'lineAlpha': 0,
          'type': 'column',
          'labelText': '[[value]]',
          'valueField': 'previousPeriod'
        }, {
          'balloonText': 'Promedio de Grupo: [[value]]',
          'fillColors': '#38acb8',
          'fillAlphas': 1,
          'lineAlpha': 0,
          'type': 'column',
          'labelText': '[[value]]',
          'valueField': 'averageGroup'
        }],
        'rotate': true,
        'categoryAxis': {
          'labelsEnabled': false
        }
      });
    }

    eventSecurityCounts(data, title) {
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

      this.chartSecurityCount = this.AmCharts.makeChart('eventSecurityCounts', {
        'type': 'serial',
        'theme': 'light',
        'dataProvider': data,
        'marginRight': 70,
        'valueAxes': [{
          'stackType': '3d',
          'minimum': 0,
          'position': 'left',
          'title': title,
          'gridAlpha': 0,
          'axisAlpha': 0
        }],
        'graphs': [{
          'balloonText': 'Valor: [[value]]',
          'fontSize': 12,
          'fillAlphas': 1,
          'lineAlpha': 0,
          'type': 'column',
          'fillColorsField': 'color',
          'labelText': '[[value]]',
          'valueField': 'value'
        }],
        'rotate': false,
        'categoryField': 'data',
        'categoryAxis': {
          'labelsEnabled': true,
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
    }
    printProcess(printType: string): void {
        this.reportsService.printReport(printType, this.dataprovider, 'security/operator');
    }
  }
