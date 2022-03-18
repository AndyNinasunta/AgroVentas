import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBuyProductComponent } from './list-buy-product.component';

describe('ListBuyProductComponent', () => {
  let component: ListBuyProductComponent;
  let fixture: ComponentFixture<ListBuyProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBuyProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBuyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
