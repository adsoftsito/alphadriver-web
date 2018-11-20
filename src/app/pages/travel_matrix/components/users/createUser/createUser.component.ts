import { Component, OnInit, Renderer2, ElementRef, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User } from '../../../../../shared/models/user.model';
import { userPlataform } from '../../../../../shared/models/user.plataform.model';
import { userInterface } from '../../../../../shared/models/user.interface.model';
import { UserService } from "../user.service";
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from "@angular/router";
import { Select2OptionData } from 'ng2-select2';
import { Subscription } from 'rxjs/Subscription';
import { DualListComponent } from 'angular-dual-listbox';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'create-user-component',
  templateUrl: './createUser.component.html',
  styleUrls: ['./createUser.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slideHiddenShow', [
      state('hidden', style({
        transform: 'translate3d(100%, 0, 0)',
        display: 'none',
      })),
      state('show', style({
        transform: 'translate3d(0, 0, 0)',
      })),
      // transition('hidden => show', animate('400ms ease-in-out')),
      // transition('show => hidden', animate('400ms ease-in-out')),
    ]),
  ],
})

export class CreateUserComponent implements OnInit, OnDestroy {
  @ViewChild('window', {read: ElementRef}) window: ElementRef;
  @ViewChild('backdrop', {read: ElementRef}) windowBackdrop: ElementRef;
  windowState: string = 'hidden';
  userModel: User;
  userInterface : userInterface;
  initials: string;
  initialsColor: string;
  setColorAvatar: string;
  iconUser: string = 'motum-i tm-e92f';
  closeComponent: string;
  userName: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  form:FormGroup;
  editar: boolean;
  email:AbstractControl;
  password:AbstractControl;
  subscriptionCreate: Subscription;
  subscriptionEdit: Subscription;
  routeLinkClose: Subscription;
  flagCreatePassUser: boolean = false;
  flagCheckAccount: boolean = true;

  public eje: String;
  public exampleData: Array<Select2OptionData>;
  public options: Select2Options;
  public optionsPermits: Select2Options;

  //translate
  title: string = '';
  createUserTrans: string = '';

  edit = 'pages.userControl.usersComponent.createUser.edit';
  users = 'pages.userControl.usersComponent.createUser.users';
  interface = 'pages.userControl.usersComponent.createUser.interface';
  permissions = 'pages.userControl.usersComponent.createUser.permissions';
  editUserTrans = 'pages.userControl.usersComponent.createUser.editUserTrans';

  personalInformation = 'pages.userControl.usersComponent.createUser.personalInformation';
  nameUser = 'pages.userControl.usersComponent.createUser.nameUser';
  surnamesUser = 'pages.userControl.usersComponent.createUser.surnamesUser';
  contactInformation = 'pages.userControl.usersComponent.createUser.contactInformation';
  phoneUser = 'pages.userControl.usersComponent.createUser.phoneUser';
  emailAccountUser = 'pages.userControl.usersComponent.createUser.emailAccountUser';
  accountInformationUser = 'pages.userControl.usersComponent.createUser.accountInformationUser';
  usernameUser = 'pages.userControl.usersComponent.createUser.usernameUser';
  passwordUser = 'pages.userControl.usersComponent.createUser.passwordUser';
  accessExpires = 'pages.userControl.usersComponent.createUser.accessExpires';
  generatePasswordUser = 'pages.userControl.usersComponent.createUser.generatePasswordUser';
  restorePassword = 'pages.userControl.usersComponent.createUser.restorePassword';
  status = 'pages.userControl.usersComponent.createUser.status';
  sendInvitation = 'pages.userControl.clients.formClient.sendInvitation';
  createUserAndPass = 'pages.userControl.clients.formClient.createUserAndPass';

  cancel = 'pages.userControl.usersComponent.createUser.cancel';
  back = 'pages.userControl.usersComponent.createUser.back';
  next = 'pages.userControl.usersComponent.createUser.next';
  save = 'pages.userControl.usersComponent.createUser.save';

