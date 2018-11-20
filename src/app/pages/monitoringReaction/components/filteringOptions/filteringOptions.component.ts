import { Component, OnInit, Output, EventEmitter } from '@angular/core';
/**
 * Created by Tech Group BWL on 17/07/2018.
 */
@Component({
  selector: 'mr-filtering-options',
  templateUrl: './filteringOptions.component.html',
  styleUrls: ['./filteringOptions.component.scss']
})
export class MonitoringReactionFilteringOptionsComponent implements OnInit {

  @Output() closeFiltering = new EventEmitter<any>();

  unitFilteringOptions: Array<any> = [];
  chipsFleetTree: Array<any> = [];
  chipsOperationStatus: Array<any> = [];
  chipsVehicleStatus: Array<any> = [];
  chipsPointsInterest: Array<any> = [];
  chipsTypeVehicle: Array<any> = [];
  chipsServiceStatus: Array<any> = [];

  flagFilterSelection: boolean = false;
  labelColorStop: string = 'defaultLabel';

  flagOperationStatus: boolean = false;
  flagPointsInterest: boolean = false;
  flagTypeVehicle: boolean = false;
  flagServiceStatus: boolean = false;
  flagFleetSelection: boolean = false;

  //translate
  filteringOptions = 'pages.monitoringreaction.filteringOptions.filteringOptions';
  selectedFilters = 'pages.monitoringreaction.filteringOptions.selectedFilters';
  fleetTree = 'pages.monitoringreaction.filteringOptions.fleetTree';
  vehicleStatusTrans = 'pages.monitoringreaction.filteringOptions.vehicleStatus';
  operationStatusTrans = 'pages.monitoringreaction.filteringOptions.operationStatus';
  pointsInterestTrans = 'pages.monitoringreaction.filteringOptions.pointsInterest';
  typeVehicleTrans = 'pages.monitoringreaction.filteringOptions.typeVehicle';
  serviceStatusTrans = 'pages.monitoringreaction.filteringOptions.serviceStatus';
  filteringOptionsTranslate = 'pages.monitoringreaction.filteringOptions.';

  constructor() { }
  
  ngOnInit() {
    

      this.unitFilteringOptions = [
        {
          fleetTree : [{ label: 'Daimler', code: 'F-T-1'}, { label: 'PDI', code: 'F-T-2'}],
          vehicleStatus: [{ id: 1, label: 'stopped', checked: false}, { id: 2, label: 'off', checked: false}, {  id: 3, label: 'inMotion', checked: false}, {  id: 4, label: 'on', checked: false}],
          operationalStatus : [{ id: 1,label: 'Cargando', code: 'loading'}, {id:2, label: 'En ruta', code: 'onway'}, {id: 3, label: 'Descargando', code: 'downloading'}, {id: 4, label: 'Disponible', code: 'available'}],
          pointsInterest : [{ label: 'Comercial', code: 'commercial'}, { label: 'Prohibidos', code: 'prohibited'}, { label: 'Públicos', code: 'public'}],
          typeVehicle : [{ label: 'Auto', code: 'car'}, { label: 'Camioneta', code: 'truck'}, {label: 'Autobus', code: 'bus'}],
          serviceStatus : [{ id: 1, label: 'En línea', code: 'online'}, {id:2, label: 'Baja cobertura', code: 'lowcoverage'}, {id:3,label: 'Fuera de cobertura', code: 'outOfService'}, {id:4,label: 'Sin estado', code: 'noStatus'}, {id:5,label: 'Robada', code: 'stolen'}, {id:6,label: 'Accidentada', code: 'sinestred'}, {id:7,label: 'Pérdida total', code: 'totalLost'}, {id:8,label: 'Fuera de operación', code: 'outOperational'}, {id:9,label: 'Taller / Taller externo', code: 'mechanicalService'}],
       }
      ];

  }

  checkboxVehicleStatus(item, event){
      for (let data of this.unitFilteringOptions[0].vehicleStatus){
          if (data.id == item.id){
              data.checked = event.target.checked;
          }
      }

      this.chipsVehicleStatus = [];
      for (let i=0; i<this.unitFilteringOptions[0].vehicleStatus.length; i++) {
          if (this.unitFilteringOptions[0].vehicleStatus[i].checked == true){
              this.chipsVehicleStatus.push(item);
          }
      }
  }
  checkboxOperationalStatus(item, event){
      for (let data of this.unitFilteringOptions[0].operationalStatus){
          if (data.id == item.id){
              data.checked = event.target.checked;
          }
      }
      this.chipsOperationStatus = [];
      for (let i=0; i<this.unitFilteringOptions[0].operationalStatus.length; i++) {
          if (this.unitFilteringOptions[0].operationalStatus[i].checked == true){
              this.chipsOperationStatus.push(item);
          }
      }
  }


