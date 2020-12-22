import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SupervisionMode} from '../../models/supervisionmode.model';
import {SupervisionmodesService} from '../../../services/supervisionmodes.service';
import {Router} from '@angular/router';
import {Event} from '../../models/event.model';
import {EventsService} from '../../../services/events.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.less']
})
export class EventComponent implements OnInit {

  events: Observable<Event[]>;

  constructor(private eventsService: EventsService,
              private router: Router) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.events = this.eventsService.getEventsList();
  }

  deleteEvent(id: number) {
    this.eventsService.deleteEvent(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  updateEvent(id: number) {
    this.router.navigate(['event/update', id]);
  }

}
