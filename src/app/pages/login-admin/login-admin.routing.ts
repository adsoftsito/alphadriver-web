import { Routes, RouterModule }  from '@angular/router';


import { ModuleWithProviders } from '@angular/core';
import { LoginAdmin } from './login-admin.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: LoginAdmin
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
