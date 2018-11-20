import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import { NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";
import * as moment from 'moment';
import {customEvent} from "d3-selection";

@Component({
    selector: 'motum-modal-date-picker',
    templateUrl: './motumModalDatePicker.component.html',
    styleUrls: ['./motumModalDatePicker.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MotumModalDatePickerComponent implements OnInit, AfterViewInit {




    @ViewChild('CalendarModal') calendarModal: ElementRef;
    @Output() selectedOption                 : EventEmitter<any> = new EventEmitter<any>();
    @Output() selectedRangeType              : EventEmitter<any> = new EventEmitter<any>();
    @Output() selectedRange                  : EventEmitter<any> = new EventEmitter<any>();
    @Output() hasBeenClosed                  : EventEmitter<any> = new EventEmitter<any>();
    @Output() calendarLabel                  : EventEmitter<any> = new EventEmitter<any>();

    @Input() userDefinedRange                :any;
    @Input() userDefinedOption               :any;

    acceptModal         : string    = 'theme.components.motumModalDatePicker.accept';
    cancelModal         : string    = 'theme.components.motumModalDatePicker.cancel';
    rangeSelection      : boolean   = true;
    rangeType           : string    = '';
    rangeDays           : number    = 0;
    userSelectedRange   : any;
    customRangeSelected : boolean   = false;
    selectedRangeTitle  : any       = '';
    selectedOpc         : any       = '';
    days                : any       = '';
    last                : any       = '';
    today               : any       = '';
    yesterday           : any       = '';
    currentMonth        : any       = '';
    lastMonth           : any       = '';

    buttonsArray = [{
        label: this.today,
        selected: ''
    },{
        label: this.yesterday,
        selected: ''
    },{
        label: '7 ' + this.days,
        selected: 'active'
    },{
        label: '15 ' + this.days,
        selected: ''
    },{
        label: '30 ' + this.days,
        selected: ''
    },{
        label: this.currentMonth,
        selected: ''
    },{
        label: this.lastMonth,
        selected: ''
    }
    ];


    constructor(
        private modalService: NgbModal,
        private translate: TranslateService
    ){
        /* TRANSLATE CALENDAR LABEL*/
        this.translate.get('theme.components.motumModalDatePicker')
            .subscribe(labelObject => {
                this.buttonsArray[0].label = labelObject.today;
                this.buttonsArray[1].label = labelObject.yesterday;
                this.buttonsArray[2].label = '7 ' + labelObject.days;
                this.buttonsArray[3].label = '15 ' + labelObject.days;
                this.buttonsArray[4].label = '30 ' + labelObject.days;
                this.buttonsArray[5].label = labelObject.currentMonth;
                this.buttonsArray[6].label = labelObject.lastMonth;
                this.days = labelObject.days;
                this.last = labelObject.last;
            });
    }

    ngOnInit(){
            if (this.userDefinedRange){
                this.rangeType ='custom';

                let index = Number(this.userDefinedOption.substring(2));
                for(let i = 0; i < this.buttonsArray.length; i++ ){
                    if (i == index) {
                        this.buttonsArray[i].selected = 'active';
                    } else {
                        this.buttonsArray[i].selected = '';
                    }
                }
            } else {
                this.rangeType = 'lastDays';
                this.rangeDays = 7;
            }
    }

    getSelectedOption(selectedOpc){
        this.selectedOpc = selectedOpc;
        if (selectedOpc === "CA0"){
            this.rangeType = 'today';
        } else if (selectedOpc === "CA1"){
            this.rangeType = 'yesterday';
        } else if (selectedOpc === "CA2"){
            this.rangeType = 'lastDays';
            this.rangeDays = 7;
        } else if (selectedOpc === "CA3"){
            this.rangeType = 'lastDays';
            this.rangeDays = 15;
        } else if (selectedOpc === "CA4"){
            this.rangeType = 'lastDays';
            this.rangeDays = 30;
        } else if (selectedOpc === "CA5"){
            this.rangeType = 'currentMonth';
        } else if (selectedOpc === "CA6"){
            this.rangeType = 'lastMonth';
        }
    }

    getSelectedRange(event){
        this.userSelectedRange = event;
        let tmpMoment = this.userSelectedRange;
        let firstDate = tmpMoment[0].format("YYYY[/]MM[/]DD");
        let secondDate = tmpMoment[1].format("YYYY[/]MM[/]DD");
        this.selectedRangeTitle = firstDate + " - " + secondDate;
        let label = '';

        if (this.customRangeSelected){
            label = this.selectedRangeTitle;
        } else {
            if(this.rangeType == 'today'){
                label = this.buttonsArray[0].label // To be translated
            } else if(this.rangeType == 'yesterday'){
                label = this.buttonsArray[1].label // To be translated
            }  else if(this.rangeType == 'lastDays'){
                label = this.last + this.rangeDays + ' ' + this.days; // To be translated
            }  else if(this.rangeType == 'lastMonth'){
                label = this.buttonsArray[6].label // To be translated
            }  else if(this.rangeType == 'currentMonth'){
                label = this.buttonsArray[5].label // To be translated
            }

        }
        this.calendarLabel.emit(label);
        this.selectedOption.emit(this.selectedOpc);
        if (this.customRangeSelected){
            this.selectedRangeType.emit('custom');
        } else {
            this.selectedRangeType.emit(this.rangeType);
        }
    }

    getNewRangeType(event){
        if (event === 'custom'){
            this.customRangeSelected = true;
        } else {
            this.customRangeSelected = false;
        }
    }

    ngAfterViewInit(){
        const elementReference = this.modalService.open(this.calendarModal, { size: 'lg' , keyboard: false, windowClass: 'motum-modal-calendar', backdrop: 'static' });
        elementReference.result.then((userResponse)=>{
            if (userResponse){
                this.selectedRange.emit(this.userSelectedRange);
            }
            this.hasBeenClosed.emit(true);
        });



    }



}