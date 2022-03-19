import { TestBed } from '@angular/core/testing';

import { ListTicketsService } from './list-tickets.service';

describe('ListTicketsService', () => {
  let service: ListTicketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListTicketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
