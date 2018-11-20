import { Routes, RouterModule } from '@angular/router';
import { MaintenanceComponent } from './maintenance.component';
import { ModuleWithProviders } from '@angular/core';
import { FleetHealthComponent } from './components/fleetHealth';
import { FleetHealthVehicleComponent } from './components/fleetHealthVehicle';
import { FleetHealthByComponent } from './components/fleetHealthByComponent';
import { FaultCodesComponent } from './components/faultCodes';
/**
 * Created by Tech Group BWL on 01/10/2018.
 */
const routes: Routes = [
  {
    path: '',
    component: MaintenanceComponent,
    children: [{
      path:'fleet-healt',
      component: FleetHealthComponent,
      data: {breadcrumb: 'pages.maintenance.fleetHealth', inAction: 0}
    },{
      path:'fleet-healt-vehicle',
      component: FleetHealthVehicleComponent,
      data: {breadcrumb: 'pages.maintenance.fleetHealthVehicle', inAction: 0}
    },{
      path:'fleet-healt-vehicle/:dataParam',
      component: FleetHealthVehicleComponent,
      data: {breadcrumb: 'pages.maintenance.fleetHealthVehicle', inAction: 0}
    },{
      path:'fleet-healt-by-component',
      component: FleetHealthByComponent,
      data: {breadcrumb: 'pages.maintenance.fleetHealthComponent', inAction: 0}
    },{
      path:'fleet-healt-by-component/:dataParam',
      component: FleetHealthByComponent,
      data: {breadcrumb: 'pages.maintenance.fleetHealthComponent', inAction: 0}
    },{
      path:'fault-codes',
      component: FaultCodesComponent,
      data: {breadcrumb: 'pages.maintenance.faultCodes', inAction: 0}
    },{
      path:'fault-codes/:dataParam',
      component: FaultCodesComponent,
      data: {breadcrumb: 'pages.maintenance.faultCodes', inAction: 0}
    }]
  }

];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
