
import {Component, ViewEncapsulation, OnDestroy, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef} from "@angular/core";
import {LicenseManager} from "ag-grid-enterprise";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {GridOptions} from "ag-grid";
import {ClientProductService} from "./clients.service";
import { UserService } from "../users/user.service";
import { timeout } from "rxjs/operator/timeout";
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientModel } from '../../../../shared/models/clients/client.model';
import { InterfaceModel } from '../../../../shared/models/clients/interface.model';
import { NumberModel } from '../../../../shared/models/clients/number.model';
import { PhoneModel } from '../../../../shared/models/clients/phone.model';
import { PlataformModel } from '../../../../shared/models/clients/plataform.model';
import { AccountModel } from '../../../../shared/models/clients/account.model';

/**
 * Created by Tech Group BWL on 30/05/2018.
 */

LicenseManager.setLicenseKey('26f908fcbd31ab5109aab8ba901fe020');

@Component({
    selector: 'client-product-component.col-md-12',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ClientsProductsComponent implements OnDestroy, OnInit, AfterViewInit{

    search = 'pages.userControl.client_product.search';
    newClient = 'pages.userControl.clients.newClient';
    dataSelected: any;
    @ViewChild('welcomeWindow') welcomeWindow: ElementRef;
    @ViewChild('confirmCreateOrder') window: ElementRef;
    editar: any;
    userModel(arg0: any): any {
        throw new Error("Method not implemented.");
    }


    /**   CALENDAR VARS  **/
    showCalendarModal: boolean = false;
    calendarLabel: any = 'Úlitmos 7 días';
    selectedRange: any;                     //<---- This stores data into your component
    selectedOption: any;                    //<---- This stores data into your component

    /** TABLE PROPERTIES **/
    gridOptions: GridOptions;
    rowSelectNow: number;
    rowSelection: string;
    gridColumnApi: any;
    gridApi: any;
    edit: boolean;
    tableCount: number = 0;

    dataMembers: Array<any>;
    dataMembersTable: Array<any>;

    subscriptionCreate: Subscription;
    subscriptionEdit: Subscription;

    isSelectable: boolean = false;
    isSelecRow: boolean = false;
    flagMembersModal: boolean = false;
    checkControl: boolean = true;
    hasLoadedTable = false;

    /** COLUMNS OF THE TABLE **/
    columnDefs: any = [];    customIcons: any = {
        sortAscending: '<i class="fa fa-caret-down"/>',
        sortDescending: '<i class="fa fa-caret-up"/>',
    };

    ngAfterViewInit(){

        setTimeout(() =>{
            this.gridApi.sizeColumnsToFit();
        }, 1000);

    }

    constructor(
        private translate: TranslateService,
        private router: Router,
        private userService: UserService,
        private clientProductService :ClientProductService,
        private modalService: NgbModal,
        private cdr: ChangeDetectorRef
    ) {

      this.columnDefs = [{
          headerName: "Dueño de la cuenta",
          field: "accountOwner",//solicitante
          suppressSizeToFit: true,
          cellClass: ['motum-hover-name']
          // suppressMenu: true,
          // filter: "agTextColumnFilter"
      }, {
          headerName: "Razón social",
          field: "businessName",//client
          // suppressMenu: true,
          // filter: "agTextColumnFilter"
      }, {
          headerName: "Pedidos",
          field: "order",//pedido
          cellClass: ['motum-hover-name'],
          cellRenderer: (params) => {
              if (params.value === 0 || params.value < 0) {
                  return `-`;
              } else {
                  return `${params.value}`;
              }
          },
          suppressMenu: true,
          getQuickFilterText: function(params) {
            return null;
          }
      }, {
          headerName: "Último pedido",
          field: "orderDate",//fecha_pedido
          suppressMenu: true,
          getQuickFilterText: function(params) {
            return null;
          }
      }, {
          headerName: "Suscripciones",
          field: "subscriptions",//subscriptions
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
      }, {
          headerName: "Integrantes",
          field: "members",//integrantes
          cellClass: ['motum-hover-name'],
          suppressMenu: true,
          getQuickFilterText: function(params) {
            return null;
          }
      }, {
          headerName: "Tipo",
          field: "rol",
          suppressMenu: true,
          getQuickFilterText: function(params) {
            return null;
          }
      }, {
          headerName: "Paro de motor",
          field: "engineStop",
          suppressMenu: true,
          getQuickFilterText: function(params) {
              return null;
          }
      }, {
          headerName: "Accesos",
          field: "access",
          suppressMenu: true,
          getQuickFilterText: function(params) {
              return null;
          }
      }, {
          headerName: "Vencimiento",
          field: "expiration",
          cellRenderer: (params) => {
                if (params.value < 4) {
                    let eDiv = document.createElement('div');
                    eDiv.innerHTML = `<span class="expiration-color">${params.value} días</span>`;
                    return eDiv;
                } else {
                    return `${params.value} días`;
                }
          },
          suppressMenu: true,
          getQuickFilterText: function(params) {
            return null;
          }
      }, {
          headerName: "Último acceso",
          field: "lastAccess",
          suppressMenu: true,
          getQuickFilterText: function(params) {
            return null;
          }
      }, {
          headerName: "Estado",
          field: "status",
          cellClass: ['motum-app-menu'],
          cellRenderer: function(params) {
            let tooltip;
            if (params.value == 0) {
              translate.get('pages.userControl.userStatus').subscribe( res =>{
                      tooltip = res.disabled;
              });
            }else {
              if (params.value == 1) {
                translate.get('pages.userControl.userStatus').subscribe( res =>{
                        tooltip = res.enabled;
                });
              }else {
                translate.get('pages.userControl.userStatus').subscribe( res =>{
                        tooltip = res.locked;
                });
              }
            }
            if (params.value === 0){
              if(params.rowIndex === 0){
                return `<div class = "tooltip-a-first" alt ="${tooltip}">
                            <i class="motum-i tm-e924"></i>
                        </div>`;
              }else{
                return `<div class = "tooltip-status" alt ="${tooltip}">
                          <i class="motum-i tm-e924"></i>
                      </div>`;
              }
            }
            if (params.value === 1 || params.value === 2){
              if(params.rowIndex === 0){
                return `<div class = "tooltip-a-first" alt ="${tooltip}">
                          <i class="motum-i tm-e923"></i>
                        </div>`;
              }else{
                return `<div class = "tooltip-status" alt ="${tooltip}">
                          <i class="motum-i tm-e923"></i>
                        </div>`;
              }
            }

                  
          },
          cellStyle: (params) => {
              if (params.value === 0)
                  return {color: '#c4c4c4'};
              if (params.value === 1)
                  return {color: '#33df69'};
              if (params.value === 2)
                  return {color: '#ff3031'};
          },
          suppressMenu: true,
          getQuickFilterText: function(params) {
            return null;
          }
      }];
        this.gridOptions = <GridOptions>{};
        this.gridOptions.headerHeight = 40.58;
        this.gridOptions.animateRows = true;
        this.gridOptions.enableColResize = true;
        this.gridOptions.enableSorting = true;
        this.gridOptions.enableFilter = true,
        this.gridOptions.columnDefs = this.columnDefs;
        this.gridOptions.rowHeight = 40.58;


        this.rowSelection = "single";
        this.subscriptionCreate = this.clientProductService.newClient$.subscribe(
          client => {
              this.onInsertRowClient(client);
              this.onCreateOrder();
        });

        this.subscriptionCreate = this.userService.newUser$.subscribe(
            user => {
                // this.onInsertRowUser(user);
                this.onWelcome();

          });

        /* TRANSLATE PAGE FOOTER */
        this.translate.get('general')
            .subscribe(labelObject => {
                this.gridOptions.localeText = {page: labelObject.page, of: labelObject.of};
            });

        /* TRANSLATE CALENDAR LABEL*/
        this.translate.get('pages.ranking')
            .subscribe(labelObject => {
                this.calendarLabel = labelObject.last + ' 7 ' + labelObject.days;
            });
        /* TRANSLATE TABLE */
        this.translate.get('pages.userControl.client_product.table')
            .subscribe(labelObject => {
                this.UpdateHeaderName(labelObject);
            });

    }

    UpdateHeaderName(userlabels: any) {
        this.columnDefs[0].headerName = userlabels.accountOwner;
        this.columnDefs[1].headerName = userlabels.businessName;
        this.columnDefs[2].headerName = userlabels.orders;
        this.columnDefs[3].headerName = userlabels.lastOrder;
        this.columnDefs[4].headerName = userlabels.subscriptions;
        this.columnDefs[5].headerName = userlabels.installed;
        this.columnDefs[6].headerName = userlabels.members;
        this.columnDefs[7].headerName = userlabels.type;
        this.columnDefs[8].headerName = userlabels.engineStop;
        this.columnDefs[9].headerName = userlabels.access;
        this.columnDefs[10].headerName = userlabels.expires;
        this.columnDefs[11].headerName = userlabels.lastAccess;
        this.columnDefs[12].headerName = userlabels.status;

        this.gridOptions.columnDefs = this.columnDefs;
        this.hasLoadedTable = true;
    }



    onInsertRowClient(clientModel: ClientModel) {
      var newData = this.createNewRowDataUser(clientModel);
      this.gridApi.updateRowData({
        add: [newData],
        addIndex: 0
      });
    }
    exportToExel() {
      let params = {
        fileName: 'Clients'
      }
      this.gridApi.exportDataAsExcel(params);
    }
    createNewRowDataUser(data) {
      let plataform: string = '';
      // FIXME: revisar como se mostraran estos campos
      for (let i = 0; i < data.plataforms.length; i++) {
        if (data.plataforms[i].plataform) {
            plataform += data.plataforms[i].plataform +" ";
        }
      }
      if(plataform.length < 1) {
        plataform = 'Tecnomotum';
      }
      var newData = {
        id: data.id,//// FIXME: falta el id para controlar los usuarios
        commercialName: data.commercialName,
        businessName: data.businessName,
        order: data.zipCode,
        orderDate: plataform,
        subscriptions: plataform,
        installed: data.division,
        members: data.lastAccess,
        rol: data.password,
        expiration: data.zipCode,
        lastAccess: data.status,
        status: data.account.enabled
      };
      return newData;
    }
    onCreateOrder() {
      const modalRef = this.modalService.open(this.window, { size: 'lg' , keyboard: false, windowClass: 'motum-modal-confirm', backdrop: true });
      modalRef.result.then((userResponse) => {
        if(userResponse) {
          this.router.navigate(['/', 'pages', 'usersControl', 'clients-products', 'orders']).then(nav => {
            setTimeout(() => {
              this.clientProductService.sCreateOrder(null);
            }, 200);
            //console.log(nav); // true if navigation is successful
          }, err => {
            //console.log(err) // when there's an error
          });
        }
      });
    }

    onWelcome() {
        const modalRef = this.modalService.open(this.welcomeWindow, { size: 'lg' , keyboard: false, windowClass: 'motum-modal-confirm', backdrop: true });
        modalRef.result.then((userResponse) => {
          if(userResponse) {
            //Send email
            console.info("Se debe enviar un email");
          }
        });
    }

    /** LIFECYCLE ANGULAR METHODS **/
    ngOnInit() {}
    ngOnDestroy(){
      this.subscriptionCreate.unsubscribe();
      // this.subscriptionEdit.unsubscribe();
    }


    getClientsData(){
        this.clientProductService.retrieveDataForTable()
            .subscribe(
                res => {
                    const body = JSON.parse(res['_body']);
                    const dataToSetup: any = body.clients;
                    this.gridOptions.api.setRowData(dataToSetup);
                    this.tableCount = dataToSetup.length;
                    setTimeout(() => {
                        // console.info("Resize columns");
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
        this.getClientsData();
    }

    /**
     * Method to show client form to edit a clientProduct
     * @param event
     */
    onCellClicked (event) {
      if (event.data !== null && event.data !== undefined ) {
          this.dataSelected = event.data;
      }
        // HERE GOES CODE TO SHOW EDIT CLIENT FORM
        if(event.column.colId === 'members' && event.data !== null && event.data !== undefined) {

            this.router.navigate(['/', 'pages', 'usersControl', 'clients-products', 'members'])
                  .then(nav => {
                          setTimeout(() => {

                      }, 200);
                  }, err => {
                      console.info(err);
                      alert('It was not possible to go to selected route')
                  });

        }else {

            if(event.column.colId === 'accountOwner' && event.data !== null && event.data !== undefined){
                this.router.navigate(['/', 'pages', 'usersControl', 'clients-products', 'edit'])
                .then(nav => {
                        setTimeout(() => {
                            this.clientProductService.updateClientProduct(event.data);
                    }, 200);
                }, err => {
                    console.info(err);
                    alert('It was not possible to go to selected route');
                });
            }else {
              if(event.column.colId === 'order' && event.data !== null && event.data !== undefined && event.data.order > 0) {
                  this.router.navigate(['/', 'pages', 'usersControl', 'client-orders'])
                  .then(nav => {
                          setTimeout(() => {

                      }, 200);
                  }, err => {
                      console.info(err);
                      alert('It was not possible to go to selected route');
                  });
              }
            }

        }
    }

    onRowClicked (event) {
      if (!this.isSelectable) {
        this.gridOptions.api.forEachNodeAfterFilter( function(node) {
          if (node.data === event.data) {
            node.setSelected(true);
          }
        });
        this.isSelecRow = true;
      }else {
        this.isSelecRow = false;
      }
      // if(event.data !== null && event.data !== undefined) {
      //   this.isSelecRow = true;
      // }
    }

    /**
     * Change search filter in table
     * @param event: textfield search event
     */
    onFilterChanged(event) {
      this.gridApi.setQuickFilter(event);
      //this.clientProductService.getDataForTableFilter(event);
    }

    /**
     * Change table to be selectable
     */
     makeSelectableRow() {
       // this.gridOptions.api.refreshHeader();
       if(this.checkControl == true && this.isSelectable == true) {
         this.columnDefs[0].checkboxSelection = this.isSelectable;
         this.gridOptions.api.setColumnDefs(this.columnDefs);
         this.gridOptions.api.selectAll()
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
       this.isSelecRow = false;
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
     * Method to show client form to create a clientProduct
     */
    createClientProduct() {
        this.router.navigate(['/', 'pages', 'usersControl', 'clients-products','create']).then(nav => {
            setTimeout(() => {
               this.clientProductService.createClientProduct();
             }, 200);
            }, err => {
              console.log(err) // when there's an error
              console.log('error router');
          });
    }

    /**
     * Method to remove element(s) from table
     * @param modalDelete: ng-template for modal
     */
     onRemoveSelected(modalDelete) {

       const modalRef = this.modalService.open(modalDelete, { size: 'lg' , keyboard: true, windowClass: 'motum-modal-delete', backdrop: true });
       modalRef.result.then((userResponse) => {
         if(userResponse) {

           let selectedData = this.gridApi.getSelectedRows();
           let res: any[] = [];
           if (selectedData.length && selectedData.length > 0) {
             selectedData.forEach((selectedRow) => {
               if(this.userService.deleteUser(selectedRow)){
                 res.push(selectedRow);
               }
             });
           }
           this.gridApi.updateRowData({remove: res});

           this.deselectAllRow();
           this.resizingColumns();
         }
       });
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

    createOrder() {
        this.router.navigate([ '/', 'pages', 'usersControl', 'clients-products', 'orders'])
          .then(nav => {
            setTimeout(() => {
                this.clientProductService.sCreateOrder(this.dataSelected);
            }, 200);
          });
    }
    addMember() {
        let routeComponent = '/pages/usersControl/clients-products';
        this.router.navigate([ '/', 'pages', 'usersControl', 'clients-products', 'create-member'])
          .then(nav => {
            setTimeout(() => {
                this.userService.sCreateUser();
                this.userService.routeClose(routeComponent);
               }, 200);
          });
    }


    close(){
        this.flagMembersModal = false;
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
