import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'motum-dashlet-card',
  templateUrl: './motumDashletCard.component.html',
  styleUrls: ['./motumDashletCard.component.scss']
})
export class MotumDashletCardComponent implements OnInit {

  @Input() dataCard;
  @Input() colorHeader;

  constructor() { }

  ngOnInit() {

   
    
  }

}
