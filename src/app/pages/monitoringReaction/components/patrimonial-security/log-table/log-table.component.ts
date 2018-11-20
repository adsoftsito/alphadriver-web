import { Component, OnInit, Output, HostListener, EventEmitter } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { PatrimonialSecurityService } from '../patrimonial-security.service';
import { Subscription } from 'rxjs/Subscription';
import { TableDetailComponent } from '../table-detail';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ps-log-table',
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.scss']
})
export class LogTableComponent implements OnInit {

  
  @Output() statusCheckControl = new EventEmitter<any>();
  @Output() statusIsRemember = new EventEmitter<boolean>();
  @Output() selectedOneItem = new EventEmitter<any>();
  @Output() selectedItems = new EventEmitter<any>();
  @Output() columnDefsLog = new EventEmitter<any>();
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

  
  
  /***Service */
  /***********/
  private $subscriptionExportToExcell:Subscription;
  private $subscriptionUpdateTable:Subscription;
  private $dataToSearch:Subscription;
  private $subscriptionTranslate:Subscription;
  private $subscriptionGetData:Subscription;
  /************************ */
  arrTranslate:any = [];
  showTableTranslated: boolean = false;

  constructor(private translate:TranslateService,private _servicePatrimonialSecurity:PatrimonialSecurityService) { 
    this.columnDefs = [
      {
        colId:'numberEconomic',
        field: "numberEconomic",
        suppressSizeToFit:true,
        suppressMenu: true,
        width:80,
        
        /**properties detail table */
        cellRenderer:'group',
        cellRendererParams: {suppressCount: true}
        /*** */
      },
      { 
        field: "carrier",
        suppressMenu: true,
        width:72
      },
      { 
        field: "location",
        suppressMenu: true,
        width:73
      },
      {
        field:"numberEvents",
        suppressMenu: true,
        cellRenderer : (params)=>{
         let  risk =this.paintRiskLevel(params.value);
        return risk
        },
        width:64
      },
      {
        field: "dateOfPosition",
        suppressMenu: true,
        cellStyle:{'text-align':'center'},
        width:111,
        cellRenderer: (params) => { 
         return params.value + 'h' ;
        }
      },
      {
        colId: "motorStopStatus",
        field:"motorStopStatus",
        suppressMenu: true,
        cellClass:['cell-motum-hover-statusMotorStop'],        
        cellRenderer:(params)=>{
          if(params.value==true)
          return '<i class="motum-i tm-ea00 status-on" ></i> '+this.arrTranslate.WithMotorStop;
          else
          return '<i class="motum-i tm-ea00 status-off"></i> '+this.arrTranslate.WithoutMotorStop;
        },
        width:112
      },
      {
        field:"transmitter",
        suppressMenu: true,
        width:95
      },
      {
        field:"commandSent",
        suppressMenu: true,
        width:116
      },
      {
        field:"shippingDate",
        suppressMenu: true,
        cellStyle:{'text-align':'center'},
        cellRenderer:(params) =>{
            if(params.value.length == 0)
            {
                return '-';
            }
            else return params.value + 'h' ;;
        },
        width:111
      },
      {
        field:"dateOfApplication",
        suppressMenu: true,
        cellStyle:{'text-align':'center'},
        cellRenderer:(params) =>{
          if(params.value.length == 0)
          {
              return '-';
          }
          else return params.value + 'h' ;;
         },
         width:111
      },
      {
        field:"comments",
        suppressMenu:true,
        //width:103
        width:104
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
            "status": true,
          }
        ,
      "numberEvents":6,
      "dateOfPosition":"2018/09/27 - 17:22:00",
      "motorStopStatus": false,
      "transmitter": "Antitamper",
      "commandSent": "Activar paro de motor",
      "shippingDate":"2018/09/27 - 17:22:00",
      "dateOfApplication":  "2018/09/27 - 17:30:00",
      "comments":"Activación manual",
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
          "status": false,
        },
      "numberEvents":5,
      "dateOfPosition":"2018/09/27 - 16:00:00",
      "motorStopStatus": true,
      "transmitter": "Inhibidor de GPS",
      "commandSent": "Desactivar paro de motor",
      "shippingDate":"",
      "dateOfApplication":  "2018/09/27 - 16:00:00",
      "comments":"Procede a desatiempo",
      "detail": [
        {
          "event": "Motum desconectado",
          "date": "2018/09/27-17:22:00",          
          "locationOrPointInterest": "Llegada a Cliente"
        },
        {
          "event": "Desconexión de antena GPS",
          "date": "2018/09/27-17:00:00",
          "locationOrPointInterest": "Llegada a punto base"
        },
        {
          "event": "Fuera de cobertura ",
          "date": "2018-09-27-16:55;00",
          "locationOrPointInterest": "San Antonio, 74949 Acatlán de Osorio, Puebla."
        },
        {
          "event": "Fuera de cobertura ",
          "date": "2018-09-27-16:40:00",
          "locationOrPointInterest": "San Antonio, 74949 Acatlán de Osorio, Puebla."
        },
        {
          "event": "Fuera de cobertura ",
          "date": "2018-09-27-15:30:00",
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
      "comments":"No cumple con la regla",
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
      "comments":"Procede",
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
    //this.gridOptions.masterDetail = true;
    this.gridOptions.pagination = true;
    
    this.gridOptions.headerHeight = 30.58;
    this.gridOptions.rowHeight = 40.58;
    this.gridOptions.enableColResize = true;
    this.gridOptions.enableSorting = true;
    this.rowSelection = "multiple";
    }
  //end constructor

  ngOnInit() {
    this.$subscriptionExportToExcell = this._servicePatrimonialSecurity.exportToExcellTable$.subscribe(
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
  

    this.$dataToSearch = this._servicePatrimonialSecurity.dataSearch$.subscribe(
        value=>{
          this.gridOptions.api.setQuickFilter(value);
        });
  }

  ngOnDestroy(){
    this.$subscriptionExportToExcell.unsubscribe();
    this.$subscriptionUpdateTable.unsubscribe();
    this.$dataToSearch.unsubscribe();
    this.$subscriptionTranslate.unsubscribe();
  }

  translateHeaderTable(){
    this.$subscriptionTranslate = this.translate.get('pages.monitoringreaction.patrimonial_security').subscribe( res =>{
      this.arrTranslate = res;
      this.columnDefs[0].headerName = this.arrTranslate.economic;
      this.columnDefs[1].headerName = this.arrTranslate.carrier;
      this.columnDefs[2].headerName = this.arrTranslate.location;
      this.columnDefs[3].headerName = this.arrTranslate.risk;
      this.columnDefs[4].headerName = this.arrTranslate.dateOfPosition;
      this.columnDefs[5].headerName = this.arrTranslate.motorStopStatus;
      this.columnDefs[6].headerName = this.arrTranslate.transmitter;
      this.columnDefs[7].headerName = this.arrTranslate.commandSent;
      this.columnDefs[8].headerName = this.arrTranslate.shippingDate;
      this.columnDefs[9].headerName = this.arrTranslate.dateOfApplication;
      this.columnDefs[9].headerName = this.arrTranslate.comments;
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
    this.totalRows.emit(this.data.length);
    this.gridOptions.api.setRowData(this.data);
    this.resizingColumns();
    /******* */
    /** service**/
    // this.$subscriptionGetData = this._servicePatrimonialSecurity.getUnitsSafeties(null,null).subscribe(
    //   res =>{
    //     const body = JSON.parse(res['_body']);
    //     if(body.UnitsSafeties)
    //     {
    //       this.gridOptions.api.setRowData(body.UnitsSafeties);  
    //       this.resizingColumns();
    //       this.totalRows.emit(body.UnitsSafeties.length);
    //     }
    //   },
    //   err =>
    //   {console.log("Error"+err)}
    // )

  }
  
  /***tools***/
  exportToExel() {
    let params = {
      fileName: 'PatrimonialSecurity_log'
    };
    this.gridApi.exportDataAsExcel(params);
  } 
  refresh(){   
    this.getDataForTable();
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


  /**
   * Get information about the selected vehicle, from the current or binnacle table
   * @param e 
   */
  onCellClicked( e){
    if(e.column.colId == 'motorStopStatus'&& e.data != null && e.data !== undefined){
        this.rowSelected = this.data[e.rowIndex];
        this.selectedOneItem.emit(this.rowSelected);
    }
  }

  onSelectionChanged(){
    this.selectedRows = this.gridApi.getSelectedRows();
    this.selectedItems.emit(this.selectedRows);
    this.columnDefsLog.emit(this.columnDefs);
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
  if (record.detail) {
      return {
          group: true,
          // provide ag-Grid with the children of this group
          children: [record.detail],
          // for  expand the third row by default
          //expanded: record.detail.length == 6
      };
  } else {
      return null;
  }
}
/********************************************************************** */    

}
