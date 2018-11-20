import {Component, Input, Output, EventEmitter, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {BaMenuService} from "../../../../services/baMenu/baMenu.service";
import {EventsService} from "../../../../../shared/providers/events";
import {Constants} from "../../../../../shared/providers/constants";
import { Router } from '@angular/router';
import { GlobalState } from '../../../../../global.state';

@Component({
  selector: 'ba-menu-item',
  templateUrl: './baMenuItem.html',
  styleUrls: ['./baMenuItem.scss']
})
export class BaMenuItem implements OnInit, OnDestroy {
  // @ViewChild(MenuComponent) menuComponent: MenuComponent;
  @Input() menuItem: any;
  @Input() idItem: String;
  @Input() child: boolean = false;

  @Output() itemHover = new EventEmitter<any>();
  @Output() toggleSubMenu = new EventEmitter<any>();
  @Output() activateStatusAppMenu = new EventEmitter<any>();
  @Output() activateStatus = new EventEmitter<any>();
  @Output() noRedirect= new EventEmitter<any>();
  @Output() dataAppMenu = new EventEmitter<any>();
  flagAppMenu: boolean = false;
  flag: boolean = false;
  flagSelected: boolean = false;
  lasItem: string = '';
  currentItem: string = '';
 idItemSelected:string='';
 menuCollapsed:boolean=true;;
  constructor(
    private service: BaMenuService,
    private events: EventsService,
    private C: Constants,
    private router: Router,
    private _globalState:GlobalState
  ) {}

  ngOnInit() {
    
    let item: any = {
      name: this.menuItem._id,
      status: this.menuItem.selected
    };
    //console.log('item ',item)
    //susbscripcion para saber si el menu está colapsado
    this.service.setStatusItems(item);
    this._globalState.menuCollapse$.subscribe(statusCollapse=>{
      this.menuCollapsed=statusCollapse;
    });
  }
  
  
  onHoverItem($event): void {
     this.itemHover.emit($event);
  }

  onToggleSubMenu($event, item): boolean {
    // this.onClickItem($event, item);

    $event.item = item;
    this.toggleSubMenu.emit($event);
    return false;
  }

  ngOnDestroy(){
    
  }

  onClickItem($event, item, selectedItem) {

    let d= this.service.toggleStatus(item._id);
    
    let selectedComponent =  this.service.selectedCurrentComponent();
    // console.log('items activos ',selectedComponent)
    //this.service.ItemMenuSelected(item._id);
   
    if(item.applications){
        
      let currentStatus = this.service.statusApplicationMenu(selectedItem.id);
      let currentComponent = this.service.getCurrentComponent();
      // console.log('status, ',currentStatus,' CURRENCOMPONENT ',currentComponent);
      if(item._id === currentComponent || item._id === selectedComponent){
        // console.log('current status ',currentStatus)
        if(currentStatus === false){
          this.events.publish(this.C.EVENTS_SERVICE.BA_MENU_ITEM_TO_APPLICATIONS_MENU_TOGGLE, true);
          setTimeout(() => {
            this.events.publish(this.C.EVENTS_SERVICE.BA_MENU_ITEM_TO_APPLICATIONS_MENU_DATA, item.applications);
          },0);
          this.service.statusUpdateMenu(selectedItem.id, true);
          let idAndStatus: any = {
            name: item._id,
            status: false
          };
          this.activateStatusAppMenu.emit(idAndStatus);
          
        }else{
          this.events.publish(this.C.EVENTS_SERVICE.BA_MENU_ITEM_TO_APPLICATIONS_MENU_TOGGLE, false);
            this.service.statusUpdateMenu(selectedItem.id, false);
            let idAndStatus: any = {
              name: item._id,
              status: true
            };
          this.activateStatusAppMenu.emit(idAndStatus);
          // console.log('component IF',currentComponent);  
        }
  
      }else{
        
        if(currentStatus === false){
            this.events.publish(this.C.EVENTS_SERVICE.BA_MENU_ITEM_TO_APPLICATIONS_MENU_TOGGLE, true);
                setTimeout(() => {
                  this.events.publish(this.C.EVENTS_SERVICE.BA_MENU_ITEM_TO_APPLICATIONS_MENU_DATA, item.applications);
                },0);
            this.service.statusUpdateMenu(selectedItem.id, true);
            let idAndStatus: any = {
              name: item._id,
              status: item.selected
            };
            this.activateStatusAppMenu.emit(idAndStatus);
            // document.getElementById(selectedItem.id).className = 'al-sidebar-list-item selected';
          }else{
            this.events.publish(this.C.EVENTS_SERVICE.BA_MENU_ITEM_TO_APPLICATIONS_MENU_TOGGLE, false);
            this.service.statusUpdateMenu(selectedItem.id, false);
            let idAndStatus: any = {
              name: item._id,
              status: item.selected
            };
            this.activateStatusAppMenu.emit(idAndStatus);
            document.getElementById(selectedItem.id).className = 'al-sidebar-list-item ';
          }

      }
      
    }else{

      let getNoRedirect = this.service.getNoRedirect(item.route.paths[2]);

      if(getNoRedirect){
        alert('La página que está solicitando, no está disponible');
        this.events.publish(this.C.EVENTS_SERVICE.BA_MENU_ITEM_TO_APPLICATIONS_MENU_TOGGLE, false);
        this.service.setCurrentComponent(null);
        this.noRedirect.emit();
        this.router.navigate(['/pages']);
      }else{
        let idAndStatus: any = {
          name: item._id,
          status: item.selected
        };
        this.activateStatus.emit(idAndStatus);
        this.events.publish(this.C.EVENTS_SERVICE.BA_MENU_ITEM_TO_APPLICATIONS_MENU_TOGGLE, false);
        this.service.statusUpdateMenu(selectedItem.id, false);
        this.service.setCurrentComponent(item._id);
      }

    }
    
   
  }

}
