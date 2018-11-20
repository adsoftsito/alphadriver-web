import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {ChangeSpaceColsAndRowsService} from "../../../../../../shared/providers/changeSpaceColsAndRows.service";
import { NgForm } from '@angular/forms';
/**
 * Created by Tech Group BWL on 23/07/2018.
 */
@Component({
  selector: 'fo-filter-selection',
  templateUrl: './filterSelection.component.html',
  styleUrls: ['./filterSelection.component.scss']
})
export class FilteringOptionsFilterSelectionComponent implements OnInit, OnDestroy {
     @Input() flagOperationStatus: boolean;
     @Input() flagPointsInterest: boolean;
     @Input() flagTypeVehicle: boolean;
     @Input() flagServiceStatus: boolean;
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


  constructor(private _monitoringService: ChangeSpaceColsAndRowsService) { }

  ngOnInit() {
    this._monitoringService.tmOnChangeMenuSize('SUBMENU_1', 6 , 12);

    setTimeout(() => {
      this.operationStatus = [
        { label: 'Disponible', code: 'O-S-1'},
        { label: 'Inicio de viaje', code: 'O-S-2'},
        { label: 'En viaje', code: 'O-S-3'},
        { label: 'Cargando', code: 'O-S-4'},
        { label: 'En ruta', code: 'O-S-5'}
      ];
      this.pointsInterest = [
        { label: 'Dentro', code: 'P-I-1'},
        { label: 'Cerca de', code: 'P-I-2'},
        { label: 'Cedis', code: 'P-I-3'},
        { label: 'Plantas', code: 'P-I-4'},
        { label: 'Fábricas', code: 'P-I-5'}
      ];
      this.typeVehicle = [
        { label: 'Auto', code: 'T-V-4'},
        { label: 'Camioneta', code: 'T-V-5'},
        { label: 'Autobús', code: 'T-V-6'}
      ];
      this.serviceStatus = [
        { label: 'Requiere servicio', code: 'S-S-5'},
        { label: 'Servicio programado', code: 'S-S-6'},
        { label: 'Baja cobertura', code: 'S-S-7'}
      ];
    }, 1000);

  }

  onCheckboxChange(option, event) {
    if (event.target.checked) {
        this.sendOperationStatus.push(option);
    } else {
        for (let i = 0; i < this.sendOperationStatus.length; i++) {
            if (this.sendOperationStatus[i] == option) {
                this.sendOperationStatus.splice(i, 1);
            }
        }
    }
}
changePointsInterest(option, event) {
    if (event.target.checked) {
        this.sendPointsInterest.push(option);
    } else {
        for (let i = 0; i < this.sendPointsInterest.length; i++) {
            if (this.sendPointsInterest[i] == option) {
                this.sendPointsInterest.splice(i, 1);
            }
        }
    }
}
changeTypeVehicle(option, event) {
    if (event.target.checked) {
        this.sendPointsInterest.push(option);
    } else {
        for (let i = 0; i < this.sendPointsInterest.length; i++) {
            if (this.sendPointsInterest[i] == option) {
                this.sendPointsInterest.splice(i, 1);
            }
        }
    }
}
changeServiceStatus(option, event) {
    if (event.target.checked) {
        this.sendPointsInterest.push(option);
    } else {
        for (let i = 0; i < this.sendPointsInterest.length; i++) {
            if (this.sendPointsInterest[i] == option) {
                this.sendPointsInterest.splice(i, 1);
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
    this.sendOptionsTV.emit(this.sendPointsInterest);
    this.sendPointsInterest = [];
  }
selectionServiceStatus(){
    this.sendOptionsSS.emit(this.sendPointsInterest);
    this.sendPointsInterest = [];
  }

closeFilterSelection(){
    this.closeFS.emit();
}

  ngOnDestroy(){
    this._monitoringService.tmOnChangeMenuSize('SUBMENU_1', 3 , 12);
    this.sendOperationStatus = null;
  }


}
