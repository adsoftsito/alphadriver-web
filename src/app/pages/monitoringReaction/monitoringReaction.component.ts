import {Component, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef, ChangeDetectorRef, OnChanges } from "@angular/core";
import {Constants} from "../../shared/providers/constants";
import {BaMenuService} from "../../theme/services/baMenu/baMenu.service";
import {EventsService} from "../../shared/providers/events";
import {MonitoringReactionService} from "./montoringReaction.service";
import { TranslateService } from "../../../../node_modules/@ngx-translate/core";
import { BreadCrumManual } from "../../shared/providers/breadCrumbManual.service";
import {ChangeSpaceColsAndRowsService} from "../../shared/providers/changeSpaceColsAndRows.service";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Observable, Subscription } from "rxjs";
import {browser} from "protractor";
import {vehicleModel} from "../../shared/models/orders/vehicle.model";
import {AgmMarkerCluster} from "@agm/js-marker-clusterer";
/**
 * Created by Tech Group BWL on 25/06/2018.
 */
@Component({
  selector: 'monitoring-and-reaction-component',
  templateUrl: './monitoringReaction.component.html',
  styleUrls: ['./monitoringReaction.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
      trigger('togglingMenu', [
          state('in', style({ opacity: 1, transform: 'translateX(0)' })),
          transition('void => *', [
              style({
                  transform: 'translateX(-100%)',
              }),
              animate('0.4s ease'),
          ]),
          transition('* => void', [
              animate('0.4s ease-out', style({ transform: 'translateX(-100%)' })),
          ]),
      ]),
  ]
})
export class MonitoringReactionComponent implements OnInit, OnDestroy, AfterViewInit {



    motumCoords: any = {
    lat: 18.869296,
    lng: -97.051071
  };

  path: any;
  geoFenceVisibility: any;
  lang: string;
  geoFenceEditable: boolean = false;
  listOfPaths : Array<any> = [{
      label: '0',
      id: '0',
      selected: false,
      paths: [
          { lat: 0,  lng: 0 },
          { lat: 0,  lng: 0 },
          { lat: 0,  lng: 0 },
          { lat: 0,  lng:-0 }
      ]
  }];

  private ZOOM_IN: string = 'ZOOM_IN';
  private ZOOM_OUT: string = 'ZOOM_OUT';
  @ViewChild('motumAgm')
  _el: any;

  MENU_MONITORING_REACTION = 'monitoringAndReaction';
  displayUnitMenuComponent: boolean = false;
  flagUnitDataVehicle: boolean = false;
  flagFilterin: boolean = false;
  showListUnits: boolean = true;
  unitMarkers: Array<any> = [];
  groups: Array<any> = [];
  unitDataVehicle: Array<any> = [];
  MR_HTML_CLASSES: any;
  isChatDetail: boolean = false;
  sendChangeIconColor: string;
  flagSelected: boolean;
  listUnitsCopia=[];
  userIsDragging: boolean = false;
  vehicleLabels: Array <any> = [];
  viewClusters:any = false;


  // ---------------------------
  // MAP CONFIGURATION VARIABLES
  // ---------------------------
  latitude: number = this.motumCoords.lat;
  longitude: number = this.motumCoords.lng;
  zoom: number = 14;
  zoomControl: boolean = false;
  streetViewControl: boolean = false;
  mapStyles: Array<any> = this.C.MAP_STYLES;
  currentZoom: number = this.zoom;
  colorCircleDetail: any;
  viewMap = 'roadmap';
  trafficLayer:boolean;
  trafficLayerInstance;
  mapInstance;
  _map; any;

