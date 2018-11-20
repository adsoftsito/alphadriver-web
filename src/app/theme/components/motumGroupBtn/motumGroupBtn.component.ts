import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';


@Component({
    selector: 'motum-group-btn',
    templateUrl: './motumGroupBtn.component.html',
    styleUrls: ['./motumGroupBtn.component.scss']
})
export class MotumGroupBtnComponent implements OnInit, AfterViewInit {

    @Input() id : any = '';
    @Input() buttonsArray : any;
    @Output() selectedItem: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    ngOnInit() {


    }

    ngAfterViewInit(){
        if(!this.id){
            this.id = 'btn';
        }
    }


    btnClick(event){
        
        for(let i = 0; i < this.buttonsArray.length; i++){
            $("#" + this.id  + i ).removeClass("active");
        }
        
        document.getElementById(event.id).className = 'btn btn-secundary active';
        this.selectedItem.emit(event.id);

    }

}
