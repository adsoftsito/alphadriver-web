import { Component, OnInit,OnDestroy, HostListener, Output, EventEmitter, Input } from '@angular/core';
import {GridOptions} from "ag-grid";
import { Subscription } from 'rxjs/Subscription';
import { ViajesService } from '../viajes.service';
import { TableDetailComponent } from '../table-detail';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../../../../../shared/providers/login.service';
import {Router} from "@angular/router";
import {ClientProductService} from "../clients.service";

@Component({
  selector: 'ps-current-table',
  templateUrl: './current-table.component.html',
  styleUrls: ['./current-table.component.scss']
})
export class CurrentTableComponent implements OnInit,OnDestroy {

  @Output() statusCheckControl = new EventEmitter<any>();
  @Output() statusIsRemember = new EventEmitter<boolean>();
  @Output() selectedOneItem = new EventEmitter<any>();
  @Output() selectedItems = new EventEmitter<any>();
  @Output() columnDefCurrent = new EventEmitter<any>();
  @Output() totalRows = new EventEmitter<number>();

  private gridApi;
  private gridColumnApi;
  private data:any[];
  private columnDefs;
  private rowSelection;
  private gridOptions:GridOptions;
  private detailCellRendererParams;
  
  rowSelected:any; //mode selection 'multple '  or one
  selectedRows:any[];

  customIcons: any = {
    sortAscending: '<i class="fa fa-caret-down"/>',
    sortDescending: '<i class="fa fa-caret-up"/>',
  };

  isRemember:boolean = false;
  checkControl:boolean = true;
  /***Service */
  /***********/
  private $subscriptionExportToExcel:Subscription;
  private $subscriptionUpdateTable:Subscription;
  private $selectCheckbox:Subscription;
  private $dataToSearch:Subscription;
  private $subscriptionTranslate:Subscription;
  private $subcriptionGetUnitSafeties:Subscription;

  /************************ */
  /**translate */
  arrTranslate:any = [];
  arrTranslateOfGeneral:any = [];
  showTableTranslated: boolean = false;


