import { TestBed } from '@angular/core/testing';

import { TicketGeneratorService } from './ticket-generator.service';

describe('TicketGeneratorService', () => {
  let service: TicketGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
