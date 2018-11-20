import { Component,  ViewEncapsulation, Input, Output, EventEmitter, OnChanges, SimpleChange, OnInit, SimpleChanges, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {ChangeSpaceColsAndRowsService} from "../../../../shared/providers/changeSpaceColsAndRows.service";
import {EventsService} from "../../../../shared/providers/events";
import {Constants} from "../../../../shared/providers/constants";
import { MonitoringReactionService } from '../../montoringReaction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mr-vehicle-description',
  templateUrl: './vehicle-description.component.html',
  styleUrls: ['./vehicle-description.component.scss'],
  encapsulation: ViewEncapsulation.None
})



export class MonitoringReactionVehicleDescriptionComponent implements OnInit, OnChanges, OnDestroy {

  @Input() unitInformation: any [];

  operationalState:any;
  economicNumber:any;
  state: boolean = false;
  dataConsult :any;
  openActiveFaults:boolean;
  alterClass:string;
  permissionToOpenChatDetail: boolean = false;
  circlecolors;
  options = {
    status: false,
    circleColor: undefined
  };
  @Output() closeVehicleDescription = new EventEmitter<any>();
  closeVehicle: boolean = false;
  idVehicleSelected:string;
  unitDetail:any;
  $searchByUnit:Subscription;

  constructor(private _services :ChangeSpaceColsAndRowsService, private C: Constants,
   private event: EventsService,
   private _serviceMonitoringReaction: MonitoringReactionService,
   private cdr: ChangeDetectorRef
   ) {
    this.event.subscribe(this.C.EVENTS_SERVICE.MONITORING_REACTION_CHAT_DETAIL, (options) => {
      if(options.status){
        this.permissionToOpenChatDetail = options.status;
        this.state = options.status;
      }
      this.cdr.detectChanges();
    });
   }

   openChatDetail() {
     if(!this.permissionToOpenChatDetail){
       return;
     }
     this.state = !this.state;
     this.options.status = this.state;
     this.options.circleColor = this.circlecolors;
     this.event.publish(this.C.EVENTS_SERVICE.MONITORING_REACTION_CHAT_DETAIL, this.options);
   }

  ngOnInit() {
  }

  close(){
    this.closeVehicleDescription.emit(this.closeVehicle);
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.unitInformation){
      this.vehicleStatus(changes.unitInformation.currentValue[0].state.code);
      this.idVehicleSelected = changes.unitInformation.currentValue[0].economicNumber;
      this.dataConsult = changes;
    }else{
    }
  }


vehicleStatus(status:any){
  if(status === 'Stop-1'){
      this.circlecolors = 'purplecircle'
  }if(status === 'InMotion-1'){
      this.circlecolors = 'greencircle';
  }if(status === 'On-1'){
      this.circlecolors = 'orangecircle';
  }if(status === 'Off-1'){
     this.circlecolors = 'graycircle';
  }

}


expandSection(event){
  if(event){
    this._services.tmOnChangeMenuSize("SUBMENU_1", 6,12);
    this.openActiveFaults = event;
    this.alterClass="clase-prueba";
  }if(!event){
    this._services.tmOnChangeMenuSize("SUBMENU_1", 3,12);
    this.openActiveFaults = event;
    this.alterClass="default";
  }
  this.cdr.detectChanges();
}

changeWidthTabs(event){
  if(event){
    this.alterClass="change-width-tabs";
  }else{
    this.alterClass="default";
  }
  this.cdr.detectChanges();
}

changeWidthChat(event){
  this.permissionToOpenChatDetail = event;
  if(event){
    this.alterClass="change-width-chat";
  }else{
    this.alterClass="default";
  }
  this.cdr.detectChanges();
}

ngOnDestroy(){
  // this.event.unsubscribe(this.C.EVENTS_SERVICE.MONITORING_REACTION_CHAT_DETAIL);
  this._services.tmOnChangeMenuSize("SUBMENU_1", 3,12);
}


}
