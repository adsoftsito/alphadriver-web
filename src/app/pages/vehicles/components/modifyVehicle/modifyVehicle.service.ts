/**
 * Created by Tech Group BWL on 05/10/2018.
 */
import {Injectable} from "@angular/core";
import {ApiCrudService} from "../../../../shared/providers/api.crud.service";
import {Observable} from "rxjs";
import {Response} from "@angular/http";

@Injectable()
export class VehicleModifyVehicleService {

  private _END_POINT: string = 'vehicles';

  constructor(
    private _api: ApiCrudService
  ) {}

  retrieveVehicles(): Observable<any> {
    return this._api.get(this._END_POINT).map(res => res.json());
  }

  retrieveVehicle(idVehicle: number|string): Observable<any> {
    return this._api.get(`${this._END_POINT}/${idVehicle}`)
      .map(res => res.json());
  }
}