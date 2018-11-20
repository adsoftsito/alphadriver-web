import {Input, OnInit, Directive, ElementRef} from "@angular/core";

import 'intl-tel-input';
import * as jQuery from 'jquery';
/**
 * Created by Tech Group BWL on 23/05/2018.
 */
@Directive({
    selector: '[motumDIntlTelInput]'
})
export class MotumIntlTelInputDirective implements OnInit {
    @Input('motumDIntlTelInput') motumIntlTelInput: any;

    constructor(private el: ElementRef) {}

    ngOnInit() {
        //TODO: change this line to local utils.js
        jQuery.fn.intlTelInput.loadUtils('https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.12/js/utils.js');
        //jQuery.fn.intlTelInput.loadUtils('intl-tel-input/build/js/utils');
        jQuery(this.el.nativeElement).intlTelInput(this.motumIntlTelInput);
    }
}
