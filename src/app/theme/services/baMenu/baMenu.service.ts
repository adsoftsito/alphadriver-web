import {Injectable} from '@angular/core';
import {Router, Routes} from '@angular/router';
import * as _ from 'lodash';

//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import{BehaviorSubject,Subject,Observable} from 'rxjs';
@Injectable()
export class BaMenuService {
  menuItems = new BehaviorSubject<any[]>([]);
  currentComponent: string = null;
  objectRouter= [];
  idMenu = ['itemMenu0', 'itemMenu1', 'itemMenu2', 'itemMenu3', 'itemMenu4', 'itemMenu5', 'itemMenu6', 'itemMenu7', 'itemMenu8', 'itemMenu9', 'itemMenu10', 'itemMenu11', 'itemMenu12', 'itemMenu13', 'itemMenu14'];
  flagMenu = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  arrayNoRedirec = ['t', 'u', 'travel_matrix', 'ui', 'menuGrafiComponent'];
  flagNoRedirect: boolean = false;
  selectedComponent: Array<any>;
  subjectItemMenuSelect$:Subject<string>;
  observableItemMenuSelect:Observable<string>;

  protected _currentMenuItem = {};
  private _statusItems: Array<{name: string, status: boolean}> = [];

  constructor(private _router:Router) {
    this.subjectItemMenuSelect$=new Subject<string>();
    this.observableItemMenuSelect=this.subjectItemMenuSelect$.asObservable();
   }

  /**
   * Updates the routes in the menu
   *
   * @param {Routes} routes Type compatible with app.menu.ts
   */
  public updateMenuByRoutes(routes: Routes) {
    
    let convertedRoutes = this.convertRoutesToMenus(_.cloneDeep(routes));
    this.menuItems.next(convertedRoutes);
    
  }

  public convertRoutesToMenus(routes:Routes):any[] {
    
    let items = this._convertArrayToItems(routes);
    return this._skipEmpty(items);
  }
// Este servicio es para mandar al componente bacontenttop el titulo que se tiene en el routing
  // public getCurrentItem():any {
  //   return this._currentMenuItem;
  // }

  public selectMenuItem(menuItems:any[]):any[] {
    let items = [];
    
    menuItems.forEach((item) => {

      
      this._selectItem(item);
      if (item.selected) {
        this._currentMenuItem = item;
      }

      if (item.children && item.children.length > 0) {
        item.children = this.selectMenuItem(item.children);
      }
      items.push(item);
    });
    
    return items;
  }

  protected _skipEmpty(items:any[]):any[] {
    let menu = [];
    items.forEach((item) => {
      let menuItem;
      if (item.skip) {
        if (item.children && item.children.length > 0) {
          menuItem = item.children;
        }
      } else {
        menuItem = item;
      }

      if (menuItem) {
        menu.push(menuItem);
      }
    });

    return [].concat.apply([], menu);
  }

  protected _convertArrayToItems(routes:any[], parent?:any):any[] {
    let items = [];
    routes.forEach((route) => {
      items.push(this._convertObjectToItem(route, parent));
    });
    return items;
  }

  protected _convertObjectToItem(object, parent?:any):any {
    let item:any = {};
    if (object.data && object.data.menu) {
      // this is a menu object
      item = object.data.menu;
      item.route = object;
      delete item.route.data.menu;
    } else {
      item.route = object;
      item.skip = true;
    }
    // we have to collect all paths to correctly build the url then
    if (Array.isArray(item.route.path)) {
      item.route.paths = item.route.path;
    } else {
      item.route.paths = parent && parent.route && parent.route.paths ? parent.route.paths.slice(0) : ['/'];
      if (!!item.route.path) item.route.paths.push(item.route.path);
    }

    if (object.children && object.children.length > 0) {
      item.children = this._convertArrayToItems(object.children, item);
    }

    let prepared = this._prepareItem(item);

    // if current item is selected or expanded - then parent is expanded too
    if ((prepared.selected || prepared.expanded) && parent) {
      parent.expanded = true;
    }

    return prepared;
  }

  protected _prepareItem(object:any):any {
    
    if (!object.skip) {
      object.target = object.target || '';
      object.pathMatch = object.pathMatch  || 'full';
      return this._selectItem(object);
    }

    return object;
  }

  protected _selectItem(object:any):any {
    //Change full to prefix for object active in select menu
    object.selected = this._router.isActive(this._router.createUrlTree(object.route.paths), object.pathMatch === 'prefix');
    this.objectRouter.push(object);
    if(object.selected === true){ 
      this.objectRouter.push(object);
      this.selectedComponent = object._id;
      this.currentComponent = object._id;
    }
    return object;
  }

  setStatusItems(statusItem: {name: string, status: boolean}) {
    // console.log('llega: ',statusItem)
    // console.log('items sin actualiazar: ',this._statusItems)
    
    this._statusItems.push(statusItem);

    // console.log('items actualizados: ',this._statusItems)

  }

  getStatusItem(name: string) {
    let statusItem = null;
    this._statusItems.forEach((status) => {
      if (status.name === name) {
        statusItem = status;
      }
    });
    return statusItem;
  }

  toggleStatus(name: string) {
    
    let statusItem = null;
    this._statusItems.forEach((status) => {
      
      if (status.name === name) {
        
        status.status = !status.status;
        statusItem = status;
      } else
        status.status = false;

    });
    
  }
  selectedCurrentComponent(){
    return this.selectedComponent;
  }

  /**
   * update the active component
   */
  setCurrentComponent( name : string){
    this.currentComponent = name;
  }

  /**
   * returns the active component
   */
  getCurrentComponent(){
    return this.currentComponent;
  }

  getObjectRouter(){
    return this.objectRouter;
  }

  /**
   * close all application menu windows
   */
  statusUpdate(){
    for(let i in this.flagMenu){
      this.flagMenu[i] = false;
    }
  }

  /**
   * actualiza el id del menú que está activo, llega por ejem itemMenu1
   */
  statusUpdateMenu(id, status){
    for(let i in this.flagMenu){
      this.flagMenu[i] = false;
    }
    this.flagMenu[this.idMenu.indexOf(id)] = status;
    
  }
  /**
   * returns the status of the application menu that is requested
   */
  statusApplicationMenu(id){
    
    let statusFlag = this.flagMenu[this.idMenu.indexOf(id)];
    this.idMenu.indexOf(id);

    return statusFlag;
  }
  //Para almacenar el elemento seleccionado del menu
  ItemMenuSelected(nombre:string){
  this.subjectItemMenuSelect$.next(nombre);
  }

  /** 
   * returns true if the menu url is not available
   */
  getNoRedirect(url){
    this.flagNoRedirect = false;
    for(let i in this.arrayNoRedirec){
      if(url === this.arrayNoRedirec[i]){
        this.flagNoRedirect = true;
      }
    }
    return this.flagNoRedirect
  }
}
