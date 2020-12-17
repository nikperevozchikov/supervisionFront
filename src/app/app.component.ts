import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {User} from './models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'supervisionFront';
  currentUser: User;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.authenticationService.currentUserObservable
      .subscribe(currentUser => {
        this.currentUser = currentUser;
      });
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // this.healthChecker.checkHealth();
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('login');
  }

}

