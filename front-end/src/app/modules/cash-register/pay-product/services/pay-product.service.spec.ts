import { TestBed } from '@angular/core/testing';

import { PayProductService } from './pay-product.service';

describe('PayProductService', () => {
  let service: PayProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
