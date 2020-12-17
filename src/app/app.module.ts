import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CreateOrganizationFormComponent} from './components/create-organization-form/create-organization-form.component';
import {DataFieldComponent} from './components/data-field/data-field.component';
import {EmployeesCatalogComponent} from './components/employees-catalog/employees-catalog.component';
import {HelpComponent} from './components/help/help.component';
import {HomeComponent} from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RestService} from '../services/rest.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BasicAuthInterceptor} from './helpers/basic-auth.interceptor';
import {ErrorInterceptor} from './helpers/error.interceptor';
import {LoginComponent} from './components/login/login.component';
import {NotificationComponent} from './components/notification/notification.component';
import {PopupComponent} from './components/popup/popup.component';
import {ProfileComponent} from './components/profile/profile.component';
import {RegisterComponent} from './components/register/register.component';
import {OrganizationComponent} from './components/organization/organization.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {DpDatePickerModule} from 'ng2-date-picker';
import {DatePipe} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EventsCatalogComponent} from './components/events-catalog/events-catalog.component';
import {SupervisionmodesCatalogComponent} from './components/supervisionmodes-catalog/supervisionmodes-catalog.component';
import {SupervisionmodeComponent} from './components/supervisionmode/supervisionmode.component';
import { SupervisionmodeAddComponent } from './components/supervisionmode-add/supervisionmode-add.component';
import { SupervisionmodeEditComponent } from './components/supervisionmode-edit/supervisionmode-edit.component';
import { OrganizationAddComponent } from './components/organization-add/organization-add.component';
import { OrganizationEditComponent } from './components/organization-edit/organization-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateOrganizationFormComponent,
    DataFieldComponent,
    EmployeesCatalogComponent,
    HelpComponent,
    HomeComponent,
    LoginComponent,
    NotificationComponent,
    PopupComponent,
    ProfileComponent,
    RegisterComponent,
    OrganizationComponent,
    EventsCatalogComponent,
    SupervisionmodesCatalogComponent,
    SupervisionmodeComponent,
    SupervisionmodeAddComponent,
    SupervisionmodeEditComponent,
    OrganizationAddComponent,
    OrganizationEditComponent
  ],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DpDatePickerModule
  ],
  providers: [
    RestService,
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
