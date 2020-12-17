import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisionmodesCatalogComponent } from './supervisionmodes-catalog.component';

describe('SupervisionmodesCatalogComponent', () => {
  let component: SupervisionmodesCatalogComponent;
  let fixture: ComponentFixture<SupervisionmodesCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisionmodesCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisionmodesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
