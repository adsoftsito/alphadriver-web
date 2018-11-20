import {Routes, RouterModule} from "@angular/router";
import {MonitoringReactionComponent} from "./monitoringReaction.component";
import {ModuleWithProviders} from "@angular/core";
import { ChatComponent } from './components/chat';
import { AlertLogsComponent } from "../../theme/components/baPageTop/components/alertLogs/alertLogs.component";
import { PatrimonialSecurityComponent } from "./components/patrimonial-security"
/**
 * Created by Tech Group BWL on 25/06/2018.
 */
const routes: Routes = [{
  path: '',
  component: MonitoringReactionComponent,
  children: [
    {
      path: 'alerts-logbook',
      component: AlertLogsComponent,
      data: {breadcrumb: 'theme.components.bapagetop.alertNotifications.alertsLogbook'}
    }
  ]},
  {
  path: 'patrimonial-security',
  component: PatrimonialSecurityComponent,
  data: {breadcrumb: 'pages.monitoring-and-reaction.patrimonial-security.patrimonial-security',inAction: 0}
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
