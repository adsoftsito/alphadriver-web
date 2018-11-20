import { Component, Input, ViewChild, EventEmitter, Output, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    moduleId: module.id.toString(),
    selector: 'menu-window-component',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './menu.window.component.html',
    styleUrls: ['./menuWindow.scss']
})
export class MenuWindowComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  algo: string = "este es algo";

   ngOnInit () {

   }
   onButtonClicked (content) {
     console.info(content);
     this.modalService.open(content, { size: 'lg' , keyboard: true, windowClass: 'modal-dialog-edit', backdrop: true });
   }

   cambiarAlgo() {
     this.algo = "no soy nada";
   }
}
