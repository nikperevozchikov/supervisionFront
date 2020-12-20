import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PositionsService} from '../../../services/positions.service';
import {EventsService} from '../../../services/events.service';
import {SupervisionmodesService} from '../../../services/supervisionmodes.service';
import {Employee, Position} from '../../models/employee.model';
// import {Position} from '../../models/position.model';
import {Event} from '../../models/event.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeesService} from '../../../services/employees.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {DateTimeService} from '../../../services/date-time.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {OrganizationsService} from '../../../services/organizations.service';
import {IDatePickerConfig} from 'ng2-date-picker';
import {Moment} from 'moment';
import * as moment from 'moment';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../services/notification.service';
import {Constants} from '../../common/constants.utils';
import {SupervisionMode} from '../../models/supervisionmode.model';
import {Organization} from '../../models/organization.model';

@Component({
  selector: 'app-create-organization-form',
  templateUrl: './create-organization-form.component.html',
  styleUrls: ['./create-organization-form.component.less']
})
export class CreateOrganizationFormComponent implements OnInit {
  public selectedDate: any;
  public config: IDatePickerConfig = {
    format: 'DD.MM.YYYY HH:mm',
    showTwentyFourHours: true,
    showSeconds: false,
    minutesInterval: 30,
    firstDayOfWeek: 'mo'
  };
  public material = true;
  public placeholder = 'Выберите дату основания';
  public displayDate: Moment | string;

  // tslint:disable-next-line:variable-name
  private _defaultPosition = 'Любая';
  // tslint:disable-next-line:variable-name
  private _defaultOrganization = 'Любая';
  // tslint:disable-next-line:variable-name
  private _defaultEvent = 'Любая';
  // tslint:disable-next-line:variable-name
  private _defaultSupervision = 'Любая';
  // tslint:disable-next-line:variable-name
  private _positions: Position[] = [];
  // tslint:disable-next-line:variable-name
  private _employees: Employee[] = [];
  // tslint:disable-next-line:variable-name
  private _events: Event[] = [];
  // tslint:disable-next-line:variable-name
  private _supervisionmodes: SupervisionMode[] = [];
  // tslint:disable-next-line:variable-name
  private _organizations: Organization[] = [];
  // tslint:disable-next-line:variable-name
  private _availableDates: Date[] = [];

  // tslint:disable-next-line:variable-name
  private _form: FormGroup;

  public loading = true;

  public minDate: Moment | string;
  public maxDate: Moment | string;
  public minTime: Moment | string;
  public maxTime: Moment | string;
  public selectedOrganizationId: number = null;
  public selectedEventId: number = null;
  public selectedSupervisionmodeId: number = null;
  constructor(private positionsService: PositionsService,
              private employeesService: EmployeesService,
              private cdr: ChangeDetectorRef,
              private overlayService: NgxSpinnerService,
              private dateTimeService: DateTimeService,
              private authenticationService: AuthenticationService,
              private organizationsService: OrganizationsService,
              private eventsService: EventsService,
              private supervisionmodesService: SupervisionmodesService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private ns: NotificationService
  ) {
  }

  get defaultPosition(): string {
    return this._defaultPosition;
  }

  get defaultOrganization(): string {
    return this._defaultOrganization;
  }

  get defaultEvent(): string {
    return this._defaultEvent;
  }

  get defaultSupervision(): string {
    return this._defaultSupervision;
  }

  get positions(): Position[] {
    return this._positions;
  }

  get employees(): Employee[] {
    return this._employees;
  }

  get events(): Event[] {
    return this._events;
  }

  get supervisionmodes(): SupervisionMode[] {
    return this._supervisionmodes;
  }

  get organizations(): Organization[] {
    return this._organizations;
  }

  get form(): FormGroup {
    return this._form;
  }

  public selectedEmployeeId: number = null;

