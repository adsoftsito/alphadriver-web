import {Injectable} from "@angular/core";
import {Constants} from "../../../../shared/providers/constants";
import {ApiCrudService} from "../../../../shared/providers/api.crud.service";
import { Subject } from "rxjs";
import { User } from '../../../../shared/models/user.model'
/**
 * Created by Tech Group BWL on 30/05/2018.
 */
@Injectable()
export class OrdersService {
  ENDPOINT: string = 'clients/orders';
  ENDPOINTORDERSPECIFIC: string = 'order';

  constructor(
      private api: ApiCrudService,
      private C: Constants
  ) {
      // this.api.DOMAIN = 'assets/data/';//TODO: quitame cuando ya exista una api oficial
  }

  retrieveDataForTable(params?: any) {
      let shareGet;

      if (params) {
          // shareGet = this.api.get('data.json', params).share();
          //TODO: descomentame cuando ya exista una api oficial
          shareGet = this.api.get(this.ENDPOINT, params).share();
      } else {
          // shareGet = this.api.get('data.json').share();
          //TODO: descomentame cuando ya exista una api oficial
          shareGet = this.api.get(this.ENDPOINT).share();
      }

      shareGet.map(res => res.json());
      return shareGet;
  }

  getEspecificOrderForClient(params?: any) {
    let shareGet = this.api.get(this.ENDPOINT+'/'+this.ENDPOINTORDERSPECIFIC, params).share();
    return shareGet.map(res => res.json());
  }

}
