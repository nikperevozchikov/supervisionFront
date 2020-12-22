import {Component, OnInit} from '@angular/core';
import {PositionsService} from '../../../services/positions.service';
import {FormControl, FormGroup, NgForm, ValidationErrors, Validators} from '@angular/forms';
import {NotificationService} from '../../../services/notification.service';
import {EmployeesService} from '../../../services/employees.service';
import {Employee, Position} from '../../models/employee.model';
// import {Position} from '../../models/position.model';
import {Role} from '../../models/role.model';
import {DateTimeService} from '../../../services/date-time.service';
import * as moment from 'moment';
import {ActivatedRoute} from '@angular/router';

interface PasswordValidationResult {
  passwordEmpty: boolean;
  passwordTooShort: boolean;
  passwordTooLong: boolean;
  passwordNotEqualVerifyPassword: boolean;
}

// interface Position {
//   id: number;
//   name: string;
// }
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  // positions: Position[] = [
  //   {id: 1, name: 'Старший куратор'},
  //   {id: 2, name: 'Младший куратор'},
  //   {id: 3, name: 'Куратор'},
  //   {id: 4, name: 'Руководитель'},
  //   {id: 5, name: 'Директор'}
  // ];
  // positionId: number;
  // tslint:disable-next-line:variable-name
  private _employees: Employee[] = [];
  // tslint:disable-next-line:variable-name
  private _defaultPosition = 'Любая';
  // tslint:disable-next-line:variable-name
  private _positions: Position[] = [];
  // tslint:disable-next-line:variable-name
  private _registerForm: FormGroup;
