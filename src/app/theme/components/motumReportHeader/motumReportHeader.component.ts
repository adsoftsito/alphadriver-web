import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'motum-report-header',
  templateUrl: './motumReportHeader.component.html',
  styleUrls: ['./motumReportHeader.component.scss']
})
export class MotumReportHeaderComponent implements OnInit {
  
  @Input() title: String;
  @Input() period: String;

  //image
  logoM: any = '../../../../../assets/images/logoM.png';


  constructor() { }

  ngOnInit() {
  }

}
