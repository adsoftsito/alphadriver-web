import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { IMAGES_ROOT } from '../../theme/theme.constants';

@Component({
  selector: 'motum-user-register',
  templateUrl: './userRegister.component.html',
  styleUrls: ['./userRegister.component.scss']
  
})
export class UserRegisterComponent implements OnInit {

  public myForm:FormGroup;
  iconLogin: string;
  selectValue: string;

  passValidate = [];

  isPassword = true;
  confirmPass = true;
  disabledConfirmPass = true;
  disabledIntlnTel = true;
  incorrectPass = false;
  dangeremail: boolean = false;

  constructor(fb:FormBuilder, private translate: TranslateService) {
    this.iconLogin = IMAGES_ROOT+'EFRegister.svg';
    
    this.langDefault();
   }

  ngOnInit() {
    this.passValidate = [
      {
        name: ''
      },
      {
        name: ''
      },
      {
        name: ''
      },
      {
        name: ''
      },
      {
        name: ''
      },
      {
        name: ''
      }
    ];
  }

  onSubmit(form: NgForm){

    let email = this.validateEmail(form.value.email);
    let createPass = form.value.createPassword;
    let confirmPass = form.value.confirmPassword

    // console.log('validacion email' ,email);
       
    if(createPass === confirmPass
        && email ){
      

    }else{
      if(!email){
        this.dangeremail = true;
        setTimeout(() => this.dangeremail  = false, 1500);
      }
      if(createPass !== confirmPass){
        this.incorrectPass = true;
        setTimeout(() => this.incorrectPass= false, 1500);
      }

    }
  }

  intlTelInput(event){
    this.disabledIntlnTel = false;
    if(event === '+52'){
      this.disabledIntlnTel = true;
    }
  }

  passwordValidation(event){
    let password = String (event);

    
    // this.disabledConfirmPass = false;
    
    /**
     * Minimum of 7 characters
     */
    if(password.length > 6){
      this.passValidate[0].name = 'motum-i tm-e98f';
    }else{
      if(password.length === 0){
        this.passValidate[0].name = '';
      }else{
        this.passValidate[0].name = 'motum-i tm-e912';
      }
    }

    /**
     * Include an uppercase and lowercase
     */
      if(this.capitalLetter(password) != null){
          this.passValidate[1].name = 'motum-i tm-e98f';
      }else{
        if(password.length === 0){
          this.passValidate[1].name = '';
        }else{
          this.passValidate[1].name = 'motum-i tm-e912';
        }
      }

      if(this.lowerCase(password) != null){
        this.passValidate[4].name = 'motum-i tm-e98f';
      }else{
        if(password.length === 0){
          this.passValidate[4].name = '';
        }else{
          this.passValidate[4].name = 'motum-i tm-e912';
        }
      }
      
    /**
     * Include a number
     */
    if(this.includeNumber(password) != null){
        this.passValidate[3].name = 'motum-i tm-e98f';
    }else{
      if(password.length === 0){
        this.passValidate[3].name = '';
      }else{
        this.passValidate[3].name = 'motum-i tm-e912';
      }
    }

    /**
     * Do not repeat characters
     */
    if(this.repeatCharacters(password) != null){
        this.passValidate[5].name = 'motum-i tm-e912';
    }else{
      if(password.length === 0){
        this.passValidate[5].name = '';
      }else{
        this.passValidate[5].name = 'motum-i tm-e98f';
      }
    }

    /**
     * Do not use consecutive numbers
     */
    if(this.consecutiveNumbers(password) != null){
      this.passValidate[2].name = 'motum-i tm-e912';
    }else{
      if(password.length === 0){
        this.passValidate[2].name = '';
      }else{
        this.passValidate[2].name = 'motum-i tm-e98f';
      }
    }

    for(let i in this.passValidate){
      if(this.passValidate[i].name != 'motum-i tm-e98f'){
        this.disabledConfirmPass = true; break;
      }else{
        if(this.passValidate[i].name === ''){
          this.disabledConfirmPass = true; break;
        }else{
          this.disabledConfirmPass = false;
        }
      }
    }

  }// End passwordValidation


  validateEmail(email) {
    let regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/g;
    return email.match(regex);
  }

  capitalLetter(pass){
    let regex = /([A-Z])/g;
    return pass.match(regex);
  }
  lowerCase(pass){
    let regex = /([a-z])/g;
    return pass.match(regex);
  }
  includeNumber(pass){
    let regex = /(\d+)/g;
    return pass.match(regex);
  }
  repeatCharacters(pass){
    let regex = /(.)\1/g;
    return pass.match(regex);
  }
  consecutiveNumbers(pass){
    let regex = /(?:(?=01|12|23|34|45|56|67|78|89)\d)+\d/g;
    return pass.match(regex);
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

  statusChange(){
    this.isPassword = !(this.isPassword);
  }
  statusConfirmPassword(){
    this.confirmPass = !(this.confirmPass);
  }

  changeLanguage(lang: string){
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

}
