import {Injectable} from '@angular/core';
import {RestService} from './rest.service';
import {Observable, of} from 'rxjs';
import {Event} from '../app/models/event.model';
import {Organization} from '../app/models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private commonUrl = 'api/events';

  constructor(
    private restService: RestService
  ) {
  }

  // public getAll(): Observable<Event[]> {
  //   return this.restService.get(`${this.commonUrl}/get/all`);
  // }
  public getById(id: number): Observable<any> {
    return this.restService.get(`${this.commonUrl}/get/${id}`);
  }
  public getAll(): Observable<any> {
    return this.restService.get(`${this.commonUrl}/get/all`);
  }
  public save(event: any): Observable<any> {
    return this.restService.put(`${this.commonUrl}/save`, event);
  }

  public delete(event: Event): Observable<any> {
    return this.restService.delete(`${this.commonUrl}/delete/${event.id}`);
  }
  deleteById(id: number): Observable<any> {
    return this.restService.delete(`${this.commonUrl}/delete/${id}`);
  }
}
