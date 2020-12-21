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
import {Observable} from 'rxjs';
@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})

export class OrganizationComponent implements OnInit {

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
    this.router.navigate(['organizations/update', id]);
  }

}
