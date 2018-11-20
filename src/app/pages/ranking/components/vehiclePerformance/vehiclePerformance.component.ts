/**
 * Created by Tech Group BWL on 05/10/2018.
 */
import {Component, OnInit, AfterViewInit, HostListener, ChangeDetectorRef} from "@angular/core";
import {AmChartsService, AmChart} from "@amcharts/amcharts3-angular"
import {GridOptions} from "ag-grid";
import {VehiclePerformanceService} from "./vehiclePerformance.service";
import {TranslateService} from "@ngx-translate/core"

@Component({
    selector: 'tm-vehicle-performance-component.col-md-12',
    templateUrl: './vehiclePerformance.component.html',
    styleUrls: ['./vehiclePerformance.component.scss']
})
export class VehiclePerformanceComponent implements OnInit, AfterViewInit {

    @HostListener('window:resize', ['$event'])
    onResize(event) {

        this.screenHeight = window.innerHeight;
        if (this.screenHeight < 770){

            this.gridOptions.headerHeight = 38;
            this.gridOptions.rowHeight = 38;
        } else {
            this.gridOptions.headerHeight = 40;
            this.gridOptions.rowHeight = 41;
        }
        this.gridOptions.api.resetRowHeights();
        if (this.gridApi) {
            setTimeout(() => {
                this.gridApi.sizeColumnsToFit();
            }, 200);
        }
    }
    screenHeight:any;

    /* calendar table vars*/
    selectedRangeTable      : any;
    selectedOptionTable     : any;
    showCalendarModalTable  : boolean   = false;
    calendarLabelTable      : string    = "Últimos 7 días";

    /* calendar chart1 vars*/
    selectedRangeChart1     : any;
    selectedOptionChart1    : any;
    showCalendarModalChart1 : boolean   = false;
    calendarLabelChart1     : string    = "Últimos 7 días";

    /* calendar chart1 vars*/
    selectedRangeChart2     : any;
    selectedOptionChart2    : any;
    showCalendarModalChart2 : boolean   = false;
    calendarLabelChart2     : string    = "Últimos 7 días";

    /* TRANSLATION STRINGS */
    selectedTab             : any;
    search                  : string    = 'pages.ranking.vehiclePerformance.search';
    records                 : string    = 'pages.ranking.records';
    performanceCurve        : string    = 'pages.ranking.vehiclePerformance.performanceCurve';
    fuelConsumption         : string    = 'pages.ranking.vehiclePerformance.fuelConsumption';

    private chart           : AmChart;
    private secondChart     : AmChart;
    private secondChartData : any;
    private firstChartData  : any;

    lang                    : any;
    columnDefs              : any;
    vehicleData             : any;
    gridOptions             : any;
    gridApi                 : any;
    gridColumnApi           : any;
    rowSelection            : any;
    hasLoadTranslateLabel   : boolean   = false;
    clickOutsideVar         : boolean   = true;
    tableVehicleCount       : number    = 0;

    btnArray = [{label: 'Actual', selected: 'active'}, {label: 'Bitácora', selected: ''}];

