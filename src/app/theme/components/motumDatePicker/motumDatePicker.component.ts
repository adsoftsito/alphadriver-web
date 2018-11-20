import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'motum-date-picker',
    templateUrl: './motumDatePicker.component.html',
    styleUrls: ['./motumDatePicker.component.scss']
})
export class MotumDatePickerComponent implements OnInit, OnChanges {

    /*
    *   USAGE INPUT DESCRIPTIONS:
    *
    *       - date  <- [String] Specifies a date to start calendar from - Must be a valid ISO 8601 string - if none, calendar uses today
    *       - rangeSelection: TRUE | FALSE <- [boolean] This allows to perform a date range selection
    *       - rangeBy: today | yesterday | lastDays | nextDays | currentMonth  | lastMonth <- [String]
    *       - rangeDays:    <- [integer] Only needed if you specified lastDays or nextDays previously, makes a range in days from today
    *       - customRange   <- Retrieves an array with two dates, first and last date to perform a range - Must be a valid ISO 8601 string
    *       - userCanClick  <- allows user to perform click over the calendar and modify ranges
    *       - dualCalendar  <- shows two calendars separated by a month
    *
    *
    *   USAGE OUTPUT DESCRIPTIONS
    *       - selectedDay       <- Retrieves user selected day on click
    *       - selectedMinRange  <- Retrieves user minimun date range selected
    *       - selectedMaxRange  <- Retrieves user maximum date range selected
    *       - selectedMinMaxRange  <- Retrieves an array with user minimum and maximum date range selected
    * */


    @Input() date:           string;
    @Input() rangeSelection: boolean = false;
    @Input() rangeBy:        string;
    @Input() rangeDays:      number;
    @Input() userCanClick:   boolean;
    @Input() dualCalendar:   boolean = false;
    @Input() customRange:    any;

    @Output() selectedMinRange: EventEmitter<any> = new EventEmitter<any>();
    @Output() selectedMaxRange: EventEmitter<any> = new EventEmitter<any>();
    @Output() selectedMinMaxRange: EventEmitter<any> = new EventEmitter<any>();
    @Output() selectedDay:      EventEmitter<any> = new EventEmitter<any>();
    @Output() newRangeType:      EventEmitter<any> = new EventEmitter<any>();


    localeString:            string = 'es';
    navDate:                 any;
    navDatePrev:             any;
    weekDaysHeaderArr: Array<any> = [];
    gridArr:           Array<any> = [];
    gridArrPrev:       Array<any> = [];
    selectedDate:            any;
    minDate:                 any;
    maxDate:                 any;
    dateClicked:             any;
    clickCounter:            any = 0;


 
    constructor() { }

    ngOnChanges(change: SimpleChanges ){
        this.ngOnInit();
    }

    ngOnInit() {
     this.navDate = '';
     this.gridArr = [];
     this.gridArrPrev = [];
     this.weekDaysHeaderArr = [];
     this.clickCounter = 0;
     this.dateClicked = '';


        moment.locale(this.localeString);

        if (this.date){
            this.navDatePrev = moment(this.date).subtract(1,'month');
            this.navDate = moment(this.date);
        } else {
            this.navDatePrev = moment().subtract(1,'month');
            this.navDate = moment();
        }


        if (this.rangeSelection){
            this.newRangeType.emit(this.rangeBy);
            if (this.rangeBy == 'today'){
                this.minDate = moment();
                this.maxDate = moment();
            } else if (this.rangeBy == 'yesterday'){
                this.minDate = moment().subtract(1, 'days');
                this.maxDate = moment();
            } else if (this.rangeBy == 'lastDays'){
                this.minDate = moment().subtract(this.rangeDays, 'days');
                this.maxDate = moment();
            } else if (this.rangeBy == 'nextDays'){
                this.minDate = moment();
                this.maxDate = moment().add(this.rangeDays, 'days');
            }  else if (this.rangeBy == 'currentMonth'){
                this.minDate = moment().startOf('month');
                this.maxDate = moment().endOf('month');
            }  else if (this.rangeBy == 'lastMonth'){
                this.minDate = moment().subtract(1, 'month').startOf('month');
                this.maxDate = moment().subtract(1, 'month').endOf('month');
            }  else if (this.rangeBy == 'nextMonth'){
                this.minDate = moment().add(1, 'month').startOf('month');
                this.maxDate = moment().add(1, 'month').endOf('month');
            } else if (this.rangeBy == 'custom'){
                if (this.customRange){

                    this.minDate = moment(this.customRange[0]);
                    this.maxDate = moment(this.customRange[1]);
                } else {
                    console.log("Custom range needs an array to be passed, check documentation please.")
                }

            }
        }

        this.makeHeader();
        this.makeGrid();
        this.makeGridPrev();

        this.selectedMinRange.emit(this.minDate);
        this.selectedMaxRange.emit(this.maxDate);
        this.selectedMinMaxRange.emit([this.minDate, this.maxDate]);


        // TESTING PURPOSES ONLY


    }

    changeNavMonth(num){
        if(this.canChangeNavMonth(num)){
            this.navDate.add(num, 'month');
            this.navDatePrev.add(num, 'month');
            this.makeGrid();
            this.makeGridPrev();
        }
    }

