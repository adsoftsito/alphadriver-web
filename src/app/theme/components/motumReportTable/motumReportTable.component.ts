import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'motum-report-table',
  templateUrl: './motumReportTable.component.html',
  styleUrls: ['./motumReportTable.component.scss']
})
export class MotumReportTableComponent implements OnInit {

  @Input() title;
  @Input() subtitle;
  @Input() valueSubtitle;
  @Input() header;
  @Input() colspanNo;
  @Input() tableData;
  @Input() colorFirstTr;
  @Input() borderTopRadius;
  @Input() borderBottomRadius;
  @Input() colorTrBody;

  constructor() { }

  ngOnInit() {

    
  }

}
