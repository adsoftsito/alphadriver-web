/**
 * Created by Tech Group BWL on 01/10/2018.
 */
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './maintenance.routing';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";

import { AgGridModule } from 'ag-grid-angular/main';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { Select2Module } from 'ng2-select2';

import { FilterSorterComponent } from './components/childComponents/filterSorter';
import { FleetHealthComponent } from './components/fleetHealth';
import { MaintenanceComponent } from './maintenance.component';
import { TableInformationComponent } from './components/childComponents/tableInformation';
import { TableDetailDinamicComponent } from './components/childComponents/tableInformation/table-detail';
import { GraphicsInformationComponent } from './components/childComponents/graphicsInformation';
import { FleetHealthService } from './components/fleetHealth';
import { FleetHealthVehicleComponent } from './components/fleetHealthVehicle';
import { FleetHealthVehicleService } from './components/fleetHealthVehicle';
import { FaultCodesService } from './components/faultCodes';
import { FaultCodesComponent } from './components/faultCodes';
import { FilteringOptionsComponent } from './components/childComponents/filteringOptions/filteringOptions.component';
import { FilteringOptionsFilterSelectionComponent } from "./components/childComponents/filteringOptions/filterSelection";
import { FloatbuttonComponent } from "./components/childComponents/floatbutton";
import { FleetHealthByComponent } from './components/fleetHealthByComponent';
import { FleetHealthByComponentService } from './components/fleetHealthByComponent';

@NgModule({
    declarations: [
      MaintenanceComponent,
      FleetHealthComponent,
      FilterSorterComponent,
      TableInformationComponent,
      TableDetailDinamicComponent,
      GraphicsInformationComponent,
      FleetHealthVehicleComponent,
      FaultCodesComponent,
      FilteringOptionsComponent,
      FilteringOptionsFilterSelectionComponent,
      FloatbuttonComponent,
      FleetHealthByComponent
    ],
    imports: [
      NgaModule,
      routing,
      NgbModule,
      CommonModule,
      AgGridModule.withComponents([]),
      AmChartsModule,
      Select2Module,
      TranslateModule
    ],
    providers: [
      FleetHealthService,
      FleetHealthVehicleService,
      FaultCodesService,
      FleetHealthByComponentService
    ],
    schemas: [NO_ERRORS_SCHEMA],
    entryComponents: [TableDetailDinamicComponent]
})

export class MaintenanceModule {}
