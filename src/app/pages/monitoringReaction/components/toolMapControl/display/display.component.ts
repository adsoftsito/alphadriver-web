import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';

@Component({
  selector: 'mr-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class MonitoringReactionDisplayComponent implements OnInit {
  isAutomatic: boolean = false;
  display;
  viewMap: Array<any> = [];

  @Output() vehicleViews: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
  @Output() optionViewMap: EventEmitter<any> = new EventEmitter<any>();
  @Output() trafficLayer:  EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showLabels: EventEmitter<any> = new EventEmitter<any>();
    @Output() showClusters: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    
    this.display = [
      {
        label: 'pages.monitoringreaction.toolMapControl.display.vehicleDisplay',
        id: 'VV1',
        points: [
          {
            label: 'pages.monitoringreaction.toolMapControl.display.showVehicleType',
            id: 'SVT1',
            selected: false,
            disabled: false,
            subPoints: [] //end sub interest point
          },
          {
            label: 'pages.monitoringreaction.toolMapControl.display.showClusters',
            id: 'CLUS1',
            selected: false,
            disabled: false,
            subPoints: [] //end sub interest point
          },
          {
            label: 'pages.monitoringreaction.toolMapControl.display.showTraffic',
            id: 'TRA1',
            selected: false,
            disabled: false,
            subPoints: [] //end sub interest point
          },
          {
            label: 'pages.monitoringreaction.toolMapControl.display.showLabels',
            id: 'TAG1',
            subPoints: [
              {
                label: 'pages.monitoringreaction.toolMapControl.display.economic',
                id: 'ECO1',
                selected: true,
                disabled: true
              },
              {
                label: 'pages.monitoringreaction.toolMapControl.display.speed',
                id: 'ES1',
                selected: false,
                disabled: false
              },
              {
                label: 'pages.monitoringreaction.toolMapControl.display.operationStatus',
                id: 'EST1',
                selected: false,
                disabled: false
              },
              {
                label: 'pages.monitoringreaction.toolMapControl.display.alerts',
                id: 'ALERT1',
                selected: false,
                disabled: false
              },
              {
                label: 'pages.monitoringreaction.toolMapControl.display.messages',
                id: 'MSJ1',
                selected: false,
                disabled: false
              }
            ] //end sub interest point
          }
          

        ] //end array interest points
      }
      
    ]; // end array this.display

    this.viewMap = [
      {
        label: 'pages.monitoringreaction.toolMapControl.display.mapDisplay',
        id: 'MAP1',
        points: [
          {
            label: 'pages.monitoringreaction.toolMapControl.display.map',
            id: 'MA1',
            selected: true,
            disabled: false
          },
          {
            label: 'pages.monitoringreaction.toolMapControl.display.satelite',
            id: 'SA1',
            selected: false,
            disabled: false
          },
          {
            label: 'pages.monitoringreaction.toolMapControl.display.3dView',
            id: 'view3d',
            selected: false,
            disabled: false
          }
        ] //end array interest points
      }
    ];

     this.showLabels.emit(this.display[0].points[3].subPoints);

  }

  selectAll(){

  }

  viewLabelChange(array, j) {
      array[j].selected = !array[j].selected;
      this.showLabels.emit(array);
  }
  viewVehicleChange(array, i, j) {

    array[j].selected = !array[j].selected;

    this.display[i].points = array;

    let vehicleStatus = [];
    array.forEach((a) => {
      if(a.selected !== undefined) {
        vehicleStatus.push(a.selected);
      }
    });

    if (j === 0)
      this.vehicleViews.emit(vehicleStatus);


      if(array[j].label === 'pages.monitoringreaction.toolMapControl.display.showClusters'){
        this.showClusters.emit(array[j].selected);

      }

      if(array[j].label === 'pages.monitoringreaction.toolMapControl.display.showLabel'){
          let options = array[j];
          this.showLabels.emit(options);
      }

    if(array[j].label === 'pages.monitoringreaction.toolMapControl.display.showTraffic'){
      let showTrifficlayer = array[j].selected; 
      this.trafficLayer.emit(showTrifficlayer);
      
    }
  }
  
viewMapOption(optionsRadios){

    this.optionViewMap.emit(optionsRadios);
}

}
