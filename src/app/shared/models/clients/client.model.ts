import { NumberModel } from './number.model';
import { PhoneModel } from './phone.model';
import { InterfaceModel } from './interface.model';
import { PlataformModel } from './plataform.model';
import { AccountModel } from './account.model';
import { BillingModel } from './billing.model';

export class ClientModel {
  public commercialName: string;
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
  public phone: PhoneModel;
  public server: string;
  public sector: string;
  public marketSegment: string;
  public division: string;
  public numberEmployees: number;
  public billing: BillingModel;
  public account : AccountModel;
  public plataforms: Array<PlataformModel>;
  public interface: InterfaceModel;
}
