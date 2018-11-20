/**
 * Created by Tech Group BWL on 08/10/2018.
 */
import {Component} from "@angular/core";
@Component({
  selector: 'v-form-modify-vehicle-component',
  templateUrl: './formModifyVehicle.component.html',
  styleUrls: ['./formModifyVehicle.component.scss']
})
export class VehicleFormModifyVehicle {

  private _clientName: string = 'Camiones Rivera';
  private _avatarType: string = 'NAME';

  // ------------ LABELS -------------
  private _SAVE_LABEL: string = 'general.save';
  private _CANCEL_LABEL: string = 'general.cancel';

  constructor() {}
}