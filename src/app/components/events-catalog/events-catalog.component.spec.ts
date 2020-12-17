import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsCatalogComponent } from './events-catalog.component';

describe('EventsCatalogComponent', () => {
  let component: EventsCatalogComponent;
  let fixture: ComponentFixture<EventsCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
