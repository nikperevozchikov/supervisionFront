import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Employee} from '../../models/employee.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthenticationService} from '../../../services/authentication.service';
import {EmployeesService} from '../../../services/employees.service';


@Component({
  selector: 'app-employees-catalog',
  templateUrl: './employees-catalog.component.html',
  styleUrls: ['./employees-catalog.component.less']
})
export class EmployeesCatalogComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private _employeesModel: Employee[] = [];

  public isAuthenticated = false;

  constructor(
    private router: Router,
    private employeesService: EmployeesService,
    private overlayService: NgxSpinnerService,
    private authenticationService: AuthenticationService
  ) {
  }

  get employeesModel(): Employee[] {
    return this._employeesModel;
  }


  ngOnInit(): void {
    this.overlayService.show();
    this.authenticationService.currentUserObservable
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });

    this.employeesService.getAll()
      .subscribe((data) => {
        this._employeesModel = data;
      }, (error) => {
        console.error(error);
      })
      .add(() => {
        this.overlayService.hide();
      });
  }

  // tslint:disable-next-line:typedef
  onCreateOrganization(employeeId: number) {
    this.router.navigate(['organizations/add'], {
      queryParams: {
        employeeId
      }
    });
  }
}
