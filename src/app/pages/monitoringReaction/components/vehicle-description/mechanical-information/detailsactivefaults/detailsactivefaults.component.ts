import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import {ChangeSpaceColsAndRowsService} from "../../../../../../shared/providers/changeSpaceColsAndRows.service";
import { TouchSequence } from '../../../../../../../../node_modules/@types/selenium-webdriver';

@Component({
  selector: 'mr-detailsactivefaults',
  templateUrl: './detailsactivefaults.component.html',
  styleUrls: ['./detailsactivefaults.component.scss']
})
export class MonitoringReactionDetailsactivefaultsComponent implements OnInit{

  jsondataprueba:any;

  constructor() { 
  }

  ngOnInit() {
    this.jsondataprueba=[
      {"code":"792010","color":"red","event":"Sensor de velocidad"},
      {"code":"80304","color":"red","event":"Voltaje ECU damasiado bajo"},
      {"code":"-1","color":"red","event":"Fallas de frenos"},
      {"code":"16804","color":"red","event":"Potencial eléctrico (voltaje)"},
      {"code":"52020103","color":"red","event":"Interruptor de voltaje izquierdo"}, 
      {"code":"52354302","color":"yellow","event":"Entrada del interruptor de faros"},
      {"code":"-1","color":"yellow","event":"Falla de panel de instrumentos"},
      {"code":"22563","color":"yellow","event":"TECU no operativa"},
      {"code":"-1","color":"yellow","event":"Falla de motor"},
      {"code":"792010","color":"yellow","event":"Sensor de velocidad"},
      {"code":"80304","color":"green","event":"Voltaje ECU demasiado bajo"},
      {"code":"-1","color":"green","event":"Falla de frenos"},
      {"code":"16804","color":"green","event":"Potencial eléctrico (voltaje)"},
      {"code":"52020103","color":"green","event":"Interruptor de voltaje izquierdo"},
      {"code":"52354302","color":"green","event":"Entradas del interruptor de faros"},
      {"code":"-1","color":"pistachio","event":"Falla de panel de instrumentos"},
      {"code":"22563","color":"pistachio","event":"TECU no operativa"},
      {"code":"-1","color":"pistachio","event":"Falla de motor"}
    ];
  }

}
