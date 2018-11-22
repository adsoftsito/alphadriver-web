import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'alert-component',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlertComponent implements OnInit,OnDestroy {

  private $subscriptionTranslate:Subscription;
  messageDownload:string;
  messageAlert:string;
  aware:string;

  constructor(private translate:TranslateService) {
  }

  ngOnInit() {
    this.$subscriptionTranslate = this.translate.get('pages.monitoringreaction.patrimonial_security').subscribe(
      res=>{
        this.messageAlert = res.messageAlert;
        this.messageDownload = res.messageDownloadAlert;
        this.aware = res.aware;
      }
    );
  }
  ngOnDestroy(){
    this.$subscriptionTranslate.unsubscribe();
  }

}
