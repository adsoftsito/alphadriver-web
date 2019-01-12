import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';


// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule',
  },
  {
    path: 'login-admin',
    loadChildren: 'app/pages/login-admin/login-admin.module#LoginAdminModule',
  },
  {
    path: 'userRegister',
    loadChildren: 'app/pages/userRegister/userRegister.module#UserRegisterModule',
  },
  {
      path: 'reports-only',
      loadChildren: './reports/reports.module#ReportsModule',
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: 'usersControl', loadChildren: './usersControl/usersControl.module#UsersControlModule',data: {breadcrumb: 'Menu.usuarios', inAction: 0} },
      // { path: 'travel_matrix', loadChildren: './travel_matrix/m_travel.module#MTravelModule' }
      { path: 'travel_matrix', loadChildren: './travel_matrix/m_travel.module#MTravelModule', data: {breadcrumb: 'Logística', inAction: 'despacho'}},
      { path: 'monitoring-and-reaction', loadChildren: './monitoringReaction/monitoringReaction.module#MonitoringReactionModule' },
      { path: 'reports', loadChildren: './reports/reports.module#ReportsModule',data: {breadcrumb: 'Menu.reportes', inAction: 0} },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', data: {breadcrumb: 'Menu.dashboard', inAction: 0} },
      { path: 'maintenance', loadChildren: './maintenance/maintenance.module#MaintenanceModule', data: {breadcrumb: 'Menu.mantenimiento', inAction: 0} },
      //{ path: 'menuGrafiComponent', loadChildren: './menuGrafiComponent/menugrafic.module#MenuGraficModule',data: {breadcrumb: 'Menu.salud', inAction: 0} },
      { path: 'vehicles', loadChildren: './vehicles/vehicles.module#VehiclesModule', data: {breadcrumb: 'Menu.vehicles', inAction: 0}},
      { path: 'ranking', loadChildren: './ranking/ranking.module#RankingModule', data: {breadcrumb: 'Menu.ranking', inAction: 0}}
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