  //Interface
  regionalConfiguration = 'pages.userControl.usersComponent.createUser.regionalConfiguration';
  countryRegion = 'pages.userControl.usersComponent.createUser.countryRegion';
  state = 'pages.userControl.usersComponent.createUser.state';
  city = 'pages.userControl.usersComponent.createUser.city';
  unitSystem = 'pages.userControl.usersComponent.createUser.unitSystem';
  measurementOfFuelConsumption = 'pages.userControl.usersComponent.createUser.measurementOfFuelConsumption';
  dateFormat = 'pages.userControl.usersComponent.createUser.dateFormat';
  hourFormat = 'pages.userControl.usersComponent.createUser.hourFormat';
  timeZone = 'pages.userControl.usersComponent.createUser.timeZone';
  coin = 'pages.userControl.usersComponent.createUser.coin';
  language = 'pages.userControl.usersComponent.createUser.language';
  weekStartsIn = 'pages.userControl.usersComponent.createUser.weekStartsIn';
  userInterfaceConfiguration = 'pages.userControl.usersComponent.createUser.userInterfaceConfiguration';
  homepage = 'pages.userControl.usersComponent.createUser.homepage';
  logOut = 'pages.userControl.usersComponent.createUser.logOut';
  metric = 'pages.userControl.usersComponent.createUser.metric';
  measuresUSImperial = 'pages.userControl.usersComponent.createUser.measuresUSImperial';
  sunday = 'pages.userControl.usersComponent.createUser.sunday';
  monday = 'pages.userControl.usersComponent.createUser.monday';
  saturday = 'pages.userControl.usersComponent.createUser.saturday';

  //Permissions
  productsPlatforms = 'pages.userControl.usersComponent.createUser.productsPlatforms';
  available = 'pages.userControl.usersComponent.createUser.available';
  selected = 'pages.userControl.usersComponent.createUser.selected';
  platforms = 'pages.userControl.usersComponent.createUser.platforms';
  roles = 'pages.userControl.usersComponent.createUser.roles';