  ngOnInit(): void {
    // tslint:disable-next-line:no-debugger
    debugger;
    this.activatedRoute.queryParams
      .subscribe(params => {
        // tslint:disable-next-line:radix
        const employeeIdParam = Number.parseInt(params.employeeId);
        if (!Number.isNaN(employeeIdParam)) {
          this.selectedEmployeeId = employeeIdParam;
        }
      });

    this.overlayService.show();

    this._form = new FormGroup({
      organization: new FormControl(this.defaultOrganization, Validators.required),
      position: new FormControl(this.defaultPosition, Validators.required),
      employee: new FormControl(null, Validators.required),
      dateTime: new FormControl(null, Validators.required),
      event: new FormControl(this.defaultEvent, Validators.required),
      supervision: new FormControl(this.defaultSupervision, Validators.required),
    });
    // this.organizationsService.getAll()
    //   .subscribe((list: Organization[] = []) => {
    //     if (list && list.length > 0) {
    //       this._organizations = list;
    //       this.setSelectedOrganization(this.selectedOrganizationId ? this.selectedOrganizationId : this._organizations[0].id);
    //     }
    //   }, (error) => {
    //     console.error(error);
    //   }).add(() => {
    //   this.overlayService.hide();
    // });
    this.positionsService.getAll()
      .subscribe((list: Position[] = []) => {
        this._positions = [
          {name: this.defaultPosition},
          ...list
        ];
      }, (error) => {
        console.error(error);
      });

    this.employeesService.getAll()
      .subscribe((list: Employee[] = []) => {
        this.setEmployees(list);
      }, (error) => {
        console.error(error);
      });
    this.eventsService.getEventsList()
      .subscribe((list: Event[] = []) => {
        if (list && list.length > 0) {
        this._events = list;
        this.setSelectedEvent(this.selectedEventId ? this.selectedEventId : this._events[0].name);
        }
      }, (error) => {
        console.error(error);
      }).add(() => {
      this.overlayService.hide();
    });
    // this.supervisionmodesService.getAll()
    //   .subscribe((list: Supervisionmode[] = []) => {
    //     if (list && list.length > 0) {
    //       this._supervisionmodes = list;
    //       this.setSelectedSupervisionmode(this.selectedSupervisionmodeId ? this.selectedSupervisionmodeId : this._supervisionmodes[0].name);
    //     }
    //   }, (error) => {
    //     console.error(error);
    //   }).add(() => {
    //   this.overlayService.hide();
    // });
  }
  private setSelectedOrganization(selectedOrganization: any): void {
    this.form.get('organization').setValue(
      selectedOrganization,
      {onlySelf: true}
    );
  }
  private setSelectedEvent(selectedEvent: any): void {
    this.form.get('event').setValue(
      selectedEvent,
      {onlySelf: true}
    );
  }
  private setSelectedSupervisionmode(selectedSupervisionmode: any): void {
    this.form.get('supervisionmode').setValue(
      selectedSupervisionmode,
      {onlySelf: true}
    );
  }
  // tslint:disable-next-line:typedef
  onSelectPosition(event) {
    this.overlayService.show();

    const selectedPosition = event.target.value;

    this.form.get('position').setValue(
      selectedPosition,
      {onlySelf: true}
    );

    // load doctors by specialization
    // const employeesObservable = selectedPosition === 'Любая' ?
    //   this.employeesService.getAll() :
    //   this.employeesService.getByPosition(selectedPosition);
    // employeesObservable.subscribe((list: Employee[] = []) => {
    //   this.setEmployees(list);
    // }, (error) => {
    //   console.error(error);
    // });
  }

  // tslint:disable-next-line:typedef
  onSelectEmployee(event) {
    this.form.get('employee').setValue(
      event.target.value,
      {onlySelf: true}
    );
  }

  // tslint:disable-next-line:typedef
  onSelectOrganization(event) {
    this.form.get('organization').setValue(
      event.target.value,
      {onlySelf: true}
    );
  }

  // tslint:disable-next-line:typedef
  onSelectEvent(event) {
    this.form.get('event').setValue(
      event.target.value,
      {onlySelf: true}
    );
  }

  // tslint:disable-next-line:typedef
  onSelectSupervisionmode(event) {
    this.form.get('supervisionmode').setValue(
      event.target.value,
      {onlySelf: true}
    );
  }

  // tslint:disable-next-line:typedef
  onCreateOrganization() {
    // tslint:disable-next-line:no-debugger
    debugger;
    if (this.form.invalid) {
      this.ns.error('Что-то введено не так. Проверьте введенную дату.');
      return;
    }
    // const value = this.form.value;
    // let ticket = {
    //   order: {
    //     id: +value.order
    //   },
    //   messages: [{
    //     text: value.description,
    //     dateTime: this.dateTimeService.dateToString(new Date(), Constants.PRETTY_DATE_TIME),
    //     user: {
    //       username: this.authenticationService.currentUserValue.username
    //     }
    //   }],
    //   status: {
    //     name: "Поиск оператора"
    //   }
    // }
    const value = this.form.value;
    const organizationn = {
      organization: {
        name: value.name
      },
      employee: {
        id: +value.employee
      },
      // employee: {
      //   id: this.authenticationService.currentUserValue.id
      // },
      dateTime: this.dateTimeService.dateToString(new Date(), Constants.PRETTY_DATE_TIME),
      event: {
        id: +value.event
      },
      supervisionmode: {
        id: +value.supervisionmode
      }
    };
    // this.organizationsService.save(organizationn)
    //   .subscribe((saved) => {
    //     this.ns.clear();
    //     this.router.navigateByUrl('profile');
    //   }, (error) => {
    //     this.ns.error('Ошибка . Проверьте введенные данные.');
    //   });
  }

  // tslint:disable-next-line:typedef
  private setEmployees(list: Employee[] = []) {
    this._employees = list;
    if (list.length > 0) {
      let i = 0;
      if (this.selectedEmployeeId) {
        for (i; i < list.length && list[i].id !== this.selectedEmployeeId; i++) {
        }
      }
      this.form.get('employee').setValue(list[i].id);
      // update available dates by employee
      // this.dateTimeService.getAvailableDates(list[0], new Date())
      //   .subscribe((list: string[] = []) => {
      //     this.minDate = moment(list[0].substring(0, 10), 'YYYY-MM-DD');
      //     this.maxDate = moment(list[list.length - 1].substring(0, 10), 'YYYY-MM-DD');
      //     this.minTime = moment('08:00', 'HH:mm');
      //     this.maxTime = moment('20:00', 'HH:mm');
      //     this.setDates(list);
      //   }, (error) => {
      //     console.error(error);
      //   });
    }
  }

  // private setDates(list: any[] = []) {
  //   list = list.map(dateStr => this.dateTimeService.stringToDate(dateStr));
  //   this._availableDates = list.map(dateStr => this.dateTimeService.stringToDate(dateStr));
  //   if (list.length > 0) {
  //     const firstDate = this.dateTimeService.dateToString(list[0], 'dd.MM.yyyy HH:mm');
  //     this.form.get('dateTime').setValue(firstDate);
  //   }
  //   this.cdr.detectChanges();
  //   this.overlayService.hide();
  // }
}
