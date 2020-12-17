import {User} from './user.model';
import {Role} from './role.model';

export class Employee extends User {
  registrationAddress: string;
  // birthday: string;
  position?: Position;


  constructor(passport: string, password: string, email: string, role: Role, firstName: string, lastName: string, middleName: string,
              registrationAddress: string, position: Position) {

    super(passport, password, email, role, firstName, lastName, middleName);
    this.registrationAddress = registrationAddress;
    this.position = position;
    // this.birthday = birthday;
  }
}


export class Position {
  // id: number;
  name: string;
}
