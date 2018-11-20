import {Component, OnDestroy, OnInit, Input} from "@angular/core";

/**
 * Created by Tech Group BWL on 14/08/2018.
 */

@Component({
    selector: 'motum-multilevel-table',
    templateUrl: './motumMultiLevelTable.html',
    styleUrls: ['./motumMultiLevelTable.scss']
})
export class MotumMultiLevelTable implements OnDestroy, OnInit {
  @Input() productsList: string;
  constructor() {

  }

  ngOnInit() {

  }
  ngOnDestroy() {

  }
}
