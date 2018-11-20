import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgaModule } from '../../theme/nga.module';
import { TreeModule } from 'angular-tree-component';
import { AppTranslationModule } from '../../app.translation.module';

import { ReportsComponent } from './reports.component';
import { ReportFiltersComponent } from './report-filters/report-filters.component';

import { routing } from './reports.routing';

import { ConductOperativeOperatorComponent }
from './report-filters/operative-conduct/operator/operator.component';
import { ConductOperativeVehicleComponent }
from './report-filters/operative-conduct/vehicle/vehicle.component';

import { OperationalSecurityOperatorComponent }
from './report-filters/operational-security/operator/operator.component';
import { OperationalSecuriyVehicleComponent }
from './report-filters/operational-security/vehicle/vehicle.component';

import { OperativeFleetComponent } from './report-filters/operative-conduct/fleet/fleet.operation.component';

import { AmChartsModule } from '@amcharts/amcharts3-angular';

/** For flotas searching */
import { FiltroSeleccionModal } from '../Componente_Arbol/filtro-seleccion/filtro-seleccion-modal.component';
import { TreeComponent } from '../Componente_Arbol/panel-tree/tree/tree.component';
import { FilterSelectionPipe } from '../Componente_Arbol/filter-flotas.pipe';
import { FilterSelectionUnidadesPipe } from '../Componente_Arbol/filter-unidades.pipe';
import { PanelTreeComponent } from '../Componente_Arbol/panel-tree/panel-tree.component';
import { ToastyModule } from 'ng2-toasty';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterSelectionPipe as RSP } from '../Componente_Arbol/filtro-seleccion/filter-seleccion.pipe';
import {ComboBoxModule} from 'ng2-combobox';

@NgModule({
    declarations: [
        ReportsComponent,
        ReportFiltersComponent,
        ConductOperativeOperatorComponent,
        ConductOperativeVehicleComponent,
        OperationalSecurityOperatorComponent,
        OperationalSecuriyVehicleComponent,
        TreeComponent,
        FiltroSeleccionModal,
        FilterSelectionPipe,
        RSP,
        FilterSelectionUnidadesPipe,
        PanelTreeComponent,
        OperativeFleetComponent,
    ],
    imports: [
        ComboBoxModule,
        CommonModule,
        FormsModule,
        NgaModule,
        TreeModule,
        routing,
        AmChartsModule,
        AppTranslationModule,
        NgbModule,
        ToastyModule.forRoot(),
    ],
    entryComponents: [
          FiltroSeleccionModal,
      ],
})
export class ReportsModule {}