    constructor(
        private amChartSrv: AmChartsService,
        private cdr: ChangeDetectorRef,
        private service: VehiclePerformanceService,
        private translate: TranslateService
    ) {
        this.changeLanguage();
        this.columnDefs = [{
            headerName: "Ranking",
            field: "rankingNumber",
            suppressSizeToFit: false,
            suppressMenu: true,
            cellClass: ['grid-text'],
        },{
            headerName: "#Económico",
            field: "economicNumber",
            suppressMenu: true,
            suppressSizeToFit: false,
            cellClass: ['grid-text'],
        },{
            headerName: "Rendimiento",
            field: "performance",
            suppressSizeToFit: false,
            suppressMenu: true,
            cellClass: ['grid-text'],
        },{
            headerName: "Km.",
            field: "kms",
            suppressSizeToFit: false,
            suppressMenu: true,
            cellClass: ['grid-text'],
        },{
            headerName: "Comb.",
            field: "comb",
            suppressSizeToFit: false,
            suppressMenu: true,
            cellClass: ['grid-text'],
        },{
            headerName: "Ralentí",
            field: "ralenti",
            suppressSizeToFit: false,
            suppressMenu: true,
            cellClass: ['grid-text'],
        },{
            headerName: "% Fact. de carga",
            field: "loadFact",
            suppressSizeToFit: false,
            suppressMenu: true,
            cellClass: ['grid-text'],
        },{
            headerName: "AVR RPM",
            field: "rpmAvr",
            suppressSizeToFit: false,
            suppressMenu: true,
            cellClass: ['grid-text'],
        },{
            headerName: "AVG Vol.",
            field: "avgVol",
            suppressSizeToFit: false,
            suppressMenu: true,
            cellClass: ['grid-text'],
        },{
            headerName: "Aceleraciones",
            field: "accelerations",
            suppressSizeToFit: false,
            suppressMenu: true,
            cellClass: ['grid-text'],
        },{
            headerName: "Frenadas",
            field: "brakes",
            suppressSizeToFit: false,
            suppressMenu: true,
            cellClass: ['grid-text'],
        },{
            headerName: "% Descargas",
            field: "downloadsPercentaje",
            suppressSizeToFit: false,
            suppressMenu: true,
            cellClass: ['grid-text'],
        },{
            headerName: "Marca",
            field: "brand",
            suppressSizeToFit: false,
            suppressMenu: true,
            cellClass: ['grid-text'],
        },{
            headerName: "Modelo",
            field: "model",
            suppressSizeToFit: false,
            suppressMenu: true,
            cellClass: ['grid-text'],
        },{
            headerName: "Año",
            field: "year",
            suppressSizeToFit: false,
            suppressMenu: true,
            cellClass: ['grid-text'],
        },
        ];



        this.gridOptions = <GridOptions>{};
        this.gridOptions.animateRows = true;
        this.gridOptions.enableColResize = true;
        this.gridOptions.enableSorting = true;
        this.gridOptions.enableFilter = true,
            this.gridOptions.columnDefs = this.columnDefs;

        this.rowSelection = "single";

        this.getVehiclesData();
        this.getPerformanceCharts();

        /* Translate paging footer */
        this.translate.get('general')
            .subscribe(labelObject => {
                this.gridOptions.localeText = {page: labelObject.page, of: labelObject.of};
        });


        /* TRANSLATE CALENDAR LABEL*/
        this.translate.get('pages.ranking')
            .subscribe(labelObject => {
                this.calendarLabelTable = labelObject.last + ' 7 ' + labelObject.days;
                this.calendarLabelChart1 = labelObject.last + ' 7 ' + labelObject.days;
                this.calendarLabelChart2 = labelObject.last + ' 7 ' + labelObject.days;
            });

        /* Translate table*/
        this.translate.get('pages.ranking.vehiclePerformance.tables')
            .subscribe(labelObject => {
                this.translateHeaderNames(labelObject);
            });

        /* TRANSLATE GROUPBTNS*/
        this.translate.get('pages.ranking.current')
            .subscribe(labelObject => {
                this.btnArray[0].label = labelObject
            });
        this.translate.get('pages.ranking.binnacle')
            .subscribe(labelObject => {
                this.btnArray[1].label = labelObject
            });

        this.changeLanguage();
    }
    changeLanguage() {
        this.lang = localStorage.getItem('lang');
        if (this.lang === null) {
            this.translate.getBrowserLang();
        } else {
            this.translate.use(this.lang);
        }
    }
    translateHeaderNames(obj){
        this.columnDefs[0].headerName = obj.rankingNumber;
        this.columnDefs[1].headerName = obj.economicNumber;
        this.columnDefs[2].headerName = obj.performance;
        this.columnDefs[3].headerName = obj.kms;
        this.columnDefs[4].headerName = obj.comb;
        this.columnDefs[5].headerName = obj.ralenti;
        this.columnDefs[6].headerName = obj.loadFact;
        this.columnDefs[7].headerName = obj.rpmAvr;
        this.columnDefs[8].headerName = obj.avgVol;
        this.columnDefs[9].headerName = obj.accelerations;
        this.columnDefs[10].headerName = obj.brakes;
        this.columnDefs[11].headerName = obj.downloadsPercentaje;
        this.columnDefs[12].headerName = obj.brand;
        this.columnDefs[13].headerName = obj.model;
        this.columnDefs[14].headerName = obj.year;
        this.gridOptions.columnDefs = this.columnDefs;
        this.hasLoadTranslateLabel  = true;

    }

