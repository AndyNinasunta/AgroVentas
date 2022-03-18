import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBuyProductComponent } from './edit-buy-product.component';

describe('EditBuyProductComponent', () => {
  let component: EditBuyProductComponent;
  let fixture: ComponentFixture<EditBuyProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBuyProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBuyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
