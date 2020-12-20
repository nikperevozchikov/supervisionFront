import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {OrganizationsService} from '../../../services/organizations.service';
import {IDatePickerConfig} from 'ng2-date-picker';
import {Moment} from 'moment';
import * as moment from 'moment';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../services/notification.service';
import {Constants} from '../../common/constants.utils';
import {SupervisionMode} from '../../models/supervisionmode.model';
import {Organization} from '../../models/organization.model';
import {Observable} from 'rxjs';
import {Employee, Position} from '../../models/employee.model';
import {EmployeesService} from '../../../services/employees.service';
import {EventsService} from '../../../services/events.service';
import {SupervisionmodesService} from '../../../services/supervisionmodes.service';
import {Event} from '../../models/event.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DateTimeService} from '../../../services/date-time.service';
import {Role} from '../../models/role.model';
import {AuthenticationService} from '../../../services/authentication.service';
@Component({
  selector: 'app-organization-add',
  templateUrl: './organization-add.component.html',
  styleUrls: ['./organization-add.component.less']
})
export class OrganizationAddComponent implements OnInit {
  // public config: IDatePickerConfig = {
  //   format: 'DD.MM.YYYY HH:mm',
  //   showTwentyFourHours: true,
  //   showSeconds: false,
  //   minutesInterval: 30,
  //   firstDayOfWeek: 'mo'
  // };
  // public material = true;
  // public displayDate: Moment | string;
  // public loading = true;
  //
  // public minDate: Moment | string;
  // public maxDate: Moment | string;
  // public minTime: Moment | string;
  // public maxTime: Moment | string;
  organization = new Organization();
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

  constructor(private organizationsService: OrganizationsService,
              private supervisionmodesService: SupervisionmodesService,
              private employeesService: EmployeesService,
              private eventsService: EventsService,
              private authService: AuthenticationService,
              private router: Router) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.fillEmployee();
    this.fillEvent();
    this.fillSupervisionmode();
  }
// tslint:disable-next-line:typedef
private fillEmployee(): void{
  this.employeesService.getAll().subscribe(data => this.employees = data);
}

