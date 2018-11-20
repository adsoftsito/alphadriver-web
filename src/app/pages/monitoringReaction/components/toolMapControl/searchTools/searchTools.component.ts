/**
* Created by Tech Group BWL on 16/07/2018.
*/
import {Component, OnInit, ViewEncapsulation, OnDestroy, AfterViewInit,
   Output, EventEmitter, Input, NgZone} from '@angular/core';

  import {Subscription, Subject} from "rxjs";
  import 'rxjs/add/operator/debounceTime';
  import 'rxjs/add/operator/throttleTime';
  import 'rxjs/add/observable/fromEvent';
  import { } from 'googlemaps';
  import { MapsAPILoader } from "@agm/core/services/maps-api-loader/maps-api-loader";
  declare var google: any;
  import { Observable } from "rxjs/Observable";

  @Component({
    selector: 'mr-search-tools-component',
    templateUrl: './searchTools.component.html',
    styleUrls: ['./searchTools.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
  export class MonitoringReactionSearchToolsComponent implements OnInit, OnDestroy, AfterViewInit{
    private autocompleteService;
    private geocoder;
    public latitude: number;
    public longitude: number;
    public zoom: number;

    private results$: Observable<any[]>;

    @Input() unitsPosition: any;

    @Output() setLocation: EventEmitter<any> = new EventEmitter<any>();
    tableId: string;
    addressList: Array<any> = [];
    vehicleList: Array<any> = [];
    interestPointList: Array<any> = [];
    previousData: Array<any[]>;

    searchInterestPointSubject = new Subject<any>();
    $searchInterestPoint: Subscription;

    visibleIconReset:boolean=false;
    visibleIconResetVehi:boolean=false;
    visibleIconResetPI:boolean=false;

    filterVehiclesModel: string = null;
    filterAddressModel: string = null;

    constructor( private motumMapsApiLoader: MapsAPILoader, private ngZone: NgZone) {}

    ngOnInit() {
      this.setUpDebounceTimeInput();
      this.searchLocations();
    }
    searchLocations() {
      this.motumMapsApiLoader.load().then(() => {
        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.geocoder = new google.maps.Geocoder();
      });
}
getPlacePredictions(term: string): Observable<any[]> {
  return Observable.create(observer => {
    // API Call
    this.autocompleteService.getPlacePredictions({ input: term }, data => {
      // Data validation
      if (data) {
        this.previousData = data;
        observer.next(data);
        observer.complete();
      } else if (!data) {
        observer.next(this.previousData);
        observer.complete();
      } else {
        observer.error(status);
      }
    });
  });
}

ngAfterViewInit() {
}

ngOnDestroy() {
  this.$searchInterestPoint.unsubscribe();
}
changesSearchAddressValue(data) {
  if (data) {
    this.results$ = this.getPlacePredictions(data);
    this.results$.subscribe(
      result => {
      this.ngZone.run(() => {
        this.retrieveAddresses(result);
      });
    }, err => {
      console.info(err);
    });
  } else {
    this.addressList = [];
  }
}
changesSearchVehiclesValue(data) {
  if (data) {
    this.retrieveVehicles(data);
  }else {
    this.vehicleList = [];
  }
}
setUpDebounceTimeInput() {
  this.$searchInterestPoint = this.searchInterestPointSubject
  .map((event: any)=> event.target.value)
  .debounceTime(500)
  .distinctUntilChanged()
  .subscribe(data => {
    this.retrieveInterestsPoints(data);
  });
}

retrieveAddresses(data) {
  this.addressList = [];
  if (data) {
      let promiseList = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].place_id) {
          promiseList.push(new Promise((resolve) => {
            this.geocoder.geocode({ 'placeId': data[i].place_id }, (results, status) => {
              try {
                if (results[0].geometry.location.lat() && results[0].geometry.location.lat()
                    && data[i].description) {
                      resolve({
                        label: data[i].description,
                        latitude: results[0].geometry.location.lat(),
                        longitude: results[0].geometry.location.lng(),
                      });
                }
              }catch(e) {
                resolve(null);
              }
            });
          }));
        }
      }
      Promise.all(promiseList)
        .then(values => {
          if(values) {
            Promise.resolve(null).then(() => {this.addressList = values;
             this.addressList = this.addressList.filter(Boolean);
             });
          }
        });
  }
}
setLocationOfAddres (e) {
  let address: Array<any> = [];
  address.push({
    latitude: e.latitude,
    longitude: e.longitude,
    zoom: 15
  });
  this.filterAddressModel = e.label;
  this.setLocation.emit(address);
}

retrieveVehicles(data) {

  this.vehicleList = [];
  if (this.unitsPosition && data) {
    let units = this.filterVehicles(this.unitsPosition, data);
    for (let i = 0; i < units.length; i++) {
      if (i > 4) {
          break;
      }
      this.vehicleList.push({
        label: units[i].economicNumber,
        latitude: units[i].lat,
        longitude: units[i].lng,
      });
    }
    return;
  }
}

filterVehicles(data, s) {
  return data.filter(e => e.economicNumber.toString().indexOf(s) > -1)
  .sort((a,b) => a.economicNumber.toString().includes(s) && !b.economicNumber.toString()
  .includes(s) ? -1 : b.economicNumber.toString().includes(s) && !a.economicNumber.toString().includes(s) ? 1 :0);
  // let keys = Object.keys(data[0]);
  //   let result = [];
  //   for (let key of keys) {
  //       console.info(key);
  //       if(key == 'economicNumber'){
  //         let subresult = data.filter(e => e[key].indexOf(s) != -1);
  //         console.info(subresult);
  //         for (let e of subresult) {
  //             if (result.indexOf(e) == -1) {
  //                 result.push(e);
  //             }
  //         }
  //       }
  //
  //   }
  //   return result;
}
setLocationOfVehicle(vehicle){
  let address: Array<any> = [];
  address.push({
    latitude: vehicle.latitude,
    longitude: vehicle.longitude,
    zoom: 17
  });
  this.filterVehiclesModel = vehicle.label;
  this.setLocation.emit(address);
}

retrieveInterestsPoints(data) {
  this.interestPointList = [];
  if (data) {
    for (let i = 0; i < 5; i++) {
      this.interestPointList.push({
        label: data,
        unit: ''
      });
    }
    return;
  }
}

resetFlags(event) {
  this.tableId = event.nextId;
  this.filterVehiclesModel= null;
  this.filterAddressModel = null;
  this.visibleIconResetPI=false;
  this.vehicleList = [];
  this.addressList = [];
  if(this.tableId == "tab-searchLocation"){
    this.searchLocations();
  }
}

}
