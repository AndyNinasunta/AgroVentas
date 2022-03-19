import { TestBed } from '@angular/core/testing';

import { NewTicketTabService } from './new-ticket-tab.service';

describe('NewTicketTabService', () => {
  let service: NewTicketTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewTicketTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
