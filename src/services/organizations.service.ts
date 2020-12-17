import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RestService} from './rest.service';
import {Employee} from '../app/models/employee.model';
import {Organization} from '../app/models/organization.model';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  private commonUrl = `api/organizations`;

  constructor(
    private restService: RestService
  ) {
  }

  public getByEmployee(employee: Employee): Observable<Organization[]> {
    return this.restService.get(`${this.commonUrl}/get/employee/${employee.id}`);
  }
  public getOrganization(id: number): Observable<any> {
    return this.restService.get(`${this.commonUrl}/${id}`);
  }
  // tslint:disable-next-line:ban-types
  createOrganization(organization: Object): Observable<Object> {
    return this.restService.post(`${this.commonUrl}`, organization);
  }
  // tslint:disable-next-line:ban-types
  updateOrganization(id: number, value: any): Observable<Object> {
    return this.restService.put(`${this.commonUrl}/${id}`, value);

  }
  deleteOrganization(id: number): Observable<any> {
    return this.restService.delete(`${this.commonUrl}/${id}`, {  responseType: 'text' as 'json' });
  }
  getOrganizationsList(): Observable<any> {
    return this.restService.get(`${this.commonUrl}`);
  }
  // public getById(id: number): Observable<any> {
  //   return this.restService.get(`${this.commonUrl}/get/${id}`);
  // }
  // public getAll(): Observable<any> {
  //   return this.restService.get(`${this.commonUrl}/get/all`);
  // }
  // public save(organization: any): Observable<any> {
  //   return this.restService.put(`${this.commonUrl}/save`, organization);
  // }
  //
  // public delete(organization: Organization): Observable<any> {
  //   return this.restService.delete(`${this.commonUrl}/delete/${organization.id}`);
  // }
  // deleteById(id: number): Observable<any> {
  //   return this.restService.delete(`${this.commonUrl}/delete/${id}`);
  // }
}

