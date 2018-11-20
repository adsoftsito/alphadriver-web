import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MonitoringReactionService } from '../../../montoringReaction.service';

@Component({
  selector: 'mr-vehicle-alerts',
  templateUrl: './vehicle-alerts.component.html',
  styleUrls: ['./vehicle-alerts.component.scss']
})
export class  MonitoringReactionVehicleAlertsComponent implements OnInit {

  updateDate;
  @Input() idVehicle:string;
  $subscriptionMonitoreoReaction:Subscription;
  unitDetail:any;

  constructor(private _serviceMonitoringReaction:MonitoringReactionService) { 
  }

  ngOnInit() {
  }

  ngOnChanges(){
    this.getDetail();
  }

  ngOnDestroy(){
    this.$subscriptionMonitoreoReaction.unsubscribe();
  }

  updateDataAlerts(){
    this.getDetail();
    this.updateDate = new Date;
   }

   getDetail(){
    this.$subscriptionMonitoreoReaction = this._serviceMonitoringReaction.unitDetailAlerts(this.idVehicle).subscribe(
      res =>{
        const body = JSON.parse(res['_body']);
        this.unitDetail = body;
      },
      err=>{
        console.log(err);
      }
      )
  }

  testData= [
    { "label":"Exceso límite de velocidad", "date":"24/06/18","hrs":"10:35 am", "isResolved":"resolved"},
    { "label":"Inhibidor de GPS detectado", "date":"24/06/18","hrs":"10:00 am", "isResolved":"isresolved"}
  ];

}
