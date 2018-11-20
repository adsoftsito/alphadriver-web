import { Injectable } from '@angular/core';
//import { Subject }    from 'rxjs/Subject';
import{Subject,Observable} from 'rxjs'; 

@Injectable()
export class GlobalState {

  private _data = new Subject<Object>();
  private _dataStream$ = this._data.asObservable();
  

  private _subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();
  menuCollapse$:Subject<boolean>;
  private menuCollapseObser:Observable<boolean>;

  constructor() {
    this._dataStream$.subscribe((data) => this._onEvent(data));
    this.menuCollapse$=new Subject<boolean>();
    this.menuCollapseObser=this.menuCollapse$.asObservable();
  }

  notifyDataChanged(event, value) {
    this.menuCollapse$.next(value);

    let current = this._data[event];
    if (current !== value) {
      this._data[event] = value;

      this._data.next({
        event: event,
        data: this._data[event]
      });
    }
  }
  changedCollapse(){
     //console.log('collapse: ',this.valueCollapse);
     
    //return this.valueCollapse;
  }

  subscribe(event: string, callback: Function) {
    let subscribers = this._subscriptions.get(event) || [];
    subscribers.push(callback);

    this._subscriptions.set(event, subscribers);
  }

  _onEvent(data: any) {
    let subscribers = this._subscriptions.get(data['event']) || [];

    subscribers.forEach((callback) => {
      callback.call(null, data['data']);
    });
  }
}