  constructor(private translate:TranslateService,
      private _servicePatrimonialSecurity:ViajesService,
      private router : Router,
      private _loginService: LoginService,
      private clientProductService :ClientProductService
        ) { 

    this.columnDefs = [
      {
        colId:'foliodesp',
        field: "id",
        suppressSizeToFit:true,
        suppressMenu: true,
        width:81,
        checkboxSelection: false,
        cellClass:['cell-motum-hover-statusMotorStop'],        

        /**properties detail table */
        cellRenderer:'group',
        cellRendererParams: {suppressCount: true}
        /*** */
      },
      { 
        field: "driver.name",
        suppressMenu: true,
        suppressSizeToFit:true,
        width:150
      },
      {
        field: "truckid",
        suppressMenu: true,
        width:50
      },
      { 
        field: "zone",
        suppressMenu:true,
         width:43
         /*,
        
         cellRenderer:(params) => {
          if(params.value){
            let iconsSignal: string;
            let statusColor: string;
            let signal = params.value;

            if (signal.type === 1) {   //celular motum-i tm-e98a
              iconsSignal = '<i class="motum-i tm-e98a signal-type-Icon""></i>'
            }
            else {
              if (signal.type === 2) { //hibryd celulr and satellite  motum-i tm-e98b
                iconsSignal = ' <i class="motum-i tm-e98b signal-type-Icon"></i>'
              }
            }
            statusColor = signal.withSignal === true ? 'with-signal' : 'no-signal';
            return iconsSignal += '<i  class="motum-i tm-e98d ' + statusColor + '" ></i>';//motum-i tm-e98d
          }
        }*/


      },
      {
        field:"assigndate",
        suppressMenu: true
        
/*        cellRenderer : (params)=>{
          let risk = '';
          
          if(params.data.transmitter.toUpperCase() == 'ANTITAMPER')
          {
            risk = this.paintRiskLevel(6);
            params.data.numberEvents = 6;
          }
          else{
            risk = this.paintRiskLevel(params.value);
          }
        return risk;
        }*/,
        width:100
      },
      {
        colId:'statusoper',
        field: "orderstatus.description",
        suppressMenu: true,
        cellStyle:{'text-align':'center'},
        cellClass:['cell-motum-hover-statusMotorStop'],        

        width:80
        /*,
        cellRenderer: (params) => { 
         return params.value+' h';
        }*/
      },
      {
        colId:'statusadm',

        //colId: "motorStopStatus",
        field:"orderstatusadmin.description",
        suppressMenu: true,
        cellClass:['cell-motum-hover-statusMotorStop'],

        /*        
        cellRenderer:(params)=>{
          if(params.value==true)
          return '<i class="motum-i tm-ea00 status-on" ></i> '+this.arrTranslate.WithMotorStop;
          else//class="motum-i tm-ea00 
          return '<i class="motum-i tm-ea00 status-off"></i> '+this.arrTranslate.WithoutMotorStop;
        },*/
        width:80
      },
      {
        field:"teadate",
        suppressMenu: true,
        width:92
      },
      {
        field:"teastatus",
        suppressMenu: true,
                
        cellRenderer:(params)=>{
          if(params.value=='status 0')
          return '<i class="motum-i tm-ea00 status-on" ></i> '+ params.value;
          else//class="motum-i tm-ea00 
          return '<i class="motum-i tm-ea00 status-off"></i> '+ params.value;
        },
        width:111
      },
      {
        field:"enddate",
        suppressMenu: true,
        cellStyle:{'text-align':'center'},
       /* cellRenderer:(params) =>{
            if(params.value.length == 0)
            {
                return '-';
            }
            else return params.value+ ' h';
        },*/
        width:108
      }
    ];


    this.data = [
      {
      "numberEconomic": 222111,
      "carrier": "Maverick",
      "location": "Acatlán, Puebla, México",
      "signal": 
          {
            "type": 1,
            "label":"Celular",
            "withSignal": true,
          }
        ,
      "numberEvents":6,
      "dateOfPosition":"2018/09/27 - 17:22:00",
      "motorStopStatus": false,
      "transmitter": "Antitamper",
      "commandSent": "Activar paro de motor",
      "shippingDate":"2018/09/27 - 17:22:00",
      "dateOfApplication":  "2018/09/27 - 17:30:00",

      "detail": [
        {
          "event": "Motum desconectado",
          "date": "2018/09/27-17:22:00",
          "locationOrPointInterest": "Llegada a cliente"
        },
        {
          "event": "Inhibidor de GPS detectado ",
          "date": "2018/09/27-17:00:00",
          "locationOrPointInterest": "Aldama,Acatlán de Osorio, Puebla"
        },
        {
          "event": "Fuera de territorio",
          "date": "2018/09/27-16:55:00",
          "locationOrPointInterest": "Saliendo de caseta de cobro"
        },
        {
          "event": "Desvío de ruta ",
          "date": "2018/09/27-16:40:00",
          "locationOrPointInterest": "Del Maestro, 74949 Acatlán de Osorio, Puebla."
        },
        {
          "event": "Desconexión de antena GPS",
          "date": "2018/09/27-15:30:00",
          "locationOrPointInterest": "Llegada a punto base"
        },
        {
          "event": "Fuera de cobertura ",
          "date": "2018/09/27-14:00:00",
          "locationOrPointInterest": "San Antonio, 74949 Acatlán de Osorio, Puebla."
        }
      ]
    },
    {
      "numberEconomic": 222122,
      "carrier": "Maverick",
      "location": "Orizaba, Veracruz, México",
      "signal": 
        {
          "type": 2,
          "label":"Hibrida",
          "withSignal": false,
        },
      "numberEvents":5,
      "dateOfPosition":"2018/09/27 - 16:00:00",
      "motorStopStatus": true,
      "transmitter": "Inhibidor de GPS",
      "commandSent": "Desactivar paro de motor",
      "shippingDate":"",
      "dateOfApplication":  "2018/09/27 - 16:00:00",
  
      "detail": [
        {
          "event": "Motum desconectado",
          "date": "2018/09/27-17:22:00",          
          "locationOrPointInterestd": "Llegada a Cliente"
        },
        {
          "event": "Desconexión de antena GPS",
          "date": "2018/09/27-17:00:00",
          "locationOrPointInterest": "Llegada a punto base"
        },
        {
          "event": "Fuera de cobertura ",
          "date": "2018/09/27-16:55;00",
          "locationOrPointInterest": "San Antonio, 74949 Acatlán de Osorio, Puebla."
        },
        {
          "event": "Fuera de cobertura ",
          "date": "2018/09/27-16:40:00",
          "locationOrPointInterest": "San Antonio, 74949 Acatlán de Osorio, Puebla."
        },
        {
          "event": "Fuera de cobertura ",
          "date": "2018/09/27-15:30:00",
          "locationOrPointInterest": "San Antonio, 74949 Acatlán de Osorio, Puebla."
        }
      ]
    },
    {
      "numberEconomic": 222133,
      "carrier": "Maverick",
      "location": "Pachuca, Hidalgo, México",
      "signal": 
        {
          "type": 1,
          "status": true,
        },
      "numberEvents":4,
      "dateOfPosition":"2018/09/27 - 15:14:00",
      "motorStopStatus": false,
      "transmitter": "Apertura de puertas",
      "commandSent": "Activar paro de motor",
      "shippingDate":"",
      "dateOfApplication": "2018/09/27 - 15:14:00",
  
      "detail": [
         {
          "event": "Fuera de territorio",
          "date": "2018/09/27 - 15:00:00",
          "locationOrPointInterest": "Fuera de corbertura"
        },
        {
          "event": "Fuera de territorio",
          "date": "2018/09/27 - 14:00:00",
          "locationOrPointInterest": "Fuera de corbertura"
        },
        {
          "event": "Fuera de territorio",
          "date": "2018/09/27 - 12:20:00",
          "locationOrPointInterest": "Fuera de corbertura"
        },
        {
          "event": "Fuera de territorio",
          "date": "2018/09/25 - 11:00:00",
          "locationOrPointInterest": "Fuera de corbertura"
        }
      ]
    },
    {
      "numberEconomic": 222144,
      "carrier": "Maverick",
      "location": "Acatlán, Puebla, México",
      "signal": 
        {
          "type": 2,
          "status": false,
        },
      "numberEvents":2,
      "dateOfPosition":"2018/09/27 - 15:00:00",
      "motorStopStatus": false,
      "transmitter": "Proceso de geozona",
      "commandSent": "Activar paro de motor",
      "shippingDate":"2018/09/27 - 15:00:00",
      "dateOfApplication":  "",
  
      "detail": [
        {
          "event": "Motum desconectado",
          "date": "2018/09/22 - 15:30:00",
          "locationOrPointInterest": "Desvío de ruta"
        },
        {
          "event": "Fuera de territorio",
          "date": "2018/09/24 - 17:22:00",
          "locationOrPointInterest": "Desvío de ruta"
        }
      ]
    },
    {
      "numberEconomic": 222144,
      "carrier": "Maverick",
      "location": "Acatlán, Puebla, México",
      "signal": 
        {
          "type": 2,
          "status": false,
        },
      "numberEvents":0,
      "dateOfPosition":"2018/09/27 - 15:00:00",
      "motorStopStatus": false,
      "transmitter": "Antitamper",
      "commandSent": "Activar paro de motor",
      "shippingDate":"2018/09/27 - 15:00:00",
      "dateOfApplication":  "",
  
      "detail": [
        {
          "event": "Motum desconectado",
          "date": "2018/09/22 - 15:30:00",
          "locationOrPointInterest": "Desvío de ruta"
        },
        {
          "event": "Fuera de territorio",
          "date": "2018/09/24 - 17:22:00",
          "locationOrPointInterest": "Desvío de ruta"
        }
      ]
    }
    ];    

    this.gridOptions = <GridOptions>{};
    this.translateHeaderTable();
    this.gridOptions.columnDefs = this.columnDefs;
    this.gridOptions.pagination = true;
    
    this.gridOptions.headerHeight = 30.58;
    this.gridOptions.rowHeight = 40.58;
    this.gridOptions.enableColResize = true;
    this.gridOptions.enableSorting = true;
    this.rowSelection = "multiple";
    //console.log("my data:" + this.data);
   // this.getDataForTable();

    }
  //end constructor

