import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CreateOrganizationFormComponent } from './components/create-organization-form/create-organization-form.component';
import { EmployeesCatalogComponent } from './components/employees-catalog/employees-catalog.component';
import { HelpComponent } from './components/help/help.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { EventsCatalogComponent } from './components/events-catalog/events-catalog.component';
import { SupervisionmodesCatalogComponent } from './components/supervisionmodes-catalog/supervisionmodes-catalog.component';
import {AuthGuard} from './helpers/auth.guard';
import {SupervisionModeComponent} from './components/supervisionmode/supervisionmode.component';
import {SupervisionModeAddComponent} from './components/supervisionmode-add/supervisionmode-add.component';
import {SupervisionModeEditComponent} from './components/supervisionmode-edit/supervisionmode-edit.component';
import {OrganizationAddComponent} from './components/organization-add/organization-add.component';
import {OrganizationEditComponent} from './components/organization-edit/organization-edit.component';
import { EventAddComponent } from './components/event-add/event-add.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { EventComponent } from './components/event/event.component';

const routes: Routes = [
  // {path: '', redirectTo: 'supervisionmode', pathMatch: 'full'},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'organizations', component: OrganizationComponent, canActivate: [AuthGuard]},
  {path: 'orgs/create', component: CreateOrganizationFormComponent, canActivate: [AuthGuard]},
  {path: 'help', component: HelpComponent},
  {path: 'catalog/employees', component: EmployeesCatalogComponent, canActivate: [AuthGuard]},
  {path: 'catalog/events', component: EventsCatalogComponent},
  {path: 'catalog/supervisionmodes', component: SupervisionmodesCatalogComponent},
  {path: 'supervisionmodes', component: SupervisionModeComponent, canActivate: [AuthGuard]},
  { path: 'supervisionmodes/add', component: SupervisionModeAddComponent, canActivate: [AuthGuard]},
  { path: 'update/:id', component: SupervisionModeEditComponent, canActivate: [AuthGuard]},
  { path: 'organizations/add', component: OrganizationAddComponent, canActivate: [AuthGuard]},
  { path: 'organizations/update/:id', component: OrganizationEditComponent , canActivate: [AuthGuard]},
  {path: 'event', component: EventComponent, canActivate: [AuthGuard]},
  { path: 'event/add', component: EventAddComponent, canActivate: [AuthGuard]},
  { path: 'event/update/:id', component: EventEditComponent, canActivate: [AuthGuard] },
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
