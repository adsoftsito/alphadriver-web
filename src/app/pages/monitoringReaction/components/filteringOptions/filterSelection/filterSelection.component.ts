import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {ChangeSpaceColsAndRowsService} from "../../../../../shared/providers/changeSpaceColsAndRows.service";
import { NgForm } from '@angular/forms';
/**
 * Created by Tech Group BWL on 23/07/2018.
 */
@Component({
  selector: 'fo-filter-selection',
  templateUrl: './filterSelection.component.html',
  styleUrls: ['./filterSelection.component.scss']
})
export class FilteringOptionsFilterSelectionComponent implements OnInit, OnDestroy, OnChanges {
     @Input() flagOperationStatus: boolean;
     @Input() flagPointsInterest: boolean;
     @Input() flagTypeVehicle: boolean;
     @Input() flagServiceStatus: boolean;
     @Input() chipsSelectedInterestPoint: any;
     @Input() chipsSelectedTypeVehicle: any;
     @Input() chipsSelectedServiceStatus: any;
     @Input() mainDataModel: any;

  @Output() sendOptions = new EventEmitter<any>();
  @Output() sendOptionsPI = new EventEmitter<any>();
  @Output() sendOptionsTV = new EventEmitter<any>();
  @Output() sendOptionsSS = new EventEmitter<any>();
  @Output() closeFS = new EventEmitter<any>();
  operationStatus: Array<any> = [];
  pointsInterest: Array<any> = [];
  typeVehicle: Array<any> = [];
  serviceStatus: Array<any> = [];
  sendOperationStatus: Array<any> = [];
  sendPointsInterest: Array<any> = [];
  sendTypeVehicle: Array<any> = [];
  sendServiceStatus: Array<any> = [];
  prevDataInterestPoint;




  constructor(private _monitoringService: ChangeSpaceColsAndRowsService) {


  }

  ngOnChanges(change: SimpleChanges){
      console.log(this.prevDataInterestPoint);
  }

  ngOnInit() {
    this._monitoringService.tmOnChangeMenuSize('SUBMENU_1', 6 , 12);


      this.operationStatus      = this.mainDataModel[0].operationalStatus;
      this.pointsInterest       = this.mainDataModel[0].pointsInterest;
      this.typeVehicle          = this.mainDataModel[0].typeVehicle;
      this.serviceStatus        = this.mainDataModel[0].serviceStatus;

     setTimeout((d)=>{
         this.prevDataInterestPoint= this.chipsSelectedInterestPoint;
         console.log(this.prevDataInterestPoint);
     },1000);
      this.sendPointsInterest   = this.chipsSelectedInterestPoint;
      this.sendServiceStatus    = this.chipsSelectedServiceStatus;
      this.sendTypeVehicle      = this.chipsSelectedTypeVehicle;



      for(let item of this.pointsInterest){
          item.checked = false;
          for (let chip of this.chipsSelectedInterestPoint){
              if (item.code === chip.code){
                  item.checked = true;
              }
          }
      }

      for(let item of this.typeVehicle){
          item.checked = false;
          for (let chip of this.chipsSelectedTypeVehicle){
              if (item.code === chip.code){
                  item.checked = true;
              }
          }
      }

      for(let item of this.serviceStatus){
          item.checked = false;
          for (let chip of this.chipsSelectedServiceStatus){
              if (item.code === chip.code){
                  item.checked = true;
              }
          }
      }

  }

  onCheckboxChange(option, event) {
      for (let data of this.serviceStatus) {
          if (data.id == option.id) {
              data.checked = event.target.checked;
          }
      }
    if (event.target.checked) {
        this.sendOperationStatus.push(option);
    } else {
        for (let i = 0; i < this.sendOperationStatus.length; i++) {
            if (this.sendOperationStatus[i].code == option.code) {
                this.sendOperationStatus.splice(i, 1);
            }
        }
    }
}
changePointsInterest(option, event) {
    for (let data of this.serviceStatus) {
        if (data.id == option.id) {
            data.checked = event.target.checked;
        }
    }
    if (event.target.checked) {
        this.sendPointsInterest.push(option);
    } else {
        for (let i = 0; i < this.sendPointsInterest.length; i++) {
            if (this.sendPointsInterest[i].code == option.code) {
                this.sendPointsInterest.splice(i, 1);
            }
        }
    }
}
changeTypeVehicle(option, event) {
    for (let data of this.serviceStatus) {
        if (data.id == option.id) {
            data.checked = event.target.checked;
        }
    }
    if (event.target.checked) {
        this.sendTypeVehicle.push(option);
    } else {
        for (let i = 0; i < this.sendTypeVehicle.length; i++) {
            if (this.sendTypeVehicle[i].code == option.code) {
                this.sendTypeVehicle.splice(i, 1);
            }
        }
    }
}
changeServiceStatus(option, event) {
    for (let data of this.serviceStatus){
        if (data.id == option.id){
            data.checked = event.target.checked;
        }
    }
    if (event.target.checked) {
        this.sendServiceStatus.push(option);
    } else {
        for (let i = 0; i < this.sendServiceStatus.length; i++) {
            if (this.sendServiceStatus[i].code == option.code) {
                this.sendServiceStatus.splice(i, 1);
            }
        }
    }
}
  
selectionFilteringOptions(){
    this.sendOptions.emit(this.sendOperationStatus);
    this.sendOperationStatus = [];
  }
selectionPointsInterest(){
    this.sendOptionsPI.emit(this.sendPointsInterest);
    this.sendPointsInterest = [];
  }
selectionTypeVehicle(){
    this.sendOptionsTV.emit(this.sendTypeVehicle);
    this.sendTypeVehicle = [];
  }
selectionServiceStatus(){
    this.sendOptionsSS.emit(this.sendServiceStatus);
    this.sendOperationStatus = [];
  }

closeFilterSelection() {
    console.log(this.prevDataInterestPoint);
    this.closeFS.emit();

}

  ngOnDestroy(){
    this._monitoringService.tmOnChangeMenuSize('SUBMENU_1', 3 , 12);
    this.sendOperationStatus = null;
  }


}
