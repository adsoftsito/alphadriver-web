/**
 * Created by Tech Group BWL on 09/10/2018.
 */
import {
  Component, ViewEncapsulation, OnInit, Input, AfterViewInit, Inject
} from "@angular/core";
import {TM_DOCUMENT} from "../../motum-theme.config";
@Component({
  selector: 'motum-modal-form',
  templateUrl: './motumModalForm.component.html',
  styleUrls: ['./motumModalForm.component.scss'],
  encapsulation: ViewEncapsulation.None
})
/**
 * Creates a Modal where you can put all you want
 * based in mockup designs
 *
 * @example If you want get assigned spaces like header, content and footer`
 *  <motum-modal-form>
 *    <div modal-form-header></div>
 *    <div modal-form-content></div>
 *    <div modal-form-footer></div>
 *  </motum-modal-form>
 * `
 * @example If you want only the space of the form but you don't
 * what header or footer and only you want that specific space`
 *  <motum-modal-form>
 *    <!-- All you want-->
 *  </motum-modal-form>
 * `
 */
export class MotumModalForm implements OnInit, AfterViewInit {

  @Input() cols: 2 | 3 = 2;
  @Input() align: 'center' | 'right' = 'center';
  @Input('hasTabs') willContentTabs: boolean = false;
  @Input('hasFooter') willContentFooter: boolean = true;

  constructor(
    @Inject(TM_DOCUMENT) protected document: any,
  ) {}

  ngOnInit() {
    if (this.align === 'center' && this.cols === 3) {
      console.error('This combination is not possible: %s %s', this.align, this.cols);
      this.cols = 2;
    }

    window.addEventListener('resize',() => {
      console.info('Hey!!!');
      console.info(screen.width);
      console.info(screen.height);

      console.info('Sizes!!!');
      console.info(this.getWidth());
      console.info(this.getHeight());
    });
    console.info('Sizes!!!');
    console.info(this.getWidth());
    console.info(this.getHeight());
  }

  /** Resize process */

  getWidth() {
    return Math.max(
      this.document.body.scrollWidth,
      this.document.documentElement.scrollWidth,
      this.document.body.offsetWidth,
      this.document.documentElement.offsetWidth,
      this.document.documentElement.clientWidth
    );
  }

  getHeight() {
    return Math.max(
      this.document.body.scrollHeight,
      this.document.documentElement.scrollHeight,
      this.document.body.offsetHeight,
      this.document.documentElement.offsetHeight,
      this.document.documentElement.clientHeight
    );
  }

  ngAfterViewInit() {}
}