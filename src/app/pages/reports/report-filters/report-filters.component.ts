import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { ReportsService } from '../reports.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FiltroSeleccionModal } from '../../Componente_Arbol/filtro-seleccion/filtro-seleccion-modal.component';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-report-filters',
  templateUrl: './report-filters.component.html',
  styleUrls: ['./report-filters.component.css'],
})

export class ReportFiltersComponent implements OnInit, OnDestroy, DoCheck {

  @Input() retrivedPath: string;
  @Input() title: string;

  @ViewChild('inputYearModel') inputYearModel: ElementRef;
  // Filtros para reporte
  yearModel: number;
  inputVehicleModel: string;
  inputFleetModel: string;
  selectMountModel: number;
  selectWeekModel: string;
  alertReason: string;
  alertsucess: string;
  drivers: any;
  selectOperadorModel: number;
  oldValue: string;
  // Control de la vista de reportes
  reportOperatorConduct: boolean = false;
  reportVehicleConduct: boolean = false;
  reportVehicleSecurity: boolean = false;
  reportOperatorSecurity: boolean = false;
  reportFleetConduct: boolean = false;

  // control de datos para generar reportes
  filterData: string = '';
  dataReport: any;

  // Estructura para generar la consulta al web services
  filtro: any = {
    'fleets': [{ 'lang': 'es', 'fleet': 'hesatecnica', 'mainFleet': 'hesa' },
    { 'fleet': 'tamsa2', 'mainFleet': 'tamsa' }],
    'units': [{ 'economic': 'PT9013', 'fleet': 'HESA' }],
    'drivers': [{ 'driverId': 159846 }], 'year': 2017, 'month': 7, 'week': 2
  };

  // Definición para los meses
  months = [{ id: 1, name: 'Enero' }, { id: 2, name: 'Febrero' },
  { id: 3, name: 'Marzo' }, { id: 4, name: 'Abril' },
  { id: 5, name: 'Mayo' }, { id: 6, name: 'Junio' },
  { id: 7, name: 'Julio' }, { id: 8, name: 'Agosto' },
  { id: 9, name: 'Septiembre' }, { id: 10, name: 'Octubre' },
  { id: 11, name: 'Noviembre' }, { id: 12, name: 'Diciembre' }
];

// Variable para almacenar las semanas mostradas en el filtro para el usuario
weeks = [];
// Control para cerrar la alerta de error
staticAlertClosed = false;
staticAlertsucess = false;
private observableYearInput: any;

constructor(private reportsService: ReportsService, private modalService: NgbModal,
  private translate: TranslateService) {}

  ngDoCheck() {
    if (this.title !== this.oldValue) {
      this.reportOperatorConduct = false;
      this.reportVehicleConduct = false;
      this.reportVehicleSecurity = false;
      this.reportOperatorSecurity = false;
      this.reportFleetConduct = false;
      this.clearFilters();
      this.oldValue = this.title;
    }
  }

  ngOnInit () {
    const dateTemp = new Date();
    this.yearModel = dateTemp.getFullYear();
    this.observableYearInput = Observable
    .fromEvent(this.inputYearModel.nativeElement, 'keyup')
    .debounceTime(200)
    .distinctUntilChanged()
    .subscribe(res => {
      const year: any = this.inputYearModel.nativeElement.value;
      if (!this.reportsService.isNumericString(+this.inputYearModel.nativeElement.value)) {
        this.inputYearModel.nativeElement.value = '';
        return;
      }
      if (!this.reportsService.isValidYear(year)) {
        this.weeks = [];
        return;
      }
      if (this.selectMountModel) {
        this.weeks = this.reportsService
        .getListWeeksInMonth(year, this.selectMountModel);
        return;
      }
      this.weeks = this.reportsService.getListWeeksInYear(+year);
      this.selectMountModel = 1;
      this.onSelectedMount();
    });
    this.reportsService.getOperators()
    .subscribe(info => {
      this.drivers = info;
    });
  }

  ngOnDestroy () {
  }

  onSelectedMount () {
    this.weeks = [];
    const year = this.inputYearModel.nativeElement.value;
    if (this.selectMountModel === undefined) {
      return;
    }

    if (!this.reportsService.isValidYear(year)) {
      this.weeks = [];
      return;
    }
    this.weeks = this.reportsService
    .getListWeeksInMonth(year, this.selectMountModel);

  }

  hiddeFunction() {
    setTimeout(() => this.staticAlertClosed = false, 1800);
  }
  hiddeFunctionSucess() {
    setTimeout(() => this.staticAlertsucess = false, 2000);
  }

  filterSelectList(selectListId) {
    // console.info(selectListId);
    // console.info(selectListId.id);
      if (selectListId !== null) {
        this.staticAlertsucess = true;
        this.alertsucess = 'Operador seleccionado';
        this.hiddeFunctionSucess();
        this.selectOperadorModel = selectListId.id;
      }
    }

