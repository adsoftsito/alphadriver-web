import {Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter} from "@angular/core";
/**
 * Created by Tech Group BWL on 18/07/2018.
 */

@Component({
  selector: 'mr-update-tools-component',
  templateUrl: './updateTools.component.html',
  styleUrls: ['./updateTools.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MonitoringReactionUpdateToolsComponent implements OnInit{
  @Input('isAutomatic') isAutomatic: boolean = false;
  @Input('isRealTime') isRealTime: boolean = false;

  @Output() automaticToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() realTimeToggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  onChangeAutomatic() {
    this.isAutomatic = !this.isAutomatic;
    this.automaticToggled.emit(this.isAutomatic);
  }

  onChangeRealTime() {
    this.isRealTime = !this.isRealTime;
    this.realTimeToggled.emit(this.isRealTime);
  }
}