import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import {SupervisionmodesService} from '../../../services/supervisionmodes.service';
import {Supervisionmode} from '../../models/supervisionmode.model';
import {Organization} from '../../models/organization.model';
import {Event} from '../../models/event.model';
import {Employee} from '../../models/employee.model';
import {EventsService} from '../../../services/events.service';
import {EmployeesService} from '../../../services/employees.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-supervisionmode',
  templateUrl: './supervisionmode.component.html',
  styleUrls: ['./supervisionmode.component.less']
})
export class SupervisionmodeComponent implements OnInit {
  supervisionmodes: Observable<Supervisionmode[]>;

  constructor(private supervisionmodesService: SupervisionmodesService,
              private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.supervisionmodes = this.supervisionmodesService.getSupervisionmodesList();
  }

  deleteSupervisionmode(id: number) {
    this.supervisionmodesService.deleteSupervisionmode(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  updateSupervisionmode(id: number){
    this.router.navigate(['update', id]);
  }

}
