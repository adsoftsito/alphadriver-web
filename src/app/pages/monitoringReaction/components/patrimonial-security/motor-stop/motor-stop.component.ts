import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { NgbModal,  ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';


@Component({
  selector: 'motor-stop',
  templateUrl: './motor-stop.component.html',
  styleUrls: ['./motor-stop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MotorStopComponent implements OnInit {
  closeResult: string;
  @ViewChild('motorStop') motorStop: ElementRef;

  private _modalContent: any;
  private  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    //size:'lg',
    keyboard : false
  };

  constructor(private modalService:NgbModal, private _location:Location) { 
  }
  ngOnInit(){
    this.open(this.motorStop);
  }

  open(content) {
    
    const modal = this.modalService.open(content,this.ngbModalOptions);
    modal. result.then(() => {
      this._location.back() },
       () => { /*console.log('Backdrop click')*/});
    this._modalContent = content;
  }
 


}