  ngOnInit() {
     this.$subscriptionExportToExcel = this._servicePatrimonialSecurity.exportToExcellTable$.subscribe(
      status => {
        if( status === true)
        this.exportToExel();
      });

     this.$subscriptionUpdateTable = this._servicePatrimonialSecurity.updateTable$.subscribe(
      status =>{
        if( status === true)
        {
          this.refresh();
        }
      });
      
    this.$selectCheckbox = this._servicePatrimonialSecurity.selectionTable$.subscribe(
      show => {
        if (show) {
          this.checkControl = show.checkControl;
          this.isRemember = show.isRemember;
          this.makeSelectableRow();
        }
      });
      this.$dataToSearch = this._servicePatrimonialSecurity.dataSearch$.subscribe(
        value=>{
          this.gridOptions.api.setQuickFilter(value);
        });

  }

  ngOnDestroy(){
    this.$subscriptionTranslate.unsubscribe();
    this.$subscriptionExportToExcel.unsubscribe();
    this.$subscriptionUpdateTable.unsubscribe();
    this.$selectCheckbox.unsubscribe();
    this.$dataToSearch.unsubscribe();
    
    //this.subcriptionGetUnitSafeties.unsubscribe();
    
  }
 
  translateHeaderTable(){
    this.$subscriptionTranslate = this.translate.get('pages.monitoringreaction.patrimonial_security').subscribe( res =>{
      this.arrTranslate = res;
      this.columnDefs[0].headerName = "Folio Despacho"; //this.arrTranslate.economic;
      this.columnDefs[1].headerName = "Operador"; //this.arrTranslate.carrier;
      this.columnDefs[2].headerName = "# Economico"; //this.arrTranslate.location;
      this.columnDefs[3].headerName = "Territorio"; //this.arrTranslate.state;
      this.columnDefs[4].headerName = "Fecha de Asignacion"; //this.arrTranslate.risk;
      this.columnDefs[5].headerName = "Estado Operativo"; //this.arrTranslate.dateOfPosition;
      this.columnDefs[6].headerName = "Estado Administrativo";//this.arrTranslate.motorStopStatus;
      this.columnDefs[7].headerName = "Fecha TEA"; //this.arrTranslate.transmitter;
      this.columnDefs[8].headerName = "Estado TEA";//this.arrTranslate.commandSent;
      this.columnDefs[9].headerName = "Fin de Viaje"; //this.arrTranslate.shippingDate;
      //this.columnDefs[10].headerName = ""; //this.arrTranslate.dateOfApplication;
      this.gridOptions.columnDefs = this.columnDefs;

      this.showTableTranslated =true;

    });
   
  }
  onGridReady(params) {    
    this.gridColumnApi = params.columnApi;
    this.gridApi = params.api;
    if (this.gridOptions.api){
        this.getDataForTable();
    } 
  }