  startReport() {
    const year: any = this.inputYearModel.nativeElement.value;
    this.alertReason = '';

    if (!this.inputVehicleModel && this.title.indexOf('VEHICULO') >= 0 ) {
      this.staticAlertClosed = true;
      this.alertReason = 'Para continuar seleccione un vehículo';
      this.hiddeFunction();
      return;
    }
    if (!this.inputFleetModel && this.title.indexOf('FLOTAS') >= 0 ) {
      this.staticAlertClosed = true;
      this.alertReason = 'Para continuar seleccione una flota';
      this.hiddeFunction();
      return;
    }
    if (!this.selectOperadorModel && this.title.indexOf('OPERADORES') >= 0 ) {
      this.staticAlertClosed = true;
      this.alertReason = 'Para continuar seleccione un operador';
      this.hiddeFunction();
      return;
    }
    if (!this.reportsService.isValidYear(year)) {
      this.staticAlertClosed = true;
      this.alertReason = 'No es un año válido, por favor intente con otro';
      this.hiddeFunction();
      return;
    }

    this.reportOperatorConduct = false;
    this.reportVehicleConduct = false;
    this.reportVehicleSecurity = false;
    this.reportOperatorSecurity = false;
    this.reportFleetConduct = false;

    if ( this.translate.getBrowserLang() !== null ) {
        this.filtro.lang = this.translate.getBrowserLang();
    }
    this.filtro.units[0].economic = this.inputVehicleModel;
    this.filtro.units[0].fleet = this.inputFleetModel;
    this.filtro.drivers[0].driverId = this.selectOperadorModel;
    this.filtro.year = year;
    this.filtro.month = this.selectMountModel;
    let weekOfReport = '';
    if (this.selectWeekModel !== undefined) {
      const realWeek: any[] = this.selectWeekModel.split(':');
      const daysOfWeek: any[] = realWeek[1].split('-');
      this.filtro.week = realWeek[0];
      if (this.filtro.lang === 'es' ) {
        weekOfReport = ` del ${daysOfWeek[0]}-${daysOfWeek[1]} al ${daysOfWeek[3]}-${daysOfWeek[4]}`;
      }else {
        weekOfReport = ` of the ${daysOfWeek[0]}-${daysOfWeek[1]} to ${daysOfWeek[3]}-${daysOfWeek[4]}`;
      }
    }
    // Datos y elección reporte
    this.reportsService.getInfo(this.retrivedPath, this.filtro)
    .subscribe(info => {
      this.dataReport = info;
      if (weekOfReport !== null && weekOfReport !== '') {
        this.dataReport.weekOfReport = weekOfReport;
      }
      if ( this.retrivedPath === 'conduct/operator') {
        this.reportOperatorConduct = true;
      }else {
        if ( this.retrivedPath === 'conduct/vehicle') {
          this.reportVehicleConduct = true;
        }else {
          if ( this.retrivedPath === 'security/vehicle') {
            this.reportVehicleSecurity = true;
          }else {
            if ( this.retrivedPath === 'security/operator') {
              this.reportOperatorSecurity = true;
            }else {
              if ( this.retrivedPath === 'indicators/fleet/performance') {
                  this.reportFleetConduct = true;
              }
            }
          }
        }
      }
      this.clearFilters();
    });
  }

  clearFilters() {
    this.weeks = [];
    this.selectOperadorModel = undefined;
    this.selectWeekModel = undefined;
    this.filtro.week = undefined;
    this.filtro.month = undefined;
    this.selectMountModel = undefined;
  }


  showComponent(tipo): void {
    let resultado: any;
    
    //JSOn de ejemplo
    let jsonEjemplo = `{
      "flota":"hesa",
      "subflota":"hesa",
      "subflotas":["hesa"],
      "configuracion":{
        "grafica":{
          "tipo":2,
          "descripcion":"Puntos"
          ,"tipoGrafica":1
        },
        "indicador":1,
        "tipoGrafica":{
          "tipo":1,
          "descripcion":"Acumulado"
        },
        "modoSeleccion":{
          "vista":${tipo},
          "nombre":"Vehículos"
        },
        "aliasIndicador":"Ejemplo",
        "dialogoVisible":true,
        "tituloIndicador":"Kilometraje",
        "subflotasDirectas":false
      },
      "atributosSeleccionados":[],
      "subflotasSeleccionadas":[]
    }`;

    const modal = this.modalService.open(FiltroSeleccionModal, { size: 'lg' , backdrop: 'static', keyboard: false });
    modal.componentInstance.idDashlet = 1;
    modal.componentInstance.parametrosIndicador = JSON.parse(jsonEjemplo);

    modal.result.then(r => {
      if (r && r.nuevaConfiguracion) {
        resultado = r.nuevaConfiguracion;
        this.inputVehicleModel = resultado.unidadesSeleccionadas[0].unitno;
      }
    }).catch(e => {
      console.info(e);
    });
  }
}
