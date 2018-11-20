import {
  Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges,
  OnDestroy, AfterViewInit
} from '@angular/core';
import { BreadCrumManual } from '../../../../shared/providers/breadCrumbManual.service';
import { Observable } from 'rxjs';
/**
 * Created by Tech Group BWL on 06/07/2018.
 */
@Component({
  selector: 'mr-list-units',
  templateUrl: './listUnits.component.html',
  styleUrls: ['./listUnits.component.scss']
})
export class MonitoringReactionListUnitsComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() listUnits = [];
  @Input() groups = [];
  @Input() changeIconColor: string;
  @Input() flagSelectedColor: boolean;
  @Output() sendUnit = new EventEmitter<any>();
  @Output() openFiltering = new EventEmitter<any>();
  @Output() buttonClose = new EventEmitter<any>();
  @Output()  filterSelected=new EventEmitter<string>();
  @Output() valueSearch=new EventEmitter<any>();

  flagPointsInterest: boolean = false;
  flagFilteringOptions: boolean = false;
  flagSelected: boolean = false;
  @Input() seletedColorUnit: String = 'selectedUnit';
  lasItem: string = '';
  currentItem: string = '';
  sortBy = [];
  order;
  economicNumber;
  unitData = [];
  colorIndicator: Array<any> = [];
  interestPoints =[
    {code: 'commercial', color: '#b6d643'},
    {code: 'public', color: '#2d9eea'},
    {code: 'prohibited', color: '#ea4524'}
  ];


  vehicles = 'pages.monitoringreaction.listUnits.vehicles';
  allTheGroups = 'pages.monitoringreaction.listUnits.allTheGroups';
  sortByTrans = 'pages.monitoringreaction.listUnits.sortByTrans';
  search = 'pages.monitoringreaction.listUnits.search';

  //Indicator CORREGIR LAS RUTAS DE LOS ICONOS Y EL CODIGO EN EL OBJETO Q SE RECIBE
  noProblem = '../../../../../assets/img/theme/icon/monitoringReaction/noProblem.svg';
  warning = '../../../../../assets/img/theme/icon/monitoringReaction/warning.svg';
  danger = '../../../../../assets/img/theme/icon/monitoringReaction/danger.svg';
  
  codeIndicator = ['no problem','warning','danger'];
  iconIndicator = [ this.noProblem, this.warning, this.danger];

  breadcrumbLabels= ['Menu.monitoringReaction', 'general.vehicles'];
  breadcrumbLabelsDestroy= ['Menu.monitoringReaction'];
  
  opcionSortBySelect:string="";
  optionFilterGroup:string="";
  closeIconReset:boolean=false;

  constructor(
    private _service: BreadCrumManual
  ) {
  }

  ngOnInit() {

    this.loadSortBy();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._service.generateManualRouting(this.breadcrumbLabels, [], [0,0], []);
    }, 500);
  }

  ngOnDestroy(){
    this._service.generateManualRouting(this.breadcrumbLabelsDestroy, [], [0], []);
  }

  ngOnChanges( OnChanges: SimpleChanges){

    if(this.changeIconColor === 'closeFO'){
      this.flagFilteringOptions = false;
    }
    if(this.flagSelectedColor === false && this.currentItem != ''){
      document.getElementById(this.currentItem).className = 'row rowListUnits';
    }
    if(this.listUnits.length>0){
      for(let i=0; i<this.listUnits.length; i++){        
        if(this.listUnits[i].indicator === '' || null){          
          this.colorIndicator.push(null);
        }else{          
          let findIndicator = this.codeIndicator.indexOf(this.listUnits[i].indicator);
          let getIconIndicator = this.iconIndicator[findIndicator];
          this.colorIndicator.push(getIconIndicator);       
        }
        if(this.listUnits[i].interestPoint){
          if (this.listUnits[i].interestPoint.code == 'commercial'){
           // this.listUnits[i].interestPoint.push([{'color': 'red'}]);
           this.listUnits[i].interestPoint.color = '#b6d643';
           } else if (this.listUnits[i].interestPoint.code == 'prohibited'){
            this.listUnits[i].interestPoint.color = 'black';
           } else if (this.listUnits[i].interestPoint.code == 'public'){
            this.listUnits[i].interestPoint.color = '#2d9eea';
           }
        }
        
       

          if((i+1) === this.listUnits.length)
              this.flagPointsInterest = true;
      }
    }
  } 

  loadSortBy(){
    this.sortBy = [
      {
        name: "pages.monitoringreaction.listUnits.Economic"
      },
      {
        name: "pages.monitoringreaction.listUnits.driver"
      },
      {
        name: "pages.monitoringreaction.listUnits.status"
      }
    ]
  }

  sendUnitData(unit, e){

    this.unitData = [
      {
        economicNumber : unit.economicNumber,
        group : unit.group,
        operationalState : unit.operationalState,
        state: unit.status,
        rotate: unit.directionGrade
      }
    ]
    this.economicNumber = unit.economicNumber;
    this.sendUnit.emit(this.unitData);
    this.selectedColor(e.id);
    let params = [unit.economicNumber];
    this.breadcrumbLabels = ['Menu.monitoringReaction', 'general.vehicles'];
    this._service.generateManualRouting(this.breadcrumbLabels, [], [0,0], params);
  }


  sortByItem(item,elem){
    this.opcionSortBySelect=elem;
    if(item === 'pages.monitoringreaction.listUnits.Economic'){
      this.listUnits.sort( (a , b)=>{
        if(a.economicNumber < b.economicNumber){
          return -1;
        }if(a.economicNumber > b.economicNumber){
          return 1
        }
        return 0
       });
    }if(item === 'pages.monitoringreaction.listUnits.driver'){
      this.listUnits.sort( (a , b)=>{
        if(a.operatorName < b.operatorName){
          return -1;
        }if(a.operatorName > b.operatorName){
          return 1
        }
        return 0
       });
    }if(item === 'pages.monitoringreaction.listUnits.status'){
      this.listUnits.sort( (a , b)=>{
        if(a.status.code < b.status.code){
          return -1;
        }if(a.status.code > b.status.code){
          return 1
        }
        return 0
       });
    }
    
  }

  filterByGroup(value ){
    console.log("Listunits filterby "+value);
    
     this.filterSelected.emit(value);
  }
  
  searching(filter:string){
      this.valueSearch.emit(filter)
  }
  selectedColor(id){
    this.currentItem = id;
    
    if(!this.flagSelected){
      document.getElementById(this.currentItem).className = 'row rowListUnits unitSelected';
      this.lasItem = id;
      this.flagSelected = true;
    }else{
      document.getElementById(this.currentItem).className = 'row rowListUnits unitSelected';
      document.getElementById(this.lasItem).className = 'row rowListUnits';
      this.lasItem = this.currentItem;
    }
  
  }

  openFilteringOptions(flagFilteringOptions){
    
    if(this.flagFilteringOptions){
      this.flagFilteringOptions = false;
      this.openFiltering.emit(this.flagFilteringOptions);
    }else{
      this.flagFilteringOptions = true;
      this.openFiltering.emit(this.flagFilteringOptions);
      let breadcrumbLabels = ['Menu.monitoringReaction', 'general.vehicles', 'pages.monitoringreaction.filteringOptions.filteringOptions'];
      this._service.generateManualRouting(breadcrumbLabels, [], [0,0,1], []); 
    }
    
    if(this.currentItem)
    document.getElementById(this.currentItem).className = 'row rowListUnits';

  }



  closeListUnits(){
    this.buttonClose.emit(false);
  }

  




}
