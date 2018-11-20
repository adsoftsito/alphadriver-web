import { Component, OnInit, Input, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import {GridOptions} from "ag-grid";
import {ClientProductService} from "../../../../../pages/usersControl/components/clients/clients.service";
import { BreadCrumManual } from '../../../../../shared/providers/breadCrumbManual.service';
import { GlobalState } from '../../../../../global.state';
import {EventsService} from "../../../../../shared/providers/events";
import {Constants} from "../../../../../shared/providers/constants";
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'motum-alert-logs',
  templateUrl: './alertLogs.html',
  styleUrls: ['./alertLogs.scss']
})
export class AlertLogsComponent implements OnInit, AfterViewInit,OnDestroy {

    @Input() tabColor: string;
    @Input() alertData: Array<any>;
    
    gridOptions: GridOptions;
    gridColumnApi: any;
    gridApi: any;
    rowSelection: string;

    //buttons view table
    btnArray = [{
        label: 'Actual',
        selected: 'active'
      },
      {
        label: 'Bitácora',
        selected: ''
      }];
    visibleTable:string = 'current';

    columnDefs: any = [{
        headerName: "Folio",
        field: "folio",
        // suppressSizeToFit: true,
        suppressMenu: true,
        width: 100
    }, {
      headerName: "Subflota",
      field: "subflota",
      suppressMenu: true,
      width: 140
    }, {
        headerName: "Unidad",
        field: "unity",
        suppressMenu: true,
        width: 100
    }, {
        headerName: "Usuario",
        field: "user",
        suppressMenu: true,
        width: 100
    }, {
      headerName: "Centro",
      field: "center",
      suppressMenu: true,
      width: 100
    }, {
      headerName: "Proceso",
      field: "process",
      suppressMenu: true,
      width: 100
    }, {
      headerName: "Fecha y hora de evento",
      field: "dateTimeEvent",
      suppressMenu: true
    },{
        headerName: "Fecha y hora de atención",
        field: "dateTimeAttention",
        suppressMenu: true
    },{
        headerName: "Fecha y hora de Resolución",
        field: "dateTimeResolution",
        suppressMenu: true
     }, {
      headerName: "Criticidad",
      field: "review",
      suppressMenu: true,
      width: 100
    }, {
        headerName: "Alerta",
        field: "alert",
        suppressMenu: true
    }, {
        headerName: "Operador",
        field: "operator",
        suppressMenu: true,
        width: 100
    }, {
      headerName: "Comentario",
      field: "commentary",
      suppressMenu: true,
      width: 100
    }
    ];
    //translate
    translated:boolean = false;
    $subscriptionTranslateTable:Subscription;
    $subscriptionTranslate:Subscription
  constructor(
    private clientProductService :ClientProductService,
    private _service: BreadCrumManual,
    private _state:GlobalState, 
    private events: EventsService,
    private C: Constants,
    private _translate:TranslateService
  ) { 
    this.gridOptions = <GridOptions>{};
    this.translateHeaderTables();
    this.gridOptions.columnDefs = this.columnDefs;
    this.gridOptions.headerHeight = 40;
    this.gridOptions.animateRows = true;
    this.gridOptions.enableColResize = true;
    this.gridOptions.enableSorting = true;
    this.gridOptions.rowHeight = 36;
    this.rowSelection = "multiple";

    this.events.subscribe(this.C.EVENTS_SERVICE.LOG_ALERTS_RETURN_BUTTON_TOGGLE, (data) => {
    
    });

  }

  breadcrumbLabels= ['Menu.monitoringReaction', 'theme.components.bapagetop.alertNotifications.alertsLogbook'];

  ngOnInit() {
    this.$subscriptionTranslate = this._translate.get('pages.monitoringreaction.configuringAlerts').subscribe(
        res =>{
            this.btnArray[0].label = res.current;
            this.btnArray[1].label = res.binnacle;
        }
    )
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._service.generateManualRouting(this.breadcrumbLabels, [], [0,0], []);
    }, 500);
  }

  ngOnDestroy(){
      this.$subscriptionTranslateTable.unsubscribe();
  }

  translateHeaderTables(){
    this.$subscriptionTranslateTable = this._translate.get('pages.monitoringreaction.configuringAlerts.headerTable').subscribe(
        res =>
            {   
                this.columnDefs[0].headerName = res.folio;
                this.columnDefs[1].headerName = res.subfleet;
                this.columnDefs[2].headerName = res.unit;
                this.columnDefs[3].headerName = res.user;
                this.columnDefs[4].headerName = res.center;
                this.columnDefs[5].headerName = res.process;
                this.columnDefs[6].headerName = res.dateAndTimeOfEvent;
                this.columnDefs[7].headerName = res.dateAndTimeOfAttention;
                this.columnDefs[8].headerName = res.resolutiondateAndTime;
                this.columnDefs[9].headerName = res.criticity;
                this.columnDefs[10].headerName = res.alert;
                this.columnDefs[11].headerName = res.operator;
                this.columnDefs[12].headerName = res.comment;
                this.gridOptions.columnDefs = this.columnDefs;
                this.translated = true;
            }
        )
        
  }
  
   /**
     * The table needs to change its column size when width page changes
     * this method detects all changes on its size.
     *
     * @param event
     */
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (this.gridApi) {
            setTimeout(() => {
                this.gridApi.sizeColumnsToFit();
            }, 200);
        }
    }

  onGridReady(params) {
    this.gridColumnApi = params.columnApi;
        this.gridApi = params.api;
        
        let id = 'danger';
        this.clientProductService.retrieveDataForTableAlerts(id)
        .subscribe(
              res => {
                  const body = JSON.parse(res['_body']);
                  const dataToSetup: any = body.alerts;

                  if (this.gridOptions.api && dataToSetup) {
                    //   console.log(dataToSetup);
                      this.gridOptions.api.setRowData(dataToSetup);
                  }
                  setTimeout(() => {
                      console.info("Resize columns");
                      this.gridApi.sizeColumnsToFit();
                  }, 200);
              },
              err => {
                  console.info(err);
                  this.gridOptions.api.setRowData([]);
                  this.gridApi.sizeColumnsToFit();
                  alert("An error has occurred, check your browser console");
              }
          );
    }

    exportToExcel(){
        let params = {
            fileName: 'Alert_logs'
        };
        this.gridApi.exportDataAsExcel(params);
    }

}
