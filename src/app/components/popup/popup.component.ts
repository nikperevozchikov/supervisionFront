import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup} from '@angular/forms';

export class CustomButton {
  title: string;
  onClick: (parameters: object) => any;
  onClickParams?: object = {};
  styles = '';
  disabled = false;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.less']
})
export class PopupComponent implements OnInit {

  @Input()
  buttonTitle: string;
  @Input()
  popupTitle: any;
  @Input()
  styles: string;
  @Input()
  type = 'info';
  @Input()
  customButtons: CustomButton[] = [];
  @Input()
  formGroup: FormGroup;

  @Output()
  onInit: EventEmitter<any> = new EventEmitter();
  @Output()
  onDestroy: EventEmitter<any> = new EventEmitter();

  @Output()
  onConfirm: EventEmitter<any> = new EventEmitter();
  @Output()
  onSubmit: EventEmitter<any> = new EventEmitter();

  isApproved = false;
  isSubmitted = false;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }


  // tslint:disable-next-line:typedef
  open(content) {
    this.onInit.emit();
    this.modalService
      .open(content, {ariaLabelledBy: 'modal-basic-title'})
      .result
      .then((result) => {
      }, (reason) => {
      });
  }

  close(modal: any, event: string): void {
    switch (this.type) {
      case 'confirm':
        this.isApproved = event === 'approve';
        if (this.isApproved) {
          console.log('Confirmed');
          this.onConfirm.emit();
        } else {
          console.log('Rejected');
        }
        break;
      case 'form':
        this.isSubmitted = event === 'submit';
        if (this.isSubmitted) {
          console.log('Submitted');
          this.onSubmit.emit();
        } else {
          console.log('Rejected');
        }
      default:
        this.onDestroy.emit();
        console.log('Closed');
    }
    modal.close();
  }

}