  getDataForTable(){
    /**local */
    /*
    this.gridOptions.api.setRowData(this.data);
    this.totalRows.emit(this.data.length);
    this.resizingColumns();
*/
    /**** */
    /** service**/
    console.log("getting data..");
     this.$subcriptionGetUnitSafeties = this._servicePatrimonialSecurity.getUnitsSafeties(null,null).subscribe(
       res =>{
         const body = JSON.parse(res['_body']);
         if(body)
         {
           this.data = body;
           
           this.gridOptions.api.setRowData(this.data);  
           this.resizingColumns();
           this.totalRows.emit(this.data.length);
           console.log("this body:" + body);
         
           console.log("this data: " + this.data);

         }
       },
       err =>
       {console.log("Error"+err)}
     );

  }
  
  /***tools***/
  exportToExel() {
    let params = {
      fileName: 'PatrimonialSecurity_current'
    };
    this.gridApi.exportDataAsExcel(params);
  } 
  refresh(){   
    //this.getDataForTable();
  }
  makeSelectableRow() {

    if(this.checkControl == true && this.isRemember == true){
      this.columnDefs[0].checkboxSelection = this.isRemember;
      this.gridOptions.api.setColumnDefs(this.columnDefs);
      this.gridOptions.api.selectAll();      
      this.resizingColumns();
      this.statusCheckControl.emit(false);

    }else{
      if (this.checkControl == false && this.isRemember == false) {
        this.gridOptions.api.deselectAll();
        this.statusCheckControl.emit(null);
        this.statusIsRemember.emit(true);
      }else {
        this.statusCheckControl.emit(true);        
        this.deselectAllRow();
        this.resizingColumns();
      }
    }
  }
  /*******/
  /**
   * Paint  level of risk according to the number of motor stop events
   * @param number 
   */
  paintRiskLevel(number){
    let riskLevel:string = '';
    switch(number){
      case 6:
          for(let i = 0; i < 6; i++ ) 
          {
             riskLevel += '<i class="motum-i tm-e98c high"></i>';
          }
          break;
      case 5:
          for(let i = 0; i < 5; i++ ) 
          {
              riskLevel += '<i class="motum-i tm-e98c high"></i>';
          }
          riskLevel += '<i class="motum-i tm-e98c risk-level"></i>';
          break;
      case 4:
          for(let i = 0; i < 6; i++ ) 
          {   
              if(i<4){
                riskLevel += '<i class="motum-i tm-e98c medium"></i>';

               }
               else{
                riskLevel += '<i class="motum-i tm-e98c risk-level"></i>';

               }
          }
          break;
      case 3:
          for(let i = 0; i<6 ; i++)
          {
              if(i<3){
                riskLevel += '<i class="motum-i tm-e98c medium"></i>';
              }
              else{
                riskLevel += '<i class="motum-i tm-e98c risk-level"></i>';
              }
          }
          break;
      case 2:
          for (let i = 0; i<6;i++)
          {
              if(i<2)
              {
                riskLevel += '<i class="motum-i tm-e98c low"></i>';
              }
              else{
                riskLevel += '<i class="motum-i tm-e98c risk-level"></i>';
              }
          }
          break;
      case 1:
          riskLevel += '<i class="motum-i tm-e98c low"></i>';
          for(let i = 0;i<5;i++){
            riskLevel += '<i class="motum-i tm-e98c risk-level"></i>';
          }
          break;
      case 0:
          for (let i = 0; i<6; i++){
            riskLevel += '<i class="motum-i tm-e98c risk-level"></i>';
          }
          break;

  }

  return riskLevel;
  }

