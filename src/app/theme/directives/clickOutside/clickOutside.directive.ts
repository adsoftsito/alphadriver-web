import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    constructor(private _elementRef : ElementRef) {
    }

    @Output()
    public clickOutside = new EventEmitter();

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if(targetElement.id === 'idAppMenuDiv' ||
             targetElement.id === 'idAppMenuIcon' || 
             targetElement.id === 'idAppMenu' || 
             targetElement.id === 'idContentMenu' || 
             targetElement.id === 'idContentRow' || 
             targetElement.id === 'idColMd' || 
             targetElement.id === 'idIconMenu' || 
             targetElement.id === 'idLabelMenu' ||
             targetElement.id === 'idContentMenu2' || 
             targetElement.id === 'idContentRow2' || 
             targetElement.id === 'idColMd2' || 
             targetElement.id === 'idIconMenu2' || 
             targetElement.id === 'idLabelMenu2'){
            this.clickOutside.emit(true);            
        }else{
            if (!clickedInside) {
                this.clickOutside.emit(null);
            }

        }
    }
}
