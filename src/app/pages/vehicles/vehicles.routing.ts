import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {VehiclesComponent} from "./vehicles.component";
import {GroupsComponent} from "./components/groups/groups.component";
import { FormGroupsComponent } from "./components/formGroup/form.group.component";
import {VehiclesModifyVehicles} from "./components/modifyVehicle/modifyVehicle.component";
import {VehiclesVehiclesGroups} from "./components/vehiclesGroups/vehiclesGroups.component";
import {VehicleFormModifyVehicle} from "./components/modifyVehicle/formModifyVehicle/formModifyVehicle.component";
/**
 * Created by Tech Group BWL on 12/09/2018.
 */

const routes: Routes = [{
  path: '',
  component: VehiclesComponent,
  children: [
    {
      path: 'groups',
      component: GroupsComponent,
      data: {breadcrumb: 'pages.vehicles.groups.title', inAction: 0}
    },
    {
      path: 'edit-groups',
      component: FormGroupsComponent,
      data: {breadcrumb: 'pages.vehicles.groups.title', inAction: 0}
    },
    {
      path: 'modify-vehicles',
      component: VehiclesModifyVehicles,
      data: {breadcrumb: 'pages.vehicles.modifyVehicle.title', inAction: 0},
      children: [
        {
          path: 'edit',
          component: VehicleFormModifyVehicle,
          data: {breadcrumb: 'pages.vehicles.formModifyVehicle.title', inAction: 1}
        }
      ]
    },
    {
      path: 'vehicles-and-groups',
      component: VehiclesVehiclesGroups,
      data: {breadcrumb: 'pages.vehicles.vehiclesGroups.title', inAction: 0}
    },
  ]
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
