import { Component, OnInit } from '@angular/core';
/**
 * Created by Tech Group BWL on 13/07/2018.
 */
@Component({
  selector: 'lu-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class ListUnitsOptionsComponent implements OnInit {

  //Translate
  download = 'pages.monitoringreaction.listUnits.options.download';
  print = 'pages.monitoringreaction.listUnits.options.print';

  constructor() { } 

  ngOnInit() {
  }

}
