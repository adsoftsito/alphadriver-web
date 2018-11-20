import { NumberModel } from './number.model';
export class BillingModel {
  public taxRegime: string;
  public comercialName: string;
  public businessName: string;
  public rfc: string;
  public street: string;
  public number: NumberModel;
  public country: string;
  public zipCode: number;
  public state: string;
  public city: string;
  public colony: string;
  public municipality: string;
  public billingPeriod: string;
}