  createClientStatusAdm() {
    //  this.router.navigate(['/', 'pages', 'travel_matrix', 'clients-products','create']).then(nav => {
      this.router.navigate(['/', 'pages', 'travel_matrix', 'clients-products','update-admstatus']).then(nav => {
    
      setTimeout(() => {
             this.clientProductService.createClientProduct();
           }, 200);
          }, err => {
            console.log(err) // when there's an error
            console.log('error router');
        });
  }

  createClientStatusOper() {
    //  this.router.navigate(['/', 'pages', 'travel_matrix', 'clients-products','create']).then(nav => {
      this.router.navigate(['/', 'pages', 'travel_matrix', 'clients-products','update-operstatus']).then(nav => {
    
      setTimeout(() => {
             this.clientProductService.createClientProduct();
           }, 200);
          }, err => {
            console.log(err) // when there's an error
            console.log('error router');
        });
  }

  createClientOrderDetail() {
    //  this.router.navigate(['/', 'pages', 'travel_matrix', 'clients-products','create']).then(nav => {
      this.router.navigate(['/', 'pages', 'travel_matrix', 'clients-products','order-detail']).then(nav => {
    
      setTimeout(() => {
             this.clientProductService.createClientProduct();
           }, 200);
          }, err => {
            console.log(err) // when there's an error
            console.log('error router');
        });
  }

