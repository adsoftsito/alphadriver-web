/**
 * Created by Tech Group BWL on 07/05/2018.
 */
import { Injectable } from '@angular/core';
import { RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { User } from '../../../../shared/models/user.model'
import {Constants} from "../../../../shared/providers/constants";
import { ApiCrudService } from '../../../../shared/providers/api.crud.service';

@Injectable()
export class UserService {

  ENDPOINT:string = "users";
  userModel: User;
  // show view create user
  private showCreateUser = new Subject<void>();
  createUser$ = this.showCreateUser.asObservable();

  // show view edit user
  private showEditUser = new Subject<User>();
  editUser$ = this.showEditUser.asObservable();

  // Route to close
  private routeLinkClose = new Subject<string>();
  routeCloseComponent$ = this.routeLinkClose.asObservable();

 // create new user
  private ShowNewUser = new Subject<User>();
  newUser$ = this.ShowNewUser.asObservable();

  // edit user
   private ShowEditUser = new Subject<User>();
   editUserResponse$ = this.ShowEditUser.asObservable();

   // edit member
   private ShowEditMember = new Subject<User>();
   editUserMembersResponse$ = this.ShowEditMember.asObservable();

    constructor(private api: ApiCrudService, private C: Constants) {}

    getDataForTable(params?: any) {
      let shareGet;

      if (params) {
        // shareGet = this.api.get('data.json', params).share();
        shareGet = this.api.get(this.ENDPOINT, params).share();
      } else {
        // shareGet = this.api.get('data.json').share();
        shareGet = this.api.get(this.ENDPOINT).share();
      }

      shareGet.map(res => res.json());
      return shareGet;

    }
    sCreateUser() {
      this.showCreateUser.next();
    }
    
    sEditUser(value: any) {
      
      let userTemp: User = new User();
      userTemp = value
      this.api.get(this.C.ENDPOINT_USER+'/'+userTemp.id).subscribe(
        res => {
          if(res.status == 200){ // Falta devolver el usuario con su respectivo id o genera errores en la tabla
            userTemp = JSON.parse(res['_body']);
            this.showEditUser.next(userTemp);
          }
        },
        err => {
          console.log("Error occured "+err);
        });
    }
    routeClose(value: string){
      this.routeLinkClose.next(value);
    }

    createUser(userModel: any) {
      // let userJson = JSON.stringify(userModel);
      // this.api.post(this.C.ENDPOINT_USER, userJson)
      // .subscribe(
      //   res => {
      //     if(res.status == 200){ // Falta devolver el usuario con su respectivo id o genera errores en la tabla
      //       userModel = JSON.parse(res['_body']);
            this.ShowNewUser.next(userModel);
        //   }
        // },
        // err => {
        //   console.log("Error occured "+err);
        // });
    }
   
    editUser(userModel: any) {
      // let userJson = JSON.stringify(userModel);
      // this.api.put(this.C.ENDPOINT_USER + '/' + userModel.id, userJson);
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
      // this.api.remove(this.C.ENDPOINT_USER + '/' + userModel.id);
      //.subscribe(
        // res => {
          // if(res.status == 200){
            return true;
          // }else {
          //   return false;
          // }
        // },
        // err => {
        //   console.log("Error occured "+err);
        // });
    }
    editUsers(userModel: any) {
      // let userJson = JSON.stringify(userModel);
      // this.api.put(this.C.ENDPOINT_USER + '/' + userModel.id, userJson);
      // .subscribe(
      //   res => {
          // if(res.status == 200){
            return true;
          // }
        // },
        // err => {
        //   console.log("Error occured "+err);
        // });;
    }

    editMember(){
      console.log('llega a next');
      this.ShowEditMember.next();
   }
   editMembers(userModel: any) {
      this.ShowEditUser.next(userModel);
   }

}
