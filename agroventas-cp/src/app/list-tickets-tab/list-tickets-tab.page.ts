import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  TicketNotWeighedI,
  TicketWeighedI,
  UserI,
} from '../shared/interfaces/shared.interface';
import { StorageService } from '../shared/storage.service';
import { ListTicketsService } from './services/list-tickets.service';

@Component({
  selector: 'app-list-tickets-tab',
  templateUrl: './list-tickets-tab.page.html',
  styleUrls: ['./list-tickets-tab.page.scss'],
})
export class ListTicketsTabPage implements OnInit {
  user: UserI = null;
  $user = new BehaviorSubject<UserI>(this.user);
  notWeighedTickets: TicketNotWeighedI[] = [];
  weighedTickets: TicketWeighedI[] = [];

  constructor(
    private storage: StorageService,
    private listTicketsService: ListTicketsService
  ) {}

  ngOnInit() {
    this.storage.get('user').then((user) => {
      this.storage.user = user;
      this.user = this.storage.user;

      this.listTicketsService
        .getNotWeighedItems(this.user.ruc)
        .subscribe((nw) => {
          this.notWeighedTickets = nw;
        });

      this.listTicketsService.getWeighedItems(this.user.ruc).subscribe((w) => {
        this.weighedTickets = w;
      });
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 3000);
  }
}
