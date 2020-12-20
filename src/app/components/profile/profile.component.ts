import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {CustomButton} from '../popup/popup.component';
import {OrganizationsService} from '../../../services/organizations.service';
import {Organization} from '../../models/organization.model';
import {Role} from '../../models/role.model';
import {Employee} from '../../models/employee.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IDatePickerConfig} from 'ng2-date-picker';
import {Moment} from 'moment';
import {tick} from '@angular/core/testing';
import {NotificationService} from '../../../services/notification.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _nameForm: FormGroup;
  // tslint:disable-next-line:variable-name
  private _dateTimeForm: FormGroup;

  public currentUser: any;
  // tslint:disable-next-line:variable-name
  private _organizationsList: Organization[];
  public selectedTab = 'main';

  public config: IDatePickerConfig = {
    format: 'DD.MM.YYYY HH:mm',
    showTwentyFourHours: true,
    showSeconds: false,
    minutesInterval: 30,
    firstDayOfWeek: 'mo'
  };
  public material = true;
  public placeholder = 'Выберите дату организации';
  public displayDate: Moment | string;

  constructor(
    public authenticationService: AuthenticationService,
    private organizationsService: OrganizationsService,
    private ns: NotificationService,
    private overlayService: NgxSpinnerService
  ) {
    this._nameForm = new FormGroup({
      prescriptions: new FormControl(null, Validators.required)
    });
    this._dateTimeForm = new FormGroup({
      dateTime: new FormControl(null, Validators.required)
    });
  }

  get nameForm(): FormGroup {
    return this._nameForm;
  }

  get dateTimeForm(): FormGroup {
    return this._dateTimeForm;
  }

  get organizationsList(): Organization[] {
    return this._organizationsList;
  }

  ngOnInit(): void {
    this.overlayService.show();

    const savedTab = localStorage.getItem('selectedTab');
    if (savedTab) {
      this.selectedTab = savedTab;
    }

    this.authenticationService.currentUserObservable
      .subscribe((currentUser: any) => {
        if (currentUser) {
          this.currentUser = currentUser;
          this.organizationsService.getOrganizationsList()
            .subscribe((organizations) => {
              this._organizationsList = organizations;
            }, (error) => {
              console.error(error);
            })
            .add(() => {
              this.overlayService.hide();
            });
        }
      });
  }

  onTabClick(tab: string): void {
    switch (tab) {
      case 'main':
      case 'organizations':
        this.selectedTab = tab;
        localStorage.setItem('selectedTab', tab);
    }
  }

  getCurrentUserName(): string {
    return `${this.currentUser.lastName} ${this.currentUser.firstName} ${this.currentUser.middleName ? this.currentUser.middleName : ''}`;
  }

  // tslint:disable-next-line:typedef
  onSaveName(org: Organization) {
    org.name = this.nameForm.value.name;
    if (org.name) {
      this.organizationsService.updateOrganization(org.id, org)
        .subscribe(() => {
          this.ns.info(`Названия успешно сохранены для организации № ${org.id}`);
        }, (error) => {
          this.ns.error(`Ошибка добавления названий. Проверьте введенные данные.`);
          console.error(error);
        });
    } else {
      this.ns.error('Поле не может быть пустым', 5);
    }
  }

  // tslint:disable-next-line:typedef
  onSaveDateTime(org: Organization) {
    const moment: Moment = this.dateTimeForm.value.dateTime;
    org.dateFoundation = moment.format('DD.MM.YYYY HH:mm');
    this.organizationsService.updateOrganization(org.id, org)
      .subscribe(() => {
        this.ns.info('Время организации изменено.');
      }, (error) => {
        this.ns.error('Ошибка изменения времени организации. Проверьте введенные данные.');
        console.error(error);
      });
  }

  // tslint:disable-next-line:typedef
  onCancelOrganization(org: Organization) {
    const localIndex = this.organizationsList.indexOf(org);
    if (localIndex > -1) {
      this.organizationsList.splice(localIndex, 1);
      this.organizationsService.deleteOrganization(org.id)
        .subscribe(() => {
          this.ns.info(`Организация № ${org.name} успешно удалена.`);
        }, (error) => {
          this.ns.error('Ошибка удаления организации.');
          console.error(error);
        });
    }
  }

}
