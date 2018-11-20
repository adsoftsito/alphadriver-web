import {Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation, EventEmitter} from '@angular/core';
import { GridsterConfig, GridsterItem} from 'angular-gridster2';
import {ChangeSpaceColsAndRowsService} from "../../shared/providers/changeSpaceColsAndRows.service";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
      trigger('togglingMenu', [
          state('in', style({ opacity: 1, transform: 'translateX(0)' })),
          transition('void => *', [
              style({
                  transform: 'translateX(-100%)',
              }),
              animate('0.4s ease'),
          ]),
          transition('* => void', [
              animate('0.4s ease-out', style({ transform: 'translateX(-100%)' })),
          ]),
      ]),
  ]
 
})
export class Dashboard implements OnInit {
  
  configDashboard: GridsterConfig;
  configDirectiveDashboard: GridsterConfig;
  dashboardItems: Array<GridsterItem>;
  directiveDashboardItems: Array<GridsterItem>;
  idChartDrag: any;
  itemAdd: number;
  menuDashlet: boolean = false;
  bandera: boolean = false;
  showTemplates: boolean = false;
  showGroupUse: boolean = true;
  showDashboard: boolean = false;
  titleDashboard: string;
  subtitleDashboard: string;
 

  myClass:String;
  dataDashlet: Array<any>;
  dataDirective: Array<any>;
  groupUseData: Array<any>;

  MR_HTML_CLASSES: any;
  @Input() eventoBottun: EventEmitter<any> = new EventEmitter<any>()


  /*
  * configuracion del floatButton
  * */
  configFloatButton:any;


  constructor(private serviceColsAndRows:ChangeSpaceColsAndRowsService) {
   
    this.MR_HTML_CLASSES = this.serviceColsAndRows.MR_HTML_CLASSES;
    
  }

