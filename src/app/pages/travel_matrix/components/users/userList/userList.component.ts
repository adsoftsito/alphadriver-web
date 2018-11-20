import { Component, OnInit } from '@angular/core';
import { ColumnApi, GridOptions } from 'ag-grid';
declare let google: any;
import { LicenseManager } from 'ag-grid-enterprise/main';

LicenseManager.setLicenseKey('26f908fcbd31ab5109aab8ba901fe020');
@Component({
  selector: 'user-list-component',
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.scss']
})

export class UserListComponent implements OnInit {
  gridOptions: GridOptions;
  gridColumnApi: any;
  isChecked: boolean = false;
  private columnApi: ColumnApi;
  widthTable: any;
  margin: number = 0.209;

  private gridApi;
    // specify the columns
  columnDefs = [
      {headerName: "Nombre", field: "car_name", suppressSizeToFit: true},
      {headerName: "Telefono", field: "phone"},
      {headerName: "Correo electrónico", field: "email"},
      {headerName: "Nombre de usuario", field: "username"},
      {headerName: "Rol", field: "role"},
      {headerName: "Status", field: "staus"},
  ];

    // specify the data
  rowData = [
      {car_name: "Toyota", phone: "Celica", email:"mi@bwl.com.mx", username: "username#1", role: "admin", status: true},
      {car_name: "Ford", phone: "Mondeo", email:"mi@bwl.com.mx", username: "username#2", role: "operator", status: false},
      {car_name: "Porsche", phone: "Boxter", email:"mi@bwl.com.mx", username: "username#3", role: "user", status: true},
      {car_name: "Porsche", phone: "Boxter", email:"mi@bwl.com.mx", username: "username#4", role: "out", status: false},
      {car_name: "Porsche", phone: "Boxter", email:"mi@bwl.com.mx", username: "username#5", role: "client", status: true},
      {car_name: "Porsche", phone: "Boxter", email:"mi@bwl.com.mx", username: "username#6", role: "admin", status: false},
      {car_name: "Toyota", phone: "Celica", email:"mi@bwl.com.mx", username: "username#1", role: "admin", status: true},
      {car_name: "Ford", phone: "Mondeo", email:"mi@bwl.com.mx", username: "username#2", role: "operator", status: false},
      {car_name: "Porsche", phone: "Boxter", email:"mi@bwl.com.mx", username: "username#3", role: "user", status: true},
      {car_name: "Porsche", phone: "Boxter", email:"mi@bwl.com.mx", username: "username#4", role: "out", status: false},
      {car_name: "Porsche", phone: "Boxter", email:"mi@bwl.com.mx", username: "username#5", role: "client", status: true},
      {car_name: "Toyota", phone: "Celica", email:"mi@bwl.com.mx", username: "username#1", role: "admin", status: true},
      {car_name: "Ford", phone: "Mondeo", email:"mi@bwl.com.mx", username: "username#2", role: "operator", status: false},
      {car_name: "Porsche", phone: "Boxter", email:"mi@bwl.com.mx", username: "username#3", role: "user", status: true},
      {car_name: "Porsche", phone: "Boxter", email:"mi@bwl.com.mx", username: "username#4", role: "out", status: false},
      {car_name: "Porsche", phone: "Boxter", email:"mi@bwl.com.mx", username: "username#5", role: "client", status: true},
      {car_name: "Toyota", phone: "Celica", email:"mi@bwl.com.mx", username: "username#1", role: "admin", status: true},
      {car_name: "Ford", phone: "Mondeo", email:"mi@bwl.com.mx", username: "username#2", role: "operator", status: false},
      {car_name: "Porsche", phone: "Boxter", email:"mi@bwl.com.mx", username: "username#3", role: "user", status: true},
      {car_name: "Porsche", phone: "Boxter", email:"mi@bwl.com.mx", username: "username#4", role: "out", status: false},
      {car_name: "Porsche", phone: "Boxter", email:"mi@bwl.com.mx", username: "username#5", role: "client", status: true},
      {car_name: "Toyota", phone: "Celica", email:"mi@bwl.com.mx", username: "username#1", role: "admin", status: true},
      {car_name: "Ford", phone: "Mondeo", email:"mi@bwl.com.mx", username: "username#2", role: "operator", status: false},
      {car_name: "Porsche", phone: "Boxter", email:"mi@bwl.com.mx", username: "username#3", role: "user", status: true},
      {car_name: "Porsche", phone: "Boxter", email:"mi@bwl.com.mx", username: "username#4", role: "out", status: false},
      {car_name: "Porsche", phone: "Boxter", email:"mi@bwl.com.mx", username: "username#5", role: "client", status: true},
      {car_name: "Toyota", phone: "Celica", email:"mi@bwl.com.mx", username: "username#1", role: "admin", status: true},
      {car_name: "Ford", phone: "Mondeo", email:"mi@bwl.com.mx", username: "username#2", role: "operator", status: false},
      {car_name: "Porsche", phone: "Boxter", email:"mi@bwl.com.mx", username: "username#3", role: "user", status: true},
      {car_name: "Porsche", phone: "Boxter", email:"mi@bwl.com.mx", username: "username#4", role: "out", status: false},
      {car_name: "Porsche", phone: "Boxter", email:"mi@bwl.com.mx", username: "username#5", role: "client", status: true},
  ];

  constructor() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.headerHeight = 43;
    this.gridOptions.animateRows = true;
    this.gridOptions.enableColResize = true;
    this.gridOptions.getRowNodeId = function(data) { return data.id; };
    this.gridOptions.enableSorting = true;
    this.gridOptions.columnDefs = this.columnDefs;
    this.gridOptions.rowData = this.rowData;

    this.widthTable = window.innerWidth - (window.innerWidth * this.margin);
    window.onresize = (e) => {
          this.widthTable = window.innerWidth - (window.innerWidth * this.margin);
          console.info(this.widthTable);
      };
  }

  onGridReady(params) {
     //  params.api.sizeColumnsToFit();
      this.gridColumnApi = params.columnApi;
      this.gridApi = params.api;
  }

  ngOnInit() {

  }

  // sizeToFit
    resizingColumns() {
      this.gridApi.sizeColumnsToFit();
    }

    autoSize() {
      alert("Hahaha, no hago nada");
    }

}
