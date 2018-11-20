import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import {ChangeSpaceColsAndRowsService} from "../../../shared/providers/changeSpaceColsAndRows.service";

@Component({
  selector: 'motum-fleet-selection',
  templateUrl: './motumFleetSelection.component.html',
  styleUrls: ['./motumFleetSelection.component.scss']
})
export class MotumFleetSelectionComponent implements OnInit, OnDestroy {

//  @Input() dataCard: String;
//  @Input() titleCard: String;
//  @Input()  measure: String;
@Output() closeSelection = new EventEmitter<any>();

  constructor(private _monitoringService: ChangeSpaceColsAndRowsService) { }

  ngOnInit() {
    this._monitoringService.tmOnChangeMenuSize('SUBMENU_1', 9 , 12);
  }

  closeFleetSelection(){
      this.closeSelection.emit();
  }

  ngOnDestroy(){
    this._monitoringService.tmOnChangeMenuSize('SUBMENU_1', 3 , 12);
  }

}