    ngAfterViewInit(){
        this.chart = this.amChartSrv.makeChart('chart1', {
            "type":"serial",
            "theme": "light",
            "startDuration": 1,
            "fontFamily": "'Rubik', sans-serif",
            "fontSize": 12,

            // "columnWidth": 0.50,
            "colors": [
                "#cccccc",
                "#C5DAEC",
            ],
            "graphs": [
                {
                    "balloonText": "[[normalDistribution]]: [[kmplt]]",
                    "bullet": "none",
                    "lineThickness": 4,
                    "id": "AmGraph-1",
                    "title": "kmplt",
                    "valueField": "kmplt",
                    "precision": 0.5,
                    "type":"smoothedLine",
                },
                {
                    "balloonText": "",
                    "fillAlphas": 1,
                    "type": "column",
                    "valueField": "minimum",
                    "fixedColumnWidth":0.5,
                    "lineColor": "#ce0000"
                }, {
                    "balloonText": "",
                    "fillAlphas": 1,
                    "type": "column",
                    "valueField": "best",
                    "fixedColumnWidth":0.5,
                    "lineColor": "#52ce00"
                },
            ],
            "valueAxes":[{
                "gridColor": "#858585",
                "color": "#858585",
                "axisColor": "#858585",
                "gridThickness": 0
            }],
            "categoryField": "normalDistribution",
            "categoryAxis": {
                "autoWrap": false,
                "position": "left",
                "gridPosition": "start",
                "axisAlpha": 1,
                "gridAlpha": 0,
                "gridThickness": 0,
                "gridColor": "#858585",
                "color": "#858585",
                "axisColor": "#858585",
                "labelFunction": function( label, item ) {

                    return '' + Number(label).toFixed(1);
                }
            },
            "export": {
                "enabled": true
            },
            "dataProvider": this.firstChartData
        });




        // SECOND CHART

        this.secondChart = this.amChartSrv.makeChart('chart2',{
            "type": "serial",
            "theme": "light",
            "startDuration": 0.5,
            "columnWidth": 0.42,
            "fontFamily": "'Rubik', sans-serif",
            "fontSize": 10,
            // "columnWidth": 0.50,
            "colors": [
                "#f08637",
                "#4a7dc9",
                "#a0a2aa"
            ],
            "legend": {
                "maxColumns": 5,
                "markerType": "square",
                "markerSize": 10,
                "align": "center",
                "autoMargins": false,
                "valueWidth": -15,
                "position": "right"
            },
            "dataProvider": this.secondChartData,
            "valueAxes": [{
                "color": "#858585",

                "gridColor": "#858585",
                "axisColor": "#858585",
                "stackType": "regular",
                "gridThickness": 0

            }],
            "graphs": [{
                "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                "fillAlphas": 1,
                "labelText": "",
                "lineAlpha": 0.3,
                "title": "Ralentí",
                "labelOffset": 20,
                "labelPosition": "right",
                "type": "column",
                "color": "#000000",
                "valueField": "ralenti"
            }, {
                "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                "fillAlphas": 1,
                "labelText": "",
                "lineAlpha": 0.3,
                "title": "PTO",
                "labelOffset": 20,
                "labelPosition": "right",
                "type": "column",
                "color": "#000000",
                "valueField": "pto"
            }, {
                "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                "fillAlphas": 1,
                "labelText": "",
                "lineAlpha": 0.3,
                "title": "Descargas",
                "labelOffset": 20,
                "labelPosition": "right",
                "type": "column",
                "color": "#000000",
                "valueField": "download"
            }],
            "categoryField": "week",
            "categoryAxis": {
                "autoWrap": true,
                "gridPosition": "start",
                "axisAlpha": 1,
                "gridAlpha": 0,
                "gridThickness": 0,
                "gridColor": "#858585",
                "color": "#858585",
                "axisColor": "#858585",

            },
            "export": {
                "enabled": true
            }

        } );

        this.secondChart.startEffect  = 'bounce';
        this.secondChart.animateAgain();
        setTimeout(() => {
            this.gridApi.sizeColumnsToFit();
        }, 500);


    }


    onCellClicked(event){

    }

