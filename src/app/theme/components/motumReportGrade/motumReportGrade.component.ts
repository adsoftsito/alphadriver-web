import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'motum-report-grade',
  templateUrl: './motumReportGrade.component.html',
  styleUrls: ['./motumReportGrade.component.scss']
})
export class MotumReportGradeComponent implements OnInit {

  @Input() score: String;
  constructor() { }

  ngOnInit() {
  }

}
