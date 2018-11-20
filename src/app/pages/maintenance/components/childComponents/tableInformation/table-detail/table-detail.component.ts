import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GridOptions, Grid } from 'ag-grid';


@Component({
  selector: 'motum-table-detail-component',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class TableDetailDinamicComponent implements OnInit {

  gridOptions:GridOptions;
  parentRecord:any;
  columnDefs:any;

  customIcons: any = {
    sortAscending: '<i class="fa fa-caret-down"/>',
    sortDescending: '<i class="fa fa-caret-up"/>',
  };


  constructor() {

    this.gridOptions =<GridOptions>{};
    this.gridOptions.enableSorting = true;
    this.gridOptions.enableFilter = true;
    this.gridOptions.enableColResize = true;
    this.gridOptions.headerHeight = 20.58;
    this.gridOptions.rowHeight = 26.58;
    this.gridOptions.animateRows = true;
  }

  ngOnInit() {
  }

  agInit(params:any){
    if(params) {
      this.parentRecord = params.node.parent.data;
      this.gridOptions.columnDefs = params.api.gridOptionsWrapper.gridOptions.rowData.columnDefsSoon;
    }
  }

  ngAfterViewInit(){
    this.gridOptions.api.setRowData(this.parentRecord.detail);
    this.gridOptions.api.sizeColumnsToFit();
  }

  onGridResize(){
    this.gridOptions.api.sizeColumnsToFit();
  }

}
