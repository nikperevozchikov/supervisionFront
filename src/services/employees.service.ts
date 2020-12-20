import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Employee} from '../app/models/employee.model';
import {RestService} from './rest.service';
import {Organization} from '../app/models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private commonUrl = `api/employees`;

  constructor(
    private restService: RestService
  ) { }


  public getById(id: number): Observable<any> {
    return this.restService.get(`${this.commonUrl}/get${id}`);
  }
  public getAll(): Observable<any> {
    return this.restService.get(`${this.commonUrl}/get/all`);
  }

  public getByPosition(positionName: Position): Observable<Employee[]> {
    return this.restService.get(`${this.commonUrl}/get/position/${positionName}`);
  }

  public register(employee: Employee): Observable<any> {
    return this.restService.put(`${this.commonUrl}/register`, employee);
  }
  public save(employee: any): Observable<any> {
    return this.restService.put(`${this.commonUrl}/save`, employee);
  }

  public delete(employee: Employee): Observable<any> {
    return this.restService.delete(`${this.commonUrl}/delete/${employee.id}`);
  }
  deleteById(id: number): Observable<any> {
    return this.restService.delete(`${this.commonUrl}/delete/${id}`);
  }
}
