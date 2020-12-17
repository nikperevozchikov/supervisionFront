import {Component, OnInit} from '@angular/core';
import {Event} from '../../models/event.model';
import {EventsService} from '../../../services/events.service';
import {Employee} from '../../models/employee.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {EmployeesService} from '../../../services/employees.service';


@Component({
  selector: 'app-events-catalog',
  templateUrl: './events-catalog.component.html',
  styleUrls: ['./events-catalog.component.less']
})
export class EventsCatalogComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _eventsList: Event[] = [];
  public employeesByEvent: Employee[];

  constructor(
    private eventsService: EventsService,
    private employeesService: EmployeesService,
    private overlayService: NgxSpinnerService
  ) {
  }

  get eventsList(): Event[] {
    return this._eventsList;
  }

  ngOnInit(): void {
    this.overlayService.show();
    this.eventsService.getAll()
      .subscribe((data) => {
        this._eventsList = data;
      }, (error) => {
        console.error(error);
      })
      .add(() => {
        this.overlayService.hide();
      });
  }

  // getEmployeesByEvent(eventName: string) {
  //   this.overlayService.show();
  //   this.employeesService.getByMedService(medServiceName)
  //     .subscribe((doctors: Doctor[]) => {
  //       this.doctorsByMedService = doctors;
  //     }, (error) => {
  //       console.error(error);
  //     })
  //     .add(() => {
  //       this.overlayService.hide();
  //     })
  // }

  // tslint:disable-next-line:typedef
  clearEmployeesByEventName() {
    this.employeesByEvent = null;
  }
}
