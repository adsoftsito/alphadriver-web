import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgUploaderModule } from 'ngx-uploader';
import { AppTranslationModule } from '../app.translation.module';
import { NgDragDropModule } from 'ng-drag-drop';
import { GridsterModule } from 'angular-gridster2';
import { Select2Module } from 'ng2-select2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular/main';
import { MotumRankingCardComponent} from "./components/motumRankingCard/motumRankingCard.component"
import { MotumDatePickerComponent} from "./components/motumDatePicker/motumDatePicker.component"

import {
  BaThemeConfig
} from './theme.config';

// import {
//   MenuComponent,
//   MenuItemComponent,
//   MenuBarComponent,
//   MenuService,
//   MenuWindowComponent,
// } from '../pages/menu';

import {
  BaThemeConfigProvider
} from './theme.configProvider';

import {
  BaAmChart,
  BaBackTop,
  BaCard,
  BaChartistChart,
  BaCheckbox,
  BaContentTop,
  BaFullCalendar,
  BaMenuItem,
  BaMenu,
  BaMsgCenter,
  BaMultiCheckbox,
  BaPageTop,
  BaPictureUploader,
  BaSidebar,
  BaFileUploader,
  MenuComponent,
  MenuItemComponent,
  MenuBarComponent,
  MenuService,
  MenuWindowComponent,
  BreadcrumbComponent,
  MotumIntlTelInputComponent,
  MotumGroupTreeComponent,
  MotumSearchInputComponent
} from './components';

import { BaCardBlur } from './components/baCard/baCardBlur.directive';

import {
  BaScrollPosition,
  BaSlimScroll,
  BaThemeRun,
  MotumIntlTelInputDirective

} from './directives';

import {
  BaAppPicturePipe,
  BaKameleonPicturePipe,
  BaProfilePicturePipe
} from './pipes';

import {
  BaImageLoaderService,
  BaMenuService,
  BaThemePreloader,
  BaThemeSpinner
} from './services';

