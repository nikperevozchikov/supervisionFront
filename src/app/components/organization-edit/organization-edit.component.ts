import {Component, OnInit} from '@angular/core';
import {SupervisionMode} from '../../models/supervisionmode.model';
import {ActivatedRoute, Router} from '@angular/router';
import {SupervisionmodesService} from '../../../services/supervisionmodes.service';
import {Organization} from '../../models/organization.model';
import {Employee} from '../../models/employee.model';
import {Event} from '../../models/event.model';
import {OrganizationsService} from '../../../services/organizations.service';
import {EmployeesService} from '../../../services/employees.service';
import {EventsService} from '../../../services/events.service';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.less']
})
export class OrganizationEditComponent implements OnInit {
  organization: Organization;
  employees: Employee[];
  employeeId: number;
  events: Event[];
  eventId: number;
  supervisionmodes: SupervisionMode[];
  supervisionmodeId: number;
  name: string;
  ogrn: string;
  dateFoundation: Date;
  submitted = false;
  id: number;

  constructor(private organizationsService: OrganizationsService,
              private supervisionmodesService: SupervisionmodesService,
              private employeesService: EmployeesService,
              private eventsService: EventsService,
              private authService: AuthenticationService,
              private router: Router,
              private  route: ActivatedRoute) {
  }

  ngOnInit() {
    debugger;
    this.organization = new Organization();
    this.id = this.route.snapshot.params.id;
    this.organizationsService.getOrganization(this.id)
      .subscribe(data => {
        console.log(data);
        this.organization = data;
        this.employeeId = this.organization.employee.id;
        this.eventId = this.organization.event.id;
        this.supervisionmodeId = this.organization.supervisionMode.id;
      }, error => console.log(error));
    this.fillEmployee();
    this.fillEvent();
    this.fillSupervisionmode();
  }

// tslint:disable-next-line:typedef
  private fillEmployee(): void {
    this.employeesService.getAll().subscribe(data => this.employees = data);
  }

// tslint:disable-next-line:typedef
  private fillEvent(): void {
    this.eventsService.getEventsList().subscribe(data => this.events = data);
  }

// tslint:disable-next-line:typedef
  private fillSupervisionmode(): void {
    this.supervisionmodesService.getSupervisionmodesList().subscribe(data => this.supervisionmodes = data);
  }

  private chooseEmployee(id: number): Employee {
    debugger;
    // tslint:disable-next-line:triple-equals
    return this.employees.filter(employee => employee.id == id)[0];
  }

  // tslint:disable-next-line:typedef
  private chooseEvent(id: number): Event {
    debugger;
    // tslint:disable-next-line:triple-equals
    return this.events.filter(event => event.id == id)[0];
  }

  private chooseSupervisionmode(id: number): SupervisionMode {
    debugger;
    // tslint:disable-next-line:triple-equals
    return this.supervisionmodes.filter(supervisionmode => supervisionmode.id == id)[0];
  }

  updateOrganization() {
    debugger;
    this.organization.employee = this.chooseEmployee(this.employeeId);
    this.organization.event = this.chooseEvent(this.eventId);
    this.organization.supervisionMode = this.chooseSupervisionmode(this.supervisionmodeId);
    this.organizationsService.updateOrganization(this.id, this.organization)
      .subscribe(data => {
        console.log(data);
        this.organization = new Organization();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateOrganization();
  }

  gotoList() {
    this.router.navigate(['/organizations']);
  }

}
