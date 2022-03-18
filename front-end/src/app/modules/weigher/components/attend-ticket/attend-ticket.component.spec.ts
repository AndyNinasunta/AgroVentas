import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendTicketComponent } from './attend-ticket.component';

describe('AttendTicketComponent', () => {
  let component: AttendTicketComponent;
  let fixture: ComponentFixture<AttendTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
