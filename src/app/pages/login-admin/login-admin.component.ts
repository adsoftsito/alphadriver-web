import {Component, ViewChild} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {LoginService} from "../../shared/providers/login.service";
import { IMAGES_ROOT } from '../../theme/theme.constants';



@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})


export class LoginAdmin{

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  fullPassword: string;
  dangerpass: boolean;
  warningpass: boolean;
  isPassword = true;
  warningemail: boolean;
  dangeremail: boolean;
  selectValue: string;
  accountant:number = 0;
  faultCounter: number = 0;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  goSesion: boolean = false;
  iconLogin:string;
  @ViewChild('pErrorEmail') public popover: NgbPopover;

  recapcha: boolean= false;

  greeting = {};
  constructor(fb:FormBuilder, private translate: TranslateService, private router: Router, private _service: LoginService) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.langDefault();
    this.iconLogin = IMAGES_ROOT+'EnlaceFreightliner.svg';
    this.changeColorSvg();
  }


  
  public onSubmit(values:Object):void {
    this.submitted = true;
    
    if(this.email.value !== "") {
      this.goSesion = true;
      this.accountant++;
      setTimeout(()=>{document.getElementById("inputPassword3").focus();},0);
      this.validatePassword(this.password.value, this.password.valid, this.accountant);
    }else{
      this.warningemail = true;
      setTimeout(() => this.warningemail  = false, 1500);
    }
  }

  resolved(captchaResponse: string) {
      console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  validatePassword(emptypassword: string, passwordValidity: boolean, accountant: number){ 
    if(emptypassword ==="" && passwordValidity ===false && accountant>1 || !this.goSesion){
        this.warningpass = true;
        setTimeout(() => this.warningpass  = false, 1500);
    }if(emptypassword !=="" && passwordValidity===false && emptypassword.length<6){
      this.dangerpass = true;
      setTimeout(() => this.dangerpass= false, 1500);
    }if(emptypassword.length>=6){
      this.fullPassword = this.password.value;
      this.validateLoginData();
    }

  }


  validateLoginData(){
    const body = {username: this.email.value, password: this.fullPassword};
    this._service.authenticate(body)
      .subscribe(
        res => {
          let bodyResponse: any = JSON.parse(res['_body']);

          if (bodyResponse) {
            this._service.loggedIn(bodyResponse);
            this.router.navigate([bodyResponse.homePage]);
          } else {
            console.error('Hay un problema');
          }
        },
        (err: any) => {
          this.faultCounter++;
          if(this.faultCounter>=5){
            this.recapcha = true;
          }
        }
      );
  }

  statusChange(){
    this.isPassword = !(this.isPassword);
  }

  changeLanguage(lang: string){
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  langDefault(){
    const langChe = localStorage.getItem('lang');
    if(langChe === null){
      this.selectValue = this.translate.getBrowserLang();
    }else{
      this.selectValue = localStorage.getItem('lang');
      this.translate.use(this.selectValue);
    }
    
  }


  changeColorSvg(){
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
  }

}