/**
 * Created by Tech Group BWL on 12/09/2018.
 */
import {AfterViewInit, Component, OnInit, HostListener, ViewEncapsulation, ViewChild, ElementRef, ChangeDetectorRef, NgZone} from "@angular/core";
import {LoginService} from "../../../../shared/providers/login.service"
import {GridOptions} from "ag-grid";
import * as moment from 'moment';
import {UsersService} from "./users.service";
import {TranslateService} from "@ngx-translate/core"

@Component({
    selector: 'tm-ranking-users.col-md-12',
    templateUrl: './users.component.html',
    styleUrls: ['users.component.scss']

})
export class UsersComponent implements OnInit, AfterViewInit {

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.screenHeight = window.innerHeight;


        if (this.screenHeight < 700){

            this.gridOptions.headerHeight = 38;
            this.gridOptions.rowHeight = 31;
        } else {
            this.gridOptions.headerHeight = 40;
            this.gridOptions.rowHeight = 42.6;
        }
        this.gridOptions.api.resetRowHeights();

        if (this.gridApi) {
            setTimeout(() => {
                this.gridApi.sizeColumnsToFit();
            }, 200);
        }
    }

    /* Translate service vars */
    serviceScore        : string       = 'pages.ranking.users.cards.serviceScore';
    userSince           : string       = 'pages.ranking.users.cards.userSince';
    platformKnowledge   : string       = 'pages.ranking.users.cards.platformKnowledge';
    lastUpdate          : string       = 'pages.ranking.users.cards.lastUpdate';
    search              : string       = 'pages.ranking.users.search';
    records             : string       = 'pages.ranking.records';
    current             : string       = 'pages.ranking.current';
    binnacle            : string       = 'pages.ranking.binnacle';
        /***** END OF TRANSLATION VARS **********/

    lang                : any;
    firstDateTimestamp  : any;
    lastDateTimestamp   : any;
    tableContentCount   : number        = 0;
    selectedOption      : any;
    selectedRange       : any;
    screenHeight        : any;
    selectedTab         : any;
    columnDefs          : any;
    showCalendarModal   : boolean       = false;
    usersDataTable      : any;
    gridOptions         : GridOptions;
    rowSelection        : string;
    gridColumnApi       : any;
    gridApi             : any;
    date                : any;
    calendarLabel       : any           = '';
    nameChar            : any;
    avatarColor         : any;
    btnArray            : any            = [{label: 'Actual', selected: 'active'},{label: 'Bitácora', selected: ''}];
    userData            : any;
    hasLoadTranslateLabel   : any = false;

    constructor(
        private loginSrv: LoginService,
        private service: UsersService,
        private cdr: ChangeDetectorRef,
        private translate: TranslateService,
        private ngZone: NgZone
    ) {
        this.changeLanguage();
        this.userData = loginSrv.isLogged();
        this.userData.ratingScore = this.userData.ratingScore.toFixed(1);
        this.columnDefs = [{
            headerName: "",
            field: "rankingNumber",
            suppressSizeToFit: false,
            cellClass: ['grid-text'],
            cellRenderer: (data) =>{
                return "#" + data.value;
            }
        },{
            headerName: "Usuario",
            field: "user",
            suppressSizeToFit: false,
            cellClass: ['cell-class'],
            cellRenderer: (data) => {
                let newDiv = document.createElement('div');
                newDiv.setAttribute("class", "grid-content");
                if(data.data.avatar != ""){
                    newDiv.innerHTML = "<img class='grid-avatar' src = '" + data.data.avatar +"'>" +
                        "<span> &nbsp;&nbsp; " + data.value + "</span>";

                } else {

                    let nameArray = data.value.split(" ");
                    let name = nameArray[0];
                    let lastName = nameArray[1];
                    this.avatarColor = '';
                    this.nameChar = name.charAt(0);
                    let lastNameChar = lastName.charAt(0);
                    this.setAvatarColor();

                    newDiv.innerHTML= `
                         <div class="avatar-row ${this.avatarColor}">${this.nameChar}${lastNameChar}</div>
                         <span> &nbsp;&nbsp; ${data.value}</span>
                     `;

                }

                return newDiv;

            }
        },{
            headerName: "Puntaje de servicio",
            field: "score",
            suppressSizeToFit: false,
            cellClass: ['cell-class'],

            cellRenderer: (data) => {
                let newDiv = document.createElement('div');
                newDiv.setAttribute("class", "grid-content-stars");
                let starsContent = "";
                for (let count = 0; count < parseInt(data.value); count++){
                    starsContent += `<span style="font-size: 18px; color: #F8B43A">&#x2605</span>`;
                }

                if (parseFloat(data.value) > parseInt(data.value)){
                    let resFinal  = parseFloat(data.value) - parseInt(data.value);
                    let starFinal = ((resFinal * 10)  * 1.4) + "px";

                    starsContent += `<div class="half" style="font-size: 18px; width: ${starFinal};">&#x2605</div>`
                }
                newDiv.innerHTML = `
                    <div class="d-inline-block" style="width: 30px; padding-right: 20px;">${data.value}</div>                    
                    <div class="d-inline-block">
                        ${starsContent}
                       
                    </div>
                `;
                return newDiv;
            }
        },{
            headerName: "Conocimiento de la plataforma",
            field: "platformScore",
            suppressSizeToFit: false,
            cellClass: ['cell-class'],
            cellRenderer: (data) => {
                let newDiv = document.createElement('div');
                newDiv.setAttribute("class", "grid-content");
                let imgSrc = '';

                if(data.value >= 0 && data.value < 5){
                    imgSrc = '../../../../../assets/img/theme/icon/ranking/ranking1.png';
                } else if(data.value >= 5 && data.value < 8){
                    imgSrc = '../../../../../assets/img/theme/icon/ranking/ranking2.png';
                } else if(data.value >= 8 && data.value < 9.1){
                    imgSrc = '../../../../../assets/img/theme/icon/ranking/ranking3.png';
                } else {
                    imgSrc = '../../../../../assets/img/theme/icon/ranking/ranking4.png';
                }
                newDiv.innerHTML = `
                           
                           <div class="d-inline-block">
                                <img class="grid-trophy-icon" src="${imgSrc}">
                           </div>
                           <span style="padding-left: 20px;">${data.value}</span>
                `;
                return newDiv;
            }
        },{
            headerName: "Puntaje general",
            field: "generalScore",
            suppressSizeToFit: false,
            cellClass: ['grid-text'],
        },{
            headerName: "Departamento",
            field: "department",
            suppressSizeToFit: false,
            cellClass: ['grid-text'],
        },{
            headerName: "Usuario desde",
            field: "userSince",
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

        /* TRANSLATE PAGE FOOTER */
        this.translate.get('general')
            .subscribe(labelObject => {
                this.gridOptions.localeText = {page: labelObject.page, of: labelObject.of};
            });

        /* TRANSLATE CALENDAR LABEL*/
        this.translate.get('pages.ranking')
            .subscribe(labelObject => {
                this.calendarLabel = labelObject.last + ' 7 ' + labelObject.days;
            });

        /* TRANSLATE TABLES */
        this.translate.get('pages.ranking.users.tables')
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
        console.log(this.lang);
        if (this.lang === null) {
            this.translate.getBrowserLang();
        } else {
            this.translate.use(this.lang);
        }
    }
    ngAfterViewInit(){
        setTimeout(() => {
            // console.info("Resize columns");
            this.gridApi.sizeColumnsToFit();
        }, 500);

        this.getUsersData();




    }
    ngOnInit() {
        this.date = moment().format('YYYY[/]MM[/]DD [-] HH:MM[ h]');
        this.screenHeight = window.innerHeight;


        if (this.screenHeight < 700){

            this.gridOptions.headerHeight = 38;
            this.gridOptions.rowHeight = 31;
        } else {
            this.gridOptions.headerHeight = 40;
            this.gridOptions.rowHeight = 42.6;
        }

    }


    onGridReady(params) {
        // makr service to retrieve data from api
        this.gridColumnApi = params.columnApi;
        this.gridApi = params.api;

        if (this.gridOptions.api){
            this.gridOptions.api.setRowData(this.usersDataTable);
            this.gridApi.sizeColumnsToFit();
        }
    }

    onCellClicked (event) {}
    onRowClicked (event) {
        event.node.setSelected(true);
    }

    changeSelectedItem(item){

        //Here goes your item by ID - ID is composed by BG + Index | I.E: BG0
        this.selectedTab = item;

    }

    convertDateToTimestamp(moment: any){
        this.firstDateTimestamp = moment[0].format('x');
        this.lastDateTimestamp = moment[1].format('x');
    }

    getUsersData(){
        this.service.retrieveUsers()
            .subscribe(
                res => {

                    const body = JSON.parse(res['_body']);
                    this.usersDataTable = body.users;

                    if (this.gridOptions.api){
                        this.gridOptions.api.setRowData(this.usersDataTable);
                        this.tableContentCount = this.usersDataTable.length;

                    }
                },
                err => {
                    console.error(err);

                }
            )

    }

    /*This functions allows calendar to storage user defined dates
    *
    *  Needs following vars:
    *  - selectedOption:any
    *  - selectedRange:any
    *
    *  Needs following functions:
    *  + getSelectedRange(event){this.selectedRange=event}
    *  + getSelectedOption(event){this.selectedOption=event}
    *
    * */
    getSelectedOption(event){
        this.selectedOption = event;
        this.cdr.detectChanges();
    }
    getSelectedRange(event){
        this.selectedRange = event;
        this.convertDateToTimestamp(event);
        console.log(this.firstDateTimestamp);
        console.log(this.lastDateTimestamp);
        this.cdr.detectChanges();

    }

    translateHeaderNames(obj){
        this.columnDefs[0].headerName = obj.currentRanking;
        this.columnDefs[1].headerName = obj.user;
        this.columnDefs[2].headerName = obj.serviceScore;
        this.columnDefs[3].headerName = obj.platformKnowledge;
        this.columnDefs[4].headerName = obj.generalScore;
        this.columnDefs[5].headerName = obj.department;
        this.columnDefs[6].headerName = obj.userSince;

        this.gridOptions.columnDefs = this.columnDefs;

        this.hasLoadTranslateLabel = true;
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
    /* END OF CALENDAR FUNCTIONS*/

    getData(event){

    }
    setSortScore(){
        var sort = [
            {colId: 'score', sort: 'desc'}
            ];
        this.gridOptions.columnApi.moveColumn('score', 2);
        this.gridOptions.api.setSortModel(sort);
    }
    exportToExel() {
        let params = {
            fileName: 'UsersRanking'
        };
        this.gridApi.exportDataAsExcel(params);
    }
    onFilterChanged(data){
        this.gridOptions.api.setQuickFilter(data);
    }
    setSortPlatformScore(){
        var sort = [
            {colId: 'platformScore', sort: 'desc'}
        ];

        this.gridOptions.columnApi.moveColumn('platformScore', 2);
        this.gridOptions.api.setSortModel(sort);
    }



    setAvatarColor(){
        if(this.nameChar >= 'A' && this.nameChar <= 'C'){
            this.avatarColor = 'azulB';
        }else{
            if(this.nameChar >= 'D' && this.nameChar <= 'F'){
                this.avatarColor = 'amarillo';
            }else{
                if(this.nameChar >= 'G' && this.nameChar <= 'I'){
                    this.avatarColor = 'rojo';
                }else{
                    if(this.nameChar >= 'J' && this.nameChar <= 'L'){
                        this.avatarColor = 'morado';
                    }else{
                        if(this.nameChar >= 'M' && this.nameChar <= 'O'){
                            this.avatarColor = 'verde';
                        }else{
                            if(this.nameChar >= 'P' && this.nameChar <= 'R'){
                                this.avatarColor = 'rosa';
                            }else{
                                if(this.nameChar >= 'S' && this.nameChar <= 'U'){
                                    this.avatarColor = 'verdeF';
                                }else{
                                    if(this.nameChar >= 'V' && this.nameChar <= 'Z'){
                                        this.avatarColor = 'rosaF';
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}