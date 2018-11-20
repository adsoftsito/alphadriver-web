import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, OnDestroy, ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import {Router} from "@angular/router";
import {GridOptions, Column} from "ag-grid";
import {ClientProductService} from "../clients.service";
import { UserService } from "../../users/user.service";
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'member-modal',
  templateUrl: './memberModal.component.html',
  styleUrls: ['./memberModal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MemberModalComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('confirmEditUser') confirmEditUser: ElementRef;

  @Input() dataMembers;
  @Input() dataMembersTable;
  @Output() close = new EventEmitter<any>();

  subscriptionEdit: Subscription;

  gridOptions: GridOptions;
  gridColumnApi: any;
  gridApi: any;
  rowSelection: string;
  getContextMenuItems: any;
  private components;

  isSelectable: boolean = false;
  isSelecRow: boolean = false;
  checkControl: boolean = true;  

  
    /** COLUMNS OF THE TABLE **/
    columnDefs: any = []; 
  
  

 

  constructor(
    private clientProductService :ClientProductService,
    private userService: UserService,
    private modalService: NgbModal,
    private router: Router, 
    private translate: TranslateService) { 

      this.columnDefs = [{
        headerName: "Nombre",
        field: "name",
        cellClass: ['motum-hover-name'],
        suppressMenu: true,
        width: 150
    }, {
        headerName: "Usuario",
        field: "username",
        suppressMenu: true,
        width: 150
    }, {
      headerName: "Correo electrónico",
      field: "email",
      suppressMenu: true,
      width: 230
    }, {
      headerName: "Rol",
      field: "role",
      suppressMenu: true,
      width: 185
    }, {
      headerName: "Último Acceso",
      field: "lastAccess",
      cellRenderer: (params) => {
        return `${params.value} h`;
      },
      suppressMenu: true,
      width: 190
    }, {
      headerName: "Venci.",
      field: "expiration",
      cellRenderer: (params) => {
      
        if(params.value === 1){
          return `${params.value} día`;  
        }else{
          return `${params.value} días`;
        }

      },
      suppressMenu: true,
      width: 80
    }, {
      headerName: "Plataformas",
      field: "platforms",
      width: 100,
      cellRenderer: (params) => {

        let platform = params.value[0];
        
        let iconsAdd = '';
        
          if(platform === 'MOTUM'){
            iconsAdd += `<div class="appCircle platform" title ="icon">
                            <i class="motum-i tm-e9ae"></i>
                        </div>`;
          }
            if(platform === 'CUMMINS'){
              iconsAdd += `<div class="appCircle platform" title ="icon">
                            <i class="motum-i tm-e92c"></i>
                        </div>`;
            }
              if(platform === 'ENLACE'){
                iconsAdd += `<div class="appCircle platform" title ="icon">
                              <i class="motum-i tm-e93a"></i>
                          </div>`;
              }
              
          return iconsAdd;
        
      },
      suppressMenu: true
    }, {
      headerName: "Aplicaciones",
      field: "applications",
      cellRenderer: "singleClickEditRenderer",
      cellClass: ['motum-app-menu'],
      suppressMenu: true,
      width: 200
    }, {
      headerName: "Estado",
      field: "status",
      cellClass: ['motum-app-menu'],
      cellRenderer: (params) => {
        
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
      width: 75
      }
    ];


    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = this.columnDefs;
    this.gridOptions.headerHeight = 25;
    this.gridOptions.animateRows = true;
    this.gridOptions.enableColResize = true;
    this.gridOptions.enableSorting = true;
    this.gridOptions.rowHeight = 29;
    this.components = { singleClickEditRenderer: getRenderer() };

    this.rowSelection = "single";


    function getRenderer() {
      function CellRenderer() {}
      CellRenderer.prototype.createGui = function(d) {
        let tempDiv;

        if(d.length > 4){
          let template =
            '<span><span id="theValue" style="padding-left: 4px;"></span><div class="contentAppCircle"><div class="appCircleMore" style="float:right" id="theButton"><i id="iconMoreApps" class="motum-i tm-e92d"></i></div></div></span>';
          tempDiv = document.createElement("div");
          tempDiv.innerHTML = template;
          this.eGui = tempDiv.firstElementChild;
        }else{
          let template =
            '<span><span id="theValue" style="padding-left: 4px;"></span><div class="appCircleMore" style="float:right; display:none;" id="theButton">#</div></span>';
          tempDiv = document.createElement("div");
          tempDiv.innerHTML = template;
          this.eGui = tempDiv.firstElementChild;
        }
      };
      CellRenderer.prototype.init = function(params) {
        let applications = params.value;
        let iconsAdd = '';
        let tooltip;
        let classTooltip = 'tooltip-app';

        if(params.rowIndex === 0 )
        classTooltip = 'tooltip-app-first';

        // let applications = ["DASHBOARD","M&R","ACT","LOG","CDC","RANKING"];

        for(let i in applications){
          if(i === '4' && applications.length > 4){ 
                    break;
                  }
          if(applications[i] === 'DASHBOARD'){
                translate.get('pages.dashboard.dashboard').subscribe( res =>{
                  tooltip = res;
                  });
                iconsAdd += `<div class="appCircle">
                              <div class = "${classTooltip}" alt ="${tooltip}" container="body">
                                <i class="motum-i tm-e928"></i>
                              </div>
                            </div>`;
              }
              if(applications[i] === 'M&R'){
                      translate.get('pages.dashboard.monitoringandreaction').subscribe( res =>{
                        tooltip = res;
                        });
                      iconsAdd += `<div class="appCircle">
                                    <div class = "${classTooltip}" alt ="${tooltip}">
                                      <i class="motum-i tm-e929"></i>
                                    </div>
                                </div>`;
                    }
                      if(applications[i] === 'ACT'){
                        translate.get('pages.dashboard.activity').subscribe( res =>{
                          tooltip = res;
                          });
                        iconsAdd += `<div class="appCircle">
                                      <div class = "${classTooltip}" alt ="${tooltip}">
                                        <i class="motum-i tm-e92a"></i>
                                      </div>
                                  </div>`;
                      }
                      if(applications[i] === 'LOG'){
                        translate.get('pages.dashboard.logistics').subscribe( res =>{
                          tooltip = res;
                          });
                        iconsAdd += `<div class="appCircle">
                                      <div class = "${classTooltip}" alt ="${tooltip}">
                                        <i class="motum-i tm-e9b2"></i>
                                      </div>
                                  </div>`;
                      }
                        if(applications[i] === 'CDC'){
                          translate.get('pages.dashboard.menssage').subscribe( res =>{
                            tooltip = res;
                            });
                          iconsAdd += `<div class="appCircle">
                                        <div class = "${classTooltip}" alt ="${tooltip}">
                                          <i class="motum-i tm-e9b3"></i>
                                        </div>
                                    </div>`;
                        }
                        if(applications[i] === 'RAKING'){
                          translate.get('pages.dashboard.ranking').subscribe( res =>{
                            tooltip = res;
                            });
                          iconsAdd += `<div class="appCircle">
                                        <div class = "${classTooltip}" alt ="${tooltip}">
                                          <i class="motum-i tm-e9b4"></i>
                                        </div>
                                    </div>`;
                        }
                          if(applications[i] === 'MAINTENANCE'){
                            translate.get('pages.dashboard.maintenance').subscribe( res =>{
                              tooltip = res;
                              });
                            iconsAdd += `<div class="appCircle">
                                          <div class = "${classTooltip}" alt ="${tooltip}">
                                            <i class="motum-i tm-e9b5"></i>
                                          </div>
                                      </div>`;
                          }
                            if(applications[i] === 'RA'){
                              translate.get('pages.dashboard.reports').subscribe( res =>{
                                tooltip = res;
                                });
                              iconsAdd += `<div class="appCircle">
                                            <div class = "${classTooltip}" alt ="${tooltip}">
                                              <i class="motum-i tm-e9b6"></i>
                                            </div>
                                        </div>`;
                            }
                              if(applications[i] === 'GEOSMART'){
                                translate.get('pages.dashboard.geoSmart').subscribe( res =>{
                                  tooltip = res;
                                  });
                                iconsAdd += `<div class="appCircle">
                                              <div class = "${classTooltip}" alt ="${tooltip}">
                                                <i class="motum-i tm-e9b7"></i>
                                              </div>
                                          </div>`;
                              }
                                if(applications[i] === 'VEH'){
                                  translate.get('pages.dashboard.units').subscribe( res =>{
                                    tooltip = res;
                                    });
                                  iconsAdd += `<div class="appCircle">
                                                <div class = "${classTooltip}" alt ="${tooltip}">
                                                  <i class="motum-i tm-e945"></i>
                                                </div>
                                            </div>`;
                                }
                                  if(applications[i] === 'OP'){
                                    translate.get('pages.dashboard.operators').subscribe( res =>{
                                      tooltip = res;
                                      });
                                    iconsAdd += `<div class="appCircle">
                                                  <div class = "${classTooltip}" alt ="${tooltip}">
                                                  <i class="motum-i tm-e9b9"></i>
                                                  </div>
                                              </div>`;
                                  }
                                    if(applications[i] === 'DEALER'){
                                      translate.get('pages.dashboard.networklink').subscribe( res =>{
                                        tooltip = res;
                                        });
                                      iconsAdd += `<div class="appCircle">
                                                    <div class = "${classTooltip}" alt ="${tooltip}">
                                                      <i class="motum-i tm-e92b"></i>
                                                    </div>
                                                </div>`;
                                    }
                                      if(applications[i] === 'PA'){
                                        translate.get('pages.dashboard.administrationpanel').subscribe( res =>{
                                          tooltip = res;
                                          });
                                        iconsAdd += `<div class="appCircle">
                                                      <div class = "${classTooltip}" alt ="${tooltip}">
                                                        <i class="motum-i tm-e9ba"></i>
                                                      </div>
                                                  </div>`;
                                      }
        } //End For

        this.createGui(params.value);
        this.params = params;
        var eValue = this.eGui.querySelector("#theValue");
        eValue.innerHTML = iconsAdd;
        this.eButton = this.eGui.querySelector("#theButton");
        this.buttonClickListener = this.onButtonClicked.bind(this);
        this.eButton.addEventListener("click", this.buttonClickListener);
      };
      CellRenderer.prototype.onButtonClicked = function(params) {
        // console.info('X ',params.clientX);
        // console.info('Y ',params.clientY);
        
        let startEditingParams = {
          rowIndex: this.params.rowIndex,
          value: this.params.value,
          colKey: this.params.column.getId(),
          paramsGet: this.params
        };
        
        this.dropdownAgGrid = startEditingParams.value;

        let x = params.clientX - 380;
        let y = params.clientY - 220;
        if(params.clientY > 405){
          y = params.clientY - 410;
        }
        if(params.clientY > 435){
          y = params.clientY - 390;
        }
        if(params.clientY > 480){
           y = params.clientY - 400;
        }
        // if(params.clientY > 530 && this.dropdownAgGrid.length >= 9){
        //    y = params.clientY - 350;
        //   console.info('YY ',y);
        // }
        
        let labelTranslate;
        let appsMenuContext = '';
        
        // let agAngular = document.getElementsByTagName('ag-grid-angular')[0];
        let agAngularChild = document.getElementsByClassName('ag-bl ag-bl-normal ag-layout-normal ag-scrolls ag-ltr')[0];
        let newDiv = document.createElement('div');
        // newDiv.innerHTML = `<div class="ag-grid-dropdown" style="top:64.6406px; left:66.188px;">hola</div>`;
        
        
        for(let i in this.dropdownAgGrid){
          
          if(this.dropdownAgGrid[i] === 'DASHBOARD'){
            translate.get('pages.dashboard.dashboard').subscribe( res =>{
              labelTranslate = res;
              });
              appsMenuContext += `<div class="appsMenuContext">
                          <div class = "">
                          <i class="motum-i tm-e928"></i>
                          </div>
                          <div class="appLabel">${labelTranslate}</div>
                        </div>`;
          }
               if(this.dropdownAgGrid[i] === 'M&R'){
                  translate.get('pages.dashboard.monitoringandreaction').subscribe( res =>{
                    labelTranslate = res;
                    });
                  appsMenuContext += `<div class="appsMenuContext">
                                <div class = "">
                                  <i class="motum-i tm-e929"></i>
                                </div>
                                <div class="appLabel">${labelTranslate}</div>
                            </div>`;
                }
                if(this.dropdownAgGrid[i] === 'ACT'){
                          translate.get('pages.dashboard.activity').subscribe( res =>{
                            labelTranslate = res;
                            });
                          appsMenuContext += `<div class="appsMenuContext">
                                        <div class = "">
                                            <i class="motum-i tm-e92a"></i>
                                        </div>
                                        <div class="appLabel">${labelTranslate}</div>
                                    </div>`;
                        }
                        if(this.dropdownAgGrid[i] === 'LOG'){
                          translate.get('pages.dashboard.logistics').subscribe( res =>{
                            labelTranslate = res;
                            });
                          appsMenuContext += `<div class="appsMenuContext">
                                        <div class = "">
                                          <i class="motum-i tm-e9b2"></i>
                                        </div>
                                        <div class="appLabel">${labelTranslate}</div>
                                    </div>`;
                        }
                          if(this.dropdownAgGrid[i] === 'CDC'){
                            translate.get('pages.dashboard.menssage').subscribe( res =>{
                              labelTranslate = res;
                              });
                            appsMenuContext += `<div class="appsMenuContext">
                                          <div class = "">
                                            <i class="motum-i tm-e9b3"></i>
                                          </div>
                                          <div class="appLabel">${labelTranslate}</div>
                                      </div>`;
                          }
                          if(this.dropdownAgGrid[i] === 'RAKING'){
                            translate.get('pages.dashboard.ranking').subscribe( res =>{
                              labelTranslate = res;
                              });
                            appsMenuContext += `<div class="appsMenuContext">
                                          <div class = "">
                                            <i class="motum-i tm-e9b4"></i>
                                          </div>
                                          <div class="appLabel">${labelTranslate}</div>
                                      </div>`;
                          }
                            if(this.dropdownAgGrid[i] === 'MAINTENANCE'){
                              translate.get('pages.dashboard.maintenance').subscribe( res =>{
                                labelTranslate = res;
                                });
                              appsMenuContext += `<div class="appsMenuContext">
                                            <div class = "">
                                              <i class="motum-i tm-e9b5"></i>
                                            </div>
                                            <div class="appLabel">${labelTranslate}</div>
                                        </div>`;
                            }
                              if(this.dropdownAgGrid[i] === 'RA'){
                                translate.get('pages.dashboard.reports').subscribe( res =>{
                                  labelTranslate = res;
                                  });
                                appsMenuContext += `<div class="appsMenuContext">
                                              <div class = "">
                                                <i class="motum-i tm-e9b6"></i>
                                              </div>
                                              <div class="appLabel">${labelTranslate}</div>
                                          </div>`;
                              }
                                if(this.dropdownAgGrid[i] === 'GEOSMART'){
                                  translate.get('pages.dashboard.geoSmart').subscribe( res =>{
                                    labelTranslate = res;
                                    });
                                  appsMenuContext += `<div class="appsMenuContext">
                                                <div class = "">
                                                  <i class="motum-i tm-e9b7"></i>
                                                </div>
                                                <div class="appLabel">${labelTranslate}</div>
                                            </div>`;
                                }
                                  if(this.dropdownAgGrid[i] === 'VEH'){
                                    translate.get('pages.dashboard.units').subscribe( res =>{
                                      labelTranslate = res;
                                      });
                                    appsMenuContext += `<div class="appsMenuContext">
                                                  <div class = "">
                                                  <i class="motum-i tm-e9b8"></i>
                                                  </div>
                                                  <div class="appLabel">${labelTranslate}</div>
                                              </div>`;
                                  }
                                    if(this.dropdownAgGrid[i] === 'OP'){
                                      translate.get('pages.dashboard.operators').subscribe( res =>{
                                        labelTranslate = res;
                                        });
                                      appsMenuContext += `<div class="appsMenuContext">
                                                    <div class = "">
                                                      <i class="motum-i tm-e9b9"></i>
                                                    </div>
                                                    <div class="appLabel">${labelTranslate}</div>
                                                </div>`;
                                    }
                                      if(this.dropdownAgGrid[i] === 'DEALER'){
                                        translate.get('pages.dashboard.networklink').subscribe( res =>{
                                          labelTranslate = res;
                                          });
                                        appsMenuContext += `<div class="appsMenuContext">
                                                      <div class = "">
                                                          <i class="motum-i tm-e92b"></i>
                                                      </div>
                                                      <div class="appLabel">${labelTranslate}</div>
                                                  </div>`;
                                      }
                                        if(this.dropdownAgGrid[i] === 'PA'){
                                          translate.get('pages.dashboard.administrationpanel').subscribe( res =>{
                                            labelTranslate = res;
                                            });
                                          appsMenuContext += `<div class="appsMenuContext">
                                                        <div class = "">
                                                            <i class="motum-i tm-e9ba"></i>
                                                        </div>
                                                        <div class="appLabel">${labelTranslate}</div>
                                                    </div>`;
                                        }
        } //End for

        newDiv.innerHTML = appsMenuContext;

        newDiv.setAttribute("id", `appMenuconext-ag-grid`);
        newDiv.style.position = 'absolute';
        newDiv.style.left = x + 'px';
        newDiv.style.top = y + 'px';
        newDiv.style.background = 'white';
        newDiv.style.padding = '0px 10px';
        newDiv.style.borderRadius = '5px';
        newDiv.style.boxShadow = '5px 4px 10px 2px rgba(0, 0, 0, 0.15)';
        newDiv.style.zIndex = '10';
        
        let element = document.getElementById("appMenuconext-ag-grid");
        if(element != undefined){
          element.parentNode.removeChild(element);
        }
        
        agAngularChild.appendChild(newDiv);
        this.params.api.startEditingCell(startEditingParams);
      };
    
      CellRenderer.prototype.getGui = function() {
        return this.eGui;
      };
      CellRenderer.prototype.destroy = function() {
        this.eButton.removeEventListener("click", this.buttonClickListener);
      };
      return CellRenderer;
    } // End getRender();
    

    this.subscriptionEdit = this.userService.editUserResponse$.subscribe(
      userEdit => {
          // this.onInsertEditUser(userEdit);
          this.onEdit();
          console.log('edeit member',userEdit)
    });


  } //End Constructor

  ngAfterViewInit(){

          setTimeout(() => {
              this.gridApi.sizeColumnsToFit();
          }, 500);


  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptionEdit.unsubscribe();
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

  onEdit() {
    const modalRef = this.modalService.open(this.confirmEditUser, { size: 'lg' , keyboard: false, windowClass: 'motum-modal-confirm', backdrop: true });
    modalRef.result.then((userResponse) => {
      if(userResponse) {
        //edito un usuario
        console.info("Se edito un integrante");
      }
    });
  }

  closeMembers(){
    this.close.emit();
    this.router.navigate(['/', 'pages', 'usersControl', 'clients-products']);
  }

  addMember(){
    let routeComponent = '/pages/usersControl/clients-products/members';
        this.router.navigate([ '/', 'pages', 'usersControl', 'clients-products', 'create-member'])
          .then(nav => {
            setTimeout(() => {
                this.userService.sCreateUser();
                this.userService.routeClose(routeComponent);
               }, 200);
          });
  }

  onGridReady(params) {
    this.gridColumnApi = params.columnApi;
        this.gridApi = params.api;

        let idM = 1
        this.clientProductService.retrieveDataForTableMembers(idM)
        .subscribe(
              res => {
                  const body = JSON.parse(res['_body']);
                  const dataToSetup: any = body.members;
                console.log(dataToSetup);
                  if (this.gridOptions.api && dataToSetup) {

                      for (let i in dataToSetup){
                            dataToSetup[i].name = dataToSetup[i].name + " " + dataToSetup[i].lastName;
                      }
                      // console.log(dataToSetup);
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

  onBodyScroll(event){
    let element = document.getElementById("appMenuconext-ag-grid");
      if(element != undefined){
        element.parentNode.removeChild(element);
      }
  }


  onCellClicked(event){
    if(event.column.colId === 'name' && event.data !== null && event.data !== undefined){
      let routeComponent = '/pages/usersControl/clients-products/members';
      this.router.navigate(['/pages', 'usersControl', 'clients-products', 'edit-member']).then(nav => {
                        setTimeout(() => {
                            this.userService.sEditUser(event.data);
                            this.userService.routeClose(routeComponent);
                    }, 200);
                }, err => {
                    console.info(err);
                    alert('It was not possible to go to selected route')
                });

    }
  }

  makeSelectableRows() {
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
  }

  deselectAllRow() {
    this.gridOptions.api.deselectAll();
    this.columnDefs[0].checkboxSelection = false;
    this.gridOptions.api.setColumnDefs(this.columnDefs);
  }

  resizingColumns() {
    this.gridApi.sizeColumnsToFit();
  }

  onRowClicked (event) {
    if (!this.isSelectable) {
      this.rowSelection = "single";
      this.gridOptions.api.forEachNodeAfterFilter( function(node) {
        if (node.data === event.data) {
          node.setSelected(true);
        }
      });
      // this.isSelecRow = true;
    }else {
      // this.isSelecRow = false;
    }
    // if(event.data !== null && event.data !== undefined) {
    //   this.isSelecRow = true;
    // }
    // this.gridApi.addRangeSelection({
    //   rowStart: event.rowIndex,
    //   rowEnd: event.rowIndex,
    //   columnStart: "commercialName",
    //   columnEnd: "status"
    // });

  }

  /**
   *@HostListener to close the context menu of the ag-grid table
   */  
@HostListener('document:click', ['$event.target'])
onClickMoreApps(targetElement){
  if(targetElement.id === 'theButton' ||  targetElement.id === 'iconMoreApps'){

  }else{
    let element = document.getElementById("appMenuconext-ag-grid");
      if(element != undefined){
        element.parentNode.removeChild(element);
      }
  }
}

  cellContextMenu(){
    console.log('abre menu');
  }





}
