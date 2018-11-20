import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'users-control-component',
  templateUrl: './m_travel.component.html',
  styleUrls: ['./m_travel.component.scss']
})
export class MTravelComponent implements OnInit {

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
