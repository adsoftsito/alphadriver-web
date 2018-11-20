import {Component, OnInit, Input, OnDestroy, AfterViewInit, OnChanges, SimpleChanges} from '@angular/core';




@Component({
    selector: 'motum-custom-marker-overlay',
    templateUrl: './MotumCustomMarker.component.html',
    styleUrls: ['./MotumCustomMarker.component.scss']
})
export class MotumCustomMarkerComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {


    @Input() unitMarker         : any;
    @Input() vehicleLabels      : Array<any> = [];
    @Input() userIsDragging     : boolean;
    @Input() markerVisualization;

    sumaTotal                   : number    = 0;
    status                      : any;
    hasInterestPoint            : boolean   =  false;
    interestPointColor          : any;
    hasMessages                 : any;
    hasAlerts                   : any;
    tooltipColor                : string    = 'color-blue';
    tooltipColorStroke          : string    = 'color-blue-stroke';
    engineStop                  : boolean   = false;


    constructor() { }

    closeInfoWindow(id){
        let infowindow = document.getElementById(id);
        let tooltip = document.getElementById(id + 'T');
        let tooltipLink = document.getElementById(id + 'L');
        infowindow.style.display ="none";
        tooltip.setAttribute("style",'display: inline-block; min-width: ' + this.sumaTotal + 'px;');
        tooltipLink.style.display="initial";

    }

    openInfoWindow(id){

        let elem = document.getElementById(id);
        let elemT = document.getElementById(id + 'T');
        let elemL = document.getElementById(id + 'L');


        if (elem.style.display == 'none' || elem.style.display == ''){

            let otherInfoWindows = document.getElementsByClassName("infowindow-style");
            let otherTooltips = document.getElementsByClassName("tooltip-info");
            let otherTooltipLinks = document.getElementsByClassName("tooltip-link");
            for(let i = 0; i < otherInfoWindows.length; i++){
                otherInfoWindows[i].setAttribute("style", "display:none");
                otherTooltips[i].setAttribute('style', "display: inline-block; min-width: " + this.sumaTotal +"px;");

                otherTooltipLinks[i].setAttribute("style", "display:initial");
            }
            elem.style.display = 'initial';
            elemT.style.display = 'none';
            elemL.style.display = 'none';
        } else {

            elem.style.display = 'none';
            elemT.setAttribute("style",'display: inline-block; min-width: ' + this.sumaTotal + 'px;');
            elemL.style.display = 'initial';
        }
    }

   ngOnInit() {
        this.engineStop = this.unitMarker.engineStop;
        if(this.unitMarker.alertType){
            if (this.unitMarker.alertType == 'HIGH'){
                this.hasAlerts = 'alert-danger';
            } else if (this.unitMarker.alertType == 'MEDIUM'){
                this.hasAlerts = 'alert-caution';
            } else if (this.unitMarker.alertType == 'LOW'){
                this.hasAlerts = 'alert-warning';
            } else if (this.unitMarker.alertType == 'INFO'){
                this.hasAlerts = 'alert-info';
            }
        } else {
            this.hasAlerts = 'alert-inactive';
        }


       if (!this.unitMarker.hasMessages){
            this.hasMessages = 'message-inactive';
       }

        if(this.unitMarker.signal.status){
            this.tooltipColor = 'color-blue';
            this.tooltipColorStroke = 'color-blue-stroke';
        } else {
            this.tooltipColor = 'color-red';
            this.tooltipColorStroke = 'color-red-stroke';
        }
        this.status = this.unitMarker.status.code;

        if(this.unitMarker.interestPoint){
            let code = this.unitMarker.interestPoint.code;
            switch (code){
                case 'prohibited':{
                    this.interestPointColor = '#000000';
                }break;
                case 'commercial':{
                    this.interestPointColor = '#b6d643';
                }break;
                case 'public': {
                    this.interestPointColor = '#2d9eea';
                }break;
            }
        }

   }

