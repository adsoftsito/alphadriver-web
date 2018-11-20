import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { Dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { PopularApp } from './popularApp';
import { PieChart } from './pieChart';
import { TrafficChart } from './trafficChart';
import { UsersMap } from './usersMap';
import { LineChart } from './lineChart';
import { Feed } from './feed';
import { Todo } from './todo';
import { Calendar } from './calendar';
import { CalendarService } from './calendar/calendar.service';
import { FeedService } from './feed/feed.service';
import { LineChartService } from './lineChart/lineChart.service';
import { PieChartService } from './pieChart/pieChart.service';
import { TodoService } from './todo/todo.service';
import { TrafficChartService } from './trafficChart/trafficChart.service';
import { UsersMapService } from './usersMap/usersMap.service';
import { GridsterModule } from 'angular-gridster2';
import { NgDragDropModule } from 'ng-drag-drop';
import { CompanyDashboardComponent } from './components/company-dashboard/company-dashboard.component';
import { ContentDashletComponent } from './components/content-dashlet/content-dashlet.component';
import { MenuDashletComponent } from './components/content-dashlet/menu-dashlet/menu-dashlet.component';
import { DataChartsService } from './components/content-dashlet/data-charts.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FloatbuttonComponent } from './components/floatbutton/floatbutton.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { DirectiveDashletComponent } from './components/directiveDashlet/directiveDashlet.component';
import { GroupUseComponent } from './components/groupUse/groupUse.component';
import { DashboardService } from './dashboard.service';

@NgModule({
  imports: [
    CommonModule,  
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing,
    AmChartsModule,
    GridsterModule,
    NgDragDropModule.forRoot(),
    NgbModule
  ],
  declarations: [
    PopularApp,
    PieChart,
    TrafficChart,
    UsersMap,
    LineChart,
    Feed,
    Todo,
    Calendar,
    Dashboard,
    CompanyDashboardComponent,
    ContentDashletComponent,
    MenuDashletComponent,
    FloatbuttonComponent,
    TemplatesComponent,
    DirectiveDashletComponent,
    GroupUseComponent,
  ],
  providers: [
    CalendarService,
    FeedService,
    LineChartService,
    PieChartService,
    TodoService,
    TrafficChartService,
    UsersMapService,
    DataChartsService,
    DashboardService
  ]
})
export class DashboardModule {}
