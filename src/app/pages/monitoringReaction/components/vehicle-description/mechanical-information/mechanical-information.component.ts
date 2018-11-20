import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, OnChanges } from '@angular/core';
import {ChangeSpaceColsAndRowsService} from "../../../../../shared/providers/changeSpaceColsAndRows.service";
import { MonitoringReactionService } from '../../../montoringReaction.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'mr-mechanical-information',
  templateUrl: './mechanical-information.component.html',
  styleUrls: ['./mechanical-information.component.scss']
})
export class MonitoringReactionMechanicalInformationComponent implements OnInit, OnDestroy,OnChanges {

  @Input() idVehicle:string;
  @Output() openFiltering = new EventEmitter<any>();

  damper:boolean = true;
  //changeClass:string = "motum-btn next chage-property-btn-right";
  color:string = 'secondary';
  changeClass:string;
  changeClassModal:string = "modal-proportion";
  dataVehicleSelected:any;
  $subcriptionMechanicalDetail:Subscription;
  unitDetail:any;

  //traslate
  year = 'general.year';
  mechanicalInformation = 'pages.monitoringreaction.mechanicalInformation.';
  brand = 'pages.monitoringreaction.mechanicalInformation.brand';
  model ='pages.monitoringreaction.mechanicalInformation.model';
  plates = 'pages.monitoringreaction.mechanicalInformation.plates';
  brandMotor ='pages.monitoringreaction.mechanicalInformation.brandMotor';
  modelMotor = 'pages.monitoringreaction.mechanicalInformation.modelMotor';
  hoursMotor = 'pages.monitoringreaction.mechanicalInformation.hoursMotor';
  transmissionBrand = 'pages.monitoringreaction.mechanicalInformation.transmissionBrand';
  transmissionModel = 'pages.monitoringreaction.mechanicalInformation.transmissionModel';
  brakes = 'pages.monitoringreaction.mechanicalInformation.brakes';
  odometer = 'pages.monitoringreaction.mechanicalInformation.odometer';
  combustible = 'pages.monitoringreaction.mechanicalInformation.combustible';
  maintPreventive = 'pages.monitoringreaction.mechanicalInformation.maintPreventive';
  carrier = 'pages.monitoringreaction.mechanicalInformation.carrier';
  operation =  'pages.monitoringreaction.mechanicalInformation.operation';
  diagnosticStatus = 'pages.monitoringreaction.mechanicalInformation.diagnosticStatus';
  vehicularHealth = 'pages.monitoringreaction.mechanicalInformation.vehicularHealth';
  probablyGreaterDamage = 'pages.monitoringreaction.mechanicalInformation.probablyGreaterDamage';
  nowMaint = 'pages.monitoringreaction.mechanicalInformation.nowMaint';
  soonMaint = 'pages.monitoringreaction.mechanicalInformation.soonMaint';
  optimalMaint = 'pages.monitoringreaction.mechanicalInformation.optimalMaint';
  fleetHealth = 'pages.monitoringreaction.mechanicalInformation.fleetHealth';
  activeFaults = 'pages.monitoringreaction.mechanicalInformation.activeFaults';


  constructor(private _services :ChangeSpaceColsAndRowsService,private _serviceMonitoringService:MonitoringReactionService) { 
  }

  ngOnInit() {
    this.changeClassModal= "modal-proportion";
  }

  openActiveFaults(damper:boolean){
    if(damper===true){
      this.openFiltering.emit(damper);
      setTimeout(() => this.damper = false, 10);
      //this.changeClass = "motum-btn next chage-property-btn-right-negative";
      this.changeClass = "containerButtons";
      this.color = 'grey';
      this.changeClassModal= "modal-proportion1";
      
    }else{
      this.openFiltering.emit(damper);
      setTimeout(() => this.damper = true, 10);
      //this.changeClass = "motum-btn next chage-property-btn-right";
      this.color = 'secondary';
      this.changeClassModal= "modal-proportion";
    }
  }

  ngOnDestroy() {
    this.openFiltering.emit(false);
    this.$subcriptionMechanicalDetail.unsubscribe();
  }

  ngOnChanges(){
    this.getDetail();
  }

  getDetail(){
    this.$subcriptionMechanicalDetail = this._serviceMonitoringService.unitDetailMaintenances(this.idVehicle).subscribe(
      res =>{
        const body = JSON.parse(res['_body']);
        this.unitDetail = body;
      },
      err=>{
        console.log(err);
      }
      )
  }
}
