import {Component, AfterViewInit, Input, EventEmitter, Output, ElementRef, ViewChild, ViewEncapsulation} from "@angular/core";
import 'intl-tel-input';
import * as jQuery from 'jquery';
/**
 * Created by Tech Group BWL on 23/05/2018.
 */
@Component({
    selector: "motum-intl-tel-input",
    template: `
        <input #intlInput
      [motumDIntlTelInput]="intlOptions"
      [id]="id"
      [ngModel]="value"
      (ngModelChange)="onInputChange($event)" [ngClass]="cssClasses">
    `,
    styleUrls: ['./motumIntlTelInput.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MotumIntlTelInputComponent implements AfterViewInit{
    @Input() fullValue: string;
    @Output() fullValueChange = new EventEmitter<string>();
    @Input() id: string;
    @Input() intlOptions = {initialCountry: 'mx', formatOnDisplay: false, separateDialCode: true};
    @Input() value: string;
    @Input() valueChange = new EventEmitter<string>();
    @ViewChild('intlInput') intlInput: ElementRef;
    @Input() cssClasses: string = "";

    constructor() {}

    ngAfterViewInit() {
        if (this.fullValue && this.id && !this.value) {
            setTimeout(() => {
                const phoneInput = jQuery(`input#${this.id}`);
                phoneInput.intlTelInput('setNumber', this.fullValue);
            }, 100);
        }
    }

    onInputChange(value: string) {
        this.value = value;
        this.valueChange.emit(value);
        this.fullValue = jQuery(this.intlInput.nativeElement).intlTelInput('getNumber');
        this.fullValueChange.emit(this.fullValue);
    }
}