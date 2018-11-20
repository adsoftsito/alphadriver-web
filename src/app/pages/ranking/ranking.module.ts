import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgaModule} from "../../theme/nga.module";
import {routing} from "./ranking.routing";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TranslateModule} from "@ngx-translate/core";
import {RankingComponent} from "./ranking.component";
import {UsersComponent} from "./components/users/users.component";
import { AgGridModule } from 'ag-grid-angular/main';
import {UsersService} from "./components/users/users.service";
import {DriversComponent} from "./components/drivers/drivers.component";
import {VehiclePerformanceComponent} from "./components/vehiclePerformance/vehiclePerformance.component"
import {AmChartsModule} from "@amcharts/amcharts3-angular";
import {DriversService} from "./components/drivers/drivers.service";
import {VehiclePerformanceService} from "./components/vehiclePerformance/vehiclePerformance.service"

// IMPORT SERVICE TO GET DATA FROM ENDPOINT
/**
 * Created by Tech Group BWL on 12/09/2018.
 */

@NgModule({
    imports: [
        CommonModule,
        AngularFormsModule,
        NgaModule,
        routing,
        NgbModule,
        TranslateModule,
        ReactiveFormsModule,
        AgGridModule,
        AmChartsModule
    ],
    declarations: [
        // Here goes your components
        RankingComponent,
        UsersComponent,
        DriversComponent,
        VehiclePerformanceComponent

    ],
    providers: [
        // Here goes your service provider ENDPOINTS AND DATA SOURCES
        UsersService,
        DriversService,
        VehiclePerformanceService
    ]
})
export class RankingModule {}