// tslint:disable-next-line:variable-name
//   private _form: FormGroup;
  constructor(
    private positionsService: PositionsService,
    private ns: NotificationService,
    private employeesService: EmployeesService,
    private dateTimeService: DateTimeService,
    private activatedRoute: ActivatedRoute
  ) {
    this._registerForm = new FormGroup({
      passport: new FormControl(null, Validators.required),
      //   Validators.minLength(10),
      //   Validators.maxLength(10)
      // ]),
      password: new FormControl(null, Validators.required),
      verifyPassword: new FormControl(null, Validators.required),
      email: new FormControl(null),
      firstName: new FormControl(null, Validators.required),
      middleName: new FormControl(null),
      lastName: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      // birthday: new FormControl(null, Validators.required),

    }, this.passwordValidator.bind(this));
    this.positionsService.getAll()
      .subscribe((list: Position[] = []) => {
        this._positions = [
          {name: this.defaultPosition},
          ...list
        ];
      }, (error) => {
        console.error(error);
      });
  }

  // get form(): FormGroup {
  //   return this._form;
  // }
  get registerForm(): FormGroup {
    return this._registerForm;
  }

  get defaultPosition(): string {
    return this._defaultPosition;
  }

  get employees(): Employee[] {
    return this._employees;
  }

  get positions(): Position[] {
    return this._positions;
  }

  public selectedEmployeeId: number = null;

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        // tslint:disable-next-line:radix
        const employeeIdParam = Number.parseInt(params.employeeId);
        if (!Number.isNaN(employeeIdParam)) {
          this.selectedEmployeeId = employeeIdParam;
        }
      });
    this._registerForm = new FormGroup({
      passport: new FormControl(null, Validators.required),
      //   Validators.minLength(10),
      //   Validators.maxLength(10)
      // ]),
      password: new FormControl(null, Validators.required),
      verifyPassword: new FormControl(null, Validators.required),
      email: new FormControl(null),
      firstName: new FormControl(null, Validators.required),
      middleName: new FormControl(null),
      lastName: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      // birthday: new FormControl(null, Validators.required),

    }, this.passwordValidator.bind(this));
    this.positionsService.getAll()
      .subscribe((list: Position[] = []) => {
        this._positions = [
          {name: this.defaultPosition},
          ...list
        ];
      }, (error) => {
        console.error(error);
      });


  }

  // private choosePos(id: number): Position {
  //   // tslint:disable-next-line:no-debugger
  //    debugger;
  //   // tslint:disable-next-line:triple-equals
  //    return this.positions.filter(position => position.id == id)[0];
  // }

  // tslint:disable-next-line:typedef
  // onSelectEmployee(event) {
  //   this._registerForm.get('employee').setValue(
  //     event.target.value,
  //     {onlySelf: true}
  //   );
  // }
  // tslint:disable-next-line:typedef
  onSelectPosition(event) {
    // this.overlayService.show();

    const selectedPosition = event.target.value;

    this._registerForm.get('position').setValue(
      selectedPosition,
      {onlySelf: true}
    );
    const employeesObservable = selectedPosition === 'Любая' ?
      this.employeesService.getAll() :
      this.employeesService.getByPosition(selectedPosition);
    employeesObservable.subscribe((list: Employee[] = []) => {
    }, (error) => {
      console.error(error);
    });
  }

  // tslint:disable-next-line:typedef
  // onSelectPosition1(form: NgForm) {
  //   // this.overlayService.show();
  //
  //  this.positionsService.getAll();
  //  form.resetForm();
  // }
  // tslint:disable-next-line:typedef
  onRegister() {
    this.ns.clear();

    if (this.registerForm.invalid) {
      if (this.registerForm.errors) {
        const passwordErrors: PasswordValidationResult = this.registerForm.errors.passwordValidations;
        if (passwordErrors) {
          let message = null;
          if (passwordErrors.passwordEmpty) {
            message = 'Поля Пароль и Повторите пароль обязательны для заполнения.';
          } else if (passwordErrors.passwordTooShort) {
            message = 'Пароль должен быть длиной не менее 6 символов.';
          } else if (passwordErrors.passwordTooLong) {
            message = 'Пароль должен быть длиной не более 20 символов.';
          } else if (passwordErrors.passwordNotEqualVerifyPassword) {
            message = 'Пароли не совпадают.';
          }
          if (message) {
            this.ns.error(message);
          }
        }
      }

      const passportErrors = this.registerForm.get('passport').errors;
      const firstNameErrors = this.registerForm.get('firstName').errors;
      const lastNameErrors = this.registerForm.get('lastName').errors;
      const addressErrors = this.registerForm.get('address').errors;
      const birthdayErrors = this.registerForm.get('birthday').errors;

      if (passportErrors) {
        this.ifRequired(passportErrors, 'Паспорт');
      }
      if (firstNameErrors) {
        this.ifRequired(firstNameErrors, 'Имя');
      }
      if (lastNameErrors) {
        this.ifRequired(lastNameErrors, 'Фамилия');
      }
      if (addressErrors) {
        this.ifRequired(addressErrors, 'Адрес регистрации');
      }
      if (birthdayErrors) {
        this.ifRequired(birthdayErrors, 'Дата рождения');
      }
    } else { // ok
      const formValue = this.registerForm.value;
      const employee = new Employee(
        formValue.passport,
        formValue.password,
        formValue.email,
        Role.ROLE_EMPLOYEE,
        formValue.firstName,
        formValue.lastName,
        formValue.middleName,
        formValue.address,
        // moment(formValue.birthday, "YYYY-MM-DD").format("DD MMM YYYY")
        formValue.position
        // this.choosePos(this.positionId)
      );
      this.employeesService.register(employee)
        .subscribe(() => {
          this.ns.info('Регистрация завершена.');
        }, (error) => {
          this.ns.error('Что-то пошло не так. Please console, F12.');
          console.error(error);
        });
    }
  }

  // tslint:disable-next-line:typedef
  private ifRequired(errors: any, name: string) {
    let message = null;
    if (errors.required) {
      message = this.getRequiredMessage(name);
    }
    if (message) {
      this.ns.error(message);
    }
  }

  // tslint:disable-next-line:typedef
  private ifNotNumeric(errors: any, name: string) {
    let message = null;
    if (!errors.isNumeric) {
      message = `Поле ${name} должно состоять только из цифр.`;
    }
    if (message) {
      this.ns.error(message);
    }
  }

  // tslint:disable-next-line:typedef
  private ifOutOfBounds(errors: any, name: string) {
    let message = '';
    if (errors.minlength) {
      message += `Поле ${name} по длине должно быть не менее ${errors.minlength.requiredLength}. `;
    } else if (errors.maxlength) {
      message += `Поле ${name} по длине должно быть не более ${errors.maxlength.requiredLength}. `;
    }
    if (message && message !== '') {
      this.ns.error(message);
    }
  }

  private getRequiredMessage(name: string): string {
    return `Поле ${name} обязательно для заполнения.`;
  }

  private passwordValidator(control: FormGroup): ValidationErrors | null {
    const password = control.get('password').value;
    const verifyPassword = control.get('verifyPassword').value;

    const error = {
      passwordEmpty: false,
      passwordTooShort: false,
      passwordTooLong: false,
      passwordNotEqualVerifyPassword: false
    };

    error.passwordEmpty = !password || !verifyPassword;
    if (!error.passwordEmpty) {
      error.passwordTooShort = password.length < 6;
      error.passwordTooLong = password.length > 20;
      error.passwordNotEqualVerifyPassword = password !== verifyPassword;
    }

    const isError = error.passwordEmpty
      || error.passwordTooShort
      || error.passwordTooLong
      || error.passwordNotEqualVerifyPassword;

    return isError ? {passwordValidations: error} : null;
  }

}
