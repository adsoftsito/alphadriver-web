import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { GridOptions, Grid } from 'ag-grid';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import {Router} from "@angular/router";
import {ClientProductService} from "../../clients.service";
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Asset } from '../../Asset';
import { Http, ResponseContentType } from '@angular/http';


@Component({
  selector: 'motum-table-detail',
  templateUrl: './table-detail-route.component.html',
  styleUrls: ['./table-detail-route.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class TableDetailRouteComponent implements OnInit, OnDestroy{

  gridOptions:GridOptions;
  parentRecord:any;
  columnDefs:any;

  customIcons: any = {
    sortAscending: '<i class="fa fa-caret-down"/>',
    sortDescending: '<i class="fa fa-caret-up"/>',
  };

  translated :boolean = false;

  private $subscriptionTranslate:Subscription;

  @ViewChild('modalPhotos') modalPhotos : ElementRef;
  @ViewChild('modalSigns') modalSigns : ElementRef;
  @ViewChild('modalObs') modalObs : ElementRef;
  private data:any[];


  constructor(private _translate: TranslateService,
              private modalService:NgbModal, 
              private http : Http,
              private router: Router,
              private clientProductService :ClientProductService,

    ) { 
    this.columnDefs = [
      {
        field: "orderdetaildescription",
        headerName: "Partida",
        cellStyle:{'text-align':'center'},
        suppressMenu: true,
        cellRenderer:(params) => {
         // if(params.value){
            let iconsSignal: string;
           
            iconsSignal = ' <input type="text" class="form-control input-sm" id="orderKm" required>';
            return iconsSignal;//motum-i tm-e98d
          }
       // }

      },
      {
        field: "orderdetailproductdescription",
        headerName: "Producto",
        cellStyle:{'text-align':'center'},
        pinned:"left",
        suppressMenu:true,
        cellRenderer:(params) => {
          // if(params.value){
             let iconsSignal: string;
            
             iconsSignal = ' <input type="text" class="form-control input-sm" id="orderKm" required>';
             return iconsSignal;//motum-i tm-e98d
           }
      },
      {
        field: "orderdetailproductquantity",
        headerName:"Cant",
        cellStyle:{'text-align':'center'},
        pinned:"right",
        suppressMenu: true,
        width:100,
        cellRenderer:(params) => {
          // if(params.value){
             let iconsSignal: string;
            
             iconsSignal = ' <input type="text" class="form-control input-sm" id="orderKm" required>';
             return iconsSignal;//motum-i tm-e98d
           }
      },
      {
        field: "orderdetailproductunitid",
        headerName:"Unidad",
        cellStyle:{'text-align':'center'},
        
        pinned:"right",
        suppressMenu: true,
        width:100,
        cellRenderer:(params) => {
          // if(params.value){
             let iconsSignal: string;
            
             iconsSignal = ' <input type="text" class="form-control input-sm" id="orderKm" required>';
             return iconsSignal;//motum-i tm-e98d
           }
      },
      {
        colId:'firmas',
        field: "orderdetailproductunitid",
        headerName:"Firmas",
        cellStyle:{'text-align':'center'},
        cellClass:['cell-motum-hover-statusMotorStop'],        

        pinned:"right",
        suppressMenu: true,
        cellRenderer:(params) => {
          // if(params.value){
             let iconsSignal: string;
            
             iconsSignal = ' <input type="text" class="form-control input-sm" id="orderKm" required>';
             return iconsSignal;//motum-i tm-e98d
           },
        width:150
      }
      /*,
      {
        colId:'fotos',
        field: "orderdetailproductunitid",
        headerName:"Fotos",
        cellStyle:{'text-align':'center'},
        cellClass:['cell-motum-hover-statusMotorStop'],        

        pinned:"right",
        suppressMenu: true,
        cellRenderer:(params)=>{
          return 'Fotos - '+ params.value;
        },
        width:150
      },
      
      {
        colId:'obs',
        field: "orderdetailproductunitid",
        headerName:"Obs",
        cellStyle:{'text-align':'center'},
        cellClass:['cell-motum-hover-statusMotorStop'],        

        pinned:"right",
        suppressMenu: true,
        cellRenderer:(params)=>{
          return 'Obs - '+ params.value;
        },
        width:150
      },
      
      {
        colId:'codqr',
        field: "orderdetailproductunitid",
        headerName:"QR",
        cellStyle:{'text-align':'center'},
        cellClass:['cell-motum-hover-statusMotorStop'],        

        pinned:"right",
        suppressMenu: true,
        cellRenderer:(params)=>{
          return 'Cod QR - '+ params.value;
        },
        width:150
      },
      
      {
        colId:'codbarra',
        field: "orderdetailproductunitid",
        headerName:"Barra",
        cellStyle:{'text-align':'center'},
        cellClass:['cell-motum-hover-statusMotorStop'],        

        pinned:"right",
        suppressMenu: true,
        cellRenderer:(params)=>{
          return 'Cod Barras - '+ params.value;
        },
      
        width:150
      }*/

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
    }
    /*,
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
  */ ];    



    this.gridOptions =<GridOptions>{};
    this.translateHeaderTable();
    this.gridOptions.enableSorting = true;
    this.gridOptions.enableFilter = true;
    this.gridOptions.enableColResize = false;
    this.gridOptions.columnDefs = this.columnDefs; 
    this.gridOptions.headerHeight = 20.58;   
    this.gridOptions.rowHeight = 26.58;
    this.gridOptions.animateRows = true;
  }

  ngOnInit() {

     }


  ngOnDestroy(){
    this.$subscriptionTranslate.unsubscribe();
    console.log("des");
    
  }

  translateHeaderTable(){
    this.$subscriptionTranslate = this._translate.get('pages.monitoringreaction.patrimonial_security').subscribe(
      res => {
          this.columnDefs[0].headerName = "Llegada"; //res.event;
          this.columnDefs[1].headerName = "Actividad"; //res.date;
          this.columnDefs[2].headerName = "Producto"; //res.locationOrPointInterest;
          this.columnDefs[3].headerName = "Cantidad"; //res.locationOrPointInterest;
          this.columnDefs[4].headerName = "Unidad de Medida"; //res.locationOrPointInterest;

          this.gridOptions.columnDefs = this.columnDefs;
          this.translated = true;
      }
      );
      
  }


  
  agInit(params:any){
    console.log("data detail: " + JSON.stringify(params.node.parent.data));
//    this.parentRecord = params.node.parent.data;
    this.parentRecord = this.data;

  }

  ngAfterViewInit(){
    //console.log("route details: " + JSON.stringify(this.parentRecord.route_details));
    //console.log("route details: " + JSON.stringify(this.parentRecord.orderdetail));
    
    this.gridOptions.api.setRowData(this.parentRecord);
    //this.gridOptions.api.setRowData(this.parentRecord.orderdetail);
    
    this.gridOptions.api.sizeColumnsToFit();
  }

  private onGridResize(){
    this.gridOptions.api.sizeColumnsToFit();
  }

 
  /**
   * Get information about the selected vehicle, from the current or binnacle table
   * @param event 
   */
  onCellClicked(event){
    console.log("selected adsoft..." + event.rowIndex);
   // console.log("selected data..." + JSON.stringify(event.data.route_details));
   // console.log("selected data..." + JSON.stringify(event.data.orderdetail));
    //alert("hola ...");
  //  if(event.column.colId == 'firmas'&& event.data != null && event.data !== undefined){
        
          /*
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
        }*/


    }

}
