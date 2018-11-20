/**
 * Created by Tech Group BWL on 12/09/2018.
 */
import {Injectable} from "@angular/core";
import {ApiCrudService} from "../../shared/providers/api.crud.service";
@Injectable()
export class VehiclesService {
  constructor(
    private _api: ApiCrudService
  ) {}
}