import { Component, OnInit, Input, OnChanges,OnDestroy } from '@angular/core';
import { MonitoringReactionService } from '../../../montoringReaction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mr-operator',
  templateUrl: './mr-operator.component.html',
  styleUrls: ['./mr-operator.component.scss']
})
export class MonitoringReactionOperatorComponent implements OnInit,OnChanges,OnDestroy {
@Input() idVehicle:string;
dataVehicleSelected:any;
$subscripOperatorDetail:Subscription;

  constructor(private _serviceMonitoringReaction:MonitoringReactionService) { 
   }

  ngOnInit() {
  }
  ngOnChanges(){
   this.getInformation();   
  }

  ngOnDestroy(){
    this.$subscripOperatorDetail.unsubscribe();
  }

  getInformation(){
    this.$subscripOperatorDetail = this._serviceMonitoringReaction.unitDetailOperator(this.idVehicle).subscribe(res=>{
      const body = JSON.parse(res['_body']);
      this.dataVehicleSelected = body;
    },
    err=>{
      console.log(err);
    }
    );
    
  }
}