  // ------------------------------
  // MARKER CONFIGURATION VARIABLES
  // ------------------------------
  markerVisualization: string = 'POINTER';
  //subscriptions service-------------
  $subscriptionUnits:Subscription;
  $subscriptionGroups:Subscription;
  //----------------------------------
  constructor(
    private C: Constants,
    private baMenuService: BaMenuService,
    private event: EventsService,
    private service: MonitoringReactionService,
    private serviceColsAndRows:ChangeSpaceColsAndRowsService,
    private translate: TranslateService,
    private _service: BreadCrumManual,
    private cdr: ChangeDetectorRef,
  ) {
    this.MR_HTML_CLASSES = this.serviceColsAndRows.MR_HTML_CLASSES;
    this.event.subscribe(this.C.EVENTS_SERVICE.SIDEBAR_MENU_ITEM_TOGGLE, () => {this.initDisplayUnitMenuComponent()});
    this.initDisplayUnitMenuComponent();
    this.event.subscribe(this.C.EVENTS_SERVICE.MONITORING_REACTION_MENU_CHANGE_CLASS, (menuName, classes) => {
      this.onChangeMenuClasses(menuName, classes);
    });
    this.event.subscribe(this.C.EVENTS_SERVICE.MONITORING_REACTION_CHAT_DETAIL, (options) => {
      this.onChatDetailStatus(options.status);
      this.colorCircleDetail = options.circleColor;
      this.cdr.detectChanges();
    });
    this.changeLenguage();


  }



  ngAfterViewInit(){



  }
  ngOnInit() {
      this.loadGroups();
      this.loadUnits();
      this.startInfoWindowListener();


     // this.vehicleLabels = [{selected : true},{selected : false},{selected : false},{selected : false},{selected : false}];

  }
  ngOnDestroy() {
    this.event.unsubscribe(this.C.EVENTS_SERVICE.SIDEBAR_MENU_ITEM_TOGGLE);
    this.event.unsubscribe(this.C.EVENTS_SERVICE.MONITORING_REACTION_MENU_CHANGE_CLASS);
    this.event.unsubscribe(this.C.EVENTS_SERVICE.MONITORING_REACTION_CHAT_DETAIL);
    this.$subscriptionGroups.unsubscribe();
    this.$subscriptionUnits.unsubscribe();
  }
  onChatDetailStatus(status){
    this.isChatDetail = status;
  }
  closeChatDetail(){
    this.isChatDetail = false;
  }
  motumZoomControls(zoomType) {


    this.zoom = this.currentZoom;
    if (zoomType === this.ZOOM_IN && this.zoom < 22)
      this.zoom = this.zoom + 1;
    else if (zoomType === this.ZOOM_OUT && this.zoom > 0)
      this.zoom = this.zoom - 1;
  }

  zoomChange(currentZoom) {

    this.currentZoom = currentZoom;

  }

  initDisplayUnitMenuComponent() {
    let statusItem = this.baMenuService
      .getStatusItem(this.MENU_MONITORING_REACTION);
    if (statusItem)
      this.displayUnitMenuComponent = statusItem.status;
  }


  refreshMap(){

      //  location.reload();
        this.loadUnits();


  }
  loadUnits() {


    this.$subscriptionUnits = this.service.retrieveUnits()
      .subscribe(
        res => {

            const body = JSON.parse(res['_body']);            
          this.unitMarkers = body.units;
          //this.groups = body.groups;
          this.listUnitsCopia=this.unitMarkers;


        },
        err => {
          console.error(err);

        }
      )

  }

  loadGroups(){
    this.$subscriptionGroups = this.service.getGroups().subscribe(
      res => {
        const body = JSON.parse(res['_body']);
        this.groups = body.groups;        
      },
      err =>{
        console.log(err);
        
      }
    );

  }

  onChangeMenuClasses(menuName, classes) {
    Promise.resolve(null).then(() => {this.MR_HTML_CLASSES[menuName] = classes;});
  }

  sendUnit(unitData){
    this.unitDataVehicle = unitData;
    if(this.unitDataVehicle && this.unitDataVehicle.length > 0){
      this.flagUnitDataVehicle = true;
      this.flagFilterin = false;
      this.sendChangeIconColor = 'closeFO';
      this.flagSelected = true;
    }
  }
  openFiltering(flagFilteringOptions){
    this.flagFilterin = flagFilteringOptions;
    this.flagUnitDataVehicle = false;
    if(flagFilteringOptions){
      this.sendChangeIconColor = 'openFO';
    }else{
      this.sendChangeIconColor = 'closeFO';
      let breadcrumbLabels = ['Menu.monitoringReaction', 'general.vehicles'];
      this._service.generateManualRouting(breadcrumbLabels, [], [0,0], []);
    }
  }

