import { Component, OnInit, ViewEncapsulation, OnDestroy} from '@angular/core';
import { GridOptions, Grid } from 'ag-grid';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import {Router} from "@angular/router";
import {ClientProductService} from "../../clients.service";


@Component({
  selector: 'motum-table-detail-route',
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

  constructor(private _translate: TranslateService,
              private router: Router,
              private clientProductService :ClientProductService,

    ) { 
    this.columnDefs = [
      {
        field: "orderdetaildescription",
        headerName: "Partida",
        cellStyle:{'text-align':'center'},
        suppressMenu: true,
        cellRenderer: (params) => {
          return params.value +' h';
        }
      },
      {
        field: "orderdetailproductdescription",
        headerName: "Producto",
        cellStyle:{'text-align':'center'},
        pinned:"left",
        suppressMenu:true
      },
      {
        field: "orderdetailproductquantity",
        headerName:"Cant",
        cellStyle:{'text-align':'center'},
        pinned:"right",
        suppressMenu: true,
        width:100
      },
      {
        field: "orderdetailproductunitid",
        headerName:"Unidad",
        cellStyle:{'text-align':'center'},
        
        pinned:"right",
        suppressMenu: true,
        width:100
      },
      {
        colId:'firmas',
        field: "orderdetailproductunitid",
        headerName:"Firmas",
        cellStyle:{'text-align':'center'},
        cellClass:['cell-motum-hover-statusMotorStop'],        

        pinned:"right",
        suppressMenu: true,
        cellRenderer:(params)=>{
          return 'Firmas - '+ params.value;
        },
        width:150
      },
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
      }

    ];

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
          this.columnDefs[0].headerName = "Partida"; //res.event;
          this.columnDefs[1].headerName = "Producto"; //res.date;
          this.columnDefs[2].headerName = "Cantidad"; //res.locationOrPointInterest;
          this.columnDefs[3].headerName = "Unidad"; //res.locationOrPointInterest;
          this.columnDefs[4].headerName = "Pruebas de viaje"; //res.locationOrPointInterest;

          this.gridOptions.columnDefs = this.columnDefs;
          this.translated = true;
      }
      );
      
  }

  agInit(params:any){
    console.log("xxx adsoftsito data detail: " + JSON.stringify(params.node.parent.data.orderdetail));
    this.parentRecord = params.node.parent.data.orderdetail;
  }

  ngAfterViewInit(){
    //console.log("route details: " + JSON.stringify(this.parentRecord.route_details));
    console.log("xxx adsoftsito route details: " + JSON.stringify(this.parentRecord));
    
    //this.gridOptions.api.setRowData(this.parentRecord.route_details);
    this.gridOptions.api.setRowData(this.parentRecord);
    
    this.gridOptions.api.sizeColumnsToFit();
  }

  private onGridResize(){
    this.gridOptions.api.sizeColumnsToFit();
  }


  /**
     * Method to show client form to create a clientProduct
     */
  createClientProduct() {
    //  this.router.navigate(['/', 'pages', 'travel_matrix', 'clients-products','create']).then(nav => {
      this.router.navigate(['/', 'pages', 'travel_matrix', 'clients-products','upload-sign']).then(nav => {
    
      setTimeout(() => {
             this.clientProductService.createClientProduct();
           }, 200);
          }, err => {
            console.log(err) // when there's an error
            console.log('error router');
        });
  }

  createClientPhotos() {
    //  this.router.navigate(['/', 'pages', 'travel_matrix', 'clients-products','create']).then(nav => {
      this.router.navigate(['/', 'pages', 'travel_matrix', 'clients-products','upload-photo']).then(nav => {
    
      setTimeout(() => {
             this.clientProductService.createClientProduct();
           }, 200);
          }, err => {
            console.log(err) // when there's an error
            console.log('error router');
        });
  }

  createClientObs() {
    //  this.router.navigate(['/', 'pages', 'travel_matrix', 'clients-products','create']).then(nav => {
      this.router.navigate(['/', 'pages', 'travel_matrix', 'clients-products','upload-obs']).then(nav => {
    
      setTimeout(() => {
             this.clientProductService.createClientProduct();
           }, 200);
          }, err => {
            console.log(err) // when there's an error
            console.log('error router');
        });
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

      if(event.column.colId == 'firmas'){
        //alert("firmas");
        this.createClientProduct();
      }

      if(event.column.colId == 'fotos'){
        this.createClientPhotos();
      }

      if(event.column.colId == 'obs'){
        this.createClientObs();
      }
    }

}