import {
  EmailValidator,
  EqualPasswordsValidator
} from './validators';
import { MotumCalender } from './components/motum-calender/motum-calender.component';
import { MotumCalenderDirective } from './directives/motum-calender/motum-calender.directive';
import { MotumReportHeaderComponent } from './components/motumReportHeader/motumReportHeader.component';
import { MotumReportSubtitleComponent } from './components/motumReportSubtitle/motumReportSubtitle.component';
import { MotumReportGradeComponent } from './components/motumReportGrade/motumReportGrade.component';
import { MotumReportCardInformationComponent } from './components/motumReportCardInformation/motumReportCardInformation.component';
import { MotumReportGraphComponent } from './components/motumReportGraph/motumReportGraph.component';
import { MotumReportTableComponent } from './components/motumReportTable/motumReportTable.component';
import { MotumDashletCardComponent } from './components/motumDashletCard/motumDashletCard.component';
import { MotumFleetSelectionComponent } from './components/motumFleetSelection/motumFleetSelection.component';
import { TmThemeModule } from "./motum-theme.module";
import { MotumLayoutComponent } from "./components/motumLayout/motumLayout.component";
import { MotumMultiLevelTable } from "./components/motumMultiLevelTable/motumMultiLevelTable.component";
import { AlertNotificationsComponent } from "./components/baPageTop/components/alertNotifications/alertNotifications.component";
import { AlertLogsComponent } from "./components/baPageTop/components/alertLogs/alertLogs.component";
import { ClientProductService } from "../pages/usersControl/components/clients/clients.service";
import { BreadCrumManual } from "../shared/providers/breadCrumbManual.service";
//import { ButtonBackComponent } from './components/buttonBack/buttonBack.component';
//import { ClickOutsideDirective } from '../pages/monitoringReaction/components/chat/directives/click.outside.directive';
import { ClickOutsideDirective } from "./directives/clickOutside/clickOutside.directive"
//import { MotumButtonBackService } from './components/buttonBack/motum-button-back.service';
//import {MonitoringReactionZoomControlComponent} from "../pages/monitoringReaction/components/zoomControl/zoomControl.component"
import {MotumCustomMarkerComponent} from './components/motumCustomMarker/MotumCustomMarker.component'
import {MonitoringReactionInfoWindowDetailComponent} from "../pages/monitoringReaction/components/infoWindowDetail/infoWindowDetail.component"
import {MotumButtonComponent} from "./components/motumButton/motumButton.component";
import {MotumGroupBtnComponent} from "./components/motumGroupBtn/motumGroupBtn.component";
import {MotumModalDatePickerComponent} from "./components/motumModalDatePicker/motumModalDatePicker.component";
import {MotumInitialNamePipe} from "./pipes/motumInitialName/motumInitalName.pipe";
import {MotumAvatarComponent} from "./components/motumAvatar/motumAvatar.component";
import {MotumModalForm} from "./components/motumModalForm/motumModalForm.component";
const NGA_COMPONENTS = [

  BaAmChart,
  BaBackTop,
  BaCard,
  BaChartistChart,
  BaCheckbox,
  BaContentTop,
  BaFullCalendar,
  BaMenuItem,
  BaMenu,
  BaMsgCenter,
  BaMultiCheckbox,
  BaPageTop,
  BaPictureUploader,
  BaSidebar,
  BaFileUploader,
  MenuComponent,
  MenuItemComponent,
  MenuBarComponent,
  MenuWindowComponent,
  BreadcrumbComponent,
  MotumIntlTelInputComponent,
  MotumCalender,
  MotumGroupTreeComponent,
  MotumReportHeaderComponent,
  MotumReportTableComponent,
  MotumReportSubtitleComponent,
  MotumReportGraphComponent,
  MotumReportCardInformationComponent,
  MotumReportGradeComponent,
  MotumSearchInputComponent,
  MotumDashletCardComponent,
  MotumLayoutComponent,
  MotumMultiLevelTable,
  MotumCustomMarkerComponent,
  MotumFleetSelectionComponent,
  AlertNotificationsComponent,
  AlertLogsComponent,
  ClickOutsideDirective,
    MonitoringReactionInfoWindowDetailComponent,
    MotumRankingCardComponent,
    MotumGroupBtnComponent,
	  MotumButtonComponent,
    MotumRankingCardComponent,
  	MotumModalForm,
 	 MotumAvatarComponent,
    MotumDatePickerComponent,
    MotumModalDatePickerComponent
 //ButtonBackComponent
];

const NGA_DIRECTIVES = [
  BaScrollPosition,
  BaSlimScroll,
  BaThemeRun,
  BaCardBlur,
  MotumIntlTelInputDirective

];

const NGA_PIPES = [
  BaAppPicturePipe,
  BaKameleonPicturePipe,
  BaProfilePicturePipe,
  MotumInitialNamePipe
];

const NGA_SERVICES = [
  BaImageLoaderService,
  BaThemePreloader,
  BaThemeSpinner,
  BaMenuService,
  MenuService,
  ClientProductService,
  BreadCrumManual,
  //MotumButtonBackService
];

const NGA_VALIDATORS = [
  EmailValidator,
  EqualPasswordsValidator
];

const TM_THEME_PROVIDERS = [
  ...TmThemeModule.forRoot({
    name: 'default'
  }).providers
];

@NgModule({
  declarations: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS,
    MotumCalender,
    MotumCalenderDirective,
    MotumReportHeaderComponent,
    MotumReportSubtitleComponent,
    MotumReportGradeComponent,
    MotumReportCardInformationComponent,
    MotumReportGraphComponent,
    MotumReportTableComponent,
    MotumDashletCardComponent,
    MotumFleetSelectionComponent,
    AlertNotificationsComponent,
    AlertLogsComponent,
    ClickOutsideDirective,
    MotumSearchInputComponent
    //ButtonBackComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppTranslationModule,
    NgUploaderModule,
    NgbModule,
    GridsterModule,
    Select2Module,
    NgDragDropModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  exports: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS,

  ]
})
export class NgaModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NgaModule,
      providers: [
        BaThemeConfigProvider,
        BaThemeConfig,
        ...NGA_VALIDATORS,
        ...NGA_SERVICES,
        ...TM_THEME_PROVIDERS
      ],
    };
  }
}
