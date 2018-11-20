import {Injectable} from "@angular/core";
import {Constants} from "./constants";
import {EventsService} from "./events";
import {Response} from "@angular/http";
import {Observable} from "rxjs";
/**
 * Created by Tech Group BWL on 09/07/2018.
 */

@Injectable()
export class ChangeSpaceColsAndRowsService {

  /**
   * The menus are initialized with this
   * classes: 'm-column-3 m-row-12'.
   *
   * @type MR_HTML_CLASSES {{MENU_1: string; SUBMENU_1: string; SUBMENU_2: string}}
   */
  MR_HTML_CLASSES: any = {
    MENU_1: 'm-column-3 m-row-12',
    SUBMENU_1: 'm-column-3 m-row-12',
    SUBMENU_2: 'm-column-3 m-row-12'
  };

  /**
   * Actually the menu has three sections :
   *
   * The menu principal, this contains the unit list
   * The sub-menu, this contains details of unit
   * The sub-menu 2
   *
   * @type {[string,string,string]}
   */
  MR_MENU_NAMES: Array<any> = [
    'MENU_1',
    'SUBMENU_1',
    'SUBMENU_2'
  ];



  constructor(
    private C: Constants,
    private events: EventsService
  ) {}

  /**
   * Allow to change space on columns and rows
   * of an element of monitoring reaction
   *
   * @param menuName: This menu name is taken from variable MR_MENU_NAMES
   * @param cols: How many columns will cover this menu, by default is 1
   * @param rows: How many rows will cover this menu, by default is 1
   * @param colPosition: Where will be positioned this menu on column, by default
   * will be where can be.
   * @param rowPosition: Where will be positioned this menu on row, by default
   * will be where can be.
   */
  tmOnChangeMenuSize(
    menuName: string,
    cols: number = 1,
    rows: number = 1,
    colPosition?: number,
    rowPosition?: number
  ) {
    if (!this.MR_HTML_CLASSES[menuName] && cols > 12 && rows > 12)
      return;
    let classesNames = `m-column-${cols} m-row-${rows} `;
    if (colPosition)
      classesNames += `m-start-col-${colPosition}`;
    if (rowPosition)
      classesNames += `m-start-row-${colPosition}`;

    this.events.publish(this.C.EVENTS_SERVICE.MONITORING_REACTION_MENU_CHANGE_CLASS, menuName, classesNames);
    this.events.publish(this.C.EVENTS_SERVICE.MONITORING_REACTION_MENU_CHANGE_CLASS_2_1, menuName, classesNames);
  }


}
