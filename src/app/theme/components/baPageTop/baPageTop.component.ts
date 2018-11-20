import {Component, OnInit} from '@angular/core';
import {GlobalState} from '../../../global.state';

import { NgModule} from '@angular/core';
import { NgaModule} from '../../../theme/nga.module';
import {FormsModule, FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import{ ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {LoginService} from "../../../shared/providers/login.service";
import { IMAGES_ROOT } from '../../theme.constants';
import { Constants } from '../../../shared/providers/constants';
import { EventsService } from '../../../shared/providers/events';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop implements OnInit{

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = true;
  private userData: any;
  

  iconLogin:string;  
  ratingScoreString:string;  
  status:string;
  color:string;
  sizeOne:string;
  sizeTwo:string;
  sizeThree:string;
  sizeFour:string;
  name:string;
  lastName:string;
  rol:string;
  commercialName:string;
  sessionStatus:number;
  currentRate: number;

  activeStatus1:string = '';
  activeStatus2:string = '';
  activeStatus3:string = '';
  activeStatus4:string = '';

  notificationsData: Array<any> = [];
  alertData: Array<any> = [];

  // notiYellow = 6;
  // notiOrange = 15;
  // notiRed = 22;
  // notiBlue = 11;
  
  // notiYellow = 21;
  // notiOrange = 1;
  // notiRed = 25;
  // notiBlue = 30;
  
  // notiYellow = 36;
  // notiOrange = 25;
  // notiRed = 10;
  // notiBlue = 3;

  notiYellow = 6;
  notiOrange = 15;
  notiRed = 999;
  notiBlue = 11;
  messages = 999;

  numberNotifications = [ this.notiRed, this.notiBlue, this.notiOrange, this.notiYellow];
  classNotifications = ['little','medium','big','extraBig'];
  
  redAlert: string = String (this.notiRed);
  oarangeAlert: string = String (this.notiOrange);
  blueAlert: string = String (this.notiBlue);
  yellowAlert: string = String (this.notiYellow);
  toShow: boolean = true;
  numberMessages: string = String (this.messages);
  

  //translate
  toSeeHow = 'theme.components.bapagetop.toSeeHow';
  state = 'theme.components.bapagetop.state';
  available = 'theme.components.bapagetop.available';
  absent = 'theme.components.bapagetop.absent';
  occupied = 'theme.components.bapagetop.occupied';
  inactive = 'theme.components.bapagetop.inactive';
  configuration = 'theme.components.bapagetop.configuration';
  signOutT = 'theme.components.bapagetop.signOutT';

  //translate Notifications
  notifications = 'theme.components.bapagetop.notifications.notifications';
  messageCenter = 'theme.components.bapagetop.notifications.messageCenter';
  markEverything = 'theme.components.bapagetop.notifications.markEverything';
  
  //translate Alerts
  alerts = 'theme.components.bapagetop.alertNotifications.alerts';
  
  
  
  constructor(
    private _state:GlobalState, 
    private loginSrv: LoginService,
    private router: Router,
    private events: EventsService,
    private C: Constants

  ) {
    this._state.notifyDataChanged('menu.isCollapsed', true);

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    this.userData = this.loginSrv.isLogged();
    this.iconLogin = IMAGES_ROOT+'enlace-Freightliner.svg';

    this.events.subscribe(this.C.EVENTS_SERVICE.LOG_ALERTS_RETURN_BUTTON_TOGGLE, res=>{
      this.toShow = res;
     // this.showAlerts = !res;

    });



    if(this.userData){
      this.ratingScoreString = String (this.userData.ratingScore);
      this.name = this.userData.name;
      this.lastName = this.userData.lastName;
      this.rol = this.userData.rol;
      this.commercialName = this.userData.commercialName;
      this.currentRate = this.userData.rating;
      this.sessionStatus = this.userData.sessionStatus;
      
    }else{
      // this.signOut();
      this.router.navigate(['/login']);
      this.name = 'Heriberto';
      this.lastName = 'Hernández';
      this.rol = 'Administrador';
      this.commercialName = 'BWL';
      this.currentRate = 4.8;
      this.ratingScoreString = '4.5898';
      this.sessionStatus = 1;
    }
   
  }



  ngOnInit() {

  this.notificationsData = [
    {
      title: 'Juan te envió un mensaje.',
      highlightTitle: '',
      subtitle: 'Lorem ipsum dolor sit amet',
      hours: '2h',
      type: 'avatar'
    },
    {
      title: 'Nueva solicitud de',
      highlightTitle: 'predenuncia',
      subtitle: 'Lorem ipsum dolor sit amet',
      hours: '3h',
      type: 'icon'
    },
    {
      title: 'Pedro te añadió a un',
      highlightTitle: 'nuevo grupo.',
      subtitle: '38411-Disponible',
      hours: '4h',
      type: 'unit'
    },
    {
      title: 'Fernando compartió un',
      highlightTitle: 'enlace.',
      subtitle: 'https://getbootstrap.com/docs',
      hours: '3h',
      type: 'avatar'
    },
    {
      title: 'José te envió un',
      highlightTitle: 'archivo.',
      subtitle: 'Lorem ipsum dolor sit amet',
      hours: '5h',
      type: 'avatar'
    },
    {
      title: 'José te envió un',
      highlightTitle: 'archivo.',
      subtitle: 'Lorem ipsum dolor sit amet',
      hours: '5h',
      type: 'avatar'
    },
    {
      title: 'José te envió un',
      highlightTitle: 'archivo.',
      subtitle: 'Lorem ipsum dolor sit amet',
      hours: '5h',
      type: 'avatar'
    }
  ];

  this.alertData = [
    {
      title: 'Inhibidor de GPS detectado.',
      economicNumber: 38411,
      number: '#134222',
      date: '26/07/18',
      hour: '12:00 pm'
    },
    {
      title: 'Inhibidor de GPS detectado.',
      economicNumber: 38411,
      number: '#134222',
      date: '26/07/18',
      hour: '12:00 pm'
    },
    {
      title: 'Inhibidor de GPS detectado.',
      economicNumber: 38411,
      number: '#134222',
      date: '26/07/18',
      hour: '12:00 pm'
    },
    {
      title: 'Inhibidor de GPS detectado.',
      economicNumber: 38411,
      number: '#134222',
      date: '26/07/18',
      hour: '12:00 pm'
    },
    {
      title: 'Inhibidor de GPS detectado.',
      economicNumber: 38411,
      number: '#134222',
      date: '26/07/18',
      hour: '12:00 pm'
    },
    {
      title: 'Inhibidor de GPS detectado.',
      economicNumber: 38411,
      number: '#134222',
      date: '26/07/18',
      hour: '12:00 pm'
    }
  ];
    
  this.numberNotifications.sort((a,b) => a-b);  // [ 1, 5, 40, 200 ]
  let notificationNameClass1 = this.classNotifications[this.numberNotifications.indexOf(this.notiOrange)]
  let notificationNameClass2 = this.classNotifications[this.numberNotifications.indexOf(this.notiRed)]
  let notificationNameClass3 = this.classNotifications[this.numberNotifications.indexOf(this.notiBlue)]
  let notificationNameClass4 = this.classNotifications[this.numberNotifications.indexOf(this.notiYellow)]


  this.events.publish(this.C.EVENTS_SERVICE.COMPANY_NAME, this.commercialName);


  if(notificationNameClass1 && notificationNameClass2 && notificationNameClass3 && notificationNameClass4){
    this.sizeOne = notificationNameClass1;
    this.sizeTwo = notificationNameClass2;
    this.sizeThree = notificationNameClass3;
    this.sizeFour = notificationNameClass4;
  }
  
    // 0=inactivo, 1=activo, 2=ausente, 3=ocupado
    if(this.sessionStatus === null){
      console.log('vacio');
    }else{

      if(this.sessionStatus === 0){
        this.activeStatus4 = 'selectedOutLine';
        this.status = this.inactive;
        this.color = '#b2b2b2';
      }
        if(this.sessionStatus === 1){
          this.activeStatus1 = 'selectedAvailable';
          this.status = this.available;
          this.color = '#2fd15d';
        }
          if(this.sessionStatus === 2){
            this.activeStatus2 = 'selectedAbsent';
            this.status = this.absent;
            this.color = '#f39200';
          }
            if(this.sessionStatus === 3){
              this.activeStatus3 = 'selectedNoAvailable';
              this.status = this.occupied;
              this.color = '#e6332a';
            }
      
    }
    $( document ).ready( function () {
      $( '.dropdown-menu ul, .dropdown-menu #statusUser, .dropdown-menu #vDown' ).on( 'click', function ( e ) {
          return false;
        } );
    } );
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    $(document).ready(function(){
        jQuery('img.svg').each( function(){
            let $img = jQuery(this);
            let imgID = $img.attr('id');
            let imgClass = $img.attr('class');
            let imgURL = $img.attr('src');
  
            jQuery.get(imgURL, function(data){
                var $svg = jQuery(data).find('svg');
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }
                $svg = $svg.removeAttr('xmlns:a');
                $img.replaceWith($svg);
            }, 'xml');
  
        });
    });
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  signOut() {
    this.loginSrv.logout();
  }

  changeStatusAvailable(selectedColor){
    this.status = this.available;
    this.color = selectedColor;
    this.activeStatus1 = 'selectedAvailable';
    this.activeStatus2 = '';
    this.activeStatus3 = '';
    this.activeStatus4 = '';
  }
  changeStatusAbsent(selectedColor){
    this.status = this.absent;
    this.color = selectedColor;
    this.activeStatus1 = '';
    this.activeStatus2 = 'selectedAbsent';
    this.activeStatus3 = '';
    this.activeStatus4 = '';
  }
  changeStatusNotAvailable(selectedColor){
    this.status = this.occupied;
    this.color = selectedColor;
    this.activeStatus1 = '';
    this.activeStatus2 = '';
    this.activeStatus3 = 'selectedNoAvailable';
    this.activeStatus4 = '';
  }
  changeStatusAbsentOutLine(selectedColor){
    this.status = this.inactive;
    this.color = selectedColor;
    this.activeStatus1 = '';
    this.activeStatus2 = '';
    this.activeStatus3 = '';
    this.activeStatus4 = 'selectedOutLine';
  }

  closeDropdown(event){
    if(event === 'notifications')
    document.getElementById('idNotifications').className = 'dropdown notifications';
    if(event === 'messages')
    document.getElementById('idMessages').className = 'dropdown messages';
  }

}
