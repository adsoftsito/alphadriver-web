import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { routing }       from './login-admin.routing';
import { RecaptchaModule } from 'ng-recaptcha';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { LoginAdmin } from './login-admin.component';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
    NgbModule,
    TranslateModule,
    RecaptchaModule.forRoot(),
  ],
  declarations: [
    LoginAdmin
  ]
})
export class LoginAdminModule {}
