import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuyProductComponent } from './form-buy-product.component';

describe('FormBuyProductComponent', () => {
  let component: FormBuyProductComponent;
  let fixture: ComponentFixture<FormBuyProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBuyProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
