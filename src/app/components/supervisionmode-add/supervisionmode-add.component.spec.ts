import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisionmodeAddComponent } from './supervisionmode-add.component';

describe('SupervisionmodeAddComponent', () => {
  let component: SupervisionmodeAddComponent;
  let fixture: ComponentFixture<SupervisionmodeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisionmodeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisionmodeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
