import {Employee, Position} from './employee.model';
import {Event} from './event.model';
import {SupervisionMode} from './supervisionmode.model';
import {Role} from './role.model';
export class Organization {
  id: number;
  name: string;
  ogrn: string;
  dateFoundation?: string;
  employee: Employee;
  event: Event;
  supervisionMode: SupervisionMode;
  // constructor(name: string, ogrn: string,  employee: Employee, event: Event, supervisionmode: Supervisionmode) {
  //
  //  this.name = name;
  //  this.ogrn = ogrn;
  //  this.employee = employee;
  //  this.event = event;
  //  this.supervisionmode = supervisionmode;
  // }
}
