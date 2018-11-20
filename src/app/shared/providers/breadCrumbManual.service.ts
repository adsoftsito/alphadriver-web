import {Injectable} from "@angular/core";
import { Constants } from "./constants";
import { EventsService } from "./events";


@Injectable()
export class BreadCrumManual {

    constructor(
        private event: EventsService,
        private C: Constants
    ){}

    
    generateManualRouting(labels, urlRouting, action, params){

        let newLables=[];
    
          if(labels.length === action.length){
              if(params.length>0){
                labels.push(params[0]);
                action.push(0);
                for(let i=0;i<labels.length; i++){
                  let IBreadcrumb= {
                    label: labels[i],
                    params: {},
                    url: urlRouting[0],
                    action:  action[i]
                  }
                  newLables.push(IBreadcrumb);
                }
              }else{
                  for(let j=0;j<labels.length; j++){
                    let IBreadcrumb= {
                      label: labels[j],
                      params: {},
                      url: urlRouting[0],
                      action:  action[j]
                    }
                    newLables.push(IBreadcrumb);
                  }
              }
          }else{
            
            if(params.length>0){
                console.log(labels);
                action.push(0);
                labels.push(params[0]);
                console.log(labels);
                for(let b=0;b<labels.length; b++){
                  let IBreadcrumb= {
                    label: labels[b],
                    params: {},
                    url:  urlRouting[0],
                    action:  action[b]
                  }
                  newLables.push(IBreadcrumb);
                }
              
            }
          }
          this.event.publish(this.C.EVENTS_SERVICE.BREADCRUMB_SET_MANUAL_BREAD, newLables);
      }
}
