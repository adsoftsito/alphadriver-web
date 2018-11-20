import { Component, ViewEncapsulation, OnDestroy, OnInit, HostListener, Input, ViewChild,
    AfterViewInit, OnChanges, SimpleChanges, EventEmitter, Output} from '@angular/core';
import { AmChartsService } from '@amcharts/amcharts3-angular';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
/**
* Created by Tech Group BWL on 06/10/2018.
*/


@Component({
  selector: 'motum-graphics-information-component',
  templateUrl: './graphics.information.component.html',
  styleUrls: ['./graphics.information.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphicsInformationComponent implements OnDestroy, OnInit, AfterViewInit, OnChanges {
  chart: any;
  defaultFontFamily: string = "Rubik";
  @Input() chartData;
  @Input() graphicId;
  @Input() categories;
  @Input() configuration;
  @Input() graphicTitle;
  @Input() heightVh;

  @Output() categoryChange = new EventEmitter();
  constructor(private AmCharts: AmChartsService) {
  }

  ngAfterViewInit() {
    if (this.chartData && this.configuration) {
      if (this.chartData.dataProvider) {
        this.configuration.dataProvider = this.chartData.dataProvider;
      }
      if(this.configuration.allLabels && this.chartData.labelList){
        for (let i = 0; i < this.chartData.labelList.length; i++) {
          if (this.configuration.allLabels[i] && this.chartData.labelList[i]) {
            this.configuration.allLabels[i].text = this.chartData.labelList[i];
          }
        }
      }
      this.configuration.fontFamily = this.defaultFontFamily;
      setTimeout(() => {
        this.chart = this.AmCharts.makeChart(this.graphicId, this.configuration);
      }, 100);
    }
  }

  /** LIFECYCLE ANGULAR METHODS **/
  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData'] !== null) {
      this.ngAfterViewInit();
    }
   }

  ngOnDestroy(){
    this.AmCharts.destroyChart(this.chart);
  }

  beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId) {
      this.categoryChange.emit($event.nextId);
    }
  }

}