  ngOnInit(){
    this.configDashboard = {
      pushItems: true,
      swap: false, //intercambiar elementos
      minCols: 6, //numero minimo de columnas permitidas
      maxCols: 10, //numero maximo de columnas permitidas 
      minRows: 4, //numero minimo de filas permitidas
      maxRows: 8, //numero maximo de filas permitidas
      margin: 30, //margen entre cada gridster-item
      outerMargin: true, //true para poner los 4 margenes de abajo
      outerMarginTop: 2, //margen superior del contenedor gridster
      outerMarginRight: 2, //margen derecho del contenedor gridster
      outerMarginBottom: 2, //margen inferior del contenedor gridster
      outerMarginLeft: 2, //margen izquierdo del conteedor gridster
      enableEmptyCellDrop: true,
     // emptyCellDropCallback: this.emptyCellClick.bind(this),
      draggable: {
        delayStart: 0,
        enabled: true,
        ignoreContentClass: 'gridster-item-content',
        ignoreContent: false,
        dragHandleClass: 'drag-handler',
        //stop: DragComponent.eventStop,
        //start: DragComponent.eventStart,
        //dropOverItems: false,
        //dropOverItemsCallback: DragComponent.overlapEvent,
      },
      resizable: {
        enabled: true 
      }
    }
    this.configDirectiveDashboard = {
      pushItems: true,
      swap: false, //intercambiar elementos
      minCols: 3, //numero minimo de columnas permitidas
      maxCols: 4, //numero maximo de columnas permitidas 
      minRows: 2, //numero minimo de filas permitidas
      maxRows: 8, //numero maximo de filas permitidas
      margin: 30, //margen entre cada gridster-item
      outerMargin: true, //true para poner los 4 margenes de abajo
      outerMarginTop: 2, //margen superior del contenedor gridster
      outerMarginRight: 2, //margen derecho del contenedor gridster
      outerMarginBottom: 2, //margen inferior del contenedor gridster
      outerMarginLeft: 2, //margen izquierdo del conteedor gridster
      enableEmptyCellDrop: true,
     // emptyCellDropCallback: this.emptyCellClick.bind(this),
      draggable: {
        delayStart: 0,
        enabled: true,
        ignoreContentClass: 'gridster-item-content',
        ignoreContent: false,
        dragHandleClass: 'drag-handler',
        //stop: DragComponent.eventStop,
        //start: DragComponent.eventStart,
        //dropOverItems: false,
        //dropOverItemsCallback: DragComponent.overlapEvent,
      },
      resizable: {
        enabled: true 
      }
    }



    this.dashboardItems = [
      {cols: 2, rows: 2},
      {cols: 2, rows: 2},
      {cols: 2, rows: 2},
      {cols: 2, rows: 2},
      {cols: 2, rows: 2},
      {cols: 2, rows: 2}
    ];
    this.directiveDashboardItems = [
      {cols: 2, rows: 2},
      {cols: 2, rows: 2},
      {cols: 2, rows: 2},
      {cols: 2, rows: 2},
      {cols: 2, rows: 2},
      {cols: 2, rows: 2}
    ];

    

    this.dataDashlet = [
      {
        titleHeader: 'Tiempo PTO (porcentaje)',
        title: 'THEXPRESS',
        subtitle: ''
      },
      {
        titleHeader: 'Indicador Kilometraje (Km)',
        title: 'DAIMLER',
        subtitle: 'Total: 576'
      },
      {
        titleHeader: 'Dist Normal Rend (Km/l)',
        title: 'DAIMLER',
        subtitle: ''
      },
      {
        titleHeader: 'Combustible consumido (l)',
        title: 'DAIMLER',
        subtitle: 'Total: 389'
      },
      {
        titleHeader: 'Dist Normal Rend (Km/l)',
        title: 'DAIMLER',
        subtitle: ''
      },
      {
        titleHeader: 'Combustible consumido (l)',
        title: 'DAIMLER',
        subtitle: 'Total: 389'
      }
    ];

    this.dataDirective = [
      {
        type: 'pie',
        title: 'ATR',
        subtitle: 'Indicador Kilometraje (Km)',
        titleChart: '9,402.17',
        titleValues: 105,
        labelChar1: 'Utilización de la flota',
        labelChar2: 'Prom Km recorridos',
        data: [ {
          title: '70010343',
          value: 101.11
        }, {
          title: '70005975',
          value: 135
        }, {
          title: '70011042',
          value: 128.5
        }, {
          title: '70005929',
          value: 113.56
        }, {
          title: '70014911',
          value: 115
        }, {
          title: '70014911',
          value: 128.3
        }, {
          title: '70011042',
          value: 120
        }, {
          title: '70014911',
          value: 66.89
        }, {
          title: '70005975',
          value: 100
        }, {
          title: '70011042',
          value: 80.78
        }, {
          title: '70014911',
          value: 60.79
        }, {
          title: '70005975',
          value: 120.56
        } ]
      },
      {
        type: 'card',
        title: '',
        colorHeader: '#1C87BB',
        subtitle: 'Alertas Security',
        dataCard: [
          {
            title: 'Botón de pánico',
            content: 'Sin atender',
            quantity: 5,
            total: 5
          },
          {
            title: 'Inhibidor de GPS',
            content: 'Sin atender',
            quantity: 3,
            total: 5
          },
          {
            title: 'Desvío de ruta',
            content: 'Sin atender',
            quantity: 4,
            total: 5
          },
          {
            title: 'Paro de motor Activado',
            content: 'Sin atender',
            quantity: 5,
            total: 8
          },
          {
            title: 'Motum desconectado',
            content: 'Sin atender',
            quantity: 1,
            total: 1
          }
        ]
      },
      {
        type: 'serial',
        title: 'ATR',
        subtitle: 'Combustible consumido (l)',
        titleChart: '9,402.17',
        titleValues: 105,
        labelChar1: 'Combustible en la flota',
        labelChar2: 'Descargas de combustible',
        data: [ {
          title: '1972',
          value: 10
      }, {
          title: '1973',
          value: 13
      }, {
          title: '1974',
          value: 16
      }, {
          title: '1975',
          value: 17
      }, {
          title: '1976',
          value: 18
      }, {
          title: '1977',
          value: 16
      }, {
          title: '1978',
          value: 14
      } ]
      },
      {
        type: 'card',
        title: '',
        colorHeader: '#30CED0',
        subtitle: 'Alertas Safety',
        dataCard: [
          {
            title: 'Exceso de velocidad',
            content: 'Sin atender',
            quantity: 14,
            total: 14
          },
          {
            title: 'Acelearación súbita',
            content: 'Sin atender',
            quantity: 40,
            total: 6
          },
          {
            title: 'Parada no autorizada',
            content: 'Sin atender',
            quantity: 9,
            total: 10
          },
          {
            title: 'Estadía en cliente',
            content: 'Sin atender',
            quantity: 8,
            total: 10
          },
          {
            title: 'Control de fatiga',
            content: 'Sin atender',
            quantity: 5,
            total: 8
          }
        ]
      },
      {
        type: 'pie',
        title: 'ATR',
        subtitle: 'Mantenimiento',
        titleChart: '',
        titleValues: 105,
        labelChar1: 'Promedio de estancia en taller',
        labelChar2: 'Mantenimiento vencidos',
        data: [{
          title: 'Stop Now',
          value: 10
        }, {
          title: 'Service Now',
          value: 84
        }, {
          title: 'Service Soon',
          value: 70
        }, {
          title: 'Information only',
          value: 70
        }, {
          title: 'Sin definir',
          value: 139
        }]
      },
      {
        type: 'serial',
        title: 'ATR',
        subtitle: 'Up Time posicionamiento',
        labelChar1: 'Sin posicion',
        
        data: [ {
          title: 'Matenimiento',
          value: 5
      }, {
          title: 'Robadas',
          value: 3
      }, {
          title: 'Revisión',
          value: 8
      }, {
          title: 'Sin batería',
          value: 2
      }]
      }
    ];

    this.groupUseData = [
      {
        title: 'Tendencia Kilometraje (Km)',
        type: 'serial',
        dataChart: [
          {
            year: 'Lunes 17',
            norte: 13000,
            sur: 11000,
            bajio: 15000
        }, {
            year: 'Martes 18',
            norte: 15000,
            sur: 11500,
            bajio: 11000
        }, {
            year: 'Miércoles 19',
            norte: 9000,
            sur: 8000,
            bajio: 13000
        }, {
            year: 'Jueves 20',
            norte: 7000,
            sur: 9000,
            bajio: 12000
        },{
          year: 'Viernes 21',
          norte: 13000,
          sur: 9000,
          bajio: 10000
      }, {
          year: 'Sábado 22',
          norte: 4000,
          sur: 13000,
          bajio: 9000
      },{
        year: 'Domingo 23',
        norte: 3000,
        sur: 9000,
        bajio: 13000
      }
      
        ]
      },
      {
        title: 'Top 5 Km recorridos',
        type: 'bar',
        dataChart: [
          {
            time: 'Lunes 17',
            norte: 5,
            sur: 5,
            bajio: 9
        }, {
            time: 'Martes 18',
            norte: 4,
            sur: 2,
            bajio: 3
        }, {
            time: 'Miércoles 19',
            norte: 6,
            sur: 6,
            bajio: 4
        }, {
            time: 'Jueves 20',
            norte: 7,
            sur: 4,
            bajio: 1
        }, {
          time: 'viernes 21',
          norte: 7,
          sur: 4,
          bajio: 1
        }, {
          time: 'Sábado 22',
          norte: 7,
          sur: 4,
          bajio: 1
        }, {
          time: 'Domingo 23',
          norte: 7,
          sur: 4,
          bajio: 1
        }
        ]
      },
      {
        title: 'Conteo de kilometraje por grupo',
        dataTable: [
          {
            group: 'CENTRALBAJIO_ZN',
            km: 5000,
            vehicle: 60,
            total: 120
          }, {
              group: 'CENTROSUR_ZN',
              km: 38563,
              vehicle: 60,
              total: 115
          }, {
              group: 'NORTE_ZN',
              km: 36985,
              vehicle: 10,
              total: 15
          }, {
            group: 'NORTE_ZN',
            km: 36985,
            vehicle: 10,
            total: 15
          },
          {
            group: 'CENTRALBAJIO_ZN',
            km: 5000,
            vehicle: 60,
            total: 120
          }, {
              group: 'CENTROSUR_ZN',
              km: 38563,
              vehicle: 60,
              total: 115
          }, {
              group: 'NORTE_ZN',
              km: 36985,
              vehicle: 10,
              total: 15
          }, {
            group: 'NORTE_ZN',
            km: 36985,
            vehicle: 10,
            total: 15
          },{
            group: 'CENTRALBAJIO_ZN',
            km: 5000,
            vehicle: 60,
            total: 120
          }, {
              group: 'CENTROSUR_ZN',
              km: 38563,
              vehicle: 60,
              total: 115
          }, {
              group: 'NORTE_ZN',
              km: 36985,
              vehicle: 10,
              total: 15
          }, {
            group: 'NORTE_ZN',
            km: 36985,
            vehicle: 10,
            total: 15
          },{
            group: 'CENTRALBAJIO_ZN',
            km: 5000,
            vehicle: 60,
            total: 120
          }, {
              group: 'CENTROSUR_ZN',
              km: 38563,
              vehicle: 60,
              total: 115
          }, {
              group: 'NORTE_ZN',
              km: 36985,
              vehicle: 10,
              total: 15
          }, {
            group: 'NORTE_ZN',
            km: 36985,
            vehicle: 10,
            total: 15
          },
          {
            group: 'CENTRALBAJIO_ZN',
            km: 5000,
            vehicle: 60,
            total: 120
          }, {
              group: 'CENTROSUR_ZN',
              km: 38563,
              vehicle: 60,
              total: 115
          }
          
        ]
      }
    ]

    this.configFloatButton = {
      "listTitle":[
       { id:1 , "title": "pages.dashboard.floatbutton.received"},
       { id:2,  "title": "pages.dashboard.floatbutton.mytemplates"},
       { id:3,  "title": "pages.dashboard.floatbutton.template"}
      ],
      "iconoCambio": "ion-close-round",
      "icono": "motum-i tm-e9a3",
      "direccion": "left"
    };



  }

  eventButton(event){
    this.eventoBottun= event;
  }

  
  onItemDrop(e: any){
    if(e.dragData.id == 1 || e.dragData.id == 2 || e.dragData.id == 3 || e.dragData.id == 4){
      this.itemAdd = this.addWidget();
        this.idChartDrag = e.dragData.id;
      }
  }

  addWidget(){
    this.dataDashlet.push({
      titleHeader: 'Combustible consumido (l)',
      title: 'DAIMLER',
      subtitle: 'Total: 389'
    });
    this.dashboardItems.push({cols: 2, rows: 2});
    return this.dashboardItems.length-1;
  }

  deleteItemGridster($event){
    this.dashboardItems.splice(this.dashboardItems.indexOf($event), 1);
  }

  buttonCloseOpen(event){
    this.showTemplates = event;
  }

  openTemplate(event){
    if(event.id === 2){
      this.showTemplates = true;
    }
  }

  dashletDetails(event){
    this.showGroupUse = event;
  }

  openDashboard(event){
    this.showDashboard = event;
    this.showGroupUse = !event;

  }


}
