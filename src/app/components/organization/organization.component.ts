// import {Component, OnInit} from '@angular/core';
// import {CompanyService} from '../../services/organization.service';
// import {Company} from '../../models/organization';
// import {Router} from '@angular/router';
// import {CompRightNormService} from '../../services/comp-right-norm.service';
// import {ServiceSectionService} from '../../services/service-section.service';
// import {ServiceClassService} from '../../services/service-class.service';
// import {AddressService} from '../../services/address.service';
// import {CompRightNorm} from '../../models/comp-right-norm';
// import {Address} from '../../models/address';
// import {ServiceSection} from '../../models/ss';
// import {ServiceClass} from '../../models/sc';

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
import {Supervisionmode} from '../../models/supervisionmode.model';
import {Organization} from '../../models/organization.model';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})

export class OrganizationComponent implements OnInit {

  // private orgsServ: OrganizationsService;
  // private empsServ: EmployeesService;
  // private eventsServ: EventsService;
  // private superServ: SupervisionmodesService;
  // private router: Router;
  //
  // organizations: Organization[];
  // employee: Employee[];
  // event: Event[];
  // supervision: Supervisionmode[];
  //
  // selectedOrganizationValue: Organization;
  // selectedEmployeeValue: Employee;
  // selectedEventValue: Event;
  // selectedSupervisionValue: Supervisionmode;
  //
  // dateFound: string;
  // name: string;
  // ogrn: string;
  organizations: Observable<Organization[]>;

  constructor( private organizationsService: OrganizationsService,
               // private employeesService: EmployeesService,
               // private eventsService: EventsService,
               // private supervisionmodesService: SupervisionmodesService,
               private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.organizations = this.organizationsService.getOrganizationsList();
  }

  deleteOrganization(id: number) {
    this.organizationsService.deleteOrganization(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  updateOrganization(id: number){
    this.router.navigate(['update', id]);
  }

}