// tslint:disable-next-line:typedef
private fillEvent(): void{
  this.eventsService.getEventsList().subscribe(data => this.events = data);
}
// tslint:disable-next-line:typedef
  private fillSupervisionmode(): void{
    this.supervisionmodesService.getSupervisionmodesList().subscribe(data => this.supervisionmodes = data);
  }
  // newSupervisionmode(): void {
  //   this.submitted = false;
  //   this.supervisionmode = new Supervisionmode();
  // }
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
  save() {
    // tslint:disable-next-line:no-debugger
    debugger;
    let date = new Date(this.dateFoundation);
    date = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    this.organization.dateFoundation = date.toISOString().split('T')[0];
    this.organization.name = this.name;
    this.organization.ogrn = this.ogrn;
    this.organization.employee = this.chooseEmployee(this.employeeId);
    this.organization.event = this.chooseEvent(this.eventId);
    this.organization.supervisionMode = this.chooseSupervisionmode(this.supervisionmodeId);
    this.organizationsService
      .createOrganization(this.organization).subscribe(data => {
        console.log(data);
        this.gotoList();
      },
      error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/organizations']);
  }

}
//   // tslint:disable-next-line:variable-name
//   private _defaultOrganization = 'Любая';
//   // tslint:disable-next-line:variable-name
//   private _defaultEmployee = 'Любая';
//   // tslint:disable-next-line:variable-name
//   private _defaultEvent = 'Любая';
//   // tslint:disable-next-line:variable-name
//   private _defaultSupervision = 'Любая';
//   // tslint:disable-next-line:variable-name
//   private _employees: Employee[] = [];
//   // tslint:disable-next-line:variable-name
//   private _events: Event[] = [];
//   // tslint:disable-next-line:variable-name
//   private _supervisionmodes: Supervisionmode[] = [];
//   // tslint:disable-next-line:variable-name
//   private _organizations: Organization[] = [];
//   // tslint:disable-next-line:variable-name
//   private _availableDates: Date[] = [];
//   employeeId: number;
//   eventId: number;
//   supervisionmodeId: number;
//   // tslint:disable-next-line:variable-name
//   private _form: FormGroup;
//
//   // organization: Organization = new Organization();
//   submitted = false;
//
//   constructor(private organizationsService: OrganizationsService,
//               private employeesService: EmployeesService,
//               private eventsService: EventsService,
//               private supervisionmodesService: SupervisionmodesService,
//               private dateTimeService: DateTimeService,
//               private router: Router) {
//     this._form = new FormGroup({
//     name: new FormControl(null, Validators.required),
//     ogrn: new FormControl(null, Validators.required),
//     // dateFoundation: new FormControl(null),
//     employee: new FormControl(null, Validators.required),
//     event: new FormControl(null, Validators.required),
//     supervisionmode: new FormControl(null, Validators.required)
//   });
//     // this.positionsService.getAll()
//     //   .subscribe((list: Position[] = []) => {
//     //     this._positions = [
//     //       {name: this.defaultPosition},
//     //       ...list
//     //     ];
//     //   }, (error) => {
//     //     console.error(error);
//     //   });
//     this.employeesService.getAll()
//       .subscribe((list: Employee[] = []) => {
//         if (list && list.length > 0) {
//           this._employees = list;
//           this.setEmployees(this.selectedEmployeeId ? this.selectedEmployeeId : this._employees[0].lastName);
//         }
//       }, (error) => {
//         console.error(error);
//       });
//     this.eventsService.getAll()
//       .subscribe((list: Event[] = []) => {
//         if (list && list.length > 0) {
//           this._events = list;
//           this.setSelectedEvent(this.selectedEventId ? this.selectedEventId : this._events[0].name);
//         }
//       }, (error) => {
//         console.error(error);
//       }).add(() => {
//     });
//     this.supervisionmodesService.getSupervisionmodesList()
//       .subscribe((list: Supervisionmode[] = []) => {
//         if (list && list.length > 0) {
//           this._supervisionmodes = list;
//           this.setSelectedSupervisionmode(this.selectedSupervisionmodeId ? this.selectedSupervisionmodeId : this._supervisionmodes[0].name);
//         }
//       }, (error) => {
//         console.error(error);
//       }).add(() => {
//     }); }
//   get defaultOrganization(): string {
//     return this._defaultOrganization;
//   }
//   get defaultEmployee(): string {
//     return this._defaultEmployee;
//   }
//   get defaultEvent(): string {
//     return this._defaultEvent;
//   }
//
//   get defaultSupervision(): string {
//     return this._defaultSupervision;
//   }
//
//   get employees(): Employee[] {
//     return this._employees;
//   }
//
//   get events(): Event[] {
//     return this._events;
//   }
//
//   get supervisionmodes(): Supervisionmode[] {
//     return this._supervisionmodes;
//   }
//
//   get organizations(): Organization[] {
//     return this._organizations;
//   }
//
//   get form(): FormGroup {
//     return this._form;
//   }
//
//   public selectedEmployeeId: number = null;
//   public selectedOrganizationId: number = null;
//   public selectedEventId: number = null;
//   public selectedSupervisionmodeId: number = null;
//   ngOnInit(): void {
//     this._form = new FormGroup({
//       name: new FormControl(null, Validators.required),
//       ogrn: new FormControl(null, Validators.required),
//       // dateFoundation: new FormControl(null),
//       employee: new FormControl(null, Validators.required),
//       event: new FormControl(null, Validators.required),
//       supervisionmode: new FormControl(null, Validators.required)
//     });
//
//     this.employeesService.getAll()
//       .subscribe((list: Employee[] = []) => {
//         if (list && list.length > 0) {
//           this._employees = list;
//           this.setEmployees(this.selectedEmployeeId ? this.selectedEmployeeId : this._employees[0].lastName);
//         }
//       }, (error) => {
//         console.error(error);
//       });
//     this.eventsService.getAll()
//       .subscribe((list: Event[] = []) => {
//         if (list && list.length > 0) {
//           this._events = list;
//           this.setSelectedEvent(this.selectedEventId ? this.selectedEventId : this._events[0].name);
//         }
//       }, (error) => {
//         console.error(error);
//       }).add(() => {
//     });
//     this.supervisionmodesService.getSupervisionmodesList()
//       .subscribe((list: Supervisionmode[] = []) => {
//         if (list && list.length > 0) {
//           this._supervisionmodes = list;
//           this.setSelectedSupervisionmode(this.selectedSupervisionmodeId ? this.selectedSupervisionmodeId : this._supervisionmodes[0].name);
//         }
//       }, (error) => {
//         console.error(error);
//       }).add(() => {
//     });
//   }
//   private setSelectedEvent(selectedEvent: any): void {
//     this.form.get('event').setValue(
//       selectedEvent,
//       {onlySelf: true}
//     );
//   }
//   private setEmployees(selectedEmployee: any): void {
//     this.form.get('employee').setValue( selectedEmployee,
//       {onlySelf: true});
//   }
//
//   private setSelectedSupervisionmode(selectedSupervisionmode: any): void {
//     this.form.get('supervisionmode').setValue(
//       selectedSupervisionmode,
//       {onlySelf: true}
//     );
//   }
// // tslint:disable-next-line:typedef
//   onSelectEmployee(event) {
//     this.form.get('employee').setValue(
//       event.target.value,
//       {onlySelf: true}
//     );
//   }
//
//   // tslint:disable-next-line:typedef
//   onSelectEvent(event) {
//     this.form.get('event').setValue(
//       event.target.value,
//       {onlySelf: true}
//     );
//   }
//
//   // tslint:disable-next-line:typedef
//   onSelectSupervisionmode(event) {
//     this.form.get('supervisionmode').setValue(
//       event.target.value,
//       {onlySelf: true}
//     );
//   }
//   newOrganization(): void {
//     this.submitted = false;
//    // this.organization = new Organization();
//   }
//   private chooseEmployee(id: number): Employee {
//
//     // tslint:disable-next-line:triple-equals
//     return this._employees.filter(employee => employee.id == id)[0];
//   }
//   // tslint:disable-next-line:typedef
//   private chooseEvent(id: number): Event {
//
//     // tslint:disable-next-line:triple-equals
//     return this._events.filter(event => event.id == id)[0];
//   }
//   private chooseSupervisionmode(id: number): Supervisionmode {
//     // tslint:disable-next-line:triple-equals
//     return this._supervisionmodes.filter(supervisionmode => supervisionmode.id == id)[0];
//   }
//   save() {
//     const formValue = this.form.value;
//     debugger;
//     const organization = new Organization(
//       formValue.name,
//       formValue.ogrn,
//       // formValue.dateFoundation.this.dateTimeService.dateToString(new Date(), Constants.PRETTY_DATE_TIME),
//       // moment(formValue.dateFoundation, 'YYYY-MM-DD').format('DD MMM YYYY'),
//       formValue.organization.employee = this.chooseEmployee(this.employeeId),
//       formValue.organization.event = this.chooseEvent(this.eventId),
//       formValue.organization.supervisionmode = this.chooseSupervisionmode(this.supervisionmodeId)
//       // moment(formValue.birthday, "YYYY-MM-DD").format("DD MMM YYYY")
//
//     );
//     // let organization: Organization = new Organization();
//     // organization.name = formValue.name;
//     // organization.ogrn = formValue.ogrn;
//     // organization.employee = {
//     //   lastName: formValue.lastName
//     // };
//     // observable = this.tariffsService.save(tariff);
//     // let value = this.form.value;
//     // let organization = {
//     //  // organization: [{
//     //     name: value.name,
//     //     ogrn: value.ogrn,
//     //     dateFoundation: this.dateTimeService.dateToString(new Date(), Constants.PRETTY_DATE_TIME),
//     //  // }],
//     //   employee: {
//     //     id: +value.employee
//     //   },
//     //   event: {
//     //     id: +value.event
//     //   },
//     //   supervisionmode: {
//     //     id: +value.supervisionmode
//     //   }
//     // };
//     this.organizationsService
//       .createOrganization(organization).subscribe(data => {
//         console.log(data);
//         // organization = new Organization();
//         this.gotoList();
//       },
//       error => console.log(error));
//   }
//
//   onSubmit() {
//     this.submitted = true;
//     this.save();
//   }
//
//   gotoList() {
//     this.router.navigate(['/organizations']);
//   }
// }

