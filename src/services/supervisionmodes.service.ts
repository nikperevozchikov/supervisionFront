import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RestService} from './rest.service';
import {Observable, of} from 'rxjs';
import {Supervisionmode} from '../app/models/supervisionmode.model';
import {Organization} from '../app/models/organization.model';
import {Event} from '../app/models/event.model';


@Injectable({
  providedIn: 'root'
})
export class SupervisionmodesService {

  private commonUrl = 'api/supervisionmodes';

  // constructor(private http: HttpClient) { }
  constructor(
    private restService: RestService
  ) {
  }
  public getSupervisionmode(id: number): Observable<any> {
    return this.restService.get(`${this.commonUrl}/${id}`);
  }
  // tslint:disable-next-line:ban-types
  createSupervisionmode(supervisionmode: Object): Observable<Object> {
    return this.restService.post(`${this.commonUrl}`, supervisionmode);
  }
  // tslint:disable-next-line:ban-types
  updateSupervisionmode(id: number, value: any): Observable<Object> {
    return this.restService.put(`${this.commonUrl}/${id}`, value);

  }
  deleteSupervisionmode(id: number): Observable<any> {
    return this.restService.delete(`${this.commonUrl}/${id}`, {  responseType: 'text' as 'json' });
  }
  getSupervisionmodesList(): Observable<any> {
    return this.restService.get(`${this.commonUrl}`);
  }

}
