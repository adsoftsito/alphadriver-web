import { Routes, RouterModule }  from '@angular/router';

import { UserRegisterComponent } from './userRegister.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: UserRegisterComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
