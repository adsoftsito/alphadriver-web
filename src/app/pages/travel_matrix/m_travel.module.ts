import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './m_travel.routing';
import { MTravelComponent } from './m_travel.component';
import { UsersComponent } from './components/users';
import { CreateUserComponent } from './components/users/createUser';
import { UserListComponent } from './components/users/userList';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { AgGridModule } from 'ag-grid-angular/main';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "./components/users/user.service";
import {CommonModule} from "@angular/common";

import { Select2Module } from 'ng2-select2';
import {ClientsProductsComponent} from "./components/clients/clients.component";
import {FormClientProductComponent} from "./components/clients/formClient/formClient.component";
import { ClientProductService } from './components/clients/clients.service';
import {FormOrderComponent} from "./components/clients/formOrder/formOrder.component";
import {ClientsOrdersComponent} from "./components/clientOrders/orders.component";
import { OrdersService } from "./components/clientOrders/orders.service";

import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { MemberModalComponent } from './components/clients/memberModal/memberModal.component';
import { ViajesService } from './components/clients/viajes.service';

import { TableDetailRouteComponent } from './components/clients/formClient/table-detail-route/table-detail-route.component';
import { CurrentTableRouteComponent } from './components/clients/formClient/current-table-route/current-table-route.component';


import { TableDetailComponent } from './components/clients/table-detail/table-detail.component';
import { CurrentTableComponent } from './components/clients/current-table/current-table.component';


import { LogTableComponent } from './components/clients/log-table/log-table.component';
import { MotorStopComponent } from './components/clients/motor-stop/motor-stop.component';
import { AlertComponent } from './components/clients/alert/alert.component';
import {MonitoringReactionService} from "../monitoringReaction/montoringReaction.service";
import { UploadSignComponent } from './components/clients/upload-sign/upload-sign.component';
import { UploadPhotoComponent } from './components/clients/upload-photo/upload-photo.component';
import { UploadObsComponent } from './components/clients/upload-obs/upload-obs.component';
import { OrderDetailComponent } from './components/clients/order-detail/order-detail.component';
import { UpdateadmStatusComponent } from './components/clients/updateadm-status/updateadm-status.component';
import { UpdateoperStatusComponent } from './components/clients/updateoper-status/updateoper-status.component';

@NgModule({
    declarations: [
      MTravelComponent,
      UsersComponent,
      CreateUserComponent,
      UserListComponent,
      ClientsProductsComponent,
      FormClientProductComponent,
      FormOrderComponent,
      ClientsOrdersComponent,
      MemberModalComponent,
      TableDetailComponent,
      CurrentTableComponent,
      TableDetailRouteComponent,
      CurrentTableRouteComponent,
      LogTableComponent,
      MotorStopComponent,
      AlertComponent,
      UploadSignComponent,
      UploadPhotoComponent,
      UploadObsComponent,
      OrderDetailComponent,
      UpdateadmStatusComponent,
      UpdateoperStatusComponent
    ],
    imports: [
      CommonModule,
      Select2Module,
      AngularFormsModule,
      NgaModule,
      routing,
      NgbModule,
      TranslateModule,
      AgGridModule.withComponents([]),
      AngularDualListBoxModule ,
      ReactiveFormsModule,
    ],
    providers: [
      UserService,
      ClientProductService,
      ViajesService,
      OrdersService,
      MonitoringReactionService
    ],
    schemas: [NO_ERRORS_SCHEMA],
    entryComponents: [TableDetailComponent]

})

export class MTravelModule {}
