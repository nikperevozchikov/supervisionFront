import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrganizationFormComponent } from './create-organization-form.component';

describe('CreateOrganizationFormComponent', () => {
  let component: CreateOrganizationFormComponent;
  let fixture: ComponentFixture<CreateOrganizationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrganizationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrganizationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
