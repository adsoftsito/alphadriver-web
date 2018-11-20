import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgaModule} from "../../theme/nga.module";
import {routing} from "./vehicles.routing";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TranslateModule} from "@ngx-translate/core";
import {VehiclesService} from "./vehicles.service";
import {GroupsComponent} from "./components/groups/groups.component";
import {VehiclesComponent} from "./vehicles.component";
import { FormGroupsComponent } from "./components/formGroup/form.group.component";
import {VehiclesModifyVehicles} from "./components/modifyVehicle/modifyVehicle.component";
import {VehiclesVehiclesGroups} from "./components/vehiclesGroups/vehiclesGroups.component";
import {AgGridModule} from "ag-grid-angular";
import {VehicleModifyVehicleService} from "./components/modifyVehicle/modifyVehicle.service";
import {VehicleFormModifyVehicle} from "./components/modifyVehicle/formModifyVehicle/formModifyVehicle.component";
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
    AgGridModule.withComponents([])
  ],
  declarations: [
    GroupsComponent,
    VehiclesComponent,
    FormGroupsComponent,
    VehiclesModifyVehicles,
    VehiclesVehiclesGroups,
    VehicleFormModifyVehicle
  ],
  providers: [
    VehiclesService,
    VehicleModifyVehicleService
  ]
})
export class VehiclesModule {}
