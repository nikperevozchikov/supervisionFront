import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisionmodeComponent } from './supervisionmode.component';

describe('SupervisionmodeComponent', () => {
  let component: SupervisionmodeComponent;
  let fixture: ComponentFixture<SupervisionmodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisionmodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisionmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
