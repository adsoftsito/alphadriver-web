import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'motum-report-subtitle',
  templateUrl: './motumReportSubtitle.component.html',
  styleUrls: ['./motumReportSubtitle.component.scss']
})
export class MotumReportSubtitleComponent implements OnInit {

  @Input() title: String;
  
  constructor() { }

  ngOnInit() {
  }

}