  /**
   * 
   * Get information about the selected vehicle, from the current or binnacle table
   * @param event 
   */
  onCellClicked( event){
    console.log("selected..." + event.rowIndex);
   // console.log("selected data..." + JSON.stringify(event.data.route_details));
    console.log("selected data..." + JSON.stringify(event.data.orderdetail));
  
    if(event.column.colId == 'foliodesp'){
     // alert("consulta viaje");
      this.createClientOrderDetail();
    }

    if(event.column.colId == 'statusadm'){
      //alert("estado adm");
      this.createClientStatusAdm();
    }

    if(event.column.colId == 'statusoper'){
     // this.createClientObs();
     //alert("estado oper");
      this.createClientStatusOper();

    }  


    
    if(event.column.colId == 'motorStopStatus'&& event.data != null 
        && event.data !== undefined){
        let authorized = this.isAuthorizedUser();
        console.log("authorized..." + authorized);
    
        authorized = true;
        
        if(authorized){ 
          
          this.rowSelected = this.data[event.rowIndex];        
          this.selectedOneItem.emit(this.rowSelected);
          console.log(this.data[event.rowIndex]);
        }
        else{
          this.selectedOneItem.emit([]);
        }

    }
  }

  isAuthorizedUser(){
    let informationUser = this._loginService.isLogged();
    if(informationUser.length ==-1){
      return false;
    }else{
        if(informationUser.roles[0]== 'Monitorista'){
          return true;
        }
        else  
          return false;
    }
  }

  onSelectionChanged(){

    let totalRows = this.data.length;
    let arrTemporal =[];  
    this.selectedRows = this.gridApi.getSelectedRows();
    if(this.selectedRows.length > totalRows ){
      //Discard detail records
      for (let i = 0; i<this.selectedRows.length; i++){
        if(this.selectedRows[i].numberEconomic!=undefined)
        {
          arrTemporal.push(this.selectedRows[i]);
        }
      }
      this.selectedRows = arrTemporal;
    }    
    this.selectedItems.emit(this.selectedRows);
    
    this.columnDefCurrent.emit(this.columnDefs);
  }
 
  resizingColumns() {
    this.gridApi.sizeColumnsToFit();
  }

  deselectAllRow() {
    this.gridOptions.api.deselectAll();
    this.columnDefs[0].checkboxSelection = false;
    this.gridOptions.api.setColumnDefs(this.columnDefs);
  }
  onRowSelected(event) {
    if (event.node.selected)
      this.statusIsRemember.emit(true);

  }
    
   
  /**
   * The table needs to change its column size when width page changes
   * this method detects all changes on its size.
   *
   * @param event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.gridApi) {
      setTimeout(() => {
        this.resizingColumns();
      }, 200);
    }
  }

  //column size
  private onGridResize(){
    this.gridOptions.api.sizeColumnsToFit();
  }

  /***Functions for table detail************************ */
  public isFullWidthCell(rowNode) {
    return rowNode.level === 1;
  }

  public getFullWidthCellRenderer() {
    return TableDetailComponent;
}
  public getRowHeight(params) {
    let rowIsDetailRow = params.node.level === 1;
    // return 100 when detail row, otherwise return 25
    return rowIsDetailRow ? 192 : 40.58;
}

public getNodeChildDetails(record) { 
  console.log(this.data);
 // console.log("detail node..." + JSON.stringify(record.route_details));
  console.log("detail node..." + JSON.stringify(record.ordedetail));
 
// if (record.route_details) {
  if (record.orderdetail) {

        return {
            group: true,
            // provide ag-Grid with the children of this group
            //children: [JSON.stringify(record.route_details)],
            children: [JSON.stringify(record.orderdetail)],
            
            // for  expand the third row by default
            //expanded: record.detail.length == 6
        };
    } else {
        return null;
    }
}
/********************************************************************** */    

}
