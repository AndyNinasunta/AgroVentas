import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'app-new-ticket-tab',
  templateUrl: './new-ticket-tab.page.html',
  styleUrls: ['./new-ticket-tab.page.scss'],
})
export class NewTicketTabPage implements OnInit {


  u = '';

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.user.then((res) => {
      this.u = res;
    })
    console.log(this.u);
  }

  get user(): Promise<any> {

    return this.storage.get('user');
  };

}
