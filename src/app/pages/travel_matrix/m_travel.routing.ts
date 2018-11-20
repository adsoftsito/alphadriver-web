import { Routes, RouterModule } from '@angular/router';
import { MTravelComponent } from './m_travel.component';
import { UsersComponent } from './components/users';
import { CreateUserComponent } from './components/users/createUser';
import { UserListComponent } from './components/users/userList';
import { ModuleWithProviders } from '@angular/core';
import {ClientsProductsComponent} from "./components/clients/clients.component";
import {ClientsOrdersComponent} from "./components/clientOrders/orders.component";
import {FormClientProductComponent} from "./components/clients/formClient/formClient.component";
import {FormOrderComponent} from "./components/clients/formOrder/formOrder.component";
import {MemberModalComponent} from "./components/clients/memberModal/memberModal.component";


const routes: Routes = [
  {
    path: '',
    component: MTravelComponent,
    children: [{
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
    }, {
      path: 'clients-products',
      component: ClientsProductsComponent,
      children: [{
        path: 'create',
        component: FormClientProductComponent,
        data: {breadcrumb: 'pages.userControl.client_product.create_section', inAction: 1}
      }, {
        path: 'edit',
        component: FormClientProductComponent,
        data: {breadcrumb: 'pages.userControl.client_product.edit_section', inAction: 1}
      }, {
        path: 'orders',
        component: FormOrderComponent,
        data: {breadcrumb: 'pages.userControl.client_product.orders', inAction: 0}
      }, {
        path: 'create-member',
        component: CreateUserComponent,
        data: {breadcrumb: 'pages.userControl.client_product.createMember', inAction: 0}
      },{
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
      }],
      data: {breadcrumb: 'pages.userControl.client_product.section', inAction: 0}
    }, {
      path: 'client-orders',
      component: ClientsOrdersComponent,
      data: {breadcrumb: 'pages.userControl.clientsOrders.section', inAction:0 }
    }]
  }

];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
