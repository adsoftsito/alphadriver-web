import { Component, OnInit, ViewEncapsulation, HostListener, ViewChild, ElementRef ,OnDestroy, ChangeDetectorRef} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {GridOptions} from "ag-grid";
import { Subscription } from 'rxjs';
import { LicenseManager } from 'ag-grid-enterprise/main';
//import  'ag-grid-enterprise';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PatrimonialSecurityService } from '../patrimonial-security/patrimonial-security.service';
import { LoginService } from 'app/shared/providers/login.service';

//LicenseManager.setLicenseKey('26f908fcbd31ab5109aab8ba901fe020');
LicenseManager.setLicenseKey('Evaluation_License_Valid_Until__8_December_2018__MTU0NDIyNzIwMDAwMA==50dff8a63bb1a234bae7d0bf98e1be3a');
@Component({
  selector: 'patrimonial-security',
  templateUrl: './patrimonial-security.component.html',
  
  styleUrls: ['./patrimonial-security.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PatrimonialSecurityComponent implements OnInit, OnDestroy {
  

  @ViewChild('motorStop') modalMotorStop : ElementRef;
  @ViewChild('motorStopMassive') modalMotorStopMassive : ElementRef;

  $subscripcionExportExcel_:Subscription;

  private gridApi;
  private gridColumnApi;
  private data: any[];
  private dataBinnacle:any[];
  private columnDefs;
  private columnDefs2;
  private rowSelection;
  
  customIcons: any = {
    sortAscending: '<i class="fa fa-caret-down"/>',
    sortDescending: '<i class="fa fa-caret-up"/>',
  };
  private gridOptionsModal:GridOptions;
  
  private isRemember:boolean = false;
  private checkControl: boolean = true;
  private dateOfSearch:any;
  rowSelected: any;
  selectedRows:any[];
  totalRows:number = 0;
  private signalObject=
    [
        {type: 1,selected:false, label: 'Celular'},
        {type: 2,selected:false, label: 'Hibrida'}
    ];
    //seccion show table
    btnArray = [{
      label: 'Actual',
      selected: 'active'
    },
    {
      label: 'Bitácora',
      selected: ''
    }];
  visibleTable:string = 'current';
  showCheckBox:boolean = true;
  authorized:boolean = true;
 
   //modal
  private  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    size:'lg',
    keyboard : false,
    windowClass: 'modal-vehicle-motor-stop'
  };

  private signalTypeSelect:number;
 
  numberEventsAux:any = [
   {
     numbers:[]
   }
  ];
  
  //DOM
  labelSignal:string ='';
  signalStatus:any[];
  labelmotorStopStatus:string = '';
  riskLevelClass:string = '';
  arrTranslate:any = [];
  arrTranslateOfGeneral:any = [];
  showCalendarModal:boolean;
  calendarLabel: any = '';
  //service-------------
  $subcriptionTranslate : Subscription;
  $subcriptionTranslateGeneral:Subscription;
  //--------------------
  selectedOption: any;
  selectedRange: any;
  lang: string;
  firstDateTimestamp:any;
  lastDateTimestamp:any;

  constructor(private translate: TranslateService,
              private modalService:NgbModal, 
              private _servicePatrimonialSecurity:PatrimonialSecurityService, 
              private cdr: ChangeDetectorRef,
              private _loginService:LoginService) {
  this.gridOptionsModal = <GridOptions>{};
  this.gridOptionsModal.columnDefs = this.columnDefs2;
  this.gridOptionsModal.enableSorting = true;
  this.changeLanguage();
  
  }
  //end constructor
  
  ngOnInit(){
   this.$subcriptionTranslate = this.translate.get('pages.monitoringreaction.patrimonial_security').subscribe( res =>{
      this.arrTranslate = res;
      this.btnArray[0].label = this.arrTranslate.current;
      this.btnArray[1].label = this.arrTranslate.log;
      
      this.signalObject[0].label = this.arrTranslate.mobile;
      this.signalObject[1].label = this.arrTranslate.hybrid;
    });

  this.$subcriptionTranslateGeneral = this.translate.get('general').subscribe(
    res => {
      this.arrTranslateOfGeneral = res;
    });
    this.translate.get('pages.ranking')
    .subscribe(labelObject => {
        this.calendarLabel = labelObject.last + ' 7 ' + labelObject.days;
    });

  }

  changeLanguage(){
    this.lang = localStorage.getItem('lang');
    if(this.lang === null){
      this.translate.getBrowserLang();
    }else{
      this.translate.use(this.lang);
    }
  }
  
  ngOnDestroy(){
    this.$subcriptionTranslate.unsubscribe();
  }

  exportToExel() {
     this._servicePatrimonialSecurity.exportToExcell(true);
  } 

  refresh(){    
    this._servicePatrimonialSecurity.updateTable(true);
  }

  restoreCheckbox(){
    this.isRemember = false;
    this.checkControl = true;
  }

 onGridReady(params) {    
    this.gridColumnApi = params.columnApi;
    this.gridApi = params.api;

    if (this.gridOptionsModal.api){
      this.gridOptionsModal.api.setRowData(this.selectedRows);
    }      
  }

  
  makeSelectableRow() {
    this._servicePatrimonialSecurity.selectWithCheck({
      checkControl:this.checkControl, isRemember:this.isRemember
  });
  }

  resizingColumns() {
    this.gridApi.sizeColumnsToFit();
  }
    /**
     *  
     * You get which table you want to display
     * @param item 
     */
    changeSelectedItem(item){
      if(item === 'BG0')
      {
        //Show columns TableActual
        this.visibleTable = 'current';
        this.showCheckBox = true;
      }else{
        if(item === 'BG1'){
          //Show columns Table Bitacora
          this.visibleTable = 'binnacle';
          this.showCheckBox = false;
        }
      }
      this.restoreCheckbox();
    }

    changeStatusControl(value){
      this.checkControl = value;
    }
    onFilterChanged(data){     
     this._servicePatrimonialSecurity.search(data);
  }
    changeStatusRemember(value:boolean){
      this.isRemember = value;      
    }
    getselectedOneItem(element:any){
      this.rowSelected = element;
      this.labelmotorStopStatus = this.rowSelected.motorStopStatus == 1 ? 'Con paro de motor': 'Sin paro de motor';
            //Signal Status
     if(this.rowSelected.signal){       
      if ( this.rowSelected.signal.type === 1){
        this.signalObject[0].selected = true;
        this.signalObject[1].selected = false;
        this.labelSignal =this.signalObject[0].label;
        
      }else{
        if(this.rowSelected.signal.type === 2){
          this.signalObject[1].selected = true;
          this.signalObject[0].selected = false;
          this.labelSignal = this.signalObject[1].label;
        }
      }
     }
      this.openModalMotorStop('motorStop');
      
    }
    getselectedItems(elements:any){        
      if(elements.length > 0){
        this.selectedRows = elements;        
      }
      else{
        this.isRemember = false;
      }
    }
    getColumnDef(elements:any){
      delete elements[0]['checkboxSelection'];
      delete elements[0]['cellRenderer'];
      delete elements[0]['cellRendererParams'];
      delete elements[5]['cellStyle'];
      delete elements[6]['cellClass'];
      delete elements[9]['cellStyle'];
      this.columnDefs2 = elements; 
    }

    getTotalRows(total:number){
      this.totalRows = total;
    }

    openModalMotorStop(idModal){
      this.numberEventsAux[0].numbers = [];
      let openModalOneVehicle:boolean = false;
      let oneVehicle:any = [];
      
      if( this.selectedRows){
        if(idModal == 'massive'){
          if(this.selectedRows.length>1)
          {
            const modalRefMassive = this.modalService.open(this.modalMotorStopMassive, 
              {
                backdrop : 'static',
                windowClass:'modalMotorStopMassive',
                keyboard : false
              });
              openModalOneVehicle = false;
          }
          else{
            openModalOneVehicle = true;
            oneVehicle = this.selectedRows;
          }
        }
      }

      if( idModal === 'motorStop' || openModalOneVehicle === true)
      {       
        if(openModalOneVehicle === true ){
          this.rowSelected = oneVehicle[0]; 
          oneVehicle = [];
        }
        let numEvents = this.rowSelected.numberEvents;
        switch(numEvents){
          case 6:
          this.riskLevelClass = 'high';
          break;
          case 5:
          this.riskLevelClass = 'high';
          break;
          case 4:
          this.riskLevelClass = 'medium';
          break;
          case 3:
          this.riskLevelClass = 'medium';
          break;
          case 2:
          this.riskLevelClass = 'low';
          break;
          case 1:
          this.riskLevelClass = 'low';
          break;            
       
        }

        for(let i=0;i<6;i++)
        {
          if (i<numEvents)
        this.numberEventsAux[0].numbers.push("aux");
        else
        this.numberEventsAux[0].numbers.push("def");
        }
        
        const modalRef = this.modalService.open(this.modalMotorStop,this.ngbModalOptions);      
      }      
    }
  
    

    changeSelectSignal(type){
      this.signalTypeSelect = type;      
    }
   
    /**
    * activates or deactivates engine shutdown of one or more vehicles
    * @param status 
    * @param mode //1 or more 
    */

    changeMotorStopStatus(comment,password,motorStatusActive){
      //1 vehicle 
      let validData = this.isValidData(comment,password);
      if(validData){
        this.authorized = false;
      }
      
    }
    isValidData(comment,password){
      let validData:boolean = true;
      let validPassword:boolean = true;
      let pass:string;

      if(comment == "" || comment.trim() == ""){
        validData = false;
        document.getElementById('comment').focus();
      }

      if(password == "" || password.trim() == ""){
        validData = false;
        document.getElementById('password').focus();
      }else{
       pass = this._loginService.isLogged();
       if(pass != password)
       {
         validData = false;
         document.getElementById('password').focus();
       }
      }

      return validData;
    }
    /***Start functions for calendar */
    getSelectedOption(event){
      this.selectedOption = event;
      this.cdr.detectChanges(); 
    }
      getSelectedRange(event){
          this.selectedRange = event;
          this.convertDateToTimestamp(event);
          console.log(this.firstDateTimestamp);
          console.log(this.lastDateTimestamp);
          this.cdr.detectChanges();
      }
    showCalendar(){
        this.showCalendarModal = true;
        this.cdr.detectChanges();
    }
    getCalendarLabel(event){
        this.calendarLabel = event;
        this.cdr.detectChanges();
    }

    modalClosed(){
        this.showCalendarModal = false;
    }
    
    convertDateToTimestamp(moment: any){
      this.firstDateTimestamp = moment[0].format('x');
      this.lastDateTimestamp = moment[1].format('x');
    }
    /* END OF CALENDAR FUNCTIONS*/
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (this.gridApi) {
            setTimeout(() => {
                this.gridApi.sizeColumnsToFit();
            }, 200);
        }
    }

    private onGridResize(){
      this.gridOptionsModal.api.sizeColumnsToFit();
    }

}

  
