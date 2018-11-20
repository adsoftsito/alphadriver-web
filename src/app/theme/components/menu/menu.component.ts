import { Component, Input, ViewChild, Renderer2, ElementRef,
   OnDestroy, EventEmitter, Output, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HostListener } from '@angular/core';
import { MenuService } from './menu.service' ;
// import { BaMenuService } from '../../theme/services';
import { GlobalState } from '../../../global.state';
import { TranslateService } from '@ngx-translate/core';
import { BaMenuService } from '../../services';//agregue el servicio que contiene el item Menu Seleccionado

@Component({
    selector: 'menu-component',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.scss'],
    animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(-93%, 0, 0)',
        opacity: 0,
        // width: '15px',
      })),
      state('out', style({
        transform: 'translate3d(0, 0, 0)',
        // opacity: 1,
      })),
      transition('in => out', animate('200ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out')),
    ]),
  ],
})

export class MenuComponent implements OnDestroy, OnInit {
  @ViewChild('topContent') topContent: ElementRef;
  @Output() outComponent = new EventEmitter();
  @Input() configuration: any;
  @Input() isSidebarCollapsed: boolean;
  @Input() contMenuBar: any;
  @Input() contBar: any;
  @Input() isMenuCollapsed: boolean;
  @Input() showMenuList: boolean= true;
  @Input() showMenuDashboard: boolean= true; //lo agregué
  @Input() showMenuUsers: boolean = true; //lo agregué
  droppedItems: Array<any> = []; //lo agregué
  transferDataCircle: Object = {id: 1, typeChart: 'Circle', ban: true}; //yo lo agregué
  transferDataBar: Object = {id: 1, typeChart: 'Bar', ban: true}; //yo lo agregué

  menuBarState: string = 'out';
  // title: any;
  @Input() parts: string = 'one';

  



  constructor (private translate: TranslateService, private _menuService: MenuService, private renderer: Renderer2, private _state: GlobalState,
    private _elementRef: ElementRef,private _baMenuService:BaMenuService) { }
  // forceClose: boolean = false;
  ngOnInit() {
   // let lists: string[] = ["Angular","html","css","Node.js","Sublime Text"];
    //console.log(lists);
    if (this.isMenuCollapsed !== undefined) {
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    }

    // this._state.subscribe('menu.activeLink', (activeLink) => {
    //   this.title = activeLink;
    // });
    //Se obtiene el elemento del menu que se le hizó click y si es dashboard se muestran sus opciones, 
    //de lo contrario no serán visible esas opciones
    //  this._baMenuService.subjectItemMenuSelect$.subscribe(itemSelected=>{
    //    if(itemSelected==='dashboard')
    //    this.showMenuDashboard=true;
    //    else
    //   this.showMenuDashboard=false;
    //  });

    // if (this.isSidebarCollapsed !== undefined) {
    //   this.toggleMenu(this.isSidebarCollapsed);
    // }
  }


   toggleMenu(control) {
     switch (control) {
       case true:
           this.menuBarState = 'in';
         break;
       case false:
              this.menuBarState = 'out';
        break;
       default:
          this.menuBarState = this.menuBarState === 'out' ? 'in' : 'out';
        break;
     }
     this._menuService.setStatusBarMain(this.menuBarState);
     if (this.menuBarState === 'in') {
       // this.ocultarMenu();
     }else {
       // this.mostrarMenu();
     }
   }

   ocultarMenu() {
     this.renderer.addClass(this.topContent.nativeElement, 'control-view');
   }

   mostrarMenu() {
     this.renderer.removeClass(this.topContent.nativeElement, 'control-view');
   }

   comunicatioOutMenuItem(event) {
    this.outComponent.emit(event);
   }

   changeParts(value) {
     if (value !== null) {
       this.parts = value;
     }
   }

  // @HostListener('menu.isCollapsed')
  // // event.target.innerWidth
  //  closeBar () {
  //    console.info('Se detecto un cambio sobre la barra de menu ');
  //     this.isMenuCollapsed = !this.isMenuCollapsed;
  //     this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
  //     return false;
  //  }
  // @HostListener('document:click', ['$event', '$event.target'])
  // public onClick(event: MouseEvent, targetElement: HTMLElement): void {
  //     if (!targetElement) {
  //         return;
  //     }
  //     const clickedInside = this._elementRef.nativeElement.contains(targetElement);
  //     if (!clickedInside) {
  //         this.toggleMenu(true);
  //     }else {
  //       this.toggleMenu(false);
  //     }
  // }
  @HostListener('document:mouseover', ['$event', '$event.target'])
  public onHover(event: MouseEvent, targetElement: HTMLElement): void {
      if (!targetElement) {
          return;
      }
      const clickedInside = this._elementRef.nativeElement.contains(targetElement);
      if (!clickedInside) {
          this.toggleMenu(true);
      }else {
        this.toggleMenu(false);
      }
  }
   ngOnDestroy() {
     // const elemento = this.renderer.selectRootElement(this.contentMenu.nativeElement)
     // while (elemento.firstChild) {
     //    elemento.removeChild(elemento.firstChild);
     // }
  }


}
