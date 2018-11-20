import {Component, OnInit, ViewEncapsulation, HostListener, OnDestroy, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { GridOptions } from 'ag-grid';//ColumnApi, GridApi,
import { LicenseManager } from 'ag-grid-enterprise/main';
import { UserService } from "./user.service";
import { ClientProductService } from "../clients/clients.service";
import { User } from '../../../../shared/models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
/**
 * Setting up license
 */
LicenseManager.setLicenseKey('26f908fcbd31ab5109aab8ba901fe020');

declare var document;

@Component({
  selector: 'users-component.col-md-12',
  templateUrl: './users.component.html',
  styleUrls: ['users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('welcomeWindow') welcomeWindow: ElementRef;
  @ViewChild('confirmEditUser') confirmEditUser: ElementRef;

  /*
  *       Calendar implementation vars
  * */
  selectedOption: any;
  showCalendarModal: boolean = false;
  calendarLabel: any = 'Últimos 7 días';
  selectedRange: any;

  tableCount: number = 0;
  search = 'pages.userControl.client_user.search';
  gridOptions: GridOptions;
  gridColumnApi: any;
  isChecked: boolean = false;
  showAppMenuContext: boolean = false;
  widthTable: any;
  margin: number = 0.709;
  rowSelectNow: number;
  myTranslate: any = {};
  subscriptionCreate: Subscription;
  subscriptionEdit: Subscription;
  subscriptionEditMembers: Subscription;
  getContextMenuItems: any;

  private gridApi;

  private rowSelection;

  private components;

  isRemember: boolean = false;
  checkControl: boolean = true;
  columnDefs: any = [];
  hasLoadedTable = false;

  customIcons: any = {
    sortAscending: '<i class="fa fa-caret-down"/>',
    sortDescending: '<i class="fa fa-caret-up"/>',
  };

  // specify the data
  rowData: any = [];
  dropdownAgGrid = [];

  constructor(
      private userService: UserService, private translate: TranslateService, private router: Router,
      private modalService: NgbModal, private clientProductService :ClientProductService, private _elementRef : ElementRef,
      private cdr: ChangeDetectorRef
  ) {

    this.columnDefs = [
      {
        colId: 'nombre',
        headerName: "Nombre",
        field: "name",
        suppressSizeToFit: true,
        checkboxSelection: false,
        cellClass: ['motum-hover-name'],
        suppressMenu: true,
        width: 150
      },
      {
        headerName: "Usuario",
        field: "username",
        suppressMenu: true,
        width: 150
      },
      {
        headerName: "Plataformas",
        field: "platforms",
        width: 130,
        cellRenderer: (params) => {
          console.log(params);


          let platform = 'MOTUM';

            if (params.value){
            platform = params.value[0];
            }

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
      },
      {
        colId: 'Aplicaciones',
        headerName: "aplicaciones",
        field: "applications",
        suppressMenu: true,
        cellClass: ['motum-app-menu'],
        cellRenderer: "singleClickEditRenderer"
      },
      {
        headerName: "Rol",
        field: "rol",
        suppressMenu: true,

        width: 100
      },{
        headerName: "Vencimiento",
        field: "expiration",
        cellRenderer: (params) => {
              if (params.value < 4 && params.value !== undefined) {
                  let eDiv = document.createElement('div');
                  eDiv.innerHTML = `<span class="expiration-color">${params.value} días</span>`;
                  return eDiv;
              } else {
                if (params.value === undefined) {
                    `${20} días`;
                  }else {
                    return `${params.value} días`;
                  }
              }
        },
        suppressMenu: true,
        width: 110
      },{
        headerName: "Último acceso",
        field: "lastAccess",
        suppressMenu: true,
      width: 120
      },
      {
        headerName: "Estado",
        field: "status",
        cellClass: ['motum-tooltip-show'],
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
              return `<div class = "tooltip-a-first" alt ="${tooltip}"">
                        <i class="motum-i tm-e923"></i>
                      </div>`;
            }else{
              return `<div class = "tooltip-status" alt ="${tooltip}"">
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
        width: 90
      },
    ];


    this.gridOptions = <GridOptions>{};
    this.gridOptions.headerHeight = 37;
    this.gridOptions.animateRows = true;
    this.gridOptions.enableColResize = true;
    this.gridOptions.enableSorting = true;
    this.gridOptions.columnDefs = this.columnDefs;
    this.gridOptions.rowHeight = 37;
    this.components = { singleClickEditRenderer: getRenderer() };
    // this.gridOptions.getRowNodeId = function(data) { return data.id; };
    // this.gridOptions.rowData = this.rowData;

    function getRenderer() {
      function CellRenderer() {}
      CellRenderer.prototype.createGui = function(d) {

        let tempDiv;

        if (!d){
          d = ["DASHBOARD", "M&R", "ACT", "LOG", "CDC"];
        }

        if(d.length > 7){
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

        for(let i in applications){
          if(i === '7' && applications.length > '7'){
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
                                                  <i class="motum-i tm-e9b8"></i>
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

        let x = params.clientX - 120;
        let y = params.clientY - 150;
        if(params.clientY > 360){
          y = params.clientY - 425;
        }
        if(params.clientY > 405){
          y = params.clientY - 410;
        }
        if(params.clientY > 435){
          y = params.clientY - 375;
        }
        if(params.clientY > 480){
           y = params.clientY - 350;
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
                                                    <i class="motum-i tm-e945"></i>
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
        }

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

     // this.widthTable = window.innerWidth - (window.innerWidth * this.margin);
    // window.onresize = (e) => {
    //   this.widthTable = window.innerWidth - (window.innerWidth * this.margin);
    // };




    this.translate.get('pages.titletable').subscribe( res =>{
      this.UpdateHeaderName(res);
    });

    this.rowSelection = "multiple";
    this.subscriptionCreate = this.userService.newUser$.subscribe(
      user => {
          this.onInsertRowUser(user);
          this.onWelcome();
    });
    this.subscriptionEdit = this.userService.editUserResponse$.subscribe(
      userEdit => {
          this.onInsertEditUser(userEdit);
          this.onEdit();
    });
    this.subscriptionEditMembers = this.userService.editUserMembersResponse$.subscribe(
      userEdit => {
          // this.onInsertEditUser(userEdit);
          // this.onEdit();
          // console.log('llega al observable form user');
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

  } //end constructor


  ngAfterViewInit(){
      setTimeout(() => {
          this.resizingColumns();
      }, 500);
  }
  createUser() {
  let routeComponent = '/pages/usersControl/users';
   setTimeout(() => {
     this.userService.sCreateUser();
     this.userService.routeClose(routeComponent);
    }, 200);
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
  onEdit() {
    const modalRef = this.modalService.open(this.confirmEditUser, { size: 'lg' , keyboard: false, windowClass: 'motum-modal-confirm', backdrop: true });
    modalRef.result.then((userResponse) => {
      if(userResponse) {
        //edito un usuario
        console.info("Se edito un usuario");
      }
    });
  }
  exportToExel() {
    let params = {
      fileName: 'Users'
    }
    this.gridApi.exportDataAsExcel(params);
  }
  ngOnInit() {

  }//END ON INIT


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


  ngOnDestroy() {
    this.subscriptionCreate.unsubscribe();
    this.subscriptionEdit.unsubscribe();
    this.subscriptionEditMembers.unsubscribe();
  }
  onInsertEditUser(user) {
    let newData = this.createNewRowDataUser(user);
    let rowNode = this.gridApi.getRowNode(this.rowSelectNow);
    if (rowNode.data !== undefined && newData !== undefined) {
      rowNode.setData(newData);
    }
  }
  onInsertRowUser(user: User) {
    var newData = this.createNewRowDataUser(user);
    this.gridApi.updateRowData({
      add: [newData],
      addIndex: 0
    });
  }
  createNewRowDataUser(data) {
    let plataform: string = '';
    // // FIXME: revisar como se mostraran estos campos
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
      name: data.name+' '+data.lastname,
      email: data.email,
      username: data.username,
      products: plataform,
      lastname: data.lastname,
      rol: data.rol,
      lastAccess: data.lastAccess,
      password: data.password,
      plataforms: data.plataforms,
      status: data.status,
      interface: data.interface
    };
    return newData;
  }


  getClientsData(){

      this.userService.getDataForTable()
          .subscribe(
              res => {
                  const body = JSON.parse(res['_body']);
                  const updates: any = body.users;

                  if (this.gridOptions.api && updates){

                      for(let i in updates){
                          let nameAndLastName = updates[i].name +' '+ updates[i].lastname;
                          updates[i].name = nameAndLastName;
                      }
                // console.log(updates);
                      this.tableCount = updates.length;
                      this.gridOptions.api.setRowData(updates);
                  }

                  setTimeout(() => {
                      //console.info("Resize columns");
                      this.resizingColumns();
                  }, 200);
              }, err => {
                  console.info(err);
                  this.gridOptions.api.setRowData([]);
                  this.resizingColumns();
                  alert("An error: " + JSON.parse(err['_body']).errors);
              }
          );
  }
  onGridReady(params) {
      this.gridColumnApi = params.columnApi;
      this.gridApi = params.api;
      this.getClientsData();
  }

  onBodyScroll(event){
    let element = document.getElementById("appMenuconext-ag-grid");
      if(element != undefined){
        element.parentNode.removeChild(element);
      }
  }

  resizingColumns() {
    this.gridApi.sizeColumnsToFit();
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
      selectedRowsString += selectedRow.username;
    });
  }
    onFilterChanged(data){
        this.gridOptions.api.setQuickFilter(data);
    }

  onCellClicked (e) {

    if(e.column.colId === 'nombre' && e.data !== null && e.data !== undefined){
      let routeComponent = '/pages/usersControl/users';
      this.router.navigate(['/', 'pages', 'usersControl', 'users', 'edit']).then(nav => {
        this.rowSelectNow = e.rowIndex;
        setTimeout(() => {
          this.userService.sEditUser(e.data);
          this.userService.routeClose(routeComponent);
        }, 200);

      }, err => {
        console.log(err)
      });
    }
  }
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
        this.isRemember = !this.isRemember;
        this.resizingColumns();
      }
    });
  }

  makeSelectableRow() {
    // this.gridOptions.api.refreshHeader();
    if(this.checkControl == true && this.isRemember == true){
      this.columnDefs[0].checkboxSelection = this.isRemember;
      this.gridOptions.api.setColumnDefs(this.columnDefs);
      this.gridOptions.api.selectAll()
      this.resizingColumns();
      this.checkControl = false;
    }else{
      if (this.checkControl == false && this.isRemember == false) {
        this.gridOptions.api.deselectAll();
        this.checkControl = null;
        this.isRemember = true;
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

  onRowSelected(event){
    if(event.node.selected)
    this.isRemember = true;
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



  UpdateHeaderName(userlabels: any) {
    this.columnDefs[0].headerName = userlabels.name;
    this.columnDefs[1].headerName = userlabels.username;
    this.columnDefs[2].headerName = userlabels.platforms;
    this.columnDefs[3].headerName = userlabels.applications;
    this.columnDefs[4].headerName = userlabels.rol;
    this.columnDefs[5].headerName = userlabels.expiration;
    this.columnDefs[6].headerName = userlabels.last_access;
    this.columnDefs[7].headerName = userlabels.status;

    this.gridOptions.columnDefs = this.columnDefs;
    this.hasLoadedTable = true;
  }



  onDisableSelected() {
    let selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length && selectedRows.length > 0) {
      selectedRows.forEach((selectedRow) => {
        if(this.userService.editUsers(selectedRow)){
          selectedRow.status = false;
        }
      });
      this.gridApi.updateRowData({update: selectedRows});
    }
  }


  onAbleSelected() {
    let selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length && selectedRows.length > 0) {
      selectedRows.forEach((selectedRow) => {
        if(this.userService.editUsers(selectedRow)){
          selectedRow.status = true;
        }
      });
      this.gridApi.updateRowData({update: selectedRows});
    }
  }

  unClick() {
    // console.info("Un click");
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
