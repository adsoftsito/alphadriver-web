import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

@Injectable()
export class CatalogosService {

    private URL = "http://ec2-52-44-11-117.compute-1.amazonaws.com:8080/mwdr-ws-web/webresources/api";

    constructor(private http: Http) {
    }

    listarSubflotasDelUsuario(flotaPadre: string): Promise<any> {
        let url = this.URL + "/catalogos/" + flotaPadre + "/subflotas";
        return this.http.get(url).map(subflotas => subflotas.json()).toPromise()
    }

    listarUnidadesDelUsuario(flotaPadre: string, subFlota: string): Promise<any> {
        let url = this.URL + "/catalogos/" + flotaPadre + "/"+ subFlota + "/unidades";
        //Y ahora que regreso?
        return this.http.get(url).map(subflotas => subflotas.json()).toPromise()
    }

}
