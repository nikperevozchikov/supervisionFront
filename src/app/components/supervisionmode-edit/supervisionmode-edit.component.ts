import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {SupervisionmodesService} from '../../../services/supervisionmodes.service';
import {Supervisionmode} from '../../models/supervisionmode.model';
@Component({
  selector: 'app-supervisionmode-edit',
  templateUrl: './supervisionmode-edit.component.html',
  styleUrls: ['./supervisionmode-edit.component.less']
})
export class SupervisionmodeEditComponent implements OnInit {

  id: number;
  supervisionmode: Supervisionmode;

  constructor(private route: ActivatedRoute, private router: Router,
              private supervisionmodesService: SupervisionmodesService) { }

  ngOnInit() {
    this.supervisionmode = new Supervisionmode();

    this.id = this.route.snapshot.params.id;

    this.supervisionmodesService.getSupervisionmode(this.id)
      .subscribe(data => {
        console.log(data);
        this.supervisionmode = data;
      }, error => console.log(error));
  }

  updateSupervisionmode() {
    this.supervisionmodesService.updateSupervisionmode(this.id, this.supervisionmode)
      .subscribe(data => {
        console.log(data);
        this.supervisionmode = new Supervisionmode();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateSupervisionmode();
  }

  gotoList() {
    this.router.navigate(['/supervisionmodes']);
  }

}
