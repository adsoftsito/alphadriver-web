import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { GridOptions, Grid } from 'ag-grid';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import {Router} from "@angular/router";
import {ClientProductService} from "../clients.service";
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Asset } from '../Asset';
import { Http, ResponseContentType } from '@angular/http';


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

  //heroes = HEROES;
  selectedHero: Asset;


  onSelect(hero: Asset): void {
    this.selectedHero = hero;
  }

  customIcons: any = {
    sortAscending: '<i class="fa fa-caret-down"/>',
    sortDescending: '<i class="fa fa-caret-up"/>',
  };

  translated :boolean = false;

  private $subscriptionTranslate:Subscription;

  @ViewChild('modalPhotos') modalPhotos : ElementRef;
  @ViewChild('modalSigns') modalSigns : ElementRef;
  @ViewChild('modalObs') modalObs : ElementRef;


  constructor(private _translate: TranslateService,
              private modalService:NgbModal, 
              private http : Http,
              private router: Router,
              private clientProductService :ClientProductService,

    ) { 
      /*
    this.columnDefs = [
      {
        field: "orderdetailproductdescription",
        headerName: "Producto",
        cellStyle:{'text-align':'center'},
        suppressMenu: true
       
      },
      {
        field: "orderdetaildescription", // 0
        headerName: "Partida",
        cellStyle:{'text-align':'center'},
        pinned:"left",
        suppressMenu:true
      },
      {
        field: "category",
        headerName: "Categoria",
        cellStyle:{'text-align':'center'},
        pinned:"left",
        suppressMenu:true
      },
      
      {
        field: "orderdetailproductquantity",
        headerName:"Cant",
        cellStyle:{'text-align':'center'},
        pinned:"right",
        suppressMenu: true,
        cellRenderer:(params)=>{
          if(params.value=='0')
          return '-';
          else//class="motum-i tm-ea00 
          return params.value;
        },
        width:100
      },
      {
        field: "orderdetailproductunitdescription",
        headerName:"Unidad",
        cellStyle:{'text-align':'center'},
        
        pinned:"right",
        suppressMenu: true,
        width:100
      },
      {
        colId:'firmas',
        field: "orderdetailproductunitid",
        headerName:"Firmas",
        cellStyle:{'text-align':'center'},
        cellClass:['cell-motum-hover-statusMotorStop'],        

        pinned:"right",
        suppressMenu: true,
        cellRenderer:(params)=>{
          return 'Firmas - '+ params.value;
        },
        width:150
      },
      {
        colId:'fotos',
        field: "orderdetailproductunitid",
        headerName:"Fotos",
        cellStyle:{'text-align':'center'},
        cellClass:['cell-motum-hover-statusMotorStop'],        

        pinned:"right",
        suppressMenu: true,
        cellRenderer:(params)=>{
          return 'Fotos - '+ params.value;
        },
        width:150
      },
      
      {
        colId:'obs',
        field: "orderdetailproductunitid",
        headerName:"Obs",
        cellStyle:{'text-align':'center'},
        cellClass:['cell-motum-hover-statusMotorStop'],        

        pinned:"right",
        suppressMenu: true,
        cellRenderer:(params)=>{
          return 'Obs - '+ params.value;
        },
        width:150
      },
      
      {
        colId:'codqr',
        field: "orderdetailproductunitid",
        headerName:"QR",
        cellStyle:{'text-align':'center'},
        cellClass:['cell-motum-hover-statusMotorStop'],        

        pinned:"right",
        suppressMenu: true,
        cellRenderer:(params)=>{
          return 'Cod QR - '+ params.value;
        },
        width:150
      },
      
      {
        colId:'codbarra',
        field: "orderdetailproductunitid",
        headerName:"Barra",
        cellStyle:{'text-align':'center'},
        cellClass:['cell-motum-hover-statusMotorStop'],        

        pinned:"right",
        suppressMenu: true,
        cellRenderer:(params)=>{
          return 'Cod Barras - '+ params.value;
        },
      
        width:150
      }

    ];
*/
this.columnDefs = [
  {
    field: "orderdetailproductdescription",
    headerName: "Producto",
    cellStyle:{'text-align':'center',
    'border': 'solid 1px #ECE7E6',
    'border-top': '1px solid #F1F1F1',
    'border-bottom': '1px solid #F1F1F1' 
   },
  suppressMenu: true
   
  },
  {
    field: "orderdetaildescription", // 0
    headerName: "Partida",
    cellStyle:{'text-align':'center',
    'border': 'solid 1px #ECE7E6',
    'border-top': '1px solid #F1F1F1',
    'border-bottom': '1px solid #F1F1F1' 
   },
pinned:"left",
    suppressMenu:true
  },
  {
    field: "category",
    headerName: "Categoria",
    cellStyle:{'text-align':'center',
    'border': 'solid 1px #ECE7E6',
    'border-top': '1px solid #F1F1F1',
    'border-bottom': '1px solid #F1F1F1' 
   },
  pinned:"left",
    suppressMenu:true
  },
    {
    field: "orderdetailproductquantity",
    headerName:"Cant",
    cellStyle:{'text-align':'center',
               'border': 'solid 1px #ECE7E6',
               'border-top': '1px solid #F1F1F1',
               'border-bottom': '1px solid #F1F1F1' 
              },
    width:100
  },
  {
    field: "orderdetailproductunitid",
    headerName:"Unidad",
    cellStyle:{'text-align':'center',
               'border': 'solid 1px #ECE7E6',
               'border-top': '1px solid #F1F1F1',
               'border-bottom': '1px solid #F1F1F1' 
              },
    suppressMenu: true,
    width:100
  },
  {
    colId:'firmas',
    field: "orderdetailproductunitid",
    headerName:"",
    cellStyle:{'text-align':'center'},
    cellClass:['cell-motum-hover-statusMotorStop'],        
  //  pinned:"right",
    
    suppressMenu: true,
    cellRenderer:(params)=>{
      return 'Firmas - '+ params.value;
    },
    width: 120
  },
  {
    colId:'fotos',
    field: "orderdetailproductunitid",
    headerName:"",
    cellStyle:{'text-align':'center'},
    cellClass:['cell-motum-hover-statusMotorStop'],        

//    pinned:"right",
    suppressMenu: true,
    cellRenderer:(params)=>{
      return 'Fotos - '+ params.value;
    },
    width: 120
  },
  
  {
    colId:'obs',
    field: "orderdetailproductunitid",
    headerName:"Pruebas de viaje",
    cellStyle:{'text-align':'center'},
    cellClass:['cell-motum-hover-statusMotorStop'],        

    //pinned:"right",
    suppressMenu: true,
    cellRenderer:(params)=>{
      return 'Obs - '+ params.value;
    },

  },
  
  {
    colId:'codqr',
    field: "orderdetailproductunitid",
    headerName:"",
    cellStyle:{'text-align':'center'},
    cellClass:['cell-motum-hover-statusMotorStop'],        

   // pinned:"right",
    suppressMenu: true,
    cellRenderer:(params)=>{
      return 'Cod QR - '+ params.value;
    },
    width: 130
  },
  
  {
    colId:'codbarra',
    field: "orderdetailproductunitid",
    headerName:"",
    cellStyle:{'text-align':'center'},
    cellClass:['cell-motum-hover-statusMotorStop'],        

   // pinned:"right",
    suppressMenu: true,
    cellRenderer:(params)=>{
      return 'Cod Barras - '+ params.value;
    },
    width: 140
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

  arrAssets:Array<any> = [
    new Asset(1, 'Carta Porte', '2018-11-13 10:15', 'https://blog.factura.com/wp-content/uploads/2016/01/carta-porte.png'),
    new Asset(2, 'Ticket de combustible', '2018-10-13 11:40', 'https://www.facturaticket.mx/wp-content/uploads/2017/05/ERFC-FACTURACION-TICKET.jpg'),
    //new Asset(3, 'Caseta', '2018-09-13 13:03'),
   // new Asset(4, 'Ticket de bascula', '2018-05-13 15:07')
  ];


  arrSigns:Array<any> = [
    new Asset(1, '2018-11-13 10:15 subido por ', 'Juan Perez (operador)', 'http://www.peritocaligrafojuancarlosgonzalez.com/images/firmas/bruce-springsteen.jpg'),
    new Asset(2, '2018-10-13 11:40 subido por ', 'Adolfo Centeno (operador)', 'https://www.laguiadelvaron.com/wp-content/uploads/2018/06/firma.jpg'),
    new Asset(3, '2018-09-13 13:03 subido por ', 'Alejandro Reyes (operador)', 'http://www.peritocaligrafojuancarlosgonzalez.com/images/firmas/bruce-springsteen.jpg'),
    new Asset(4, '2018-05-13 15:07 subido por ', 'Jesus Velez (operador)', 'https://www.laguiadelvaron.com/wp-content/uploads/2018/06/firma.jpg')
  ];


  arrObs:Array<any> = [
    new Asset(1, 'Rocio Sanchez, 2018-11-13 10:15 subido por Adolfo Centeno', 'el trafico esta muy lento por toma de caseta', ''),
    new Asset(2, 'Jesus Velez, 2018-11-13 10:15 subido por Adolfo Centeno', 'Accidente en tramo de tuneles en cumbres de maltrata', '')
    //new Asset(3, 'Alejandro Reyes, 2018-11-13 10:15 subido por Adolfo Centeno', 'Neblina densa en zona del puente de metlac'),
    //new Asset(4, 'Armando Lopez,  2018-11-13 10:15 subido por Adolfo Centeno', 'Accidente en curva de nogales altura de la laguna')
  ];

  myAsset:Asset;

  selectPhoto(asset)
  {
    this.myAsset = asset;

    console.log(asset.url);
    (<HTMLImageElement>document.getElementById('blah')).src=asset.url;

       
  }

  selectSign(asset)
  {
    this.myAsset = asset;

    console.log(asset.url);
    (<HTMLImageElement>document.getElementById('signs')).src=asset.url;

       
  }

  addSign()
  {
    console.log("adding ...");  
    this.arrSigns.push(
       new Asset(13, '2018-12-13 11:50 subido por ', 'Jesus Velez (operador)', 'https://www.laguiadelvaron.com/wp-content/uploads/2018/06/markzuck.jpg')
   
    );
  }

  addObs()
  {
    console.log("adding ...");  
    this.arrObs.push(
      new Asset(4, 'Armando Lopez,  2018-11-13 10:15 subido por Adolfo Centeno', 'Accidente en curva de nogales altura de la laguna', '')
   
    );
  }


  deleteSign()
  {
    console.log("deleting ..." + this.myAsset.name);  
    this.arrSigns = this.arrSigns.filter(x => x.name !== this.myAsset.name);
    this.url = "https://st3.depositphotos.com/15827064/18294/v/1600/depositphotos_182948478-stock-illustration-avatar-document-file-page-picture.jpg";
    (<HTMLImageElement>document.getElementById('signs')).src=this.url;

  }

  downloadFile() {
    return this.http
      .get('https://www.facturaticket.mx/wp-content/uploads/2015/07/Ticket-CAPUFE-FONADIN-2.png', {
        responseType: ResponseContentType.Blob,
        //search: // query string if have
      })
      .map(res => {
        return {
          filename: 'filename.jpg',
          data: res.blob()
        };
      })
      .subscribe(res => {
          console.log('start download:',res);
          var url = window.URL.createObjectURL(res.data);
          var a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url;
          a.download = res.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove(); // remove the element
        }, error => {
          console.log('download error:', JSON.stringify(error));
        }, () => {
          console.log('Completed file download.')
        });
  }
  
  addPhoto()
  {
    console.log("adding ...");  
    this.arrAssets.push(
      new Asset(3, 'Caseta', '2018-11-13 10:15', 'https://www.facturaticket.mx/wp-content/uploads/2015/07/Ticket-CAPUFE-FONADIN-2.png'),

    );
  }

  deletePhoto()
  {
    console.log("deleting ..." + this.myAsset.name);  
    this.arrAssets = this.arrAssets.filter(x => x.name !== this.myAsset.name);
    this.url = "https://st3.depositphotos.com/15827064/18294/v/1600/depositphotos_182948478-stock-illustration-avatar-document-file-page-picture.jpg";
    (<HTMLImageElement>document.getElementById('signs')).src=this.url;

  }

  // name = 'Angular 4';
  url = "https://st3.depositphotos.com/15827064/18294/v/1600/depositphotos_182948478-stock-illustration-avatar-document-file-page-picture.jpg";


  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      console.log("preview..." + event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (e:any) => {
        (<HTMLImageElement>document.getElementById('blah')).src=e.target.result 
        //assuming element with id blah will always be an ImageElement
      };
    }
  }


  onSelectSign(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      console.log("preview..." + event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (e:any) => {
        (<HTMLImageElement>document.getElementById('signs')).src=e.target.result 
        //assuming element with id blah will always be an ImageElement
      };
    }
  }

  ngOnDestroy(){
    this.$subscriptionTranslate.unsubscribe();
    console.log("des");
    
  }

  translateHeaderTable(){
    this.$subscriptionTranslate = this._translate.get('pages.monitoringreaction.patrimonial_security').subscribe(
      res => {
        /*
          this.columnDefs[0].headerName = "Partida"; //res.event;
          this.columnDefs[1].headerName = "Categoria"; //res.event;
          this.columnDefs[2].headerName = "Producto"; //res.date;
          this.columnDefs[3].headerName = "Cantidad"; //res.locationOrPointInterest;
          this.columnDefs[4].headerName = "Unidad"; //res.locationOrPointInterest;
          this.columnDefs[5].headerName = "Pruebas de viaje"; //res.locationOrPointInterest;
          this.columnDefs[6].headerName = "Cantidad"; //res.locationOrPointInterest;
          this.columnDefs[7].headerName = "Unidad"; //res.locationOrPointInterest;
          this.columnDefs[8].headerName = "Pruebas de viaje"; //res.locationOrPointInterest;

*/
          this.gridOptions.columnDefs = this.columnDefs;
          this.translated = true;
      }
      );
      
  }

  agInit(params:any){
    console.log("data detail: " + JSON.stringify(params.node.parent.data));
    this.parentRecord = params.node.parent.data;
  }

  ngAfterViewInit(){
    //console.log("route details: " + JSON.stringify(this.parentRecord.route_details));
    console.log("route details: " + JSON.stringify(this.parentRecord.orderdetail));
    
    //this.gridOptions.api.setRowData(this.parentRecord.route_details);
    this.gridOptions.api.setRowData(this.parentRecord.orderdetail);
    
    this.gridOptions.api.sizeColumnsToFit();
  }

  private onGridResize(){
    this.gridOptions.api.sizeColumnsToFit();
  }


  /**
     * Method to show client form to create a clientProduct
     */
  createClientProduct() {
      this.router.navigate(['/', 'pages', 'travel_matrix', 'clients-products','upload-photo']).then(nav => {
    
      setTimeout(() => {
             this.clientProductService.createClientProduct();
           }, 200);
          }, err => {
            console.log(err) // when there's an error
            console.log('error router');
        });
  }

  createClientPhotos() {
    //  this.router.navigate(['/', 'pages', 'travel_matrix', 'clients-products','create']).then(nav => {
      this.router.navigate(['/', 'pages', 'travel_matrix', 'clients-products','upload-photo']).then(nav => {
    
      setTimeout(() => {
             this.clientProductService.createClientProduct();
           }, 200);
          }, err => {
            console.log(err) // when there's an error
            console.log('error router');
        });
  }

  createClientObs() {
    //  this.router.navigate(['/', 'pages', 'travel_matrix', 'clients-products','create']).then(nav => {
      this.router.navigate(['/', 'pages', 'travel_matrix', 'clients-products','upload-obs']).then(nav => {
    
      setTimeout(() => {
             this.clientProductService.createClientProduct();
           }, 200);
          }, err => {
            console.log(err) // when there's an error
            console.log('error router');
        });
  }
  /**
   * Get information about the selected vehicle, from the current or binnacle table
   * @param event 
   */
  onCellClicked(event){
    console.log("selected adsoft..." + event.rowIndex);
   // console.log("selected data..." + JSON.stringify(event.data.route_details));
   // console.log("selected data..." + JSON.stringify(event.data.orderdetail));
    //alert("hola ...");
  //  if(event.column.colId == 'firmas'&& event.data != null && event.data !== undefined){
        
          /*
          let authorized = this.isAuthorizedUser();
        console.log("authorized..." + authorized);
    
        authorized = true;
        
        if(authorized){ 
          
          this.rowSelected = this.data[event.rowIndex];        
          this.selectedOneItem.emit(this.rowSelected);
          console.log(this.data[event.rowIndex]);
        }
        else{
          this.selectedOneItem.emit([]);
        }*/

      if(event.column.colId == 'firmas'){
        //alert("firmas");
        this.createClientProduct();
/*
        const modalRef = this.modalService.open(this.modalSigns, { size: 'sm' , keyboard: true, windowClass: 'motum-modal-confirm', backdrop: true });
        modalRef.result.then((userResponse) => {
          if(userResponse) {
          }
        }); */

      }

      if(event.column.colId == 'fotos'){
        this.createClientPhotos();

       /*
       const modalRef = this.modalService.open(this.modalPhotos, { size: 'lg' , keyboard: true, windowClass: 'motum-modal-confirm', backdrop: true });
       modalRef.result.then((userResponse) => {
         if(userResponse) {
         }
       });*/
      }

      if(event.column.colId == 'obs'){
        //this.createClientObs();

       const modalRef = this.modalService.open(this.modalObs, { size: 'lg' , keyboard: true, windowClass: 'motum-modal-confirm', backdrop: true });
       modalRef.result.then((userResponse) => {
         if(userResponse) {
         }
       });
      }
    }

}
