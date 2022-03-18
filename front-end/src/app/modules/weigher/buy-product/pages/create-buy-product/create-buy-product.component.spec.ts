import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBuyProductComponent } from './create-buy-product.component';

describe('CreateBuyProductComponent', () => {
  let component: CreateBuyProductComponent;
  let fixture: ComponentFixture<CreateBuyProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBuyProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBuyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
