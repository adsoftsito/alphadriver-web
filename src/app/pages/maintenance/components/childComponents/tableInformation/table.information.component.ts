import { Component, ViewEncapsulation, OnDestroy, OnInit, HostListener, Input, ViewChild,
  AfterViewInit, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { GridOptions } from "ag-grid";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router,ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { timeout } from "rxjs/operator/timeout";
import { Subscription } from 'rxjs/Subscription';
import { TableDetailDinamicComponent } from './table-detail';
import { LicenseManager } from 'ag-grid-enterprise/main';
import  'ag-grid-enterprise';
LicenseManager.setLicenseKey('Evaluation_License_Valid_Until__8_December_2018__MTU0NDIyNzIwMDAwMA==50dff8a63bb1a234bae7d0bf98e1be3a');
/**
* Created by Tech Group BWL on 30/05/2018.
*/


@Component({
  selector: 'motum-table-information-component',
  templateUrl: './table.information.component.html',
  styleUrls: ['./table.information.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableInformationComponent implements OnDestroy, OnInit, AfterViewInit, OnChanges {
@Input() table;
@Input() heightVh;
@Input() pagination = false;
@Input() animateRows = false;
@Input() enableFilter = false;
@Input() enableExport = false;
@Input() enableUpdate = false;
@Input() enableCalendar = false;

@Output() onRowClick = new EventEmitter();
@Output() onCellClick = new EventEmitter();
@Output() updateData = new EventEmitter();
@Output() filterCalendar = new EventEmitter();

/** TABLE PROPERTIES **/
gridOptions: GridOptions;
rowSelectNow: number;
rowSelection: string;
gridColumnApi: any;
gridApi: any;
totalRows: any;

columnDefs: any;
rowData: any;
tableTitle: any;

recordsCount: any;
$subcriptionTranslateGeneral:Subscription;

/* calendar table vars*/
selectedRangeTable      : any;
selectedOptionTable     : any;
showCalendarModalTable  : boolean   = false;
calendarLabelTable      : string    = "Últimos 7 días";


constructor(private translate: TranslateService, private cdr: ChangeDetectorRef ) {
  this.gridOptions = <GridOptions>{};
  this.gridOptions.headerHeight = 38.58;
  this.gridOptions.enableColResize = true;
  this.gridOptions.enableSorting = false;
  this.gridOptions.rowHeight = 38.58;
}

ngAfterViewInit() {
}

/** LIFECYCLE ANGULAR METHODS **/
ngOnInit() {
  this.$subcriptionTranslateGeneral = this.translate.get('general.recordsCount').subscribe(
    res => {
      this.recordsCount = res;
    });
}

ngOnDestroy(){
  this.$subcriptionTranslateGeneral.unsubscribe();
}

/** TABLE METHODS **/
onGridReady(params?: any) {
  if(params) {
    this.gridColumnApi = params.columnApi;
    this.gridApi = params.api;
  }
  if (this.gridOptions.api && this.table) {
    this.columnDefs = this.table.header;
    this.rowData = this.table.content;
    this.tableTitle = this.table.title;
    for (let i = 0; i < this.columnDefs.length; i++) {
        this.columnDefs[i].suppressMenu = true;
    }
  }
  setTimeout(() => {
    this.gridOptions.api.hideOverlay();
    this.gridApi.sizeColumnsToFit();
    if (this.pagination) {
      this.totalRows = this.rowData.length;
    }
  }, 200);
}

onRowClicked(event) {
  this.onRowClick.emit(event);
}

onCellClicked (event) {
  this.onCellClick.emit(event);
}

update() {
  this.updateData.emit(true);
}

ngOnChanges(changes: SimpleChanges) {
if (changes['table'] !== null) {
    this.onGridReady();
   }
 }

getFullWidthCellRenderer() {
   return TableDetailDinamicComponent;
}

isFullWidthCell(rowNode) {
  return rowNode.level === 1;
}

getRowHeight(params) {
  let rowIsDetailRow = params.node.level === 1;
  // return 100 when detail row, otherwise return 25
  return rowIsDetailRow ? 192 : 40.58;
}

getNodeChildDetails(record) {
    if (record.detail) {
       return {
           group: true,
           // provide ag-Grid with the children of this group
           children: [record.detail],
           // for  expand the third row by default
           //expanded: record.detail.length == 6
       };
   } else {
       return null;
   }
}

exportToExel() {
  let title = 'Reporte';
  if(this.tableTitle) title = this.tableTitle;
  let params = {
    fileName: title
  }
  this.gridApi.exportDataAsExcel(params);
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

/* Calendar  methods - Table */
getSelectedOptionTable(event){
    this.selectedOptionTable = event;
    this.cdr.detectChanges();
}

getSelectedRangeTable(event){
    this.selectedRangeTable = event;
    this.cdr.detectChanges();
    this.filterCalendar.emit(event);
}

showCalendarTable(){
    this.showCalendarModalTable = true;
    this.cdr.detectChanges();

}

getCalendarLabelTable(event){
    this.calendarLabelTable = event;
    this.cdr.detectChanges();
}

modalClosedTable(){
    this.showCalendarModalTable = false;
}
}
