import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'motum-report-graph',
  templateUrl: './motumReportGraph.component.html',
  styleUrls: ['./motumReportGraph.component.scss']
})
export class MotumReportGraphComponent implements OnInit, OnDestroy {

  @Input() title: String;

  constructor() { }

  ngOnInit() {
   
  }

  ngOnDestroy(){
  }

}
