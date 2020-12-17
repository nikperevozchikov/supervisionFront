import {Role} from './role.model';

export class User {
  id: number;
  passport: string;
  password: string;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
  middleName?: string;

  constructor(passport: string, password: string,
              email: string, role: Role,
              firstName: string, lastName: string, middleName: string) {

    this.passport = passport;
    this.password = password;
    this.email = email;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
  }

}
