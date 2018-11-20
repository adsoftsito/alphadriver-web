/**
 * Created by Tech Group BWL on 07/05/2018.
 */
import { Injectable } from '@angular/core';
import { RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ApiCrudService } from '../../shared/providers/api.crud.service';
import { Constants } from '../../shared/providers/constants';
import { User } from '../../shared/models/user.model';


@Injectable()
export class UserService {
  userModel: User;
  // show view create user
  private showCreateUser = new Subject<void>();
  createUser$ = this.showCreateUser.asObservable();

  // show view edit user
  private showEditUser = new Subject<User>();
  editUser$ = this.showEditUser.asObservable();

 // create new user
  private ShowNewUser = new Subject<User>();
  newUser$ = this.ShowNewUser.asObservable();

  // edit user
   private ShowEditUser = new Subject<User>();
   editUserResponse$ = this.ShowEditUser.asObservable();

    constructor(private api: ApiCrudService, private C: Constants) {
      this.api.DOMAIN = 'assets/data/';//TODO: quitame cuando ya exista una api oficial
     }

    getDataForTable(params?: any) {
      let shareGet;

      if (params) {
        shareGet = this.api.get('data.json', params).share();
        // shareGet = this.api.get(this.C.ENDPOINT_USER, params).share();
      } else {
        shareGet = this.api.get('data.json').share();
        // shareGet = this.api.get(this.C.ENDPOINT_USER).share();
      }

      shareGet.map(res => res.json());
      return shareGet;

    }
    sCreateUser() {
      this.showCreateUser.next();
    }
    sEditUser(value: any) {
      this.userModel = new User();
      this.userModel = value;
      this.showEditUser.next(this.userModel);
    }
    createUser(userModel: any) {
      let userJson = JSON.stringify(userModel);
      this.api.post(this.C.ENDPOINT_USER, userJson)
      // .subscribe(
      //   res => {
      //     if(res.status == 200){ // Falta devolver el usuario con su respectivo id o genera errores en la tabla
            this.ShowNewUser.next(userModel);
        //   }
        // },
        // err => {
        //   console.log("Error occured "+err);
        // });
    }
    editUser(userModel: any) {
      let userJson = JSON.stringify(userModel);
      this.api.put(this.C.ENDPOINT_USER + '/' + userModel.id);
      // .subscribe(
      //   res => {
          // if(res.status == 200){
            this.ShowEditUser.next(userModel);
          // }
        // },
        // err => {
        //   console.log("Error occured "+err);
        // });;
    }
    deleteUser(userModel: any) {
      let userJson = JSON.stringify(userModel);
      this.api.remove(this.C.ENDPOINT_USER + '/' + userModel.id).subscribe(
        res => {
          // if(res.status == 200){
            return true;
          // }else {
          //   return false;
          // }
        },
        err => {
          console.log("Error occured "+err);
        });
    }
}