  // Configuration Dual-Listbox
  confirmed:Array<userPlataform> =[];
  confirmedDummi:Array<any> =[
    {
    "id": 2,
    "plataform": "  ",
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
    "id": 3,
    "plataform": "  ",
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
    "id": 4,
    "plataform": "  ",
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
    "id": 5,
    "plataform": "  ",
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
      "id": 1,
      "plataform": "Cummins",
      "permissions": [{
        "permission": "Administrador"
      }, {
        "permission": "User"
      }, {
        "permission": "Monitorista"
      }, {
        "permission": "Ayudante"
      },{
        "permission": "Client"
      }, {
        "permission": "Relleno"
      }, {
        "permission": "Test"
      }]
    },
    {
      "id": 2,
      "plataform": "Enlace Freightliner",
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
      "id": 3,
      "plataform": "Motumweb",
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
  key = 'id';
  keepSorted = true;
  display = 'plataform';
  filter = true;
  constructor(private renderer: Renderer2, private userService: UserService,
     private formBuilder: FormBuilder, private router: Router, private modalService: NgbModal) {
    this.userModel = new User();
    this.userInterface = new userInterface();
    this.userModel.interface = this.userInterface;
    this.source = JSON.parse(JSON.stringify(this.dataExample));
    // this.validateForm();

    this.subscriptionCreate = userService.createUser$.subscribe(
      state => {
        this.userModel = new User();
        this.userInterface = new userInterface();
        this.userModel.interface = this.userInterface;
        this.editar = false;
        this.userModel.rol = 'Administrador';
        this.toggle(false,'create');
        this.userModel.status = 1;

      });

    this.routeLinkClose = userService.routeCloseComponent$.subscribe(
      route => {
        this.closeComponent = route;
        
        if(route === '/pages/usersControl/clients-products'){
          this.title = 'pages.userControl.usersComponent.createUser.newMember';
          this.iconUser = 'motum-i tm-e931';
          this.createUserTrans = 'pages.userControl.usersComponent.createUser.createMember';
        }
        if(route === '/pages/usersControl/clients-products/members'){
          this.iconUser = 'motum-i tm-e931';
          
          if(!this.editar)
            this.createUserTrans = 'pages.userControl.usersComponent.createUser.createMember';
          
          if(this.editar === undefined)
            this.editUserTrans = 'pages.userControl.usersComponent.createUser.editMember';
        }
        if(route === '/pages/usersControl/users'){
          this.title = 'pages.userControl.usersComponent.createUser.title';
          this.createUserTrans = 'pages.userControl.usersComponent.createUser.createUserTrans';
        }
      }
    );

    this.subscriptionEdit = userService.editUser$.subscribe(
      user => {
        this.userModel = new User();
        // this.userInterface = new userInterface();
        this.editar = true;
        this.userModel = user;
        this.toggle(false,'edit');

        if (user.plataforms) {
            this.confirmed = user.plataforms;
        }
        // if (user.interface == undefined) {
        //     this.userModel.interface = this.userInterface;
        // }

        this.userName = this.userModel.name.charAt(0);
        let cad: string = String (this.userName+' '+this.userModel.lastname);
        let word = '';
        let letter = '';
        let carat = cad.length;

        for (let index = 0; index < carat; index++) {
            if(cad.charAt(index)!=' '){
              word += cad.charAt(index);
              if(index+1 === carat){
                letter += word.charAt(0);
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
                }
            }else{
              letter += word.charAt(0);
              word='';
          }
        }
    });
  }
  ngOnInit() {
    this.exampleData = [{id:'eje1', text:'RoadAdvisor'},{id:'eje2', text:'MotumWeb'}];
    this.options = {
      multiple: false,
      minimumResultsForSearch: -1,
      theme: 'classic',
      closeOnSelect: true,
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

  ngOnDestroy() {
    this.subscriptionCreate.unsubscribe();
    this.subscriptionEdit.unsubscribe();
    this.routeLinkClose.unsubscribe();
    this.windowState = null;
    this.initials = null;
    this.userName = null;
    this.emailPattern = null;
    this.form = null;
    this.email = null;
    this.password = null;
  }

  validateForm() {
    this.form = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }
  onChangePassword(alert) {
    const modalRef = this.modalService.open(alert, { size: 'lg' , keyboard: true, windowClass: 'motum-modal-confirm', backdrop: true });
    modalRef.result.then((userResponse) => {
      if(userResponse) {
      }
    });
  }
  generatePassword() {

  }
  getListPermission() {

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


  createUser(event) {
    
    if(event === '/pages/usersControl/clients-products'){
      this.router.navigate(['/', 'pages', 'usersControl', 'clients-products']).then(nav => {
        this.userModel.plataforms = this.confirmed;
        setTimeout(() => {
           if (!this.editar) {
            this.userService.createUser(this.userModel);
           }else {

           }
           this.clearModels();
         }, 200);
         //console.log(nav); // true if navigation is successful
        }, err => {
          console.log(err) // when there's an error
      });
    }
    if(event === '/pages/usersControl/clients-products/members'){
      this.router.navigate(['/', 'pages', 'usersControl', 'clients-products', 'members']).then(nav => {
        this.userModel.plataforms = this.confirmed;
        setTimeout(() => {
           if (this.editar) {
             this.userService.editMembers(this.userModel);
           }else {
             this.userService.createUser(this.userModel);
           }
           this.clearModels();
         }, 200);
         //console.log(nav); // true if navigation is successful
        }, err => {
          console.log(err) // when there's an error
      });
    }
    if( event === '/pages/usersControl/users'){
      this.router.navigate(['/', 'pages', 'usersControl', 'users']).then(nav => {
        this.userModel.plataforms = this.confirmed;
        setTimeout(() => {
           if (this.editar) {
             this.userService.editUser(this.userModel);
           }else {
             this.userService.createUser(this.userModel);
           }
           this.clearModels();
         }, 200);
         //console.log(nav); // true if navigation is successful
        }, err => {
          console.log(err) // when there's an error
      });
    }

  }

  clearModels() {
    this.toggle(true, null);
  }
  send(flagCheck){
    this.flagCreatePassUser = false;
    if(flagCheck == false){ this.flagCheckAccount = true; } else{ this.flagCheckAccount = false; }
  }

  createPassUser(flagCheck){
    this.flagCheckAccount = false;
    if(flagCheck == false){ this.flagCreatePassUser = true; } else{ this.flagCreatePassUser = false; }
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

}
