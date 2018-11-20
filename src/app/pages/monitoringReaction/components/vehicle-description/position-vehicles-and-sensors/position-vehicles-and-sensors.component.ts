import { Component, OnInit, Input, OnChanges, EventEmitter, Output, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MonitoringReactionService } from '../../../montoringReaction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mr-position-vehicles-and-sensors',
  templateUrl: './position-vehicles-and-sensors.component.html',
  styleUrls: ['./position-vehicles-and-sensors.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MonitoringReactionPositionVehiclesAndSensorsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() idVehicle:string;
  compassRose:any;
  widthIDComponent: String = '';
  flagOpenID: boolean = false;
  //changeColorBtnSensor: String = 'btn-unselected';
  changeColorBtnSensor: string = 'secondary';
  changeColorBtnFollow: String = '';
  changeClass:string;
  @Output() changeWidthTabs = new EventEmitter<any>();
  numberEconomic:number=0;
  unitDetail:any;
  $searchByUnit:Subscription;

  ignitionStatus = ['Detenido', 'Apagado', 'Conduciendo', 'Encendido'];
  showIgnitionStatus:string;
  stoppedMotorStatus:string;
  signalSource:string;


  //translate
  follow = 'pages.monitoringreaction.positionvehicle.follow';
  entry = 'pages.monitoringreaction.positionvehicle.entry';
  departure = 'pages.monitoringreaction.positionvehicle.departure';
  sensors = 'pages.monitoringreaction.positionvehicle.sensors';
  sensor = 'pages.monitoringreaction.positionvehicle.sensor';
  installedDevices = 'pages.monitoringreaction.positionvehicle.installedDevices';
  nameSensor = 'pages.monitoringreaction.positionvehicle.nameSensor';
  userAlias = 'pages.monitoringreaction.positionvehicle.userAlias';
  location = 'pages.monitoringreaction.positionvehicle.location';
  value = 'pages.monitoringreaction.positionvehicle.value';
  stopped_motor='pages.monitoringreaction.positionvehicle.stopped_motor';


  constructor(private _serviceMonitoringReaction:MonitoringReactionService ) { 
  }

  ngOnInit() {
  }

  ngOnChanges(){
     this.getDetailVehicle();
     this._serviceMonitoringReaction.idVehicleSelected(this.idVehicle);
  }

  openID(flag){

    if(flag){
      this.flagOpenID = false;
      this.widthIDComponent = '';
      //this.changeColorBtnSensor =''
      this.changeColorBtnSensor = 'secondary';
      this.changeWidthTabs.emit(false);
    }else{
      this.flagOpenID = true;
      this.widthIDComponent = 'widthComponent';
      this.changeClass =  'containerButtonsPosition';
      this.changeColorBtnSensor = 'grey';   
      this.changeWidthTabs.emit(true);

    }
  }

  followUnit(){
    this.changeColorBtnFollow = 'followUnitClick';
  }

  ngOnDestroy(){
    this.$searchByUnit.unsubscribe();
    this.changeWidthTabs.emit(false);
    //this._serviceMonitoringReaction.vehicleSelectedSubject$.unsubscribe();
  }
  getDetailVehicle(){
    this.$searchByUnit = this._serviceMonitoringReaction.unitDetailPosition(this.idVehicle).subscribe(
      res=>{
      const body = JSON.parse(res['_body']);
      this.unitDetail = body;
      this.showIgnitionStatus = this.ignitionStatus[this.unitDetail.position.ignitionStatus]; 
      this.stoppedMotorStatus = this.unitDetail.position.stoppedMotorStatus == 0 ? 'Activo' : 'Desactivado';
      this.signalSource = this.unitDetail.position.signalSource == 0 ? 'Satelital' : 'Híbrida';
    },
    err=>{
      console.log(err);
    }
  );
   }
}


