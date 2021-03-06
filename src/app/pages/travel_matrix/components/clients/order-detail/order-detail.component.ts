import { Component, OnInit, Renderer2, ElementRef, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ClientModel } from '../../../../../shared/models/clients/client.model';
import { InterfaceModel } from '../../../../../shared/models/clients/interface.model';
import { NumberModel } from '../../../../../shared/models/clients/number.model';
import { PhoneModel } from '../../../../../shared/models/clients/phone.model';
import { PlataformModel } from '../../../../../shared/models/clients/plataform.model';
import { AccountModel } from '../../../../../shared/models/clients/account.model';
import { BillingModel } from '../../../../../shared/models/clients/billing.model';

import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from "@angular/router";
import { Select2OptionData } from 'ng2-select2';
import { Subscription } from 'rxjs/Subscription';
import { ClientProductService } from '../clients.service';
import { DualListComponent } from 'angular-dual-listbox';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {StorageService} from "../../../../../shared/providers/storage.service";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
    
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

export class OrderDetailComponent implements OnInit {
  
  
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
  userRols: any[] = [
        { rol: 'Administrador'},
        { rol: 'User'},
        { rol: 'Gestor'}
        ];
  public eje: String;
  public exampleData: Array<Select2OptionData>;
  public options: Select2Options;
  public optionsPermits: Select2Options;
  

  private dataOrder:any;
  private orderid : number;
  
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
      private myStorage: StorageService
      ) {
      // this.clientModel = new User();
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
  
    this.dataOrder = this.myStorage.getSession("myCurrentOrder");
    this.orderid = this.dataOrder.orderid;
    console.log(this.dataOrder);
    console.log(this.orderid);
        
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
        this.clientModel.account.name = '';
        this.clientModel.commercialName = client.accountOwner;
        this.clientModel.businessName = client.businessName;
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
  
  createClient() {
    this.router.navigate(['/', 'pages', 'usersControl', 'clients-products']).then(nav => {
      this.clientModel.plataforms = this.confirmed;
      setTimeout(() => {
         if (this.editar) {
           this.clientProductService.updateClientProduct(this.clientModel);
         }else {
           //this.clientProductService.createClientProductEnd(this.clientModel);
         }
        //  this.clearModels();
       }, 200);
       //console.log(nav); // true if navigation is successful
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
  