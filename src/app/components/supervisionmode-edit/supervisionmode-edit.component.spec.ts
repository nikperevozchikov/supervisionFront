import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisionmodeEditComponent } from './supervisionmode-edit.component';

describe('SupervisionmodeEditComponent', () => {
  let component: SupervisionmodeEditComponent;
  let fixture: ComponentFixture<SupervisionmodeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisionmodeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisionmodeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
