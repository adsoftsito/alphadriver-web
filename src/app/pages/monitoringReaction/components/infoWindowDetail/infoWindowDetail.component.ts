/**
 * Created by Tech Group BWL on 23/08/2018.
 */
import {Component, Input, OnInit, OnChanges, SimpleChanges, ViewEncapsulation} from "@angular/core";
import {Constants} from "../../../../shared/providers/constants";
@Component({
  selector: 'mr-info-window-detail-component',
  templateUrl: './infoWindowDetail.component.html',
  styleUrls: ['./infoWindowDetail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MonitoringReactionInfoWindowDetailComponent implements OnInit, OnChanges {
  @Input() unit: any;

  private _GM_KEY: string;
  private _googleUrl: string = 'https://maps.googleapis.com/maps/api/streetview?';
  private _viewStreetSizeImg: string = '400x100';
  private _location: string = '0,0';
  private _fov: string = '120';//by default is 90
  private _compassHeading: string = '151';//North=0|360,East=90,South=180
  private _pitch: string = '10';
  private _signature: string = '';

  viewStreetUrl: string = '';

  constructor(private C: Constants){
    this._GM_KEY = this.C.GOOGLE_MAPS_API_KEY;
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['unit']) {
      this.createUrlViewStreet();
    }
  }

  createUrlViewStreet() {
    this._location = `${this.unit.lat},${this.unit.lng}`;
    this.viewStreetUrl
      = `${this._googleUrl}size=${this._viewStreetSizeImg}
      &location=${this._location}
      &fov=${this._fov}
      &heading=${this._compassHeading}
      &pitch=${this._pitch}
      &key=${this._GM_KEY}`;
  }

  withoutFunctionality() {
    alert('Without functionality');
  }
}