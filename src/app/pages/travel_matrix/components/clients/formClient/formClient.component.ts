import { Component, OnInit, ViewEncapsulation, Renderer2, HostListener, ViewChild, ElementRef ,OnDestroy, ChangeDetectorRef} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ClientModel } from '../../../../../shared/models/clients/client.model';
import { InterfaceModel } from '../../../../../shared/models/clients/interface.model';
import { NumberModel } from '../../../../../shared/models/clients/number.model';
import { PhoneModel } from '../../../../../shared/models/clients/phone.model';
import { PlataformModel } from '../../../../../shared/models/clients/plataform.model';
import { AccountModel } from '../../../../../shared/models/clients/account.model';
import { BillingModel } from '../../../../../shared/models/clients/billing.model';

import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';
import { DualListComponent } from 'angular-dual-listbox';

import {Constants} from "../../../../../shared/providers/constants";
import {TranslateService} from "@ngx-translate/core";
import {GridOptions} from "ag-grid";
import { Subscription } from 'rxjs';
import { LicenseManager } from 'ag-grid-enterprise/main';
import {Router} from "@angular/router";
//import  'ag-grid-enterprise';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ViajesService } from '../viajes.service';
import { LoginService } from 'app/shared/providers/login.service';
import {ClientProductService} from "../clients.service";

import {BaMenuService} from "../../../../../theme/services/baMenu/baMenu.service";
import {EventsService} from "../../../../../shared/providers/events";
import {MonitoringReactionService} from "../../../../monitoringReaction/montoringReaction.service";
import { BreadCrumManual } from "../../../../../shared/providers/breadCrumbManual.service";
import {ChangeSpaceColsAndRowsService} from "../../../../../shared/providers/changeSpaceColsAndRows.service";
import { Observable } from "rxjs";
import {browser} from "protractor";
import {vehicleModel} from "../../../../../shared/models/orders/vehicle.model";
import {AgmMarkerCluster} from "@agm/js-marker-clusterer";
import { AgmMap } from '@agm/core';

//LicenseManager.setLicenseKey('26f908fcbd31ab5109aab8ba901fe020');
LicenseManager.setLicenseKey('Evaluation_License_Valid_Until__8_December_2018__MTU0NDIyNzIwMDAwMA==50dff8a63bb1a234bae7d0bf98e1be3a');


@Component({
  selector: 'form-client-product-component',
  templateUrl: './formClient.component.html',
  styleUrls: ['./formClient.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slideHiddenShow', [
      state('hidden', style({
        transform: 'translate3d(100%, 0, 0)',
        display: 'none',
      })),
      state('show', style({
        transform: 'translate3d(0, 0, 0)',
      }))
    ]),
  ],
})
export class FormClientProductComponent implements OnInit{


  @ViewChild('map') myMap:AgmMap;


  agmtitle: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;

  ////////////////

  motumCoords: any = {
    lat: 18.869296,
    lng: -97.051071
  };

  path: any;
  geoFenceVisibility: any;
  lang: string;
  geoFenceEditable: boolean = false;
  listOfPaths : Array<any> = [{
      label: '0',
      id: '0',
      selected: false,
      paths: [
          { lat: 0,  lng: 0 },
          { lat: 0,  lng: 0 },
          { lat: 0,  lng: 0 },
          { lat: 0,  lng:-0 }
      ]
  }];

  private ZOOM_IN: string = 'ZOOM_IN';
  private ZOOM_OUT: string = 'ZOOM_OUT';
  @ViewChild('motumAgm')
  _el: any;

  MENU_MONITORING_REACTION = 'monitoringAndReaction';
  displayUnitMenuComponent: boolean = false;
  flagUnitDataVehicle: boolean = false;
  flagFilterin: boolean = false;
  showListUnits: boolean = true;
  unitMarkers: Array<any> = [];
  groups: Array<any> = [];
  unitDataVehicle: Array<any> = [];
  MR_HTML_CLASSES: any;
  isChatDetail: boolean = false;
  sendChangeIconColor: string;
  flagSelected: boolean;
  listUnitsCopia=[];
  userIsDragging: boolean = false;
  vehicleLabels: Array <any> = [];
  viewClusters:any = false;


  // ---------------------------
  // MAP CONFIGURATION VARIABLES
  // ---------------------------
  latitude: number = this.motumCoords.lat;
  longitude: number = this.motumCoords.lng;
  zoom: number = 14;
  zoomControl: boolean = false;
  streetViewControl: boolean = false;
  mapStyles: Array<any> = this.C.MAP_STYLES;
  currentZoom: number = this.zoom;
  colorCircleDetail: any;
  viewMap = 'roadmap';
  trafficLayer:boolean;
  trafficLayerInstance;
  mapInstance;
  _map; any;

  // ------------------------------
  // MARKER CONFIGURATION VARIABLES
  // ------------------------------
  markerVisualization: string = 'POINTER';
  //subscriptions service-------------
  $subscriptionUnits:Subscription;
  $subscriptionGroups:Subscription;
  //----------------------------------

  


