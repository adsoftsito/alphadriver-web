import { listVehicleDispositiveModel } from './listVehicleDispositive.model';
export class creareOrderModel {
  public quantity: number;
  public plan: string;
  public product: string;
  public charge: number;
  public duration: number;
  public folioERP: number;
  public numberPart: string;  
  public seller: string;
  public dealer: string;
  public listVehicleDispositive: Array<listVehicleDispositiveModel>;
  }