  openFilteringOptions(flagCloseFiltering){
    this.closeFiltering.emit(flagCloseFiltering);
  }
  
  selectionOptions(selectionOptions){
    for (let i=0; i<selectionOptions.length; i++) {
          this.unitFilteringOptions[0].operationStatus.push(
            {
              label: selectionOptions[i].label,
              code: selectionOptions[i].code
            } 
          );
    }
    this.closeFilterSelection();
  }


  selectionOptionsPI(selectionOptions){

    if (selectionOptions.length > 0){
        this.chipsPointsInterest = [];
        for (let i=0; i<selectionOptions.length; i++) {
            this.chipsPointsInterest.push(
                {
                    id: selectionOptions[i].id,
                    label: selectionOptions[i].label,
                    code: selectionOptions[i].code,
                    checked: true
                }
            );
        }
    }
    this.closeFilterSelection();
  }
  selectionOptionsTV(selectionOptions){
      if (selectionOptions.length > 0){
          this.chipsTypeVehicle = [];
          for (let i=0; i<selectionOptions.length; i++) {
              this.chipsTypeVehicle.push(
                  {
                      id: selectionOptions[i].id,
                      label: selectionOptions[i].label,
                      code: selectionOptions[i].code,
                      checked: true
                  }
              );
          }
      }
    this.closeFilterSelection();
  }
  selectionOptionsSS(selectionOptions){
      if (selectionOptions.length > 0){
          this.chipsServiceStatus = [];
          for (let i=0; i<selectionOptions.length; i++) {
              this.chipsServiceStatus.push(
                  {
                      id: selectionOptions[i].id,
                      label: selectionOptions[i].label,
                      code: selectionOptions[i].code,
                      checked: true
                  }
              );
          }
      }
    this.closeFilterSelection();
  }

  closeFS(){
    this.closeFilterSelection();
  }
  closeFilterSelection(){
    this.flagFilterSelection = false;
    this.flagPointsInterest = false;
    this.flagTypeVehicle = false;
    this.flagServiceStatus = false;
  }
  closeSelection(){
    this.flagFleetSelection = false;
  }


  deleteChipPI(chip){
    for (let i = 0; i < this.chipsPointsInterest.length; i++) {
      if (this.chipsPointsInterest[i] == chip) {
          this.chipsPointsInterest.splice(i, 1);
      }
    }
  }
  deleteChipTV(chip){
    for (let i = 0; i < this.chipsTypeVehicle.length; i++) {
      if (this.chipsTypeVehicle[i] == chip) {
          this.chipsTypeVehicle.splice(i, 1);
      }
    }
  }
  deleteChipSS(chip){
    for (let i = 0; i < this.chipsServiceStatus.length; i++) {
      if (this.chipsServiceStatus[i] == chip) {
          this.chipsServiceStatus.splice(i, 1);
      }
    }
  }

  showFleetSelection(){
    this.flagFleetSelection = !this.flagFleetSelection;
    this.flagFilterSelection = false;
    this.flagOperationStatus = false;
    this.flagPointsInterest = false;
    this.flagTypeVehicle = false;
    this.flagServiceStatus = false;
  }

  showPointsInterest(){
      this.flagFleetSelection = false;
      this.flagFilterSelection = true;
      this.flagOperationStatus = false;
      this.flagPointsInterest = true;
      this.flagTypeVehicle = false;
      this.flagServiceStatus = false;
  }
  showTypeVehicle(){
      this.flagFleetSelection = false;
      this.flagFilterSelection = true;
      this.flagOperationStatus = false;
      this.flagPointsInterest = false;
      this.flagTypeVehicle = true;
      this.flagServiceStatus = false;
  }
  showServiceStatus(){
      this.flagFleetSelection = false;  
      this.flagFilterSelection = true;
      this.flagOperationStatus = false;
      this.flagPointsInterest = false;
      this.flagTypeVehicle = false;
      this.flagServiceStatus = true;
  }

}
