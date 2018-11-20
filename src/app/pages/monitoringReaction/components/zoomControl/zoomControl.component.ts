import {Component, OnInit, Output, EventEmitter} from "@angular/core";
/**
 * Created by Tech Group BWL on 29/06/2018.
 */
@Component({
  selector: 'mr-zoom-control-component',
  templateUrl: './zoomControl.component.html',
  styleUrls: ['./zoomControl.component.scss'],
})
export class MonitoringReactionZoomControlComponent implements OnInit{

  ZOOM_IN: string = 'ZOOM_IN';
  ZOOM_OUT: string = 'ZOOM_OUT';

  @Output() clickedButton = new EventEmitter<string>();

  constructor(){}

  ngOnInit() {}

  zoomIn() {
    this.clickedButton.emit(this.ZOOM_IN);
  }
  zoomOut() {
    this.clickedButton.emit(this.ZOOM_OUT);
  }
}