  ////////
@ViewChild('window') window: ElementRef;
@ViewChild('backdrop') windowBackdrop: ElementRef;
windowState: string = 'hidden';
clientModel: ClientModel;
interfaceModel: InterfaceModel;
numberModel: NumberModel ;
phoneModel: PhoneModel ;
plataformModel: PlataformModel;
accountModel: AccountModel;
billingModel: BillingModel;

flagCheck1: boolean = false;
flagCheck2: boolean = false;
flagCheck3: boolean = false;
flagCheckAccount: boolean = true;
flagCreatePassUser: boolean = false;
initials: string;
initialsColor: string;
setColorAvatar: string;
userName: any;
emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
form:FormGroup;
editar: boolean;
flagSend: boolean = false;
email:AbstractControl;
password:AbstractControl;
subscriptionCreate: Subscription;
subscriptionEdit: Subscription;
userRols: any[] = [
      { rol: 'Administrador'},
      { rol: 'User'},
      { rol: 'Gestor'}
      ];
public eje: String;
public exampleData: Array<Select2OptionData>;
public options: Select2Options;
public optionsPermits: Select2Options;


/* */
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
firstDateTimestamp:any;
lastDateTimestamp:any;


/* */


//translate
viaje = 'pages.logistica.clients.formClient.viaje';
ruta = 'pages.logistica.clients.formClient.ruta';
begin = 'pages.logistica.clients.formClient.begin';
end = 'pages.logistica.clients.formClient.end';
operador = 'pages.logistica.clients.formClient.operador';
unidad = 'pages.logistica.clients.formClient.unidad';
remolque1 = 'pages.logistica.clients.formClient.remolque1';
dolly = 'pages.logistica.clients.formClient.dolly';
remolque2 = 'pages.logistica.clients.formClient.remolque2';


beginDet = 'pages.logistica.clients.formClient.beginDet';
endDet = 'pages.logistica.clients.formClient.endDet';
operadorDet = 'pages.logistica.clients.formClient.operadorDet';
unidadDet = 'pages.logistica.clients.formClient.unidadDet';
remolque1Det = 'pages.logistica.clients.formClient.remolque1Det';
dollyDet = 'pages.logistica.clients.formClient.dollyDet';
remolque2Det = 'pages.logistica.clients.formClient.remolque2Det';

//Billing
rutaDef = 'pages.logistica.clients.formClient.rutaDef';
origenDef = 'pages.logistica.clients.formClient.origenDef';
destinoDef = 'pages.logistica.clients.formClient.destinoDef';
ubicacionesDef = 'pages.logistica.clients.formClient.ubicacionesDef';


title = 'pages.userControl.clients.formClient.title';
edit = 'pages.userControl.clients.formClient.edit';
client = 'pages.userControl.clients.formClient.client';
billing = 'pages.userControl.clients.formClient.billing';
account = 'pages.userControl.clients.formClient.account';
permissions = 'pages.userControl.clients.formClient.permissions';
interface = 'pages.userControl.clients.formClient.interface';
editClientTrans = 'pages.userControl.clients.formClient.editClientTrans';
createClientTrans = 'pages.userControl.clients.formClient.createClientTrans';
companyInformation = 'pages.userControl.clients.formClient.companyInformation';
tradeName = 'pages.userControl.clients.formClient.tradeName';
businessName = 'pages.userControl.clients.formClient.businessName';
rfc = 'pages.userControl.clients.formClient.rfc';
street = 'pages.userControl.clients.formClient.street';
outdoorNumber = 'pages.userControl.clients.formClient.outdoorNumber';
indoorNumber = 'pages.userControl.clients.formClient.indoorNumber';
countryRegion = 'pages.userControl.clients.formClient.countryRegion';
postalCode = 'pages.userControl.clients.formClient.postalCode';
state = 'pages.userControl.clients.formClient.state';
city = 'pages.userControl.clients.formClient.city';
colony = 'pages.userControl.clients.formClient.colony';
delegationMunicipality = 'pages.userControl.clients.formClient.delegationMunicipality';
landline = 'pages.userControl.clients.formClient.landline';
numberExtension = 'pages.userControl.clients.formClient.numberExtension';
phone = 'pages.userControl.clients.formClient.phone';
server = 'pages.userControl.clients.formClient.server';
sector = 'pages.userControl.clients.formClient.sector';
marketSegment = 'pages.userControl.clients.formClient.marketSegment';
division = 'pages.userControl.clients.formClient.division';
employeeNumber = 'pages.userControl.clients.formClient.employeeNumber';
cancel = 'pages.userControl.clients.formClient.cancel';
back = 'pages.userControl.clients.formClient.back';
next = 'pages.userControl.clients.formClient.next';

//Billing
fiscalData = 'pages.userControl.clients.formClient.fiscalData';
physicalPerson = 'pages.userControl.clients.formClient.physicalPerson';
moralPerson = 'pages.userControl.clients.formClient.moralPerson';
physicalPersonWithBusiness = 'pages.userControl.clients.formClient.physicalPersonWithBusiness';
billingPeriod = 'pages.userControl.clients.formClient.billingPeriod';

//Account
accountInformation = 'pages.userControl.clients.formClient.accountInformation';
name = 'pages.userControl.clients.formClient.name';
surnames = 'pages.userControl.clients.formClient.surnames';
emailAccount = 'pages.userControl.clients.formClient.emailAccount';
position = 'pages.userControl.clients.formClient.position';
department = 'pages.userControl.clients.formClient.department';
sendInvitation = 'pages.userControl.clients.formClient.sendInvitation';
generatePass = 'pages.userControl.clients.formClient.generatePass';
restorePassword = 'pages.userControl.clients.formClient.restorePassword';
createUserAndPass = 'pages.userControl.clients.formClient.createUserAndPass';
username = 'pages.userControl.clients.formClient.username';
passwordAccount = 'pages.userControl.clients.formClient.passwordAccount';

//Permissions
productsPlatforms = 'pages.userControl.clients.formClient.productsPlatforms';
available = 'pages.userControl.clients.formClient.available';
selected = 'pages.userControl.clients.formClient.selected';
platforms = 'pages.userControl.clients.formClient.platforms';
roles = 'pages.userControl.clients.formClient.roles';

//Interface
regionalConfiguration = 'pages.userControl.clients.formClient.regionalConfiguration';
unitSystem = 'pages.userControl.clients.formClient.unitSystem';
measurementOfFuelConsumption = 'pages.userControl.clients.formClient.measurementOfFuelConsumption';
dateFormat = 'pages.userControl.clients.formClient.dateFormat';
hourFormat = 'pages.userControl.clients.formClient.hourFormat';
timeZone = 'pages.userControl.clients.formClient.timeZone';
coin = 'pages.userControl.clients.formClient.coin';
language = 'pages.userControl.clients.formClient.language';
weekStartsIn = 'pages.userControl.clients.formClient.weekStartsIn';
userInterfaceConfiguration = 'pages.userControl.clients.formClient.userInterfaceConfiguration';
homepage = 'pages.userControl.clients.formClient.homepage';
logOut = 'pages.userControl.clients.formClient.logOut';
metric = 'pages.userControl.clients.formClient.metric';
measuresUSImperial = 'pages.userControl.clients.formClient.measuresUSImperial';
sunday = 'pages.userControl.clients.formClient.sunday';
monday = 'pages.userControl.clients.formClient.monday';
saturday = 'pages.userControl.clients.formClient.saturday';
save = 'pages.userControl.clients.formClient.save';
accessExpires = 'pages.userControl.clients.formClient.accessExpires';

//Translate Modal
header = 'pages.modalInvitation.header';
content = 'pages.modalInvitation.content';
contents = 'pages.modalInvitation.contents';
accept = 'pages.modalInvitation.accept';

// Configuration Dual-Listbox
confirmed:Array<any> =[];
confirmedDummi:Array<any> =[{
  "key": 2,
  "plataform": "MotumWeb",
  "permissions": [{
    "permission": "  "
  }, {
    "permission": "  "
  }, {
    "permission": "  "
  }, {
    "permission": "  "
  }]
  },
  {
  "key": 3,
  "plataform": "Enlace Freigthliner",
  "permissions": [{
    "permission": "  "
  }, {
    "permission": "  "
  }, {
    "permission": "  "
  }, {
    "permission": "  "
  }]
  },{
  "key": 4,
  "plataform": "Cummins",
  "permissions": [{
    "permission": "  "
  }, {
    "permission": "  "
  }, {
    "permission": "  "
  }, {
    "permission": "  "
  }]
}];
source: Array<any>;

arrDrivers:Array<any> =[];
arrTrucks:Array<any> =[];
arrTrailers:Array<any> =[];
arrDollys:Array<any> =[];
arrRoutes:Array<any> =[];

driverId : string;
driverName : string;
driverLicense : string;

truckId : string;
truckBrand : string;
truckModel : string;
truckYear : string;
truckPlate : string;


trailer1Id : string;
trailer1Brand : string;
trailer1Type : string;
trailer1Model : string;
trailer1Year : string;
trailer1Plate : string;

dollyId : string;
dollyBrand : string;
dollyModel : string;
dollyYear : string;


trailer2Id : string;
trailer2Brand : string;
trailer2Type : string;
trailer2Model : string;
trailer2Year : string;
trailer2Plate : string;

routeId : string;
routeSource : string;
routeTarget : string;
arrRouteDetail:Array<any> =[];

dataExample: Array<any> = [
  {
    "key": 1,
    "plataform": "Motumweb",
    "permissions": [{
      "permission": "Administradoristrador"
    }, {
      "permission": "User"
    }, {
      "permission": "Monitorista"
    }, {
      "permission": "Ayudante"
    },{
      "permission": "Client"
    }]
  },
  {
    "key": 2,
    "plataform": "Enlace Freigthliner",
    "permissions": [{
      "permission": "Administrador"
    }, {
      "permission": "User"
    }, {
      "permission": "Test"
    }, {
      "permission": "Any"
    }]
  },
  {
    "key": 3,
    "plataform": "Cummins",
    "permissions": [{
      "permission": "Administrador"
    }, {
      "permission": "User"
    }, {
      "permission": "Test"
    }, {
      "permission": "Any"
    }]
  }];
format:any = { direction: DualListComponent.LTR, draggable: true, add: '>', remove: '<'};
key = 'key';
keepSorted = true;
display = 'plataform';
filter = true;

constructor(    private C: Constants,
  private renderer: Renderer2, 
  private clientProductService: ClientProductService,
   private formBuilder: FormBuilder, 
    private modalService:NgbModal, 
    private _servicePatrimonialSecurity:ViajesService, 
    private router: Router,
    private _loginService:LoginService,
    private baMenuService: BaMenuService,
    private event: EventsService,
    private service: MonitoringReactionService,
    private serviceColsAndRows:ChangeSpaceColsAndRowsService,
    private translate: TranslateService,
    private _service: BreadCrumManual,
    private cdr: ChangeDetectorRef,
  ) {
    this.MR_HTML_CLASSES = this.serviceColsAndRows.MR_HTML_CLASSES;
    this.event.subscribe(this.C.EVENTS_SERVICE.SIDEBAR_MENU_ITEM_TOGGLE, () => {this.initDisplayUnitMenuComponent()});
    this.initDisplayUnitMenuComponent();
    this.event.subscribe(this.C.EVENTS_SERVICE.MONITORING_REACTION_MENU_CHANGE_CLASS, (menuName, classes) => {
      this.onChangeMenuClasses(menuName, classes);
    });
    this.event.subscribe(this.C.EVENTS_SERVICE.MONITORING_REACTION_CHAT_DETAIL, (options) => {
      this.onChatDetailStatus(options.status);
      this.colorCircleDetail = options.circleColor;
      this.cdr.detectChanges();
    });
   
  this.gridOptionsModal = <GridOptions>{};
  this.gridOptionsModal.columnDefs = this.columnDefs2;
  this.gridOptionsModal.enableSorting = true;
  this.changeLanguage();

 
    this.source = JSON.parse(JSON.stringify(this.dataExample));
  // this.validateForm();
  this.clientModel = new ClientModel();
  this.interfaceModel = new InterfaceModel();
  this.numberModel = new  NumberModel();
  this.phoneModel = new  PhoneModel();
  this.plataformModel = new PlataformModel();
  this.accountModel = new AccountModel();
  this.billingModel = new BillingModel();

  this.clientModel.interface = this.interfaceModel;
  this.clientModel.number = this.numberModel;
  this.clientModel.phone = this.phoneModel;
  this.clientModel.account = this.accountModel;
  this.clientModel.billing = this.billingModel;
  this.clientModel.billing.number = this.numberModel;

  this.subscriptionCreate = clientProductService.createClient$.subscribe(
    state => {

      this.editar = false;
      this.toggle(false,'create');
      // this.clientModel.account.enabled = true;
    });


  this.subscriptionEdit = clientProductService.updateClient$.subscribe(
    client => {
      console.info(client);
      this.editar = true;
      this.clientModel.account.name = '';
      this.clientModel.commercialName = client.accountOwner;
      this.clientModel.businessName = client.businessName;
      //this.clientModel = user;
      // this.clientModel.account.userName = 'Editar';
      this.toggle(false,'edit');

      // let cad: string = String (this.userName = client.commercialName);
      // let word = '';
      // let letter = '';
      // let carat = cad.length;
      //
      // for (let index = 0; index < carat; index++) {
      //     if(cad.charAt(index)!=' '){
      //       word += cad.charAt(index);
      //       if(index+1 === carat){
      //         letter += word.charAt(0);
      //         this.initials = letter.toUpperCase();
      //         this.initialsColor = this.initials.charAt(0);
      //
      //         if(this.initialsColor >= 'A' && this.initialsColor <= 'C'){
      //             this.setColorAvatar = 'azulB';
      //           }else{
      //             if(this.initialsColor >= 'D' && this.initialsColor <= 'F'){
      //               this.setColorAvatar = 'amarillo';
      //             }else{
      //               if(this.initialsColor >= 'G' && this.initialsColor <= 'I'){
      //                 this.setColorAvatar = 'rojo';
      //               }else{
      //                 if(this.initialsColor >= 'J' && this.initialsColor <= 'L'){
      //                   this.setColorAvatar = 'morado';
      //                 }else{
      //                   if(this.initialsColor >= 'M' && this.initialsColor <= 'O'){
      //                     this.setColorAvatar = 'verde';
      //                   }else{
      //                     if(this.initialsColor >= 'P' && this.initialsColor <= 'R'){
      //                       this.setColorAvatar = 'rosa';
      //                     }else{
      //                       if(this.initialsColor >= 'S' && this.initialsColor <= 'U'){
      //                         this.setColorAvatar = 'verdeF';
      //                       }else{
      //                         if(this.initialsColor >= 'V' && this.initialsColor <= 'Z'){
      //                           this.setColorAvatar = 'rosaF';
      //                         }
      //                       }
      //                     }
      //                   }
      //                 }
      //               }
      //             }
      //           }
      //         }
      //     }else{
      //       letter += word.charAt(0);
      //       word='';
      //   }
      // }
      // this.initials = this.initials.substr(0,2);
      let cadena: string = String (this.userName = client.accountOwner);
      let cadena2: string = String (client.businessName);
      let letter = '';
      let letter2 = '';

      letter += cadena.charAt(0);
      letter2 += cadena2.charAt(1);
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
  });
   }

ngOnInit() {

  this.loadGroups();
  this.loadUnits();
  this.startInfoWindowListener();


 // this.vehicleLabels = [{selected : true},{selected : false},{selected : false},{selected : false},{selected : false}];

  //DELETE THIS ON PRODUCTION MODE
    this.confirmed = this.confirmedDummi;

  this.exampleData = [{id:'eje1', text:'RoadAdvisor'},{id:'eje2', text:'MotumWeb'}];
  this.options = {
    multiple: true,
    theme: 'classic',
    closeOnSelect: false,
  }
  this.optionsPermits = {
    multiple: true,
    theme: 'classic',
    closeOnSelect: true,
  }

  this.getDriversData();
  this.getTrucksData();
  this.getTrailersData();
  this.getDollysData();
  this.getRoutesData();


  
}

selectDriverData()
{
  
//alert(this.driverId);
let myDriver = this.arrDrivers.find(x => x.driverid === this.driverId);

this.driverName = myDriver.name;
this.driverLicense = myDriver.license;
} 

selectTruckData()
{
  
//alert(this.driverId);
let myTruck = this.arrTrucks.find(x => x.trucknumber === this.truckId);

this.truckBrand = myTruck.brand;
this.truckModel = myTruck.model;
this.truckYear = myTruck.year;
this.truckPlate = myTruck.plate;
}

selectTrailer1Data()
{
  
//alert(this.driverId);
let myTrailer1 = this.arrTrailers.find(x => x.trailernumber === this.trailer1Id);
 
this.trailer1Brand = myTrailer1.brand;
this.trailer1Type = myTrailer1.trailertype;
this.trailer1Model = myTrailer1.model;
this.trailer1Year = myTrailer1.year;
this.trailer1Plate = myTrailer1.plate;

}

selectDollyData()
{
  
//alert(this.driverId);
let myDolly = this.arrDollys.find(x => x.dollynumber === this.dollyId);

this.dollyBrand = myDolly.brand;
this.dollyModel = myDolly.model;
this.dollyYear = myDolly.year;
}

selectTrailer2Data()
{
//alert(this.driverId);
let myTrailer2 = this.arrTrailers.find(x => x.trailernumber === this.trailer2Id);
 
this.trailer2Brand = myTrailer2.brand;
this.trailer2Type = myTrailer2.trailertype;
this.trailer2Model = myTrailer2.model;
this.trailer2Year = myTrailer2.year;
this.trailer2Plate = myTrailer2.plate;

}

selectRouteData()
{
  
let myRoute = this.arrRoutes.find(x => x.routeid === this.routeId);

this.routeSource = myRoute.placesource;
this.routeTarget = myRoute.placetarget;
this.arrRouteDetail = myRoute.route_details;
alert(this.arrRouteDetail)


}


getDriversData(){
  this.clientProductService.retrieveDrivers()
      .subscribe(
          res => {
              console.log(res);
              const body = JSON.parse(res['_body']);
              const dataToSetup: any = body;
              console.log('drivers ...');  
              this.arrDrivers = dataToSetup;                  
              console.log(this.arrDrivers);
              console.log('drivers ...');

             // this.gridOptions.api.setRowData(dataToSetup);
             // this.tableCount = dataToSetup.length;
              setTimeout(() => {
                  // console.info("Resize columns");
               //   this.gridApi.sizeColumnsToFit();
              }, 200);
          },
          err => {
              console.info(err);

              //this.gridOptions.api.setRowData([]);
             // this.gridApi.sizeColumnsToFit();
              alert("An error has occurred, check your browser console");
          }
      );
}

getTrucksData(){
  this.clientProductService.retrieveTrucks()
      .subscribe(
          res => {
              console.log(res);
              const body = JSON.parse(res['_body']);
              const dataToSetup: any = body;
              console.log('trucks ...');    
              this.arrTrucks = dataToSetup;                  
                
              console.log(dataToSetup);
              console.log('trucks ...');

             // this.gridOptions.api.setRowData(dataToSetup);
             // this.tableCount = dataToSetup.length;
              setTimeout(() => {
                  // console.info("Resize columns");
               //   this.gridApi.sizeColumnsToFit();
              }, 200);
          },
          err => {
              console.info(err);

              //this.gridOptions.api.setRowData([]);
             // this.gridApi.sizeColumnsToFit();
              alert("An error has occurred, check your browser console");
          }
      );
}


getTrailersData(){
  this.clientProductService.retrieveTrailers()
      .subscribe(
          res => {
              console.log(res);
              const body = JSON.parse(res['_body']);
              const dataToSetup: any = body;
              console.log('trailers ...');  
              this.arrTrailers = dataToSetup;                  
                  
              console.log(dataToSetup);
              console.log('trailers ...');

             // this.gridOptions.api.setRowData(dataToSetup);
             // this.tableCount = dataToSetup.length;
              setTimeout(() => {
                  // console.info("Resize columns");
               //   this.gridApi.sizeColumnsToFit();
              }, 200);
          },
          err => {
              console.info(err);

              //this.gridOptions.api.setRowData([]);
             // this.gridApi.sizeColumnsToFit();
              alert("An error has occurred, check your browser console");
          }
      );
}

getRoutesData(){
  this.clientProductService.retrieveRoutes()
      .subscribe(
          res => {
              console.log(res);
              const body = JSON.parse(res['_body']);
              const dataToSetup: any = body;
              console.log('routes ...');    
              this.arrRoutes = dataToSetup;                  
                
              console.log(dataToSetup);
              console.log('routes ...');

             // this.gridOptions.api.setRowData(dataToSetup);
             // this.tableCount = dataToSetup.length;
              setTimeout(() => {
                  // console.info("Resize columns");
               //   this.gridApi.sizeColumnsToFit();
              }, 200);
          },
          err => {
              console.info(err);

              //this.gridOptions.api.setRowData([]);
             // this.gridApi.sizeColumnsToFit();
              alert("An error has occurred, check your browser console");
          }
      );
}



getDollysData(){
  this.clientProductService.retrieveDollys()
      .subscribe(
          res => {
              console.log(res);
              const body = JSON.parse(res['_body']);
              const dataToSetup: any = body;
              console.log('dollys ...');    
              this.arrDollys = dataToSetup;                  
                
              console.log(dataToSetup);
              console.log('dollys ...');

             // this.gridOptions.api.setRowData(dataToSetup);
             // this.tableCount = dataToSetup.length;
              setTimeout(() => {
                  // console.info("Resize columns");
               //   this.gridApi.sizeColumnsToFit();
              }, 200);
          },
          err => {
              console.info(err);

              //this.gridOptions.api.setRowData([]);
             // this.gridApi.sizeColumnsToFit();
              alert("An error has occurred, check your browser console");
          }
      );
}

onButtonGroupClick($event){
  let clickedElement = $event.target || $event.srcElement;

  if( clickedElement.nodeName === "BUTTON" ) {

    let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector(".active");
    // if a Button already has Class: .active
    if( isCertainButtonAlreadyActive ) {
      isCertainButtonAlreadyActive.classList.remove("active");
    }

    clickedElement.className += " active";
  }

}
onChangePassword(alert) {
  const modalRef = this.modalService.open(alert, { size: 'lg' , keyboard: true, windowClass: 'motum-modal-confirm', backdrop: true });
  modalRef.result.then((userResponse) => {
    if(userResponse) {
    }
  });
}

ngOnDestroy() {
  this.subscriptionCreate.unsubscribe();
  this.subscriptionEdit.unsubscribe();
  this.windowState = null;
  this.initials = null;
  this.userName = null;
  this.emailPattern = null;
  this.form = null;
  this.email = null;
  this.password = null;
  this.userRols = null;
  this.$subcriptionTranslate.unsubscribe();
  this.event.unsubscribe(this.C.EVENTS_SERVICE.SIDEBAR_MENU_ITEM_TOGGLE);
this.event.unsubscribe(this.C.EVENTS_SERVICE.MONITORING_REACTION_MENU_CHANGE_CLASS);
this.event.unsubscribe(this.C.EVENTS_SERVICE.MONITORING_REACTION_CHAT_DETAIL);
this.$subscriptionGroups.unsubscribe();
this.$subscriptionUnits.unsubscribe();


}



validateForm() {
  this.form = this.formBuilder.group({
    'email': ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
    'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
  });

  this.email = this.form.controls['email'];
  this.password = this.form.controls['password'];
}

toggle(control , windowType) {
  switch (control) {
    case true:
      this.windowState = 'hidden';
    break;
    case false:
      this.windowState = 'show';
    break;
    default:
      this.windowState = this.windowState === 'show' ? 'hidden' : 'show';
    break;
  }
  if (windowType === 'create') {
    this.windowCreateClass();
  }else {
    this.windowEditClass();
  }
}

createClient() {
  this.router.navigate(['/', 'pages', 'usersControl', 'clients-products']).then(nav => {
    this.clientModel.plataforms = this.confirmed;
    setTimeout(() => {
       if (this.editar) {
         this.clientProductService.updateClientProduct(this.clientModel);
       }else {
         this.clientProductService.createClientProductEnd(this.clientModel);
       }
       this.clearModels();
     }, 200);
     //console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
  });
}

clearModels() {
  this.toggle(true, null);
}
windowEditClass() {
  this.renderer.addClass(this.window.nativeElement, 'window-edit');
  this.renderer.removeClass(this.window.nativeElement, 'window-create');
  this.renderer.addClass(this.windowBackdrop.nativeElement, 'window-backdrop');
}

windowCreateClass() {
  this.renderer.removeClass(this.window.nativeElement, 'window-edit');
  this.renderer.addClass(this.window.nativeElement, 'window-create');
  this.renderer.addClass(this.windowBackdrop.nativeElement, 'window-backdrop');
}

radioBotton1(flagCheck){
  this.flagCheck2 = false;
  this.flagCheck3 = false;
  if(flagCheck == false){ this.flagCheck1 = true; } else{ this.flagCheck1 = false; }
}
radioBotton2(flagCheck){
  this.flagCheck1 = false;
  this.flagCheck3 = false;
  if(flagCheck == false){ this.flagCheck2 = true; } else{ this.flagCheck2 = false; }
}
radioBotton3(flagCheck){
  this.flagCheck1 = false;
  this.flagCheck2 = false;
  if(flagCheck == false){ this.flagCheck3 = true; } else{ this.flagCheck3 = false; }
}

send(flagCheck){
  this.flagCreatePassUser = false;
  if(flagCheck == false){ this.flagCheckAccount = true; } else{ this.flagCheckAccount = false; }
}

createPassUser(flagCheck){
  this.flagCheckAccount = false;
  if(flagCheck == false){ this.flagCreatePassUser = true; } else{ this.flagCreatePassUser = false; }
}

sendInvitationModal(alert){
  if(this.flagCheckAccount){
    console.log('abre modal Y flagCheckAccount',this.flagCheckAccount,'  lega: ',alert);


    const modalRef = this.modalService.open(alert, { size: 'lg' , keyboard: true, windowClass: 'motum-modal-confirm', backdrop: true });
    modalRef.result.then((userResponse) => {
      if(userResponse) {
      }
    });

  }
}

upperCase(content){
    setTimeout(()=> {
        content = content.value.toUpperCase();
    },1);
}


/* */
 /**
     * Method to show client form to create a clientProduct
     */
    createClientProduct() {
      this.router.navigate(['/', 'pages', 'travel_matrix', 'clients-products','create']).then(nav => {
          setTimeout(() => {
             this.clientProductService.createClientProduct();
           }, 200);
          }, err => {
            console.log(err) // when there's an error
            console.log('error router');
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
    console.log(params);
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
     // this.openModalMotorStop('motorStop');
      
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
/*
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
 */
    

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


/* */


onChatDetailStatus(status){
this.isChatDetail = status;
}
closeChatDetail(){
this.isChatDetail = false;
}
motumZoomControls(zoomType) {


this.zoom = this.currentZoom;
if (zoomType === this.ZOOM_IN && this.zoom < 22)
  this.zoom = this.zoom + 1;
else if (zoomType === this.ZOOM_OUT && this.zoom > 0)
  this.zoom = this.zoom - 1;
}

zoomChange(currentZoom) {

this.currentZoom = currentZoom;

}

initDisplayUnitMenuComponent() {
let statusItem = this.baMenuService
  .getStatusItem(this.MENU_MONITORING_REACTION);
if (statusItem)
  this.displayUnitMenuComponent = statusItem.status;
}


refreshMap(){

  //  location.reload();
    this.loadUnits();


}
loadUnits() {


this.$subscriptionUnits = this.service.retrieveUnits()
  .subscribe(
    res => {

        const body = JSON.parse(res['_body']);            
      this.unitMarkers = body.units;
      //this.groups = body.groups;
      this.listUnitsCopia=this.unitMarkers;


    },
    err => {
      console.error(err);

    }
  )

}

loadGroups(){
this.$subscriptionGroups = this.service.getGroups().subscribe(
  res => {
    const body = JSON.parse(res['_body']);
    this.groups = body.groups;        
  },
  err =>{
    console.log(err);
    
  }
);

}

onChangeMenuClasses(menuName, classes) {
Promise.resolve(null).then(() => {this.MR_HTML_CLASSES[menuName] = classes;});
}

sendUnit(unitData){
this.unitDataVehicle = unitData;
if(this.unitDataVehicle && this.unitDataVehicle.length > 0){
  this.flagUnitDataVehicle = true;
  this.flagFilterin = false;
  this.sendChangeIconColor = 'closeFO';
  this.flagSelected = true;
}
}
openFiltering(flagFilteringOptions){
this.flagFilterin = flagFilteringOptions;
this.flagUnitDataVehicle = false;
if(flagFilteringOptions){
  this.sendChangeIconColor = 'openFO';
}else{
  this.sendChangeIconColor = 'closeFO';
  let breadcrumbLabels = ['Menu.monitoringReaction', 'general.vehicles'];
  this._service.generateManualRouting(breadcrumbLabels, [], [0,0], []);
}
}

closeFiltering(close){
this.sendChangeIconColor = 'closeFO';
this.flagFilterin = close;
let breadcrumbLabels = ['Menu.monitoringReaction', 'general.vehicles'];
this._service.generateManualRouting(breadcrumbLabels, [], [0,0], []);
}
closeVehicleDescription(close){
this.flagUnitDataVehicle = close;
this.flagSelected = false;
let breadcrumbLabels = ['Menu.monitoringReaction', 'general.vehicles'];
this._service.generateManualRouting(breadcrumbLabels, [], [0,0], []);
}

changeLenguage(){
this.lang = localStorage.getItem('lang');
if(this.lang === null){
  this.translate.getBrowserLang();
}else{
  this.translate.use(this.lang);
}
}

mouseOver(event){
  console.log("HOLI");
}
loadPointsOfView(listOfPoints){



  if(this.listOfPaths.indexOf(listOfPoints) !== -1){
        let index = this.listOfPaths.indexOf(listOfPoints);
        this.listOfPaths[index].selected = listOfPoints.selected;
  } else {
        this.listOfPaths.push(listOfPoints);
  }

}


changeMarkerType(vehicleViews) {
this.markerVisualization = vehicleViews[0] ? 'VEHICLE' : "POINTER";



}
setLocationMap(event) {
if(event !== undefined && event !== null) {
  setTimeout(()=>{
    this.zoom = this.currentZoom;
    this.latitude = event[0].latitude;
    this.longitude = event[0].longitude;
    this.zoom = event[0].zoom;
  },100);
}
}
buttonCloseOpen(event){
this.showListUnits = event;
}


editGeoFence(event){

  //console.log(event);
  if (this.geoFenceEditable === true){
      //this.geoFenceEditable = false;
  } else {
      //this.geoFenceEditable = true;
  }


}




showListFiltered(value){

 let listFiltered;
 
 if(value==-1){
   //Do not apply filters
   //empty the copy to the original arrangement
    this.unitMarkers=this.listUnitsCopia;
 }
 else{
   //apply filters
   listFiltered = this.listUnitsCopia.filter((a)=>{
    return a.principalGroup.label === value;//by label
    // return a.principalGroup.id === value;//by id
   });
   this.unitMarkers=listFiltered;
 }
}

searching(value){
if (value){
   this.service.searchUnits(value)
       .subscribe(
           res => {
               const body = JSON.parse(res['_body']);
               this.unitMarkers = body.units;
           },
           err => {
               console.error(err);
           }
       )
} else{
   this.service.retrieveUnits()
       .subscribe(
           res => {
               const body = JSON.parse(res['_body']);
               this.unitMarkers = body.units;
           },
           err => {
               console.error(err);
           }
       )
}
}


optionVisualizeMap(event){

if(event === 'pages.monitoringreaction.toolMapControl.display.map'){
    this.viewMap = 'roadmap';
    this._map.setTilt(0);
}if(event === 'pages.monitoringreaction.toolMapControl.display.satelite'){
    this.viewMap = 'satellite';
      this._map.setTilt(0);
}if(event === 'pages.monitoringreaction.toolMapControl.display.3dView' ){
    this.viewMap = 'satellite';
    this._map.setTilt(45);
    this._map.setZoom(18);
}
}


trafficLayerView(event) {
this.trafficLayer = event;
if (this.trafficLayer == true){
  this. trafficLayerInstance.setMap(this.mapInstance);
} else {
   this.trafficLayerInstance.setMap(null);
}
}

showTrafficLayer(mapInstance){
  this._map = mapInstance;
 this.trafficLayerInstance = new google.maps.TrafficLayer();
 this.mapInstance = mapInstance;



 //detect when user is dragging
  this.mapInstance.addListener("drag", (d) => {
      this.userIsDragging = true;
  });
  this.mapInstance.addListener("click", (d) => {
      this.userIsDragging = false;
  });

}

getVehicleLabels(labels) {
    //console.log(labels);
    this.vehicleLabels = labels;
    this.vehicleLabels = this.vehicleLabels.slice();
}
setClusters(clusters){
  this.viewClusters = clusters;
}
startInfoWindowListener(){

}


/* */
}
