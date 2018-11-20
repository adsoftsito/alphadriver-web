import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RankingComponent} from "./ranking.component";
import {UsersComponent} from "./components/users/users.component";
import {DriversComponent} from "./components/drivers/drivers.component";
import {VehiclePerformanceComponent} from "./components/vehiclePerformance/vehiclePerformance.component"

/**
 * Created by Tech Group BWL on 12/09/2018.
 */

const routes: Routes = [{
    path: '',
    component: RankingComponent,
    children: [
        {
            path: 'users',
            component: UsersComponent,
            data: {breadcrumb: 'pages.ranking.users.title', inAction: 0} // ADD TO TRANSLATE MODULE
        },{
            path: 'drivers',
            component: DriversComponent,
            data: {breadcrumb: 'pages.ranking.drivers.title', inAction: 0} // ADD TO TRANSLATE MODULE
        },{
            path: 'vehicle-performance',
            component: VehiclePerformanceComponent,
            data: {breadcrumb: 'pages.ranking.vehiclePerformance.title', inAction: 0} // ADD TO TRANSLATE MODULE
        },
    ]
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
