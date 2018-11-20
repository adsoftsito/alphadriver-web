import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'motum-report-card-information',
  templateUrl: './motumReportCardInformation.component.html',
  styleUrls: ['./motumReportCardInformation.component.scss']
})
export class MotumReportCardInformationComponent implements OnInit {

 @Input() dataCard: String;
 @Input() titleCard: String;
 @Input()  measure: String;
 
  constructor() { }

  ngOnInit() {
  }

}
