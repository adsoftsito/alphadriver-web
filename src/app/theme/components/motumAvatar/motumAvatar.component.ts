/**
 * Created by Tech Group BWL on 11/10/2018.
 */
import {Component, ViewEncapsulation, Input, OnInit, OnChanges} from "@angular/core";
@Component({
  selector: 'motum-avatar',
  templateUrl: './motumAvatar.component.html',
  styleUrls: ['./motumAvatar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MotumAvatarComponent implements OnInit, OnChanges {

  /**
   * Name contents all about a entity name like user, client.
   * or an url Img or an icon class
   */
  @Input() name: string;

  /**
   * Avatar element will be clickable
   * @type {boolean}
   */
  @Input() isClickable: boolean = false;

  /**
   * Determinate weight and height of the avatar
   */
  @Input() size: string;

  /**
   * Determinate the font size
   */
  @Input() textSize: string;

  /**
   * Avatar can display a name, image or icon
   *
   * @type {string}
   */
  @Input() type: 'NAME' | 'IMG' | 'ICON' = 'NAME';

  /**
   * Actually the page use two definitions to display
   * two letters inside the avatar, uses "NAME" for a person name
   * and uses "COMPANY" for a name of a business name.
   *
   * @type {string}
   */
  @Input() nameType: 'NAME' | 'COMPANY' = 'NAME';

  /**
   * Actually are icons that contains its own
   * border like users and so on, in these cases
   * is necessary to set to true this value and
   * remove the border by default of the avatar
   * for a better presentation.
   *
   * In this mode is not possible responsive mode
   *
   * @type {boolean}
   */
  @Input() isIconResize: boolean = false;

  /**
   * Can display the avatar 100% on width and height
   * and cancel "size" input if it's true
   *
   * @type {boolean}
   */
  @Input() isResponsive: boolean = false;

  /**
   * Show a border of the Avatar
   * @type {boolean}
   */
  @Input() hasBorder: boolean = true;

  /**
   * Determinate the size of border of the avatar
   */
  @Input() borderSize: string;

  /**
   * Allow change the border color only if
   * "hasBorder" is able
   */
  @Input() borderColor: string;// HEX WITH #

  /**
   * Allow change the background color
   * of the avatar
   */
  @Input() bgColor: string;// HEX WITH #

  /**
   * Allow change the color of the text.
   * This option is able if the avatar is
   * on mode Name or Icon
   */
  @Input() textColor: string;// HEX WITH #

  private _TYPE_NAME = 'NAME';
  private _TYPE_IMG = 'IMG';
  private _TYPE_ICON = 'ICON';

  private _firstLetter: string;
  private _ngStyle: any;
  private _borderColorDefaultImg = '#FFF';//TODO: Retrieve this value from a theme service
  private _avatarSize: string = '45';//TODO: Retrieve this value from a theme service

  constructor() {}

  ngOnInit() {
    this.createAvatar();
  }

  createAvatar() {
    if (!this.name) {
      console.error('Property name is required');
      return;
    }
    switch (this.type) {
      case this._TYPE_NAME:
        this.configNameType();
        break;
      case this._TYPE_IMG:
        this.configImgType();
        break;
      case this._TYPE_ICON:
        this.configIconType();
        break;
      default:
        console.error('You have an invalid type');
        break;
    }
  }

  configNameType() {
    this._firstLetter = this.name.charAt(0).toLowerCase();

    this._ngStyle = this.configureObjectStyle();
  }

  configImgType() {
    this._ngStyle = this.configureObjectStyle();
  }

  configIconType() {
    let ngStyle = this.configureObjectStyle();

    if (this.isIconResize) {
      if (this.size) {
        ngStyle['width.px'] = `${Number(this.size) - 3}`;
        ngStyle['height.px'] = `${Number(this.size) - 3}`;

        this.textSize = this.size;
      } else {
        ngStyle['width.px'] = `${Number(this._avatarSize) - 3}`;
        ngStyle['height.px'] = `${Number(this._avatarSize) - 3}`;

        this.textSize = this._avatarSize;
      }
    }

    this._ngStyle = ngStyle;
  }

  configureObjectStyle(): any {
    let ngStyle = {};
    if (this.size) {
      ngStyle['width.px'] = this.size;
      ngStyle['height.px'] = this.size;
    }
    if (this.isResponsive) {
      ngStyle['width.%'] = '100';
      ngStyle['height.%'] = '100';
    }
    if (!this.hasBorder) {
      ngStyle['border-width'] = '0';
    } else if (this.borderSize) {
      ngStyle['border-width.px'] = this.borderSize;
    }
    if (this.bgColor) {
      ngStyle['background-color'] = `${this.bgColor}`;
    }
    if (this.textColor) {
      ngStyle['color'] = `${this.textColor}`;
    }
    if (this.borderColor) {
      ngStyle['border-color'] = `${this.borderColor}`;
    }
    if (this.isClickable) {
      ngStyle['cursor'] = `pointer`;
    }

    return ngStyle;
  }

  ngOnChanges() {
    this.createAvatar();
  }
}