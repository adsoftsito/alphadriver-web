import {MonitoringReactionComponent} from "./monitoringReaction.component";
import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Select2Module} from "ng2-select2";
import {NgaModule} from "../../theme/nga.module";
import {routing} from "./monitoringReaction.routing";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TranslateModule} from "@ngx-translate/core";
import {AngularDualListBoxModule} from "angular-dual-listbox";
import { FormsModule as AngularFormsModule } from '@angular/forms';

import {environment} from "../../../environments/environment";
import { ChatComponent } from './components/chat';
import { ChatDetailComponent } from './components/chatDetail';
import { MonitoringReactionListUnitsComponent } from './components/listUnits/listUnits.component';
import {MonitoringReactionService} from "./montoringReaction.service";
import { MonitoringReactionPositionVehiclesAndSensorsComponent } from "./components/vehicle-description/position-vehicles-and-sensors/position-vehicles-and-sensors.component";
import { MonitoringReactionVehicleDescriptionComponent } from "./components/vehicle-description/vehicle-description.component";
import { MonitoringReactionOperatorComponent } from "./components/vehicle-description/mr-operator/mr-operator.component";
import { MonitoringReactionTravelinformationComponent } from "./components/vehicle-description/travelinformation/travelinformation.component";
import { MonitoringReactionConfigurationToAlertVehicleComponent } from "./components/vehicle-description/configuration-to-alert-vehicle/configuration-to-alert-vehicle.component";
import { MonitoringReactionMechanicalInformationComponent } from "./components/vehicle-description/mechanical-information/mechanical-information.component";

import { ClickOutsideDirective } from './components/chat/directives/click.outside.directive';
import { dateService } from './components/chat/services/date.service';
import { fileService } from './components/chat/services/file.service';
import { ChatEngine } from './components/chat/services/chat.engine';
import { ListUnitsOptionsComponent } from './components/listUnits/options/options.component';
import { MonitoringReactionFilteringOptionsComponent } from './components/filteringOptions/filteringOptions.component';
import { MonitoringReactionVehicleAlertsComponent } from "./components/vehicle-description/vehicle-alerts/vehicle-alerts.component";
import { MonitoringReactionDetailsactivefaultsComponent } from './components/vehicle-description/mechanical-information/detailsactivefaults/detailsactivefaults.component'
import { FilteringOptionsFilterSelectionComponent } from "./components/filteringOptions/filterSelection";
import { InstalledDevicesComponent } from './components/vehicle-description/position-vehicles-and-sensors/installedDevices/installedDevices.component';
//import {MonitoringReactionInfoWindowDetailComponent} from "./components/infoWindowDetail/";
import {GoogleMapsAPIWrapper} from "@agm/core";
import { BreadCrumManual } from "../../shared/providers/breadCrumbManual.service";
import { AgmCoreModule } from '@agm/core';

import {AgmOverlays} from "./components/Agm-Overlay/AgmOverlays.module";
import {MonitoringReactionInterestPointComponent} from "./components/toolMapControl/interestPoint/interestPoint.component";
import {MonitoringReactionSearchToolsComponent} from "./components/toolMapControl/searchTools/searchTools.component";
import {MonitoringReactionZoomControlComponent} from "./components/zoomControl/zoomControl.component";
import {MonitoringReactionToolMapControlComponent} from "./components/toolMapControl/toolMapControl.component";
import {MonitoringReactionUpdateToolsComponent} from "./components/toolMapControl/updateTools/updateTools.component";
import {MonitoringReactionDisplayComponent} from "./components/toolMapControl/display/display.component";
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { PatrimonialSecurityComponent } from './components/patrimonial-security/patrimonial-security.component';
import { AgGridModule } from 'ag-grid-angular';
import { MotorStopComponent } from './components/patrimonial-security/motor-stop/motor-stop.component';
import { AlertComponent } from './components/patrimonial-security/alert/alert.component';
import { CurrentTableComponent } from './components/patrimonial-security/current-table/current-table.component';
import { LogTableComponent } from './components/patrimonial-security/log-table/log-table.component';
import { PatrimonialSecurityService } from "./components/patrimonial-security/patrimonial-security.service";
import { TableDetailComponent } from './components/patrimonial-security/table-detail/table-detail.component';

/**
 * Created by Tech Group BWL on 25/06/2018.
 */

const GOOGLE_MAPS_KEY: string = environment.googleMapsKey;

@NgModule({
  declarations: [
    MonitoringReactionComponent,
    MonitoringReactionListUnitsComponent,
    MonitoringReactionVehicleDescriptionComponent,
    MonitoringReactionPositionVehiclesAndSensorsComponent,
    MonitoringReactionOperatorComponent,
    MonitoringReactionTravelinformationComponent,
    ChatComponent,
    ClickOutsideDirective,
    ListUnitsOptionsComponent,
    MonitoringReactionFilteringOptionsComponent,
    MonitoringReactionConfigurationToAlertVehicleComponent,
    MonitoringReactionMechanicalInformationComponent,
    MonitoringReactionVehicleAlertsComponent,
    ChatDetailComponent,
    MonitoringReactionDetailsactivefaultsComponent,
    FilteringOptionsFilterSelectionComponent,
    InstalledDevicesComponent,
    MonitoringReactionZoomControlComponent,
    MonitoringReactionToolMapControlComponent,
    MonitoringReactionSearchToolsComponent,
    MonitoringReactionUpdateToolsComponent,
    MonitoringReactionInterestPointComponent,
    MonitoringReactionDisplayComponent,
    PatrimonialSecurityComponent,
    MotorStopComponent,
    AlertComponent,
    CurrentTableComponent,
    LogTableComponent,
    TableDetailComponent

  ],
  imports: [
    CommonModule,
    Select2Module,
    AngularFormsModule,
      AgmOverlays,
    NgaModule,
    routing,
    NgbModule,
    TranslateModule,
     AgmJsMarkerClustererModule,
    // PickerModule ,
    // EmojiModule,
    // AgGridModule.withComponents([]),
    AngularDualListBoxModule ,
     AgmCoreModule.forRoot({
       apiKey: GOOGLE_MAPS_KEY,
       libraries: ["places"]
     }),
     AgGridModule.withComponents([])
  ],
  providers: [// OUR SERVICES
    // GoogleMapsAPIWrapper,
    MonitoringReactionService,
    dateService,
    fileService,
    BreadCrumManual,
    PatrimonialSecurityService
  ],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [TableDetailComponent]

})

export class MonitoringReactionModule {}
