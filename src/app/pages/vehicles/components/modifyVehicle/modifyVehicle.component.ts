/**
 * Created by Tech Group BWL on 05/10/2018.
 */
import {Component, OnDestroy, OnInit, HostListener, ViewEncapsulation} from "@angular/core";
import {GridOptions} from "ag-grid";
import {TranslateService} from "@ngx-translate/core";
import {VehicleModifyVehicleService} from "./modifyVehicle.service";
import {Router} from "@angular/router";
@Component({
  selector: 'v-modify-vehicles-component.col-md-12',
  templateUrl: './modifyVehicle.component.html',
  styleUrls: ['./modifyVehicle.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VehiclesModifyVehicles implements OnInit, OnDestroy {

  // ---------- PRIVATE VARIABLES -----------
  private _vehicles: Array<any> = [];
  // ++++++++++ AG-GRID VARIABLES +++++++++++
  private _gridColumnApi: any;
  private _gridApi: any;

  private _gridOptions: GridOptions;
  private _columnDefs: Array<any> = [];
  private _rowSelection: string;
  private _customIcons: any = {
    sortAscending: '<i class="fa fa-caret-down"/>',
    sortDescending: '<i class="fa fa-caret-up"/>',
  };

  constructor(
    private _translate: TranslateService,
    private _service: VehicleModifyVehicleService,
    private _router: Router,
  ) {
    this._columnDefs = [
      {
        colId: 'economicNumber',
        headerName: "# Económico",
        field: "economicNumber",
        suppressSizeToFit: true,
        checkboxSelection: false,
        cellClass: ['motum-hover-name'],
        suppressMenu: true,
        // width: 150
      },
      {
        headerName: "Razón social",
        field: "businessName",
        suppressMenu: true,
        // width: 150
      },
      {
        headerName: "Distribuidor",
        field: "distributor",
        suppressMenu: true,
        // width: 150
      },
      {
        headerName: "Placas",
        field: "plates",
        suppressMenu: true,
        // width: 150
      }, {
        headerName: "VIN",
        field: "vin",
        suppressMenu: true,
        // width: 150
      }, {
        headerName: "Tipo",
        field: "type",
        suppressMenu: true,
        // width: 150
      }, {
        headerName: "Marca",
        field: "trademark",
        suppressMenu: true,
        // width: 150
      }, {
        headerName: "Modelo",
        field: "model",
        suppressMenu: true,
        // width: 150
      }, {
        headerName: "Año",
        field: "year",
        suppressMenu: true,
        // width: 150
      }
    ];

    this._gridOptions = <GridOptions>{};
    this._gridOptions.headerHeight = 47.58;
    this._gridOptions.animateRows = true;
    this._gridOptions.enableColResize = true;
    this._gridOptions.enableSorting = true;
    this._gridOptions.enableFilter = true;
    this._gridOptions.columnDefs = this._columnDefs;
    this._gridOptions.rowHeight = 47.58;

    this._rowSelection = "single";

    this._translate.get('pages.vehicles.modifyVehicle.columnHeaders')
      .subscribe(labelObject => {
        this.translateHeaderNames(labelObject);
      });
  }

  ngOnInit() {}

  ngOnDestroy() {}

  onGridReady(params) {
    this._gridColumnApi = params.columnApi;
    this._gridApi = params.api;

    this._service.retrieveVehicles()
      .subscribe(
        ({vehicles: veh}) => {
          this._vehicles = veh;
          if (this._gridOptions.api && this._vehicles){
            this._gridOptions.api.setRowData(this._vehicles);
          }
          setTimeout(() => {
            this.resizingColumns();
          }, 200);
        },
        err => {
          console.info(err);
          this._gridOptions.api.setRowData([]);
          this.resizingColumns();
          alert("An error: " + err._body.errors);
        }
      );
  }

  onCellClicked(col) {
    if (!col.data) return;

    console.info(col.data);
    if(col.column.colId === 'economicNumber') {
      this._router.navigate(['/', 'pages', 'vehicles', 'modify-vehicles', 'edit'])
        // .then(
        //   nav => {},
        //   err => {
        //     console.info(err);
        //     alert('It was not possible to go to selected route')
        //   }
        // );
    }
  }
  resizingColumns() {
    this._gridApi.sizeColumnsToFit();
  }

  translateHeaderNames(obj: any) {
    this._columnDefs[0].headerName = '#' + obj.economicNumber;
    this._columnDefs[1].headerName = obj.businessName;
    this._columnDefs[2].headerName = obj.distributor;
    this._columnDefs[3].headerName = obj.plates;
    this._columnDefs[4].headerName = obj.vin;
    this._columnDefs[5].headerName = obj.type;
    this._columnDefs[6].headerName = obj.trademark;
    this._columnDefs[7].headerName = obj.model;
    this._columnDefs[8].headerName = obj.year;

    this._gridOptions.columnDefs = this._columnDefs;
  }

  /**
   * The table needs to change its column size when width page changes
   * this method detects all changes on its size.
   *
   * @param event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this._gridApi) {
      setTimeout(() => {
        this.resizingColumns();
      }, 200);
    }
  }
}