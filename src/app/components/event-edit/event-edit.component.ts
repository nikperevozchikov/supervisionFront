import {Component, OnInit} from '@angular/core';
import {SupervisionMode} from '../../models/supervisionmode.model';
import {ActivatedRoute, Router} from '@angular/router';
import {SupervisionmodesService} from '../../../services/supervisionmodes.service';
import {Event} from '../../models/event.model';
import {EventsService} from '../../../services/events.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.less']
})
export class EventEditComponent implements OnInit {

  id: number;
  event: Event;

  constructor(private route: ActivatedRoute, private router: Router,
              private eventsService: EventsService) {
  }

  ngOnInit() {
    this.event = new Event();

    this.id = this.route.snapshot.params.id;

    this.eventsService.getEvent(this.id)
      .subscribe(data => {
        console.log(data);
        this.event = data;
      }, error => console.log(error));
  }

  updateEvent() {
    this.eventsService.updateEvent(this.id, this.event)
      .subscribe(data => {
        console.log(data);
        this.event = new Event();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateEvent();
  }

  gotoList() {
    this.router.navigate(['/event']);
  }

}
