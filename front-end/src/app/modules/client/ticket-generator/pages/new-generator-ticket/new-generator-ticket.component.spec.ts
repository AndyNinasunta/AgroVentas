import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGeneratorTicketComponent } from './new-generator-ticket.component';

describe('NewGeneratorTicketComponent', () => {
  let component: NewGeneratorTicketComponent;
  let fixture: ComponentFixture<NewGeneratorTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGeneratorTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGeneratorTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