  closeFiltering(close){
    this.sendChangeIconColor = 'closeFO';
    this.flagFilterin = close;
    let breadcrumbLabels = ['Menu.monitoringReaction', 'general.vehicles'];
    this._service.generateManualRouting(breadcrumbLabels, [], [0,0], []);
  }
  closeVehicleDescription(close){
    this.flagUnitDataVehicle = close;
    this.flagSelected = false;
    let breadcrumbLabels = ['Menu.monitoringReaction', 'general.vehicles'];
    this._service.generateManualRouting(breadcrumbLabels, [], [0,0], []);
  }

  changeLenguage(){
    this.lang = localStorage.getItem('lang');
    if(this.lang === null){
      this.translate.getBrowserLang();
    }else{
      this.translate.use(this.lang);
    }
  }

  mouseOver(event){
      console.log("HOLI");
  }
  loadPointsOfView(listOfPoints){



      if(this.listOfPaths.indexOf(listOfPoints) !== -1){
            let index = this.listOfPaths.indexOf(listOfPoints);
            this.listOfPaths[index].selected = listOfPoints.selected;
      } else {
            this.listOfPaths.push(listOfPoints);
      }

  }


  changeMarkerType(vehicleViews) {
    this.markerVisualization = vehicleViews[0] ? 'VEHICLE' : "POINTER";



  }
  setLocationMap(event) {
    if(event !== undefined && event !== null) {
      setTimeout(()=>{
        this.zoom = this.currentZoom;
        this.latitude = event[0].latitude;
        this.longitude = event[0].longitude;
        this.zoom = event[0].zoom;
      },100);
    }
  }
  buttonCloseOpen(event){
    this.showListUnits = event;
  }


  editGeoFence(event){

      //console.log(event);
      if (this.geoFenceEditable === true){
          //this.geoFenceEditable = false;
      } else {
          //this.geoFenceEditable = true;
      }


  }




  showListFiltered(value){
    
     let listFiltered;
     
     if(value==-1){
       //Do not apply filters
       //empty the copy to the original arrangement
        this.unitMarkers=this.listUnitsCopia;
     }
     else{
       //apply filters
       listFiltered = this.listUnitsCopia.filter((a)=>{
        return a.principalGroup.label === value;//by label
        // return a.principalGroup.id === value;//by id
       });
       this.unitMarkers=listFiltered;
     }
  }

  searching(value){
   if (value){
       this.service.searchUnits(value)
           .subscribe(
               res => {
                   const body = JSON.parse(res['_body']);
                   this.unitMarkers = body.units;
               },
               err => {
                   console.error(err);
               }
           )
   } else{
       this.service.retrieveUnits()
           .subscribe(
               res => {
                   const body = JSON.parse(res['_body']);
                   this.unitMarkers = body.units;
               },
               err => {
                   console.error(err);
               }
           )
   }
  }


  optionVisualizeMap(event){

    if(event === 'pages.monitoringreaction.toolMapControl.display.map'){
        this.viewMap = 'roadmap';
        this._map.setTilt(0);
    }if(event === 'pages.monitoringreaction.toolMapControl.display.satelite'){
        this.viewMap = 'satellite';
          this._map.setTilt(0);
    }if(event === 'pages.monitoringreaction.toolMapControl.display.3dView' ){
        this.viewMap = 'satellite';
        this._map.setTilt(45);
        this._map.setZoom(18);
    }
  }


  trafficLayerView(event) {
    this.trafficLayer = event;
   if (this.trafficLayer == true){
      this. trafficLayerInstance.setMap(this.mapInstance);
   } else {
       this.trafficLayerInstance.setMap(null);
   }
  }

  showTrafficLayer(mapInstance){
      this._map = mapInstance;
     this.trafficLayerInstance = new google.maps.TrafficLayer();
     this.mapInstance = mapInstance;



     //detect when user is dragging
      this.mapInstance.addListener("drag", (d) => {
          this.userIsDragging = true;
      });
      this.mapInstance.addListener("click", (d) => {
          this.userIsDragging = false;
      });

  }

    getVehicleLabels(labels) {
        //console.log(labels);
        this.vehicleLabels = labels;
        this.vehicleLabels = this.vehicleLabels.slice();
    }
    setClusters(clusters){
      this.viewClusters = clusters;
    }
    startInfoWindowListener(){

    }
}
