import { Component, OnInit, Renderer2, ElementRef, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { ViajeModel } from '../../../../../shared/models/despacho/viaje.model';
import { OrderModel } from '../../../../../shared/models/despacho/order.model';
import { OrderDetailModel } from '../../../../../shared/models/despacho/orderdetail.model';
/*import { NumberModel } from '../../../../../shared/models/clients/number.model';
import { PhoneModel } from '../../../../../shared/models/clients/phone.model';
import { PlataformModel } from '../../../../../shared/models/clients/plataform.model';
import { AccountModel } from '../../../../../shared/models/clients/account.model';
import { BillingModel } from '../../../../../shared/models/clients/billing.model';
*/
import {StorageService} from "../../../../../shared/providers/storage.service";
//import { MatSelectChange } from '@angular/material/select';


import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from "@angular/router";
import { Select2OptionData } from 'ng2-select2';
import { Subscription } from 'rxjs/Subscription';
import { ClientProductService } from '../clients.service';
import { DualListComponent } from 'angular-dual-listbox';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {GridOptions} from "ag-grid";
class Marker {
  public pos: number;
  public lat: number;
  public lng: number;
  public name: string;
  public image_url: boolean;

  constructor(pos: number, lat: number, lng: number, name: string, image_url) {
      this.pos = pos;
      this.lat = lat;
      this.lng = lng;
      this.name = name;
      this.image_url = image_url;
  }
}
@Component({
  selector: 'form-client-product-component',
  templateUrl: './formClient.component.html',
  styleUrls: ['./formClient.component.scss'],
    
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
  encapsulation: ViewEncapsulation.None
})




export class FormClientProductComponent implements OnInit {
  
  
  @ViewChild('window') window: ElementRef;
  @ViewChild('backdrop') windowBackdrop: ElementRef;
  windowState: string = 'hidden';
  viajeModel: ViajeModel;
  orderModel: OrderModel;
  myorderdetail : OrderDetailModel;
  orderdetailModel: Array<OrderDetailModel>;

  markersOnMap: Marker[] = [];

 
  private icon = {
    url: 'https://storage.googleapis.com/kubeet/motum/markers/m2.png', 
    scaledSize: {
      height: 40,
      width: 40
    }
  };

  labelOptions = {
    color: '#ee4646',
    fontFamily: '',
    fontSize: '10px',
    fontWeight: 'bold',
    letterSpacing:'0.5px'
  }
 /* numberModel: NumberModel ;
  phoneModel: PhoneModel ;
  plataformModel: PlataformModel;
  accountModel: AccountModel;
  billingModel: BillingModel; */
  
  flagCheck1: boolean = false;
  flagCheck2: boolean = false;
  flagCheck3: boolean = false;
  flagCheckAccount: boolean = true;
  flagCreatePassUser: boolean = false;
  initials: string;
  initialsColor: string;
  setColorAvatar: string;
  windowPosition: string;
  activeTab : string = 'tabClient';
  userName: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  form:FormGroup;
  editar: boolean;
  flagSend: boolean = false;
  email:AbstractControl;
  password:AbstractControl;
  subscriptionCreate: Subscription;
  subscriptionEdit: Subscription;

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
  

  userRols: any[] = [
        { rol: 'Administrador'},
        { rol: 'User'},
        { rol: 'Gestor'}
        ];
  public eje: String;
  public exampleData: Array<Select2OptionData>;
  public options: Select2Options;
  public optionsPermits: Select2Options;
  


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

  //translate
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


   // title: string = 'My first AGM project';
    lat: number = 17.980593;
    lng: number = -92.951054;
  
    arrDrivers:Array<any> =[];
    arrTrucks:Array<any> =[];
    arrTrailers:Array<any> =[];
    arrDollys:Array<any> =[];
    arrRoutes:Array<any> =[];
   
    i : number;

    beginData : string;
    endData : string;
    
    viajeid : number;
    url : string;
    transpId : string;
    driverId : string;
    driverCode : string;
    driverName : string;
    driverLicense : string;
    
    truckId : string;
    truckNumber : string;
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
    routeSourceDir : string;
    routeTargetDir : string;

    orderKm : string;
    orderLt : string;
    orderKmLt : string;
    orderPrecioLt : string;
    orderCosto : string;

    arrRouteDetail:Array<any> =[];
    



  format:any = { direction: DualListComponent.LTR, draggable: true, add: '>', remove: '<'};
  key = 'key';
  keepSorted = true;
  display = 'plataform';
  filter = true;
  
  constructor(private renderer: Renderer2, 
     private clientProductService: ClientProductService,
     private formBuilder: FormBuilder, 
     private router: Router, 
     private modalService: NgbModal,
     private myStorage: StorageService,
     ) 
     {
      // this.clientModel = new User();
    
      this.gridOptionsModal = <GridOptions>{};
      this.gridOptionsModal.columnDefs = this.columnDefs2;
      this.gridOptionsModal.enableSorting = true;
     
    
      this.source = JSON.parse(JSON.stringify(this.dataExample));
    // this.validateForm();
    this.viajeModel = new ViajeModel();
    this.orderModel = new OrderModel();
    this.orderdetailModel = new Array<OrderDetailModel>();

    /* this.interfaceModel = new InterfaceModel();
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
    this.clientModel.billing.number = this.numberModel;*/
  
    this.subscriptionCreate = clientProductService.createClient$.subscribe(
      state => {
  
        this.editar = false;
        this.windowPosition = 'center';
        // this.clientModel.account.enabled = true;
      });
  
  
    this.subscriptionEdit = clientProductService.updateClient$.subscribe(
      client => {
        console.info(client);
        this.editar = true;
       /* this.clientModel.account.name = '';
        this.clientModel.commercialName = client.accountOwner;
        this.clientModel.businessName = client.businessName;*/
        this.windowPosition = 'right';
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
  
  this.url = 'https://storage.googleapis.com/kubeet/motum/assets/user2.png' 
  //this.url = 'https://storage.googleapis.com/kubeet/motum/assets/user.png'
  //this.url = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
 //this.url = 'https://00e9e64bac243ea5cce55146ecf2b3329ffc53d4dc771c1335-apidata.googleusercontent.com/download/storage/v1/b/kubeet/o/motum%2Fdrivers%2Faaron.jpg?qk=AD5uMEvSVdkj_r8Wktv92hhW0UY6lNctN0Giyc46R7KAWJXzzehCCuhGyufuZlDUiZZ0YON037w3VY2z7QkkxhopDgrlMjpAWhP0T7skwkrUuEDqbqoHWIOXVKe97Ii4xo7CEREDtJ48ReR5qT2JM2Xj619cQnBKHgx3jtfPqrTOYcXYZuj5XsFoRcsWSRLrLpPitM6f4hKRE-Yp7decrB4QJNeEw5nEA4_GjbmU-mOU8f2BUG6yd40HHxsvxv1LJvpbGYknl30Brdqh2kC_gHrmwxRkcQwT1x9fO2YYLFSNJMoE6dTAhS3UmjpRK3TwzQ-gCMzcgsHzPygDWOvCRnRIvbngBs-6oeQiBSL60YoO5tKq1ThkZ-3VMpw5hy9vKqYrDh0hlW4Sj4-_22rfMvFm4DwQpxNPDiCU-bAIGBQJoZ42GI0eATF4lsXSckJ-To6KwG_PYls0in1aYG3JVLkiiu1dhr-Cs0e-ss5UaMgBXPuFB00qBDkyhSZCUnP7nsQY--35smJamg8ORS3QUCHzfIc83TuoJfMLPIBnZpZqpu1xdZ6CZ7urfBkKgO0rBeW7Cw7-o5D5YlNB2hDp6ye8od2oRgvNj5UxMQ4Kv4U0FArl_yz51AXkF7QaJY1XOERy0PsOCR-Aj3HeLGVDiwH7J9B7MtJXRhYf766tkTzDcsPPfN6W2dkxSLSR6BhI8249x105HBGhIsSS1EwuwlLJsHjgvmfroZ33ycVM0RqwNYMR_GGjcHZzfEkeTdd6YqBvHc-t8GNaRzXhGxFMQzf0gFVc0iuXnA';

  this.driverCode = "Clave operador : 000-0000"
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
  this.driverCode = "Clave operador : " + this.driverId;
  
  if (this.driverId == 'op-01')
    this.url = 'https://storage.googleapis.com/kubeet/motum/drivers/adolfo.jpg' 

  if (this.driverId == 'op-02')
    this.url = 'https://storage.googleapis.com/kubeet/motum/drivers/alejandro.jpg' 
  
  if (this.driverId == 'op-03')
    this.url = 'https://storage.googleapis.com/kubeet/motum/drivers/jesus.jpg' 

  if (this.driverId == 'op-04')
    this.url = 'https://storage.googleapis.com/kubeet/motum/drivers/armando.jpg' 

  if (this.driverId == 'op-05')
    this.url = 'https://storage.googleapis.com/kubeet/motum/drivers/mauricio.jpg' 
  
  if (this.driverId == 'op-06')
    this.url = 'https://storage.googleapis.com/kubeet/motum/drivers/aaron.jpg' 
  this.driverName = myDriver.name;
  this.driverLicense = myDriver.license;
  } 
  
  selectTruckData()
  {
    
  //alert(this.driverId);
  let myTruck = this.arrTrucks.find(x => x.trucknumber === this.truckId);

  this.truckNumber = "096754231";
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
  

  drawMarkersOnMap(arrayOfPlaces) {
    this.markersOnMap = [];
    this.i = 1;
    arrayOfPlaces.forEach((place) => {
        if (this.i == 1) 
        {
          this.lat = Number.parseFloat(place.lat);
          this.lng = Number.parseFloat(place.lng);
        }
        this.markersOnMap.push(new Marker(
            this.i,
            Number.parseFloat(place.lat),
            Number.parseFloat(place.lng),
            place.orderdetaildescription,
            'https://storage.googleapis.com/kubeet/motum/markers/m' + this.i + '.png'
        ));
        console.log("lat " +   Number.parseFloat(place.lat) + "lng " +   Number.parseFloat(place.lng) );
        this.i ++;

    })
  }

  selectRouteData()
  {
    
  let myRoute = this.arrRoutes.find(x => x.routeid === this.routeId);
  
  this.routeSource = myRoute.placesource;
  this.routeTarget = myRoute.placetarget;

  this.routeSourceDir = myRoute.sourceaddr;
  this.routeTargetDir = myRoute.targetaddr;
  this.orderKm = myRoute.km;
  this.orderLt = myRoute.lt;
  this.orderKmLt = myRoute.km_lt;
  this.orderPrecioLt = myRoute.price_lt;
  this.orderCosto = myRoute.cost;


  this.arrRouteDetail = myRoute.route_details.sort(function(a,b){
    return a.position >b.position?1:a.position <b.position?-1:0
   })
 
  
  this.drawMarkersOnMap(this.arrRouteDetail);

  this.i = 1;

  this.arrRouteDetail.forEach( (item) => {

    
    this.myorderdetail = new OrderDetailModel();

    this.myorderdetail.companyid= "hesa";
    this.myorderdetail.customerid= "ING-01";
    this.myorderdetail.orderdetailid= this.i;
    this.myorderdetail.routedetailid= item.routedetailid;
    this.myorderdetail.category= item.category;
    this.myorderdetail.type= item.type;
    this.myorderdetail.orderdetaildescription= item.orderdetaildescription;
    this.myorderdetail.orderdetailmessage= item.orderdetailmessage;
  
    if (this.myorderdetail.category == 'Logistico')
    {
      this.myorderdetail.orderdetailarrivedate= "2019-01-01 11:30"; //item.orderdetailarrivedate;
      this.myorderdetail.orderdetailactivity= "DESCARGANDO"; //item.orderdetailactivity;
      this.myorderdetail.orderdetailproductid= "p-01"; //item.orderdetailproductid;
      this.myorderdetail.orderdetailproductdescription= "AZUCAR"; //item.orderdetailproductdescription;
      this.myorderdetail.orderdetailproductquantity= "10"; //item.orderdetailproductquantity;
      this.myorderdetail.orderdetailproductunitid= "1"; //item.orderdetailproductunitid;
      this.myorderdetail.orderdetailproductunitdescription= "PZA"; //item.orderdetailproductunitdescription;
    }
    else
    {
      this.myorderdetail.orderdetailarrivedate= "2019-01-01 11:30"; //item.orderdetailarrivedate;
      this.myorderdetail.orderdetailactivity= "-"; //item.orderdetailactivity;
      this.myorderdetail.orderdetailproductid= "p-01"; //item.orderdetailproductid;
      this.myorderdetail.orderdetailproductdescription= "-"; //item.orderdetailproductdescription;
      this.myorderdetail.orderdetailproductquantity= "0"; //item.orderdetailproductquantity;
      this.myorderdetail.orderdetailproductunitid= "1"; //item.orderdetailproductunitid;
      this.myorderdetail.orderdetailproductunitdescription= "-"; //item.orderdetailproductunitdescription;
   
    }
    this.myorderdetail.orderdetailstatus= "1";
    this.myorderdetail.signsnumber= 1;
    this.myorderdetail.picturesnumber= 1;
    this.myorderdetail.commentsnumber= 1;
    this.myorderdetail.qrsnumber= 1;
    this.myorderdetail.codebarsnumber= 1;

    this.myorderdetail.lat = item.lat;
    this.myorderdetail.lng = item.lng;
    this.myorderdetail.radio = "300";

    if (this.i ==1)
      this.myorderdetail.polygon = '['+
        '{"lat": 18.849016, "lng": -97.090476},' +
        '{"lat": 18.849306, "lng": -97.089554},' +
        '{"lat": 18.849448, "lng": -97.088621},' +
        '{"lat": 18.847849, "lng": -97.088015},' +
        '{"lat": 18.847199, "lng": -97.089678},' +
        '{"lat": 18.849016, "lng": -97.090476}' +
         ']';

                                          
         if (this.i ==2)
         this.myorderdetail.polygon = '['+
         '{"lat": 18.851186, "lng": -97.081820}, ' +
         '{"lat": 18.852228, "lng": -97.080868}, ' +
         '{"lat": 18.852125, "lng": -97.080673}, ' +
         '{"lat": 18.851057, "lng": -97.081636}, ' +
         '{"lat": 18.851186, "lng": -97.081820} ' +
          ']'; 

            if (this.i ==3)
      this.myorderdetail.polygon = '['+
          '{"lat": 18.858504, "lng": -97.071334}, ' +
          '{"lat": 18.860809, "lng": -97.069349}, ' +
          '{"lat": 18.860850, "lng": -97.068963}, ' +
          '{"lat": 18.859581, "lng": -97.067558}, ' +
          '{"lat": 18.859287, "lng": -97.067537}, ' +
          '{"lat": 18.857236, "lng": -97.069157}, ' +
          '{"lat": 18.857338, "lng": -97.069533}, ' +
          '{"lat": 18.858504, "lng": -97.071334}' +
            ']';

         if (this.i ==4)
      this.myorderdetail.polygon = '['+
          '{"lat": 18.862724, "lng": -97.050269}, ' +
          '{"lat": 18.862298, "lng": -97.047501}, ' +
          '{"lat": 18.870786, "lng": -97.044181}, ' +
          '{"lat": 18.869893, "lng": -97.052431}, ' +
          '{"lat": 18.862724, "lng": -97.050269} ' +
          ']';

    this.orderdetailModel.push(this.myorderdetail);
    this.i ++;
    //alert (JSON.stringify(this.orderdetailModel));
  });
  this.myStorage.setSession("myCurrentRoute", this.arrRouteDetail);
  //alert(this.myStorage.getSession("myCurrentRoute"))
  
  
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
  }
  
  validateForm() {
    this.form = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    });
  
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }
  
  // toggle(control , windowType) {
  //   switch (control) {
  //     case true:
  //       this.windowState = 'hidden';
  //     break;
  //     case false:
  //       this.windowState = 'show';
  //     break;
  //     default:
  //       this.windowState = this.windowState === 'show' ? 'hidden' : 'show';
  //     break;
  //   }
  //   if (windowType === 'create') {
  //     this.windowCreateClass();
  //   }else {
  //     this.windowEditClass();
  //   }
  // }
  
  createOrder() {
  //  this.orderModel.orderid = 7711;
    this.orderModel.orderid = this.viajeid;
    this.orderModel.companyid= "hesa";
    this.orderModel.customerid= "ING-01";
    this.orderModel.driverid= this.driverId;
    this.orderModel.truckid= this.truckId;
    this.orderModel.trailerid1= this.trailer1Id;
    this.orderModel.dollyid= this.dollyId;
    this.orderModel.trailerid2= this.trailer2Id;
    this.orderModel.zone= "Zona Centro";
    this.orderModel.assigndate= this.beginData;
    this.orderModel.teadate= this.endData;
    this.orderModel.enddate= this.endData;;
    this.orderModel.teastatus= "A tiempo";
    this.orderModel.source= this.routeSource;
    this.orderModel.sourceaddr= this.routeSourceDir;
    this.orderModel.target= this.routeTarget;
    this.orderModel.targetaddr= this.routeTargetDir;
    this.orderModel.km= this.orderKm;
    this.orderModel.lt= this.orderLt;
    this.orderModel.km_lt= this.orderKmLt;
    this.orderModel.price_lt= this.orderPrecioLt;
    this.orderModel.cost= this.orderCosto;
    this.orderModel.routeid= this.routeId;
    this.orderModel.orderadminid= 1;
    this.orderModel.orderstatusid= 1;

    //console.log('create order..' + JSON.stringify(this.orderModel));
    /*
    this.myorderdetail = new OrderDetailModel();
    this.myorderdetail.companyid= "hesa";
    this.myorderdetail.customerid= "ING-01";
    this.myorderdetail.orderdetailid= 1;
    this.myorderdetail.routedetailid= "r01-01";
    this.myorderdetail.category= "Logistico";
    this.myorderdetail.type= "Bodega";
    this.myorderdetail.orderdetaildescription= "caseta";
    this.myorderdetail.orderdetailmessage= "reducir vel";
    this.myorderdetail.orderdetailarrivedate= "2019-01-01 11:30";
    this.myorderdetail.orderdetailactivity= "DESCARGANDO";
    this.myorderdetail.orderdetailproductid= "p-01";
    this.myorderdetail.orderdetailproductdescription= "AZUCAR";
    this.myorderdetail.orderdetailproductquantity= "10";
    this.myorderdetail.orderdetailproductunitid= "1";
    this.myorderdetail.orderdetailproductunitdescription= "PZA";
    this.myorderdetail.orderdetailstatus= "1";
    this.myorderdetail.signsnumber= 1;
    this.myorderdetail.picturesnumber= 1;
    this.myorderdetail.commentsnumber= 1;
    this.myorderdetail.qrsnumber= 1;
    this.myorderdetail.codebarsnumber= 1;
*/
    //this.orderdetailModel.push(this.myorderdetail);
 /*   
    this.myorderdetail = new OrderDetailModel();
    this.myorderdetail.companyid= "hesa";
    this.myorderdetail.customerid= "ING-01";
    this.myorderdetail.orderdetailid= 2;
    this.myorderdetail.routedetailid= "r01-01";
    this.myorderdetail.category= "Base";
    this.myorderdetail.type= "Operativo";
    this.myorderdetail.orderdetaildescription= "Comedor";
    this.myorderdetail.orderdetailmessage= "Pueder permanecer una hora";
    this.myorderdetail.orderdetailarrivedate= "2019-01-01 11:30";
    this.myorderdetail.orderdetailactivity= "-";
    this.myorderdetail.orderdetailproductid= "p-01";
    this.myorderdetail.orderdetailproductdescription= "AZUCAR";
    this.myorderdetail.orderdetailproductquantity= "10";
    this.myorderdetail.orderdetailproductunitid= "1";
    this.myorderdetail.orderdetailproductunitdescription= "PZA";
    this.myorderdetail.orderdetailstatus= "1";
    this.myorderdetail.signsnumber= 1;
    this.myorderdetail.picturesnumber= 1;
    this.myorderdetail.commentsnumber= 1;
    this.myorderdetail.qrsnumber= 1;
    this.myorderdetail.codebarsnumber= 1;

    //this.orderdetailModel.push(this.myorderdetail);
    
    this.myorderdetail = new OrderDetailModel();
    this.myorderdetail.companyid= "hesa";
    this.myorderdetail.customerid= "ING-01";
    this.myorderdetail.orderdetailid= 3;
    this.myorderdetail.routedetailid= "r01-01";
    this.myorderdetail.category= "Logistico";
    this.myorderdetail.type= "Bodega";
    this.myorderdetail.orderdetaildescription= "Descarga";
    this.myorderdetail.orderdetailmessage= "Pueder permanecer una hora";
    this.myorderdetail.orderdetailarrivedate= "2019-01-01 11:30";
    this.myorderdetail.orderdetailactivity= "Descarga";
    this.myorderdetail.orderdetailproductid= "p-01";
    this.myorderdetail.orderdetailproductdescription= "AZUCAR";
    this.myorderdetail.orderdetailproductquantity= "10";
    this.myorderdetail.orderdetailproductunitid= "1";
    this.myorderdetail.orderdetailproductunitdescription= "PZA";
    this.myorderdetail.orderdetailstatus= "1";
    this.myorderdetail.signsnumber= 1;
    this.myorderdetail.picturesnumber= 1;
    this.myorderdetail.commentsnumber= 1;
    this.myorderdetail.qrsnumber= 1;
    this.myorderdetail.codebarsnumber= 1;
*/
    //this.orderdetailModel.push(this.myorderdetail);
    

    //console.log('create order detail..' + JSON.stringify(this.orderdetailModel));
    
    this.viajeModel.order = this.orderModel;
    this.viajeModel.orderdetail = this.orderdetailModel;
    
    this.router.navigate(['/', 'pages', 'travel_matrix', 'clients-products']).then(nav => {
      //this.orderModel.plataforms = this.confirmed;
     
      setTimeout(() => {
           this.clientProductService.createClientProductEnd(this.viajeModel);
         
       }, 200);
       console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
    });
  }
  
  // clearModels() {
  //   this.toggle(true, null);
  // }
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
  
  }
  