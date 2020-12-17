import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesCatalogComponent } from './employees-catalog.component';

describe('EmployeesCatalogComponent', () => {
  let component: EmployeesCatalogComponent;
  let fixture: ComponentFixture<EmployeesCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
