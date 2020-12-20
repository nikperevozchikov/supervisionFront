import {Injectable} from '@angular/core';
import {RestService} from './rest.service';
import {Observable, of} from 'rxjs';
import {Event} from '../app/models/event.model';
import {Organization} from '../app/models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private commonUrl = 'api/ev/events';

  constructor(
    private restService: RestService
  ) {
  }
  public getEvent(id: number): Observable<any> {
    return this.restService.get(`${this.commonUrl}/${id}`);
  }
  // tslint:disable-next-line:ban-types
  createEvent(event: Object): Observable<Object> {
    return this.restService.post(`${this.commonUrl}`, event);
  }
  // tslint:disable-next-line:ban-types
  updateEvent(id: number, value: any): Observable<Object> {
    return this.restService.put(`${this.commonUrl}/${id}`, value);

  }
  deleteEvent(id: number): Observable<any> {
    return this.restService.delete(`${this.commonUrl}/${id}`, {  responseType: 'text' as 'json' });
  }
  getEventsList(): Observable<any> {
    return this.restService.get(`${this.commonUrl}`);
  }
}
