import {Component, OnInit, OnDestroy, Output} from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET, RoutesRecognized, NavigationStart, RouterState } from "@angular/router";
import "rxjs/add/operator/filter";
import {EventsService} from "../../../shared/providers/events";
import {Constants} from "../../../shared/providers/constants";
import { IMAGES_ROOT } from "../../theme.constants";

interface IBreadcrumb {
  label: string;
  params: Params;
  url: string;
  action: string;
}
  
@Component({
  selector: "breadcrumb",
  templateUrl: './breadcrumb.html',
  styleUrls: ['./breadcrumb.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {


  
 
  public breadcrumbs: IBreadcrumb[];
  public companyName: string;
  public parameter: string;
  private listRoutes=[];
  public previousRouter;
  public iconBack:string;
  public configureVisibleRoutes;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private events: EventsService,
    private C: Constants
  ) {

    this.breadcrumbs = [];
    this.events.subscribe(this.C.EVENTS_SERVICE.COMPANY_NAME, (res) => {
      this.companyName=res;
    });

    this.events.subscribe(this.C.EVENTS_SERVICE.BREADCRUMB_SET_MANUAL_BREAD, (routinActual)=>{
      this.breadcrumbs = routinActual;
    });

    
  }


  ngOnInit() {
    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";
    const  IN_ACTION_KEY: string = "inAction";
    //subscribe to the NavigationEnd event
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
       setTimeout(() => {
          let root: ActivatedRoute = this.activatedRoute.root;
          this.breadcrumbs = this.getBreadcrumbs(root);
          this.breadcrumbs.splice(0, 1);
        }, 200);
    });

    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        this.returnUrl(event.url)
      }
    });
  }

  
 returnUrl(url){
 /* this.listRoutes.push(url);
    if(this.listRoutes.length > 2){
      this.listRoutes.splice(0, 1);
      this.events.publish(this.C.EVENTS_SERVICE.RETURN_THE_URL_TO_A_PREVIOUS, this.listRoutes);
    }
    if(this.listRoutes.length === 2){
      this.events.publish(this.C.EVENTS_SERVICE.RETURN_THE_URL_TO_A_PREVIOUS, this.listRoutes);
    }*/
    this.events.publish(this.C.EVENTS_SERVICE.RETURN_THE_URL_TO_A_PREVIOUS, '');
  }




  ngOnDestroy() {
    this.events.unsubscribe(this.C.EVENTS_SERVICE.BREADCRUMB_SET_MANUAL_BREAD);
    this.events.unsubscribe(this.C.EVENTS_SERVICE.COMPANY_NAME);
    this.events.unsubscribe(this.C.EVENTS_SERVICE.LOG_ALERTS_RETURN_BUTTON_TOGGLE);
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string="", breadcrumbs: IBreadcrumb[]=[]): IBreadcrumb[] {
    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";
    const IN_ACTION_KEY: string = "inAction";
    //get the child routes
    let children: ActivatedRoute[] = route.children;
    //return if there are no more
    if (children.length === 0) {
      return breadcrumbs;
    }

    //iterate over each children
    for (let child of children) {
      //verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      //get the route's URL segment
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

      //append route URL to URL
      url += `/${routeURL}`;

      //add breadcrumb
      let breadcrumb: IBreadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url,
        action: child.snapshot.data[IN_ACTION_KEY]
      };
      breadcrumbs.push(breadcrumb);
      //recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }



}
