import { TestBed } from '@angular/core/testing';

import { WeigherService } from './weigher.service';

describe('WeigherService', () => {
  let service: WeigherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeigherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
