import {Injectable} from "@angular/core";
import {Constants} from "../../../../shared/providers/constants";
import {ApiCrudService} from "../../../../shared/providers/api.crud.service";
import { Subject } from "rxjs";
import { User } from '../../../../shared/models/user.model';
import { ClientModel } from '../../../../shared/models/clients/client.model';
/**
 * Created by Tech Group BWL on 30/05/2018.
 */
@Injectable()
export class ClientProductService {

    ENDPOINT: string = 'clients';
    ENDPOINTMEMBERS: string = 'members';
    ENDPOINTALERTS: string = 'alerts';
    ENDPOINTPRODUCTS: string = 'product-catalog';
    ENDPOINTPLAN: string = 'plan-catalog';
    ENDPOINTDURATION: string = 'duration-catalog';
    ENDPOINTNUMBERPART: string = 'number-part-catalog';
    ENDPOINTCHARGE: string = 'charge-catalog';
    ENDPOINTTYPES: string = 'types-catalog';
    ENDPOINTBRANDS: string = 'brands-catalog';
    ENDPOINTMODELS: string = 'models-catalog';
    ENDPOINTYEARS: string = 'years-catalog';
    ENDPOINTBUILDERS: string = 'builders-catalog';
    ENDPOINTVARIANTS: string = 'variants-catalog';

    private showCreateClient = new Subject<void>();
    createClient$ = this.showCreateClient.asObservable();

    private showUpdateClient = new Subject<any>();
    updateClient$ = this.showUpdateClient.asObservable();

    // create new client
     private ShowNewClient = new Subject<ClientModel>();
     newClient$ = this.ShowNewClient.asObservable();

    // Show create Order
    private showCreateOrder = new Subject<void>();
    sCreateOrder$ = this.showCreateOrder.asObservable();

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
    getDataForTableFilter (params: any) {
      let shareGet;
        shareGet = this.api.get(this.ENDPOINT, params).share();
    }

    getListProductsForOrder (params?: any) {
        let shareGet= this.api.get(this.ENDPOINT+'/'+this.ENDPOINTPRODUCTS, params).share();
        return shareGet.map(res => res.json());
    }

    getListPlansForOrder(params?: any) {
      let shareGet= this.api.get(this.ENDPOINT+'/'+this.ENDPOINTPLAN, params).share();
      return shareGet.map(res => res.json());
    }

    getListDurationForOrder(params?: any) {
      let shareGet= this.api.get(this.ENDPOINT+'/'+this.ENDPOINTDURATION, params).share();
      return shareGet.map(res => res.json());
    }

    getListNumberPartForOrder(params?: any) {
      let shareGet= this.api.get(this.ENDPOINT+'/'+this.ENDPOINTNUMBERPART, params).share();
      return shareGet.map(res => res.json());
    }

    getListChargeForOrder(params?: any) {
      let shareGet= this.api.get(this.ENDPOINT+'/'+this.ENDPOINTCHARGE, params).share();
      return shareGet.map(res => res.json());
    }
    getListTypesForOrder(params?: any) {
      let shareGet= this.api.get(this.ENDPOINT+'/'+this.ENDPOINTTYPES, params).share();
      return shareGet.map(res => res.json());
    }

    getListBrandsForOrder(params?: any) {
      let shareGet= this.api.get(this.ENDPOINT+'/'+this.ENDPOINTBRANDS, params).share();
      return shareGet.map(res => res.json());
    }

    getListModelsForOrder(params?: any) {
      let shareGet= this.api.get(this.ENDPOINT+'/'+this.ENDPOINTMODELS, params).share();
      return shareGet.map(res => res.json());
    }

    getListYearsForOrder(params?: any) {
      let shareGet= this.api.get(this.ENDPOINT+'/'+this.ENDPOINTYEARS, params).share();
      return shareGet.map(res => res.json());
    }

    getListBuildersForOrder(params?: any) {
      let shareGet = this.api.get(this.ENDPOINT+'/'+this.ENDPOINTBUILDERS, params).share();
      return shareGet.map(res => res.json());
    }

    getListVariantsForOrder(params?: any) {
      let shareGet= this.api.get(this.ENDPOINT+'/'+this.ENDPOINTVARIANTS, params).share();
      return shareGet.map(res => res.json());
    }

    retrieveDataForTableMembers(params?: any) {
        let shareGet;
        this.ENDPOINTMEMBERS = params+'/'+this.ENDPOINTMEMBERS;
        // console.log('parmas ',this.ENDPOINTMEMBERS)

        if (params) {
            // shareGet = this.api.get('data.json', params).share();
            //TODO: descomentame cuando ya exista una api oficial
            shareGet = this.api.get(this.ENDPOINT+'/'+this.ENDPOINTMEMBERS).share();
            this.ENDPOINTMEMBERS = 'members';
        } else {
            // shareGet = this.api.get('data.json').share();
            //TODO: descomentame cuando ya exista una api oficial
            shareGet = this.api.get(this.ENDPOINTMEMBERS).share();
        }

        shareGet.map(res => res.json());
        return shareGet;
    }
    retrieveDataForTableAlerts(params?: any) {
        // console.log(params);
        let shareGet;
        this.ENDPOINTALERTS = this.ENDPOINTALERTS+'/'+params+'/binnacles';
        // console.log('parmas ',this.ENDPOINTMEMBERS)

        if (params) {
            // shareGet = this.api.get('data.json', params).share();
            //TODO: descomentame cuando ya exista una api oficial
            shareGet = this.api.get(this.ENDPOINTALERTS).share();
            this.ENDPOINTALERTS = 'alerts';
        } else {
            // shareGet = this.api.get('data.json').share();
            //TODO: descomentame cuando ya exista una api oficial
            shareGet = this.api.get(this.ENDPOINTALERTS).share();
        }

        shareGet.map(res => res.json());
        return shareGet;
    }

    createClientProduct() {
        this.showCreateClient.next();
    }
    createClientProductEnd(ClientModel: ClientModel) {
      let userJson = JSON.stringify(ClientModel);
      // this.api.post(this.C.ENDPOINT_USER, userJson)
      // .subscribe(
      //   res => {
      //     if(res.status == 200){ // Falta devolver el usuario con su respectivo id o genera errores en la tabla
            this.ShowNewClient.next(ClientModel);
        //   }
        // },
        // err => {
        //   console.log("Error occured "+err);
        // });
    }
    updateClientProduct(ClientModel: any) {
        this.showUpdateClient.next(ClientModel);
    }

    sCreateOrder(data) {
        this.showCreateOrder.next(data);
    }
    createOrder(){}
    removeClientProduct() {}
}
