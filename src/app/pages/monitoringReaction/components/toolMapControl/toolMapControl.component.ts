

import {Component, Input, ViewEncapsulation, EventEmitter, Output, AfterViewInit} from "@angular/core";
//import {DOCUMENT} from "@angular/common";
 /* Created by Tech Group BWL on 10/07/2018.
 */

 declare var document;

@Component({
  selector: "mr-tool-map-control-component",
  templateUrl: './toolMapControl.component.html',
  styleUrls: ['./toolMapControl.component.scss'],
  encapsulation: ViewEncapsulation.None
})



export class MonitoringReactionToolMapControlComponent implements AfterViewInit {

  @Input() mapElement: any;
  @Input() unitsPosition: any;

  isDisplayContent = [false, false, false, false];
  isFullscreen: boolean = false;
  timeoutHandler: any;
  hasBeenLongPressed: boolean = false;
  isAutomatic: boolean = false;
  isRealTime: boolean = false;

  @Output() vehicleViews: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
  @Output() setMonitoringLocation: EventEmitter<any> = new EventEmitter<any>();
  @Output() listOfPoints: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
  @Output() viewClusters: EventEmitter<any> = new EventEmitter<any>();
  @Output() optionViewMap: EventEmitter<any> = new EventEmitter<any>();
  @Output() trafficLayerView: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() refreshMap: EventEmitter<any> = new EventEmitter<any>();
  @Output() vehicleLabels: EventEmitter<any> = new EventEmitter<any>();


  constructor(){

  }
    ngAfterViewInit(){
        $('#update-menu').on('contextmenu', (d)=>{
            this.activateContent(1);
            d.preventDefault();
        });
    }
  /**
   * Activate fullscreen map
   */
  fullScreenMode() {
    if (this.isFullscreen == false){

        let nativeElement = document.getElementById("agm-map");
        if (nativeElement.requestFullscreen) {
            nativeElement.requestFullscreen();
            this.isFullscreen = true;
        } else if (nativeElement.msRequestFullscreen) {
            nativeElement.msRequestFullscreen();
            this.isFullscreen = true;
        } else if (nativeElement.mozRequestFullScreen) {
            nativeElement.mozRequestFullScreen();
            this.isFullscreen = true;
        } else if (nativeElement.webkitRequestFullscreen) {
            nativeElement.webkitRequestFullscreen();
            this.isFullscreen = true;
        } else {

            console.error("Fullscreen not available");
        }
    } else {

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        this.isFullscreen = false;
    }
  }

  /**
   * Activate the current tool option selected
   * @param index
   */
  activateContent(index: number) {
    if (index > this.isDisplayContent.length - 1)
      return;
    if (this.isDisplayContent[index])
      this.isDisplayContent[index] = !this.isDisplayContent[index];
    else {
      this.desactiveAllContents();
      this.isDisplayContent[index] = true;
    }
  }

  /**
   * Deactivate any activated tool option
   */
  desactiveAllContents() {
    this.isDisplayContent = this.isDisplayContent.map(v => false);
  }

  // -------------------------
  // Configuration set methods
  // -------------------------
  sendVehicleViews(vehicleViews) {
    this.vehicleViews.emit(vehicleViews);

  }

  sendListOfPoints(listOfPoints){
     // console.log(listOfPoints);
      this.listOfPoints.emit(listOfPoints);
  }

  sendLabels(labels){
    this.vehicleLabels.emit(labels);
  }

  sendClusters(clusters){
      this.viewClusters.emit(clusters);
  }
  // ///////////////////////
  // UpdateOption process
  // ///////////////////////

  /**
   * Detects the kind of process is activated
   * from update tool option.
   * @param index
   */
  updateProcess(index: number) {

    if (this.isDisplayContent[index]) {
      this.isDisplayContent[index] = !this.isDisplayContent[index];
    } else {
      // Update process
      if (this.isAutomatic) {
       // console.info("Currently is on automatic mode");

      } else {
        this.refreshMap.emit();
       // console.info('Updating data');
      }
    }
  }
  toggleAutomatic(isAutomatic) {
    this.isAutomatic = isAutomatic;

  }
  toggleRealTime(isRealTime) {
    this.isRealTime = isRealTime;
  }
  setNewLocation(event) {
    this.setMonitoringLocation.emit(event);
  }


  // -----------------------
  // Holding button system
  // -----------------------
  displayReloadMenuOnMouseDown(index: number) {
    this.timeoutHandler = setTimeout(() => {
      this.hasBeenLongPressed = true;
      this.activateContent(index);
    }, 1000);
  }
  displayReloadMenuOnMouseUp(index: number) {
    clearTimeout(this.timeoutHandler);
    this.timeoutHandler = null;
    if (this.hasBeenLongPressed) {
      this.hasBeenLongPressed = false;
    }
  }

  optionVisalizeMap(event){
    this.optionViewMap.emit(event);
  }

  trafficLayer(event){
    this.trafficLayerView.emit(event);  
  }




}