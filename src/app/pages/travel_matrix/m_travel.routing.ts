import { Routes, RouterModule } from '@angular/router';
import { MTravelComponent } from './m_travel.component';
//import { UsersComponent } from './components/users';
//import { CreateUserComponent } from './components/users/createUser';
//import { UserListComponent } from './components/users/userList';
import { ModuleWithProviders } from '@angular/core';
import {ClientsProductsComponent} from "./components/clients/clients.component";
//import {ClientsOrdersComponent} from "./components/clientOrders/orders.component";
import {FormClientProductComponent} from "./components/clients/formClient/formClient.component";
//import {FormOrderComponent} from "./components/clients/formOrder/formOrder.component";
//import {MemberModalComponent} from "./components/clients/memberModal/memberModal.component";
//import {UploadSignComponent} from "./components/clients/upload-sign/upload-sign.component";
//import {UploadPhotoComponent} from "./components/clients/upload-photo/upload-photo.component";
//import {UploadObsComponent} from "./components/clients/upload-obs/upload-obs.component";

//import {UpdateadmStatusComponent} from "./components/clients/updateadm-status/updateadm-status.component";
//import {UpdateoperStatusComponent} from "./components/clients/updateoper-status/updateoper-status.component";
import {OrderDetailComponent} from "./components/clients/order-detail/order-detail.component";
import {RouteMapComponent} from "./components/clients/route-map/route-map.component";

const routes: Routes = [
  {
    path: '',
    component: MTravelComponent,
    children: [
      /*{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
      path: 'users',
      component: UsersComponent,
      children: [{
        path: 'create',
        component: CreateUserComponent,
        data: {breadcrumb: 'pages.userControl.client_user.createUsersSection', inAction: 1}
      },{
        path: 'edit',
        component: CreateUserComponent,
        data: {breadcrumb: 'pages.userControl.client_user.editUsersSection', inAction: 1}
      }],
      data: {breadcrumb: 'pages.userControl.client_user.usersSection', inAction: 0}
    },*/ {
      path: 'clients-products',
      component: ClientsProductsComponent,
      children: [{
        path: 'create',
        component: FormClientProductComponent,
        data: {breadcrumb: 'pages.userControl.client_product.create_section', inAction: 1}
      },
     /* {
        path: 'route-map',
        component: RouteMapComponent,
        data: {breadcrumb: 'pages.userControl.client_product.create_section', inAction: 1}
      },
      {
        path: 'upload-sign',
        component: UploadSignComponent,
        data: {breadcrumb: 'pages.userControl.client_product.create_section', inAction: 1}
      },
      {
        path: 'upload-photo',
        component: UploadPhotoComponent,
        data: {breadcrumb: 'pages.userControl.client_product.create_section', inAction: 1}
      },
      {
        path: 'upload-obs',
        component: UploadObsComponent,
        data: {breadcrumb: 'pages.userControl.client_product.create_section', inAction: 1}
      },
      {
        path: 'update-operstatus',
        component: UpdateoperStatusComponent,
        data: {breadcrumb: 'pages.userControl.client_product.create_section', inAction: 1}
      },
      
        */
      {
        path: 'order-detail',
        component: OrderDetailComponent,
        data: {breadcrumb: 'pages.userControl.client_product.create_section', inAction: 1}
      }
      /*,
      {
        path: 'edit',
        component: FormClientProductComponent,
        data: {breadcrumb: 'pages.userControl.client_product.edit_section', inAction: 1}
      } {
        path: 'orders',
        component: FormOrderComponent,
        data: {breadcrumb: 'pages.userControl.client_product.orders', inAction: 0}
      }, 
    
      {
        path: 'create-member',
        component: CreateUserComponent,
        data: {breadcrumb: 'pages.userControl.client_product.createMember', inAction: 0}
      },
      
      {
        path: 'members',
        component: MemberModalComponent,
        children: [{
          path: 'edit',
          component: CreateUserComponent,
          data: {breadcrumb: 'pages.userControl.editMembers.editMember', inAction: 1}
        }],
        data: {breadcrumb: 'pages.userControl.members.member',inAction: 0}
      },
      
      {
        path: 'edit-member',
        component: CreateUserComponent,
        data: {breadcrumb: 'pages.userControl.editMembers.editMember', inAction: 1} 
      }*/],
      data: {breadcrumb: 'pages.userControl.client_product.section', inAction: 0}
    }, {
     // path: 'client-orders',
     // component: ClientsOrdersComponent,
      path: 'route-map',
      component: RouteMapComponent,
     
     data: {breadcrumb: 'pages.userControl.clientsOrders.section', inAction:0 }
    }]
  }

];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
