import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {

  @Output() openDashboard = new EventEmitter<any>();

  @Input() currentTitleDashboard: string;
  @Input() currentSubtitleDashboard: string;
  
  constructor() { }

  ngOnInit() {
    $( document ).ready( function () {
        $( '.dropdown-menu a, .dropdown-menu i' ).on( 'click', function ( e ) {
            return false;
        } );
    } );
  }

  changeDashboard(event){
    this.openDashboard.emit(event);
  }
  
}
