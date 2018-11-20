import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import {ChangeSpaceColsAndRowsService} from "../../../../../../shared/providers/changeSpaceColsAndRows.service";
import { MonitoringReactionService } from '../../../../montoringReaction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'installed-devices',
  templateUrl: './installedDevices.component.html',
  styleUrls: ['./installedDevices.component.scss']
})
export class InstalledDevicesComponent implements OnInit, OnDestroy {
  @Input() idVehicle:string;
  //installedDevices: Array<any>;
  installedDevices:any={};
  idVehicleSelected:string;
  headerTable:any;
  $subcripcionIdVehicle:Subscription;
  $subcripcionDetailSensor:Subscription;
  totalDevices:number;

  //translate
  installedDevice = 'pages.monitoringreaction.positionvehicle.installedDevices';
  nameSensor = 'pages.monitoringreaction.positionvehicle.nameSensor';
  userAlias = 'pages.monitoringreaction.positionvehicle.userAlias';
  location = 'pages.monitoringreaction.positionvehicle.location';
  value = 'pages.monitoringreaction.positionvehicle.value';
  

  constructor(private _monitoringService: ChangeSpaceColsAndRowsService,private _serviceMonitorinReaction:MonitoringReactionService) 
  { 
      
      this.headerTable =[
        {
            "title": "#"
        },
        {
            "title": "pages.monitoringreaction.positionvehicle.nameSensor"
        },
        {
            "title": "pages.monitoringreaction.positionvehicle.userAlias"
        },
        {
            "title": "pages.monitoringreaction.positionvehicle.location"
        },
        {
            "title": "pages.monitoringreaction.positionvehicle.value"
        }
    ];

      this._serviceMonitorinReaction.vehicleSelectedSubject$.subscribe(
          id=>{
              this.getDetailSensors();
          },
          err=>{
            console.log(err);
            }       
            );
  }
  ngOnInit() {
    
    this._monitoringService.tmOnChangeMenuSize('SUBMENU_1', 9 , 12);
    this.getDetailSensors();
  }

  ngOnDestroy(){
    this._monitoringService.tmOnChangeMenuSize('SUBMENU_1', 3 , 12);
    //this.$subcripcionDetailSensor.unsubscribe();
  }

  getDetailSensors(){
      
    this.$subcripcionDetailSensor = this._serviceMonitorinReaction.unitDetailSensors(this.idVehicle).subscribe(
        res=>{
        const body = JSON.parse(res['_body']);
        this.installedDevices = body;
        this.totalDevices = this.installedDevices.devicesSensors.length;                
      },
      err=>{
        console.log(err);
      }
    );
  }
}
