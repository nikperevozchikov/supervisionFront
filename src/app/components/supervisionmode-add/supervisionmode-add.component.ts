import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import {SupervisionmodesService} from '../../../services/supervisionmodes.service';
import {SupervisionMode} from '../../models/supervisionmode.model';
@Component({
  selector: 'app-supervisionmode-add',
  templateUrl: './supervisionmode-add.component.html',
  styleUrls: ['./supervisionmode-add.component.less']
})
export class SupervisionModeAddComponent implements OnInit {
  supervisionmode: SupervisionMode = new SupervisionMode();
  submitted = false;

  constructor(private supervisionmodesService: SupervisionmodesService,
              private router: Router) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  newSupervisionmode(): void {
    this.submitted = false;
    this.supervisionmode = new SupervisionMode();
  }

  save() {
    this.supervisionmodesService
      .createSupervisionmode(this.supervisionmode).subscribe(data => {
        console.log(data);
        this.supervisionmode = new SupervisionMode();
        this.gotoList();
      },
      error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/supervisionmodes']);
  }

}
