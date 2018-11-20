import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'users-control-component',
  templateUrl: './usersControl.component.html',
  styleUrls: ['./usersControl.component.scss']
})
export class UsersControlComponent implements OnInit {

  lang: string;

  constructor(private translate: TranslateService) {
    this.cambioLenguaje();
   }

  ngOnInit() {

  }

 cambioLenguaje(){
    this.lang = localStorage.getItem('lang');
    if(this.lang === null){
      this.translate.getBrowserLang();
    }else{
      this.translate.use(this.lang);
    }
  }

}
