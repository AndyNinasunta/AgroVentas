import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'app-new-ticket-tab',
  templateUrl: './new-ticket-tab.page.html',
  styleUrls: ['./new-ticket-tab.page.scss'],
})
export class NewTicketTabPage implements OnInit {
  user = '';

  constructor(private storage: StorageService) {}

  ngOnInit() {
    this.storage.get('user').then((res) => {
      this.user = res;
    });
  }
}
