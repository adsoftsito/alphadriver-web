/**
 * Created by Tech Group BWL on 01/10/2018.
 */
import {Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core"
@Component({
    selector: 'tm-ranking-component',
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
    lang: string;


    constructor( private translate: TranslateService) {
        this.changeLanguage();
    }

    ngOnInit() {}

    changeLanguage(){
        this.lang = localStorage.getItem('lang');
        if(this.lang === null){
            this.translate.getBrowserLang();
        }else{
            this.translate.use(this.lang);
        }
    }
}