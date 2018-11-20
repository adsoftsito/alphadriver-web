import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'motum-alert-notifications',
  templateUrl: './alertNotifications.html',
  styleUrls: ['./alertNotifications.scss']
})
export class AlertNotificationsComponent implements OnInit {

    @Input() tabColor: string;
    @Input() alertData: Array<any>;
    @Output() openAlerts = new EventEmitter<any>();
    
       
  //translate Alerts
  solve = 'theme.components.bapagetop.alertNotifications.solve';
  alertsLogbook = 'theme.components.bapagetop.alertNotifications.alertsLogbook';
  solveAll = 'theme.components.bapagetop.alertNotifications.solveAll';

  constructor( private router: Router ) { }

  ngOnInit() {
   
  }

  alertsLogs(){
    
    this.router.navigate([ '/', 'pages', 'monitoring-and-reaction', 'alerts-logbook']);
          
  }

}
