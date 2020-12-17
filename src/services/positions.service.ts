import { Injectable } from '@angular/core';
import {RestService} from './rest.service';
import {Observable} from 'rxjs';
//import {Position} from '../app/models/position.model';
import {Position} from '../app/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  private commonUrl = `api/positions`;

  constructor(
    private restService: RestService
  ) { }

  getAll(): Observable<Position[]> {
    return this.restService.get(`${this.commonUrl}/get/all`);
  }

  getAllAvailable(): Observable<Position[]> {
    return this.restService.get(`${this.commonUrl}/get/allAvailable`);
  }

}
