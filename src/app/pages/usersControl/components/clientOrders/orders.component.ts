import { Component, ViewEncapsulation, OnDestroy, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { LicenseManager } from "ag-grid-enterprise";
import { Router,ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { GridOptions } from "ag-grid";
import { OrdersService } from "./orders.service";
import { timeout } from "rxjs/operator/timeout";
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/**
* Created by Tech Group BWL on 30/05/2018.
*/

LicenseManager.setLicenseKey('26f908fcbd31ab5109aab8ba901fe020');

@Component({
  selector: 'client-Order-component.col-md-12',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientsOrdersComponent implements OnDestroy, OnInit, AfterViewInit{
  search = 'pages.userControl.clients.search';

  @ViewChild('windowDetailOrder') windowDetailOrder: ElementRef;

    selectedOption:any;
    selectedRange: any;
    showCalendarModal: boolean = false;
    calendarLabel: any = 'Últimos 7 días';

  searchInput:any;
  editar: any;
  userModel(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  initials: string;
  initialsColor: string;
  setColorAvatar: string;

  accountName: string;
  orderNumber: string;
  productsList: Array<any> = [{
    "quantity": 1, "plan": "Compra", "product": "MotumTrack",
    "charge": "Mensual", "duration": "12 meses", "folioERP": "452",
    "numberPart": "asd", "status": "",
    "listVehicleDispositive": [{
      "vehicle": {
        "businessName": "asd", "economic": "asdasd", "plates": "asdas", "vin": "dasda", "brand": "Kenworth", "model": "T600", "year": "2018"
      },
      "dispositive": [
        { "builder": "Suntech Modelo", "variant": "R", "model": "ST600", "status": "Instalado", "numberPart": "ABC0933"
      }
    ]
  },{
    "vehicle": {
      "businessName": "asd", "economic": "asdasd", "plates": "asdas", "vin": "dasda", "brand": "Kenworth", "model": "T600", "year": "2018"
    },
    "dispositive": [
      { "builder": "Suntech Modelo", "variant": "R", "model": "ST600", "status": "Instalado", "numberPart": "ABC0933"
    }
  ]
}]
},{
  "quantity": 1, "plan": "Compra", "product": "MotumTrack",
  "charge": "Mensual", "duration": "12 meses", "folioERP": "452",
  "numberPart": "asd", "status": "",
  "listVehicleDispositive": [{
    "vehicle": {
      "businessName": "asd", "economic": "asdasd", "plates": "asdas", "vin": "dasda", "brand": "Kenworth", "model": "T600", "year": "2018"
    },
    "dispositive": [
      { "builder": "Suntech Modelo", "variant": "R", "model": "ST600", "status": "Instalado", "numberPart": "ABC0933"
    }
  ]
}]
}];

/** TABLE PROPERTIES **/
gridOptions: GridOptions;
rowSelectNow: number;
rowSelection: string;
gridColumnApi: any;
gridApi: any;
edit: boolean;
tableCount: number = 0;
subscriptionCreate: Subscription;
subscriptionEdit: Subscription;

isSelectable: boolean = false;
isSelecRow: boolean = false;
checkControl: boolean = true;

/** COLUMNS OF THE TABLE **/
columnDefs: any = [{
  headerName: "Pedido",
  field: "order",//pedido,
  suppressMenu: true,
  cellClass: ['motum-hover-name'],
  getQuickFilterText: function(params) {
    return null;
  }
}, {
  headerName: "Fecha",
  field: "orderDate",//fecha_pedido
  suppressMenu: true,
  getQuickFilterText: function(params) {
    return null;
  }
},{
  headerName: "Dueño de la cuenta",
  field: "accountOwner",//solicitante
  suppressSizeToFit: true,
  suppressMenu: true
}, {
  headerName: "Razón social",
  field: "businessName",//client
  suppressMenu: true
},{
  headerName: "Dealer",
  field: "dealer",//client
  suppressMenu: true,
  getQuickFilterText: function(params) {
    return null;
  }
},{
  headerName: "Vendedor",
  field: "seller",//client
  suppressMenu: true,
  getQuickFilterText: function(params) {
    return null;
  }
},{
  headerName: "Suscripciones",
  field: "subscriptions",//subscriptions
  suppressMenu: true,
  getQuickFilterText: function(params) {
    return null;
  }
}, {
  headerName: "Productos",
  field: "products",//instaladas
  suppressMenu: true,
  getQuickFilterText: function(params) {
    return null;
  }
}, {
  headerName: "Dispositivos",
  field: "devices",//instaladas
  suppressMenu: true,
  getQuickFilterText: function(params) {
    return null;
  }
}, {
  headerName: "Instaladas",
  field: "installed",//instaladas
  suppressMenu: true,
  getQuickFilterText: function(params) {
    return null;
  }
},{
  headerName: "Estado",
  field: "status",
  suppressMenu: true,
  getQuickFilterText: function(params) {
    return null;
  }
}];
customIcons: any = {
  sortAscending: '<i class="fa fa-caret-down"/>',
  sortDescending: '<i class="fa fa-caret-up"/>',
};


constructor(
  // private translate: TranslateService,
  private router: Router,
  private ordersService : OrdersService,
  private modalService: NgbModal,
  private route: ActivatedRoute,
  private orderService: OrdersService,
  private cdr: ChangeDetectorRef,
  private translate: TranslateService
) {
  this.gridOptions = <GridOptions>{};
  this.gridOptions.headerHeight = 40.58;
  this.gridOptions.animateRows = true;
  this.gridOptions.enableColResize = true;
  this.gridOptions.enableSorting = true;
  this.gridOptions.columnDefs = this.columnDefs;
  this.gridOptions.rowHeight = 40.58;

    this.translate.get('general')
        .subscribe(labelObject => {
              this.gridOptions.localeText = {page: labelObject.page, of: labelObject.of};
        });




  this.rowSelection = "multiple";

}
exportToExel() {
  let params = {
    fileName: 'Orders'
  }
  this.gridApi.exportDataAsExcel(params);
}
/** LIFECYCLE ANGULAR METHODS **/
ngOnInit() {
  // const argCodified = this.route.snapshot.params['data'];
  // if (!argCodified) {
  //    return;
  // } else {
  //    console.info(argCodified);
  // }
}

ngAfterViewInit(){

        setTimeout(() => {
            this.gridApi.sizeColumnsToFit();
        }, 500);
}
ngOnDestroy(){
}

getOrdersData(){
    this.ordersService.retrieveDataForTable()
        .subscribe(
            res => {
                const body = JSON.parse(res['_body']);
                const dataToSetup: any = body.clients;
                this.tableCount = dataToSetup.length;
                if (this.gridOptions.api && dataToSetup) {


                    for(let item of dataToSetup){
                        let tmpDate = item.orderDate.substring(0, 9) + " - ";
                        let tmpTime = item.orderDate.substring(10) + " h";
                        let statusArray = ['Completo', 'Capturado', 'Incompleto'];
                        item.orderDate = tmpDate+ tmpTime;
                        item.status = statusArray[item.status];

                    }
                    this.gridOptions.api.setRowData(dataToSetup);
                }
                setTimeout(() => {
                    this.gridApi.sizeColumnsToFit();
                }, 200);
            },
            err => {
                console.info(err);

                this.gridOptions.api.setRowData([]);
                this.gridApi.sizeColumnsToFit();
                alert("An error has occurred, check your browser console");
            }
        );
}
/** TABLE METHODS **/
onGridReady(params) {
  this.gridColumnApi = params.columnApi;
  this.gridApi = params.api;
  this.getOrdersData();

}

/**
* Method to show client form to edit a clientProduct
* @param event
*/
onCellClicked (event) {
  if(event.column.colId === 'order' && event.data !== null && event.data !== undefined) {
    this.accountName= event.data.commercialName; // FIXME: cambiar por dealer
    this.orderNumber = event.data.order;
    this.getAvatar(event.data.commercialName, event.data.businessName);
    this.ordersService.getEspecificOrderForClient().subscribe(
      res => {
        if(res.status === 200) {
          const body = JSON.parse(res['_body']);
          const dataToSetup: any = body.clients; //FIXME cambiar el elemento que setea
          this.productsList = dataToSetup;
        }
      },
      err => {
        console.info(err);
      }
    );
    const modalRef = this.modalService.open(this.windowDetailOrder, { size: 'lg' , keyboard: false, windowClass: 'window-order-view ', backdrop: true });
  }else {
    if(event.column.colId === 'businessName' && event.data !== null && event.data !== undefined) {
      this.gridOptions.api.setQuickFilter(event.data.businessName);//local
      //   this.orderService.retrieveDataForTable(event.data.businessName).subscribe(
      //   res => {
      //     if(res.status === 200) {
      //       const body = JSON.parse(res['_body']);
      //       const dataToSetup: any = body.clients;//FIXME cambiar el elemento que setea
      //       this.gridOptions.api.setRowData(dataToSetup);
      //     }
      //   },
      //   err => {
      //     console.info(err);
      //   }
      // );// api
      this.searchInput = event.data.businessName;
    } else {
      if(event.column.colId === 'commercialName' && event.data !== null && event.data !== undefined) {
        this.gridOptions.api.setQuickFilter(event.data.commercialName);//local
        //   this.orderService.retrieveDataForTable(event.data.commercialName).subscribe(
        //   res => {
        //     if(res.status === 200) {
        //       const body = JSON.parse(res['_body']);
        //       const dataToSetup: any = body.clients;//FIXME cambiar el elemento que setea
        //       this.gridOptions.api.setRowData(dataToSetup);
        //     }
        //   },
        //   err => {
        //     console.info(err);
        //   }
        // );
        // api
        this.searchInput = event.data.commercialName;
      }
    }
  }
}

onRowClicked (event) {
}
getAvatar(param, param2){
  let cadena: string = String (param);
  let cadena2: string = String (param2);
  let letter = '';
  let letter2 = '';

  letter += cadena.charAt(0);
  letter2 += cadena2.charAt(0);
  this.initials = letter.toUpperCase();
  this.initialsColor = this.initials.charAt(0);

  if(this.initialsColor >= 'A' && this.initialsColor <= 'C'){
    this.setColorAvatar = 'azulB';
  }else{
    if(this.initialsColor >= 'D' && this.initialsColor <= 'F'){
      this.setColorAvatar = 'amarillo';
    }else{
      if(this.initialsColor >= 'G' && this.initialsColor <= 'I'){
        this.setColorAvatar = 'rojo';
      }else{
        if(this.initialsColor >= 'J' && this.initialsColor <= 'L'){
          this.setColorAvatar = 'morado';
        }else{
          if(this.initialsColor >= 'M' && this.initialsColor <= 'O'){
            this.setColorAvatar = 'verde';
          }else{
            if(this.initialsColor >= 'P' && this.initialsColor <= 'R'){
              this.setColorAvatar = 'rosa';
            }else{
              if(this.initialsColor >= 'S' && this.initialsColor <= 'U'){
                this.setColorAvatar = 'verdeF';
              }else{
                if(this.initialsColor >= 'V' && this.initialsColor <= 'Z'){
                  this.setColorAvatar = 'rosaF';
                }
              }
            }
          }
        }
      }
    }
  }
  this.initials += letter2.toUpperCase();
}
    onSelectionChanged() {

        let selectedRows = this.gridApi.getSelectedRows();
        let selectedRowsString = "";

        selectedRows.forEach((selectedRow, index) => {
            if (index > 5) {
                return;
            }

            if (index !== 0) {
                selectedRowsString += ", ";
            }
            selectedRowsString += selectedRow.order;
        });
    }

onFilterChanged(event) {



      this.gridOptions.api.setQuickFilter(event);

      if(event.length < 3){

          this.gridOptions.api.setQuickFilter(null);

      }
    // this.orderService.retrieveDataForTable(event.target.value).subscribe(
    //   res => {
    //     if(res.status === 200) {
    //       const body = JSON.parse(res['_body']);
    //       const dataToSetup: any = body.clients;//FIXME cambiar el elemento que setea
    //       this.gridOptions.api.setRowData(dataToSetup);
    //     }
    //   },
    //   err => {
    //     console.info(err);
    //   }


}
/**
* Change table to be selectable
*/
makeSelectableRow() {
  // this.gridOptions.api.refreshHeader();
  if(this.checkControl == true && this.isSelectable == true) {
    this.columnDefs[0].checkboxSelection = this.isSelectable;
    this.gridOptions.api.setColumnDefs(this.columnDefs);
    this.gridOptions.api.selectAll();
    this.resizingColumns();
    this.checkControl = false;
  }else{
    if (this.checkControl == false && this.isSelectable == false) {
      this.gridOptions.api.deselectAll();
      this.checkControl = null;
      this.isSelectable = true;
    }else {
      this.checkControl = true;
      this.deselectAllRow();
      this.resizingColumns();
    }
  }
}

deselectAllRow() {
  this.gridOptions.api.deselectAll();
  this.columnDefs[0].checkboxSelection = false;
  this.gridOptions.api.setColumnDefs(this.columnDefs);
}

resizingColumns() {
  this.gridApi.sizeColumnsToFit();
}


/**
* Method to remove element(s) from table
* @param modalDelete: ng-template for modal
*/
onRemoveSelected(modalDelete) {
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
      this.gridApi.sizeColumnsToFit();
    }, 200);
  }
}

/**
* Change status from enable to disabled or vice versa, only on selected rows
*/
onAbleDisableSelected(flag: boolean) {
  let selectedRows = this.gridApi.getSelectedRows();
  if (selectedRows.length && selectedRows.length > 0) {
    selectedRows.forEach(selectedRow => {
      selectedRow.status = flag;
    });
    this.gridApi.updateRowData({update: selectedRows});
  }
}

    /*This functions allows calendar to storage user defined dates
    *
    *  Needs following vars:
    *  - selectedOption:any
    *  - selectedRange:any
    *
    *  Needs following functions:
    *  + getSelectedRange(event){this.selectedRange=event}
    *  + getSelectedOption(event){this.selectedOption=event}
    *
    * */
    getSelectedOption(event){
        this.selectedOption = event;
        this.cdr.detectChanges();
    }
    getSelectedRange(event){
        this.selectedRange = event;
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
    /* END OF CALENDAR FUNCTIONS*/

}
