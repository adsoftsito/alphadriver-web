import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';

import { OperationalSecurityOperatorComponent }
from './report-filters/operational-security/operator/operator.component';
import { OperationalSecuriyVehicleComponent }
from './report-filters/operational-security/vehicle/vehicle.component';
import { ConductOperativeOperatorComponent }
from './report-filters/operative-conduct/operator/operator.component';
import { ConductOperativeVehicleComponent }
from './report-filters/operative-conduct/vehicle/vehicle.component';

const routes: Routes = [
    {
        path: '',
        component: ReportsComponent,
    },
    {
        path: 'security/operator/:dataProvider',
        component: OperationalSecurityOperatorComponent,
    },
    {
        path: 'security/vehicle/:dataProvider',
        component: OperationalSecuriyVehicleComponent,
    },
    {
        path: 'conduct/operator/:dataProvider',
        component: ConductOperativeOperatorComponent,
    },
    {
        path: 'conduct/vehicle/:dataProvider',
        component: ConductOperativeVehicleComponent,
    },
];
export const routing = RouterModule.forChild(routes);
