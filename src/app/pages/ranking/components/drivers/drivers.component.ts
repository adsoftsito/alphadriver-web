/**
 * Created by Tech Group BWL on 04/10/2018.
 */
import {AfterViewInit, Component, OnInit, HostListener, ChangeDetectorRef} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {GridOptions} from "ag-grid";
import {LicenseManager} from "ag-grid-enterprise";
import {DriversService} from "./drivers.service";

LicenseManager.setLicenseKey('26f908fcbd31ab5109aab8ba901fe020');

@Component({
    selector: 'tm-drivers-component.col-md-12',
    templateUrl: './drivers.component.html',
    styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit, AfterViewInit {

    /* CONTROLLER FOR CELL RESIZING*/
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.screenHeight = window.innerHeight;
        if (this.screenHeight < 700){
            this.gridOptions.headerHeight = 38;
            this.gridOptions.rowHeight = 31;
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

    screenHeight            : any;
    selectedOption          : any;
    selectedRange           : any;
    calendarLabel           : string    = '';
    selectedTab             : any;
    showCalendarModal       : any;
    clickOutsideVar         : boolean   = true;

    /* LANGUAGE CONTROL VARS*/
    records                 : string    = 'pages.ranking.records';
    search                  : string    = 'pages.ranking.drivers.search';
    lang                    : any;

    /* SLIDING CARDS CONTROL VARS*/
    $item                   : any;
    visible                 : number    = 1; //Set the number of items that will be visible
    index                   : number    = 0; //Starting index
    endIndex                : number    = 0;

    /* DATA STORAGE VARS*/
    driversData             : any;
    driverInfoCards         : any;
    tableDriversCount       : any       = 0;

    /* AG GRID HANDLING VARS*/
    columnDefs              : any;
    gridOptions             : GridOptions;
    rowSelection            : string;
    gridColumnApi           : any;
    gridApi                 : any;
    pagedArray              : any       = [];
    hasLoadTranslateLabel   : boolean   = false;

    /* GROUP BUTTONS*/
    btnArray                : any       = [{label: 'Actual',selected: 'active'},{label: 'Bitácora',selected: ''}];


    constructor(
        private translate: TranslateService,
        private cdr: ChangeDetectorRef,
        private service: DriversService
    ) {
        this.changeLanguage();
        this.columnDefs = [{
            headerName: "Ranking",
            field: "rankingNumber",
            suppressSizeToFit: false,
            cellClass: ['grid-text'],
            },{
            headerName: "Operador",
            field: "name",
            suppressSizeToFit: false,
            cellClass: ['grid-text'],
        },{
            headerName: "Puntaje",
            field: "score",
            suppressSizeToFit: false,
            cellClass: ['grid-text'],
        },{
            headerName: "Número de Viajes",
            field: "tripsAmount",
            suppressSizeToFit: false,
            cellClass: ['grid-text'],
        },{
            headerName: "Kilometraje",
            field: "kms",
            suppressSizeToFit: false,
            cellClass: ['grid-text'],
        },{
            headerName: "Performance",
            field: "performance",
            suppressSizeToFit: false,
            cellClass: ['grid-text'],
        }];

        this.gridOptions = <GridOptions>{};

        this.gridOptions.animateRows = true;
        this.gridOptions.enableColResize = true;
        this.gridOptions.enableSorting = true;
        this.gridOptions.enableFilter = true;
        this.gridOptions.columnDefs = this.columnDefs;

        this.rowSelection = "single";

        /* Translate paging footer */
        this.translate.get('general')
            .subscribe(labelObject => {
                this.gridOptions.localeText = {page: labelObject.page, of: labelObject.of};
            });


        /* TRANSLATE CALENDAR LABEL*/
        this.translate.get('pages.ranking')
            .subscribe(labelObject => {
                this.calendarLabel = labelObject.last + ' 7 ' + labelObject.days;
            });
        /* TRANSLATE ALL TABLE HEADERS */
        this.translate.get('pages.ranking.drivers.tables')
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
        this.columnDefs[0].headerName = obj.ranking;
        this.columnDefs[1].headerName = obj.driver;
        this.columnDefs[2].headerName = obj.score;
        this.columnDefs[3].headerName = obj.tripsAmount;
        this.columnDefs[4].headerName = obj.kms;
        this.columnDefs[5].headerName = obj.performance;
        this.gridOptions.columnDefs = this.columnDefs;
        this.hasLoadTranslateLabel = true;
    }


    ngOnInit() {

      this.pagedArray = [];
      this.getDriversIncidents();
      this.getDriversData();



        this.screenHeight = window.innerHeight;


        if (this.screenHeight < 700){

            this.gridOptions.headerHeight = 38;
            this.gridOptions.rowHeight = 31;
        } else {
            this.gridOptions.headerHeight = 40;
            this.gridOptions.rowHeight = 41;
        }
    }

    getDriversData(){
        this.service.retrieveDrivers()
            .subscribe(
                res => {

                    const body = JSON.parse(res['_body']);
                    this.driversData = body.operators;

                    if (this.gridOptions.api){
                        this.gridOptions.api.setRowData(this.driversData);
                       this.tableDriversCount = this.driversData.length;


                    }
                },
                err => {
                    console.error(err);

                }
            );
    }

    getDriversIncidents(){
        this.service.retrieveIncidents()
            .subscribe(
                res => {

                    const body = JSON.parse(res['_body']);
                    this.driverInfoCards = body.incidents;

                    for(let item of this.driverInfoCards){
                        switch(item.type){
                            case 'overSpeed':{
                                item.icon = 'motum-i tm-e902';
                            }break;
                            case 'subitAceleration':{
                                item.icon = 'motum-i tm-e904';
                            }break;
                            case 'subitDesaceleration':{
                                item.icon = 'motum-i tm-e905';
                            }break;
                            case 'abruptTurn':{
                                item.icon = 'motum-i tm-e909';
                            }break;
                            case 'rpmExcess':{
                                item.icon = 'motum-i tm-e907';
                            }break;
                            case 'ralentiExcess':{
                                item.icon = 'motum-i tm-e908';
                            }break;
                            case 'tiringControl':{
                                item.icon = 'motum-i tm-e906';
                            }break;
                            case 'wrongRoute':{
                                item.icon = 'motum-i tm-e901';
                            }break;
                            case 'unauthorizedStop':{
                                item.icon = 'motum-i tm-e900';
                            }break;
                            default: {
                                item.icon = 'motum-i tm-e9c8';
                            }break;
                        }
                    }



                    this.updateInfoUser();
                },
                err => {
                    console.error(err);
                }
            );
    }

    ngAfterViewInit(){
        this.$item = $('div.pages-driver');
        this.endIndex = ( this.$item.length / this.visible ) - 1; //End index

        setTimeout(() => {
            // console.info("Resize columns");
            this.gridApi.sizeColumnsToFit();
        }, 500);
    }

    doClickLess(event){
        this.clickOutsideVar = true;
        event.target.style ="display: none";
        let element = document.getElementById('next-arrow');
          element.setAttribute('style','display: block');

        if (this.index >0 ){
            this.index--;
            this.$item.animate({'left':'+=49.6%'}, 600, 'swing');
        }

    }
    doClick(event){
        this.clickOutsideVar = true;
        event.target.style ="display: none";
        let element = document.getElementById('prev-arrow');

        element.setAttribute("style",'display: block');

        if(this.index < this.endIndex ){
            this.index++;

            this.$item.animate({'left':'-=49.6%'}, 600, 'swing');
        }

    }
    clickOutside(event) {

       if(this.clickOutsideVar == false){
           this.getDriversIncidents();
           this.updateInfoUser();
           this.clickOutsideVar = true;
       }
    }

    exportToExel() {
        let params = {
            fileName: 'Drivers'
        };
        this.gridApi.exportDataAsExcel(params);
    }

    onCellClicked(event){



    }
    onRowClicked(event){
        this.gridOptions.api.deselectAll();
        this.clickOutsideVar = false;
        this.gridOptions.api.forEachNodeAfterFilter( (node)=> {
            if (node.data === event.data) {
                node.setSelected(true);
                this.service.retrieveIncidentsById(node.data.id).subscribe(
                    res => {
                        const body = JSON.parse(res['_body']);
                        this.driverInfoCards = body.incidents;
                        for(let item of this.driverInfoCards){
                            switch(item.type){
                                case 'overSpeed':{
                                    item.icon = 'motum-i tm-e902';
                                }break;
                                case 'subitAceleration':{
                                    item.icon = 'motum-i tm-e904';
                                }break;
                                case 'subitDesaceleration':{
                                    item.icon = 'motum-i tm-e905';
                                }break;
                                case 'abruptTurn':{
                                    item.icon = 'motum-i tm-e909';
                                }break;
                                case 'rpmExcess':{
                                    item.icon = 'motum-i tm-e907';
                                }break;
                                case 'ralentiExcess':{
                                    item.icon = 'motum-i tm-e908';
                                }break;
                                case 'tiringControl':{
                                    item.icon = 'motum-i tm-e906';
                                }break;
                                case 'wrongRoute':{
                                    item.icon = 'motum-i tm-e901';
                                }break;
                                case 'unauthorizedStop':{
                                    item.icon = 'motum-i tm-e900';
                                }break;
                                default: {
                                    item.icon = 'motum-i tm-e9c8';
                                }break;
                            }
                        }
                        this.updateInfoUser();
                    },
                    err => {
                        console.error(err);

                    }
                );
            }
        });


            this.updateInfoUser();

    }

    updateInfoUser(){
        this.pagedArray = [];
        while (this.driverInfoCards.length > 0) {

            this.pagedArray.push(this.driverInfoCards.splice(0, 10));
        }

        setTimeout((d)=>{
            this.$item = $('.pages-driver');
            if (this.index > 0){

                this.$item.animate({'left':'-49.6%'}, 1000, 'swing');

            }
            this.endIndex = (this.$item.length / this.visible ) - 1;

        },200);

    }
    onGridReady(params) {

        // makr service to retrieve data from api
        this.gridColumnApi = params.columnApi;
        this.gridApi = params.api;


        if (this.gridOptions.api){
            this.gridOptions.api.setRowData(this.driversData);
            this.gridApi.sizeColumnsToFit();
        }
    }

    onChangeSelected(item){
        this.selectedTab = item;
    }
    onFilterChanged(data){
        this.gridOptions.api.setQuickFilter(data);
    }

    getSelectedOption(event){
        this.selectedOption = event;
        this.cdr.detectChanges();
    }
    getSelectedRange(event){
        this.selectedRange = event;
        this.cdr.detectChanges();

    }

    showCalendar(){
        this.showCalendarModal = true;
        this.cdr.detectChanges();

    }
    getCalendarLabel(event){
        this.calendarLabel = event;
        this.cdr.detectChanges();
    }

    modalClosed(){
        this.showCalendarModal = false;
    }
}