    clickOutside(event){
        if (this.clickOutsideVar == false){
            this.getPerformanceCharts();
            this.chart.dataProvider = this.firstChartData;
            this.secondChart.dataProvider = this.secondChartData;
            this.chart.validateData();
            this.secondChart.validateData();
            this.secondChart.animateAgain();
            this.clickOutsideVar = true;
        }

        this.gridOptions.api.deselectAll();


    }

    updateDataProviders(){
        this.chart.dataProvider = this.firstChartData;
        this.secondChart.dataProvider = this.secondChartData;
        this.chart.validateData();
        this.secondChart.validateData();
        this.secondChart.animateAgain();
    }
    getPerformanceCharts(){
        this.service.retrieveCharts()
            .subscribe(
                res => {
                    const body = JSON.parse(res['_body']);
                    //console.log(body);
                    this.firstChartData = body.performance;
                    this.secondChartData = body.fuelConsumption;
                    this.updateDataProviders();

                },
                err => {
                    console.error(err);
                }
            );
    }
    getVehiclesData(){
        this.service.retrieveVehicles()
            .subscribe(
                res => {
                    const body = JSON.parse(res['_body']);
                    this.vehicleData = body.performance;
                    this.gridOptions.api.setRowData(this.vehicleData);
                    this.tableVehicleCount = this.vehicleData.length;
                },
                err => {
                    console.error(err);
                }
            );
    }

    onGridReady(params) {

        // makr service to retrieve data from api
        this.gridColumnApi = params.columnApi;
        this.gridApi = params.api;


        if (this.gridOptions.api){
            this.gridOptions.api.setRowData(this.vehicleData);
            this.gridApi.sizeColumnsToFit();
        }
    }

    onChangeSelectedItem(item){
        this.selectedTab = item;
    }

    onFilterChanged(data){
        this.gridOptions.api.setQuickFilter(data);
    }

    exportToExel() {
        let params = {
            fileName: 'Vehicles'
        };
        this.gridApi.exportDataAsExcel(params);
    }
    onRowClicked(event) {
        this.clickOutsideVar = false;
        this.gridOptions.api.forEachNodeAfterFilter((node)=> {
            if (node.data === event.data) {
                node.setSelected(true);
                this.service.retrieveChartsById(node.data.id).subscribe(
                    res => {
                        const body = JSON.parse(res['_body']);
                        this.firstChartData = body.performance;
                        this.secondChartData = body.fuelConsumption;
                        this.updateDataProviders();

                    });
            }
        });


    }


    /* Calendar  methods - Table */
    getSelectedOptionTable(event){
        this.selectedOptionTable = event;
        this.cdr.detectChanges();
    }
    getSelectedRangeTable(event){
        this.selectedRangeTable = event;
        this.cdr.detectChanges();

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

    /* Calendar  methods - Chart1 */
    getSelectedOptionChart1(event){
        this.selectedOptionChart1 = event;
        this.cdr.detectChanges();
    }
    getSelectedRangeChart1(event){
        this.selectedRangeChart1 = event;
        this.cdr.detectChanges();

    }

    showCalendarChart1(){
        this.showCalendarModalChart1 = true;
        this.cdr.detectChanges();

    }
    getCalendarLabelChart1(event){
        this.calendarLabelChart1 = event;
        this.cdr.detectChanges();
    }

    modalClosedChart1(){
        this.showCalendarModalChart1 = false;
    }

/* Calendar  methods - Chart1 */
    getSelectedOptionChart2(event){
        this.selectedOptionChart2 = event;
        this.cdr.detectChanges();
    }
    getSelectedRangeChart2(event){
        this.selectedRangeChart2 = event;
        this.cdr.detectChanges();

    }

    showCalendarChart2(){
        this.showCalendarModalChart2 = true;
        this.cdr.detectChanges();

    }
    getCalendarLabelChart2(event){
        this.calendarLabelChart2 = event;
        this.cdr.detectChanges();
    }

    modalClosedChart2(){
        this.showCalendarModalChart1 = false;
    }



        ngOnInit() {
            this.screenHeight = window.innerHeight;
            if (this.screenHeight < 770){

                this.gridOptions.headerHeight = 38;
                this.gridOptions.rowHeight = 38;
            } else {
                this.gridOptions.headerHeight = 40.58;
                this.gridOptions.rowHeight = 43.58;
            }
        }


}