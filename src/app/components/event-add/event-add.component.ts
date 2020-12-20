import { Component, OnInit } from '@angular/core';
import {SupervisionMode} from '../../models/supervisionmode.model';
import {SupervisionmodesService} from '../../../services/supervisionmodes.service';
import {Router} from '@angular/router';
import {Event} from '../../models/event.model';
import {EventsService} from '../../../services/events.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.less']
})
export class EventAddComponent implements OnInit {

  event: Event = new Event();
  submitted = false;

  constructor(private eventsService: EventsService,
              private router: Router) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  newSupervisionmode(): void {
    this.submitted = false;
    this.event = new Event();
  }

  save() {
    this.eventsService
      .createEvent(this.event).subscribe(data => {
        console.log(data);
        this.event = new Event();
        this.gotoList();
      },
      error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/event']);
  }


}
