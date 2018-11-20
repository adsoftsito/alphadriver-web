import { Component, OnInit, ViewEncapsulation, OnDestroy} from '@angular/core';
import { GridOptions, Grid } from 'ag-grid';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'motum-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class TableDetailComponent implements OnInit, OnDestroy{

  gridOptions:GridOptions;
  parentRecord:any;
  columnDefs:any;

  customIcons: any = {
    sortAscending: '<i class="fa fa-caret-down"/>',
    sortDescending: '<i class="fa fa-caret-up"/>',
  };

  translated :boolean = false;

  private $subscriptionTranslate:Subscription;

  constructor(private _translate: TranslateService) { 
    this.columnDefs = [
      {
        field: "date",
        headerName: "Fecha",
        cellStyle:{'text-align':'center'},
        suppressMenu: true,
        cellRenderer: (params) => {
          return params.value +' h';
        }
      },
      {
        field: "event",
        headerName: "Evento",
        cellStyle:{'text-align':'center'},
        pinned:"left",
        suppressMenu:true
      },
      {
        field: "locationOrPointInterest",
        headerName:"Ubicación o punto de interés",
        cellStyle:{'text-align':'center'},
        pinned:"right",
        suppressMenu: true,
        width:450
      }
    ];

    this.gridOptions =<GridOptions>{};
    this.translateHeaderTable();
    this.gridOptions.enableSorting = true;
    this.gridOptions.enableFilter = true;
    this.gridOptions.enableColResize = false;
    this.gridOptions.columnDefs = this.columnDefs; 
    this.gridOptions.headerHeight = 20.58;   
    this.gridOptions.rowHeight = 26.58;
    this.gridOptions.animateRows = true;
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.$subscriptionTranslate.unsubscribe();
    console.log("des");
    
  }

  translateHeaderTable(){
    this.$subscriptionTranslate = this._translate.get('pages.monitoringreaction.patrimonial_security').subscribe(
      res => {
          this.columnDefs[0].headerName = res.event;
          this.columnDefs[1].headerName = res.date;
          this.columnDefs[2].headerName = res.locationOrPointInterest;
          this.gridOptions.columnDefs = this.columnDefs;
          this.translated = true;
      }
      );
      
  }

  agInit(params:any){
    this.parentRecord = params.node.parent.data;
  }

  ngAfterViewInit(){
    this.gridOptions.api.setRowData(this.parentRecord.detail);
    this.gridOptions.api.sizeColumnsToFit();
  }

  private onGridResize(){
    this.gridOptions.api.sizeColumnsToFit();
  }

}
