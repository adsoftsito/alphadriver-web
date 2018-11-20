import {Injectable} from '@angular/core';

@Injectable()
export class BaThemeSpinner {

  /**
   * Preloader circle
   */
  private _selector:string = 'preloader';
  private _element:HTMLElement;

  /**
   * Preloader with skeleton properties
   */
  private _selectorLoginSkeleton: string = "login-skeleton";
  private _elementLoginSkeleton: HTMLElement;

  /**
   * Preloader with skeleton admin properties
   */
  private _selectorLoginAdminSkeleton: string = "login-admin-skeleton";
  private _elementLoginAdminSkeleton: HTMLElement;

  constructor() {
    this._element = document.getElementById(this._selector);
    this._elementLoginSkeleton = document.getElementById(this._selectorLoginSkeleton);
    this._elementLoginAdminSkeleton = document.getElementById(this._selectorLoginAdminSkeleton);
  }

  public show():void {
    this._element.style['display'] = 'block';
  }

  public hide(delay:number = 0):void {
    setTimeout(() => {
      this._element.style['display'] = 'none';
    }, delay);
  }

  public showLoginSkeleton():void {
    this._elementLoginSkeleton['display'] = 'block';
  }

  public hideLoginSkeleton(delay:number = 0):void {
    setTimeout(() => {
      this._elementLoginSkeleton.style['display'] = 'none';
    }, delay);
  }

  public showLoginAdminSkeleton():void {
    this._elementLoginAdminSkeleton['display'] = 'block';
  }

  public hideLoginAdminSkeleton(delay:number = 0):void {
    setTimeout(() => {
      this._elementLoginAdminSkeleton.style['display'] = 'none';
    }, delay);
  }
}
