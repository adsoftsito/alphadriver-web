/**
 * Created by Tech Group BWL on 03/10/2018.
 */
import {
  Component, Input, ViewEncapsulation, OnInit, ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";

@Component({
  selector: '[motum-button]',
  templateUrl: './motumButton.component.html',
  styleUrls: ['./motumButton.scss'],
  host: {
    'class': 'motum-button',
    '[class.btn-mot-default]': "size === 'default'",
    '[class.btn-mot-large]': "size === 'large'",

    '[class.btn-mot-secondary]': "color === 'secondary'",
    '[class.btn-mot-danger]': "color === 'danger'",
    '[class.btn-mot-grey]': "color === 'grey'",
    '[class.btn-mot-white]': "color === 'white'",

    '[class.btn-mot-round]': "round",
    '[class.btn-mot-outline]': "_isOutline",
    '[class.btn-mot-outline-secondary]': "_isOutlineSecondary",
    '[class.btn-mot-outline-danger]': "_isOutlineDanger",
    '[class.btn-mot-outline-grey]': "_isOutlineGrey",
    '[class.btn-mot-outline-white]': "_isOutlineWhite"
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * @example:
 * <button motum-button
 *      [size]="large"
 *      color="secondary"
 *      outline="true"
 *      round="false">Im' a button!</button>
 */
export class MotumButtonComponent implements OnInit {
  @Input() size: 'default' | 'large' = 'default';
  @Input() color: 'primary' | 'secondary' | 'danger' | 'grey' | 'gray' | 'white' = 'primary';
  @Input() hoverColor: 'primary' | 'success' = 'primary';// success is like green
  @Input() isRectangle: boolean = false;
  @Input() outline: boolean = false;
  @Input() round: boolean = true;

  private _isOutline: boolean = false;
  private _isOutlineSecondary: boolean = false;
  private _isOutlineDanger: boolean = false;
  private _isOutlineGrey: boolean = false;
  private _isOutlineWhite: boolean = false;

  constructor(private _cdRef: ChangeDetectorRef) {
    this.detectOutline();
  }

  ngOnInit() {
    this.detectOutline();
    this._cdRef.detectChanges();
  }

  detectOutline() {
    this._isOutline = this.color === 'primary' && this.outline;
    this._isOutlineSecondary = this.color === 'secondary' && this.outline;
    this._isOutlineDanger = this.color === 'danger' && this.outline;
    this._isOutlineGrey = (this.color === 'grey' || this.color === 'gray') && this.outline;
    this._isOutlineWhite = this.color === 'white' && this.outline;
  }
}