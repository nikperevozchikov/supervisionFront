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
import {SupervisionmodeComponent} from './components/supervisionmode/supervisionmode.component';
import {SupervisionmodeAddComponent} from './components/supervisionmode-add/supervisionmode-add.component';
import {SupervisionmodeEditComponent} from './components/supervisionmode-edit/supervisionmode-edit.component';
import {OrganizationAddComponent} from './components/organization-add/organization-add.component';
import {OrganizationEditComponent} from './components/organization-edit/organization-edit.component';

const routes: Routes = [
  // {path: '', redirectTo: 'supervisionmode', pathMatch: 'full'},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'organizations', component: OrganizationComponent},
  {path: 'orgs/create', component: CreateOrganizationFormComponent, canActivate: [AuthGuard]},
  {path: 'help', component: HelpComponent},
  {path: 'catalog/employees', component: EmployeesCatalogComponent},
  {path: 'catalog/events', component: EventsCatalogComponent},
  {path: 'catalog/supervisionmodes', component: SupervisionmodesCatalogComponent},
  {path: 'supervisionmodes', component: SupervisionmodeComponent},
  { path: 'supervisionmodes/add', component: SupervisionmodeAddComponent},
  { path: 'update/:id', component: SupervisionmodeEditComponent },
  { path: 'organizations/add', component: OrganizationAddComponent},
  { path: 'update/:id', component: OrganizationEditComponent },
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
 // { path: '', redirectTo: 'employee', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}