   startWindowListener(){

       $(document).on('mouseup', (event) => {
                if (this.userIsDragging == true){
                } else {
                    //console.log("Cerrando: ", this.userIsDragging);
                    if(
                        $(event.target).is('.info-window-options') ||
                        $(event.target).is('.info-window-header') ||
                        $(event.target).is('.info-window-item-container') ||
                        $(event.target).is('.info-window-item-container div') ||
                        $(event.target).is('.info-window-item-container div i') ||
                        $(event.target).is('.info-window-container') ||
                        $(event.target).is('span') ||
                        $(event.target).is('div.sensoron') ||
                        $(event.target).is('.info-window-detail') ||
                        $(event.target).is('.info-window-item.line') ||
                        $(event.target).is('.tm-e9ff') ||
                        $(event.target).is('.tm-ea02') ||
                        $(event.target).is('.tm-ea01') ||
                        $(event.target).is('.tm-ea00') ||
                        $(event.target).is('.tm-e9ed') ||
                        $(event.target).is('.tm-ea04') ||
                        $(event.target).is('.tooltip-info') ||
                        $(event.target).is('.tooltip-link') ||
                        $(event.target).is('.img-responsive')||
                        $(event.target).is('.justify-content-between') ||
                        $(event.target).is('.justify-content-between div.sensoron') ||
                        $(event.target).is('i.tm-e9f2') ||
                        $(event.target).is('i.tm-e9f3') ||
                        $(event.target).is('div.plus') ||
                        $(event.target).is('div.minus') ||
                        $(event.target).is('.motum-i.tm-e9f0.tm-1x') ||
                        $(event.target).is('.motum-i.tm-e980.tm-1x') ||
                        $(event.target).is('.motum-i.tm-e93f.tm-1x') ||
                        $(event.target).is('.motum-i.tm-e91f.tm-1x') ||
                        $(event.target).is('.m-menu__toggle') ||
                        $(event.target).is('.justify-content-between div.sensoroff') ||
                        $(event.target).is('.car-marker-container') ||
                        $(event.target).is('.marker-custom-car') ||
                        $(event.target).is('.car-style')

                    ){

                    } else {

                        let infowindow = document.getElementsByClassName('infowindow-style');
                        let otherTooltip = document.getElementsByClassName("tooltip-info");
                        let otherTooltipLinks = document.getElementsByClassName("tooltip-link");

                        for (let i = 0; i < infowindow.length; i++){
                           if (this.sumaTotal > 0){
                               this.createTooltipWidth();
                               infowindow[i].setAttribute("style", "display:none");
                               otherTooltip[i].setAttribute('style', "display: inline-block; min-width: "+ this.sumaTotal+"px;");
                               otherTooltipLinks[i].setAttribute("style", "display:initial");
                           }
                        }
                    }

                }


       });
   }

   createTooltipWidth(){
       this.sumaTotal = 0;
       if (this.vehicleLabels[0].selected) {
           this.sumaTotal = this.sumaTotal + 45;

       }
       if (this.vehicleLabels[1].selected){
           this.sumaTotal = this.sumaTotal + 60;

       }
       if (this.vehicleLabels[2].selected){
           this.sumaTotal = this.sumaTotal + 65;

       }
       if (this.vehicleLabels[3].selected){
           this.sumaTotal = this.sumaTotal + 14;

       }
       if (this.vehicleLabels[4].selected){
           this.sumaTotal = this.sumaTotal + 14;

       }
   }
   ngOnChanges(change: SimpleChanges){

        this.createTooltipWidth();
  }
   ngAfterViewInit(){

       $('.header-position.groupLabel').hover(function (element){
           let id = $(this).attr('id') + 'T';
           $("#" + id).attr('style',  'display: inline-block; min-width: ' + this.sumaTotal + 'px;');
            },(e)=>{
           $('.group-tooltip').css('display', 'none');
       });
       this.startWindowListener();

   }
   ngOnDestroy(){
       $(document).unbind('mouseup');
   }

   drawLine(from, to, line){
        let top;
        let left;
        let fT = from.offsetTop  + from.offsetHeight/2;
        let tT = to.offsetTop 	 + to.offsetHeight/2;
        let fL = from.offsetLeft + from.offsetWidth/2;
        let tL = to.offsetLeft 	 + to.offsetWidth/2;

        let CA   = Math.abs(tT - fT);
        let CO   = Math.abs(tL - fL);
        let H    = Math.sqrt(CA*CA + CO*CO);
        let ANG  = 180 / Math.PI * Math.acos( CA/H );
       console.log(tL - fL);
        if(tT > fT){
            top  = (tT-fT)/2 + fT;
        }else{
            top  = (fT-tT)/2 + tT;
        }
        if(tL > fL){
            left = (tL-fL)/2 + fL;
        }else{
            left = (fL-tL)/2 + tL;
        }

        if(( fT < tT && fL < tL) || ( tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)){
            ANG *= -1;
        }
        top-= H/2;

        line.style["-webkit-transform"] = 'rotate('+ ANG +'deg)';
        line.style["-moz-transform"] = 'rotate('+ ANG +'deg)';
        line.style["-ms-transform"] = 'rotate('+ ANG +'deg)';
        line.style["-o-transform"] = 'rotate('+ ANG +'deg)';
        line.style["-transform"] = 'rotate('+ ANG +'deg)';
        line.style.top    = top+'px';
        line.style.left   = left+'px';
       line.style.height   = H+'px';
        console.log(line);
    }



}
