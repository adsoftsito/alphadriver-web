import { Component, OnInit, Input, OnChanges,OnDestroy } from '@angular/core';
import { MonitoringReactionService } from '../../../montoringReaction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mr-travelinformation',
  templateUrl: './travelinformation.component.html',
  styleUrls: ['./travelinformation.component.scss']
})
export class MonitoringReactionTravelinformationComponent implements OnInit, OnChanges,OnDestroy {

  @Input() idVehicle:any;
  travelinformationquery: any;
  $subscriptionTravelDetail:Subscription;
  unitDetail:any;

  constructor(private _serviceMonitoringReaction:MonitoringReactionService) {
    
   }

  ngOnInit() {
  }

  ngOnChanges(){
    this.getDetailVehicle();
  }

  ngOnDestroy(){
    this.$subscriptionTravelDetail.unsubscribe();
  }

  getDetailVehicle(){
    this.$subscriptionTravelDetail = this._serviceMonitoringReaction.unitDetailTravel(this.idVehicle).subscribe(
      res=>{
      const body = JSON.parse(res['_body']);
      this.unitDetail = body;
      
    },
    err=>{
      console.log(err);
    }
  );
   }

  /*heroes:any =[
    {"label":"finviaje","name":"Fin de viaje", "fecha":"26/06/18","hora":"04:20 pm","timetotal":"9h 01m" ,
    "data":[
        {  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"finished"},
        { "title": "Salida de Punto Base, Veracruz, México", "lastEvent":"movement"}
      ]
  },
    {"label":"detenido","name":"Detenido", "fecha":"25/06/18", "hora":"07:20 pm"},
    {"label":"intravel","name":"En viaje", "time":"05m 24s", "fecha":"25/0/18","hora":"6:55pm", "timetotal":"03h 02m",
    "data":[
        {"title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"finished"},
        { "title": "Carretera México-Veracruz, México.", "lastEvent":"movement"}
      ]
  },
  {"label":"inicioviaje","name":"Inicio de viaje", "time":"05m 24s", "fecha":"25/06/18","hora":"04:00 pm","timetotal":"03h 10m" ,
  "data":[
      {  "title": "Carretera México-Veracruz, México.", "lastEvent":"finished"},
      { "title": "Salida punto A", "lastEvent":"movement"}
    ]
},
  {"label":"apagado", "name":"Apagado","time":"05m 24s", "fecha":"25/06/18", "hora":"06:55pm"}
  ];*/


  heroes:any =[
    {"label":"finviaje","name":"Fin de viaje", "fecha":"26/06/18","hora":"04:20 pm","timetotal":"9h 01m", 
    "data":[
        { "time":"90h 22m" , "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"finished"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"}
      ]
  },
  {"label":"detenido","name":"Detenido", "date":"25/06/18", "hora":"06:55pm"},
  {"label":"intravel","name":"En viaje", "time":"05m 24s", "fecha":"25/0/18","hora":"6:55pm", "timetotal":"03h 02m",
    "data":[
        { "time":"90h 22m" , "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"finished"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México." , "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México." , "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"}
      ]
  },
    {"label":"detenido","name":"Detenido", "date":"25/06/18", "hora":"06:55pm"},
    {"label":"inicioviaje","name":"Inicio de viaje", "time":"05m 24s", "fecha":"25/06/18","hora":"04:00 pm","timetotal":"03h 10m" ,
    "data":[
        { "time":"90h 22m" , "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"finished"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México." , "lastEvent":"movement"},
        { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"}
      ]
  },
  {"label":"apagado", "name":"Apagado","time":"05m 24s", "date":"25/06/18", "hora":"06:55pm"},
  {"label":"inicioviaje","name":"Inicio de viaje", "time":"05m 24s", "fecha":"25/06/18","hora":"04:00 pm","timetotal":"03h 10m" ,
  "data":[
      { "time":"90h 22m" , "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"finished"},
      { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
      { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
      { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
      { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
      { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
      { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
      { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
      { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
      { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
      { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
      { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
      { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
      { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
      { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"},
      { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México." , "lastEvent":"movement"},
      { "time":"90h 22m",  "title": "Parque Industrial, Navojoa, Son, México.", "lastEvent":"movement"}
    ]
},
  {"label":"apagado", "name":"Apagado","time":"05m 24s", "date":"25/06/18", "hora":"06:55pm"}
    
  ];

}
