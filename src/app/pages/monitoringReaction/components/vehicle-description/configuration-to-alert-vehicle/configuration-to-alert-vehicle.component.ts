import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { MonitoringReactionService } from '../../../montoringReaction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mr-configuration-to-alert-vehicle',
  templateUrl: './configuration-to-alert-vehicle.component.html',
  styleUrls: ['./configuration-to-alert-vehicle.component.scss']
})
export class MonitoringReactionConfigurationToAlertVehicleComponent implements OnInit,OnChanges,OnDestroy {

  @Input() idVehicle:string;
  $subcripcionAlert:Subscription;
  unitSettings:any;
  statusDeviceDeep:string;
  statusRemienderDriverId:string;
  statusWhistleIdle:string;
  statusSpeedWarning:string;
  statusBeepInDangerousDriving:string;
  statusSeatbeltWhistle:string;
  statusDrivingBeebInReversing:string;
  speedStart:string;
  speedEnd:string;


  constructor(private _serviceMonitoringReaction:MonitoringReactionService) {
   }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.$subcripcionAlert.unsubscribe();
  }

  ngOnChanges(){
    this.getDetail();
  }

  getDetail(){
    this.$subcripcionAlert = this._serviceMonitoringReaction.unitDetailSettings(this.idVehicle).subscribe(
      res =>{
        const body = JSON.parse(res['_body']);
        this.unitSettings = body.device;
        this.statusDeviceDeep = this.unitSettings.isDeviceDeep ? 'Encendido':'Apagado';
        this.statusRemienderDriverId = this.unitSettings.isRemienderDriverId ? 'Encendido':'Apagado';
        this.statusWhistleIdle = this.unitSettings.isWhistleIdle? 'Encendido':'Apagado';
        this.statusSpeedWarning = body.driverNotice.speedWarning.status? 'Encendido':'Apagado';
        this.statusBeepInDangerousDriving = body.driverNotice.isBeepInDangerousDriving? 'Encendido':'Apagado';
        this.statusSeatbeltWhistle = body.driverNotice.SeatbeltWhistle? 'Encendido':'Apagado';
        this.statusDrivingBeebInReversing = body.driverNotice.isDrivingBeebInReversing? 'Encendido':'Apagado';
        this.speedStart = body.driverNotice.speedWarning.start;
        this.speedEnd = body.driverNotice.speedWarning.end;
      },
      err=>{
        console.log(err);
      }
      )
  }
}
