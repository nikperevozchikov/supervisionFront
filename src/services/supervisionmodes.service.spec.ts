import { TestBed } from '@angular/core/testing';

import { SupervisionmodesService } from './supervisionmodes.service';

describe('SupervisionmodesService', () => {
  let service: SupervisionmodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupervisionmodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
