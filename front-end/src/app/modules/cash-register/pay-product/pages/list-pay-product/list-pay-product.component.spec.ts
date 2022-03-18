import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPayProductComponent } from './list-pay-product.component';

describe('ListPayProductComponent', () => {
  let component: ListPayProductComponent;
  let fixture: ComponentFixture<ListPayProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPayProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPayProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