    canChangeNavMonth(num){
        const clonedDate = moment(this.navDate);
        clonedDate.add(num, 'month');
        const minDate = moment().add(-1, 'year');
        const maxDate = moment().add(1, 'year');
        return clonedDate.isBetween(minDate, maxDate);
    }
    makeHeader(){
        const weekDaysArr: Array<number> = [0, 1, 2, 3, 4, 5, 6];
        weekDaysArr.forEach(day => this.weekDaysHeaderArr.push(moment().weekday(day).format('dd')));
    }
    makeGrid(){
        this.gridArr = [];

        const firstDayDate = moment(this.navDate).startOf('month');
        const initialEmptyCells = firstDayDate.weekday();
        const lastDayDate = moment(this.navDate).endOf('month');
        const lastEmptyCells = 6 - lastDayDate.weekday();
        const daysInMonth = this.navDate.daysInMonth();
        const arrayLength = initialEmptyCells + lastEmptyCells + daysInMonth;

        for(let i = 0; i < arrayLength; i++){
            let obj: any = {};
            if(i < initialEmptyCells || i > initialEmptyCells + daysInMonth -1){
                obj.value = 0;
                obj.available = false;
            } else {
                obj.value = i - initialEmptyCells +1;
                obj.available = this.isAvailable(i - initialEmptyCells +1);
            }
            this.gridArr.push(obj);
        }
    }

    makeGridPrev(){
        this.gridArrPrev = [];

        const firstDayDate = moment(this.navDatePrev).startOf('month');
        const initialEmptyCells = firstDayDate.weekday();
        const lastDayDate = moment(this.navDatePrev).endOf('month');
        const lastEmptyCells = 6 - lastDayDate.weekday();
        const daysInMonth = this.navDatePrev.daysInMonth();
        const arrayLength = initialEmptyCells + lastEmptyCells + daysInMonth;

        for(let i = 0; i < arrayLength; i++){
            let obj: any = {};
            if(i < initialEmptyCells || i > initialEmptyCells + daysInMonth -1){
                obj.value = 0;
                obj.available = false;
            } else {
                obj.value = i - initialEmptyCells +1;
                obj.available = this.isAvailable(i - initialEmptyCells +1);
            }
            this.gridArrPrev.push(obj);
        }
    }

    isAvailable(num: number): boolean{
        let dateToCheck = this.dateFromNum(num, this.navDate);
        if(dateToCheck.isBefore(moment(), 'day')){
            return false;
        } else {
            return true;
        }
    }

    deselectAll(){
        this.minDate = "";
        this.maxDate = "";
    }

    dateFromNum(num: number, referenceDate: any): any{
        let returnDate = moment(referenceDate);
        return returnDate.date(num);
    }

    generateNewData(){
        let swipeDate1;
        let swipeDate2;
        if (this.minDate.isAfter(this.maxDate)){
            swipeDate1 = this.minDate;
            swipeDate2 = this.maxDate;
            this.minDate = swipeDate2;
            this.maxDate = swipeDate1;
        }


        this.makeGrid();
        this.makeGridPrev();


        this.selectedMinRange.emit(this.minDate);
        this.selectedMaxRange.emit(this.maxDate);
        this.selectedMinMaxRange.emit([this.minDate, this.maxDate]);
    }
    clickSelectDay(day, pickerDate){
        if(this.userCanClick){
            this.selectedDay.emit(this.dateFromNum(day.value, pickerDate));

            if(this.clickCounter == 0){
                this.minDate = "";
                this.maxDate = "";
                this.minDate =  this.dateFromNum(day.value, pickerDate);
                this.clickCounter++;

            } else if(this.clickCounter == 1) {
                this.maxDate =  this.dateFromNum(day.value, pickerDate);
                this.clickCounter = 0;
                this.newRangeType.emit('custom');
                this.generateNewData();

            }

        }
        this.dateClicked = this.selectDay(day, pickerDate);
        this.selectDay(day, pickerDate);
    }

    selectDay(day: any, pickerDate){
        this.selectedDate = this.dateFromNum(day.value, pickerDate);

        return this.selectedDate;
    }
    getIsToday(day, pickerDate){
        return moment(this.selectDay(day, pickerDate)).isSame(moment(), 'day');
    }


    checkActiveStart(day, pickerDate){
        if (this.minDate && this.maxDate){
           return  this.minDate.isSame(this.selectDay(day, pickerDate), 'day')
        }
        else {
            return false;
        }
    }

    checkActiveEnd(day, pickerDate){
        if (this.minDate && this.maxDate){
            return  this.maxDate.isSame(this.selectDay(day, pickerDate), 'day')
        }
        else {
            return false;
        }
    }
    checkBetween(day, pickerDate){
        if (this.minDate && this.maxDate){
            let tempDate = this.selectDay(day, pickerDate);
            let swipeDate1;
            let swipeDate2;

            if (this.minDate.isAfter(this.maxDate)){
                swipeDate1 = this.minDate;
                swipeDate2 = this.maxDate;
                this.minDate = swipeDate2;
                this.maxDate = swipeDate1;
            }

            return tempDate.isBetween(this.minDate, this.maxDate);
        } else {
            return false;
        }
    }
    checkSelected(day, pickerDate){
        if (this.userCanClick && this.dateClicked){
            return this.dateClicked.isSame(this.selectDay(day, pickerDate), 'day');
        } else {
            return false;
        }
    }





}
