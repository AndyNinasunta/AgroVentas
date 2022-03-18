import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayProductComponent } from './pay-product.component';

describe('PayProductComponent', () => {
  let component: PayProductComponent;
  let fixture: ComponentFixture<PayProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
